import tensorflow as tf
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'  # Suppress TensorFlow messages
os.environ['CUDA_VISIBLE_DEVICES'] = ''

from flask import Flask, request, send_file, jsonify, send_from_directory
from tensorflow.keras.preprocessing.image import ImageDataGenerator, img_to_array, load_img
import os
import io
import uuid
import shutil
import base64
import numpy as np
from sklearn.metrics import confusion_matrix

import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt

import tensorflow_hub as hub
from flask_cors import CORS
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)

TRAIN_FOLDER = "dataset/train"
TEST_FOLDER = "dataset/test"

def generate_accuracy_plot(history):
    plt.plot(history['accuracy'])
    plt.plot(history['val_accuracy'])
    plt.title('Model Accuracy')
    plt.ylabel('Accuracy')
    plt.xlabel('Epoch')
    plt.legend(['Train', 'Test'], loc='upper left')
    plt_buffer = io.BytesIO()
    plt.savefig(plt_buffer, format='png')
    plt_buffer.seek(0)
    plot_data = base64.b64encode(plt_buffer.getvalue()).decode('utf-8')
    plt.close()
    return plot_data

def generate_loss_plot(history):
    plt.plot(history['loss'])
    plt.plot(history['val_loss'])
    plt.title('Model Loss')
    plt.ylabel('Loss')
    plt.xlabel('Epoch')
    plt.legend(['Train', 'Test'], loc='upper left')
    plt_buffer = io.BytesIO()
    plt.savefig(plt_buffer, format='png')
    plt_buffer.seek(0)
    plot_data = base64.b64encode(plt_buffer.getvalue()).decode('utf-8')
    plt.close()
    return plot_data

def generate_confusion_matrix(y_true, y_pred, classes):
    cm = confusion_matrix(y_true, y_pred)
    plt.figure(figsize=(8, 6))
    plt.imshow(cm, interpolation='nearest', cmap=plt.cm.Blues)
    plt.title('Confusion Matrix')
    plt.colorbar()
    tick_marks = np.arange(len(classes))
    plt.xticks(tick_marks, classes, rotation=45)
    plt.yticks(tick_marks, classes)
    plt.ylabel('True label')
    plt.xlabel('Predicted label')
    plt.tight_layout()
    plt_buffer = io.BytesIO()
    plt.savefig(plt_buffer, format='png')
    plt_buffer.seek(0)
    plot_data = base64.b64encode(plt_buffer.getvalue()).decode('utf-8')
    plt.close()
    return plot_data


