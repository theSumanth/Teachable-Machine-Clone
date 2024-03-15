import { useState } from "react";

import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs"; // Import VS Code style
import { python } from "react-syntax-highlighter/dist/esm/languages/hljs"; // Import Python syntax style

SyntaxHighlighter.registerLanguage("python", python);

const pythonCode = `import numpy as np
import tensorflow as tf
import tensorflow_hub as hub
import os
from tensorflow.keras.preprocessing.image import img_to_array, load_img

model = tf.keras.models.load_model(
  ("your model path..."),
  custom_objects={'KerasLayer':hub.KerasLayer}
)

img_path = ' ' #add your image path here
img = load_img(img_path, target_size=(224, 224))
img_array = img_to_array(img)
img_array = np.expand_dims(img_array, axis=0)
img_array /= 255.0

predictions = model.predict(img_array)

class_names = [] #add your class names
predicted_class_index = np.argmax(predictions) 
predicted_class_name = class_names[predicted_class_index]

print(f"The model predicts: {predicted_class_name}")`;

const PythonCodeDisplay = () => {
  const [isCopy, setIsCopy] = useState(false);

  const copyCodeToClipboard = () => {
    navigator.clipboard
      .writeText(pythonCode)
      .then(() => console.log("copied"))
      .catch((err) => console.error("Failed to copy code: ", err));
    setIsCopy(true);
  };

  return (
    <div className="flex flex-col gap-3">
      <SyntaxHighlighter
        language="python"
        style={{
          ...atomOneDark,
          fontFamily: "Consolas, Menlo, Courier, monospace",
        }}
        showLineNumbers
      >
        {pythonCode}
      </SyntaxHighlighter>
      <button
        onClick={copyCodeToClipboard}
        className="bg-gray-200 py-2 w-36 rounded-md text-stone-500 hover:bg-gray-300 text-xs"
      >
        {isCopy ? "Copied" : "Copy to ClipBoard"}
      </button>
    </div>
  );
};

export default PythonCodeDisplay;