@app.route("/train", methods=["POST"])
def train_model():
    try:
        if request.method == "POST":
            train_data_dir = TRAIN_FOLDER
            valid_data_dir = TEST_FOLDER

            def save_uploaded_images(files):
                for class_name, class_files in files.items():
                    class_train_path = os.path.join(TRAIN_FOLDER, class_name)
                    class_test_path = os.path.join(TEST_FOLDER, class_name)

                    if not os.path.exists(class_train_path):
                        os.makedirs(class_train_path)
                    if not os.path.exists(class_test_path):
                        os.makedirs(class_test_path)

                    save_uploaded_images_to_folder(
                        class_files[: int(0.8 * len(class_files))], class_train_path
                    )
                    save_uploaded_images_to_folder(
                        class_files[int(0.8 * len(class_files)) :], class_test_path
                    )

            def save_uploaded_images_to_folder(files, folder_path):
                for file in files:
                    filename = os.path.join(folder_path, file.filename)
                    file.save(filename)

            print("files = ", request.files.to_dict())
            uploaded_files = request.files.to_dict(flat=False)

            save_uploaded_images(uploaded_files)

            epochs = int(request.form.get("epochs", 15))
            learning_rate = float(request.form.get("learning_rate", 0.001))
            batch_size = int(request.form.get("batch_size", 32))

            img_width, img_height = 224, 224

            train_datagen = ImageDataGenerator(
                rescale=1.0 / 255, shear_range=0.2, zoom_range=0.2, horizontal_flip=True
            )

            train_generator = train_datagen.flow_from_directory(
                train_data_dir,
                target_size=(img_width, img_height),
                batch_size=batch_size,
                class_mode="categorical",
            )

            valid_datagen = ImageDataGenerator(rescale=1.0 / 255)
            valid_generator = valid_datagen.flow_from_directory(
                valid_data_dir,
                target_size=(img_width, img_height),
                batch_size=batch_size,
                class_mode="categorical",
            )

            model = tf.keras.Sequential(
                [
                    hub.KerasLayer(
                        "https://tfhub.dev/google/tf2-preview/mobilenet_v2/feature_vector/4",
                        output_shape=[1280],
                        trainable=False,
                    ),
                    tf.keras.layers.Dropout(0.4),
                    tf.keras.layers.Dense(
                        train_generator.num_classes, activation="softmax"
                    ),
                ]
            )
            model.build([None, 224, 224, 3])

            model.summary()

            optimizer = tf.keras.optimizers.Adam(learning_rate=1e-3)

            model.compile(
                optimizer=optimizer,
                loss="categorical_crossentropy",
                metrics=["accuracy"],
            )

            steps_per_epoch = np.ceil(
                train_generator.samples / train_generator.batch_size
            )
            val_steps_per_epoch = np.ceil(
                valid_generator.samples / valid_generator.batch_size
            )

            hist = model.fit(
                train_generator,
                epochs=epochs,
                verbose=1,
                steps_per_epoch=steps_per_epoch,
                validation_data=valid_generator,
                validation_steps=val_steps_per_epoch,
            ).history

            y_true = valid_generator.classes
            y_pred = np.argmax(model.predict(valid_generator), axis=1)
            classes = list(train_generator.class_indices.keys())

            accuracy_plot_data = generate_accuracy_plot(history=hist)
            loss_plot_data = generate_loss_plot(history=hist)
            confusion_matrix_data = generate_confusion_matrix(y_true, y_pred, classes)

            unique_name = "model_" + str(uuid.uuid4()) + ".h5"
            model.save(unique_name)

        return jsonify({ 'message': "Model training completed.",
                        "id": unique_name,
                        "accuracy_plot": accuracy_plot_data, "loss_plot": loss_plot_data, 
                        "confusion_matrix": confusion_matrix_data})
    
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

@app.route("/export-model", methods=["POST", "GET"])
def export_model():
    try:
        unique_name = request.form.get("unique_name")
        print(unique_name)
        print("path", os.path.dirname(__file__))
        print(os.path.join(os.path.dirname(__file__), unique_name))
        model_path = os.path.abspath(
            os.path.join(os.path.dirname(__file__), unique_name)
        )

        if os.path.exists(model_path):
            return send_file(model_path, as_attachment=True)
        else:
            return jsonify({"error": "Model file not found"}), 404
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500
    
def load_trained_model(unique_name):
    model = tf.keras.models.load_model(unique_name, custom_objects={'KerasLayer': hub.KerasLayer})
    return model
    
@app.route("/predict", methods=["POST"])
def predict_image():
    try:
        if 'image' not in request.files:
            return jsonify({"error": "No image provided"}), 400

        unique_name = request.form.get("unique_name")
        image_file = request.files['image']

        image_stream = io.BytesIO(image_file.read())

        img = load_img(image_stream, target_size=(224, 224))
        img_array = img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)
        img_array /= 255.0

        model = load_trained_model(unique_name=unique_name)

        predictions = model.predict(img_array)

        class_names = sorted(os.listdir('dataset/train'))
        predicted_class_index = np.argmax(predictions) 
        predicted_class_name = class_names[predicted_class_index]
        
        return jsonify({"prediction": predicted_class_name})
    
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500


if __name__ == "__main__":
    app.run(debug=True)
