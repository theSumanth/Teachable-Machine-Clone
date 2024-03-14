import { useContext, useRef } from "react";

import { BarChart3, Download, FolderDown } from "lucide-react";
import Button from "./UI/Button";
import { ModelContext } from "../store/ModelContextProvder";
import useHttp from "../hooks/useHttp";

const initialPredictData = "";

const PreviewModel = () => {
  const inputRef = useRef();

  const {
    fetchedData: predictedData,
    isLoading: isPredicting,
    fetchModel: fetchPrediction,
  } = useHttp("http://localhost:5000/predict", initialPredictData);

  const modelCtx = useContext(ModelContext);
  const { modelData, setShowMetrics } = modelCtx;
  const { isTrained, id, imageToPred } = modelData;

  function handleClick() {
    inputRef.current.click();
  }

  function handleImageChange(file) {
    modelCtx.setPredImage({ url: URL.createObjectURL(file), file: file });

    const formData = new FormData();

    console.log(modelCtx.modelData);
    formData.append("unique_name", id);
    formData.append("image", file);

    fetchPrediction(formData);
  }

  let modelActions = (
    <div className="flex flex-col">
      <Button onClick={setShowMetrics}>
        <BarChart3 className="inline-block" /> Under the hood
      </Button>
      <div
        onClick={handleClick}
        className="bg-blue-100 hover:bg-blue-200 text-blue-600 h-24 m-4 flex flex-col gap-1 cursor-pointer justify-center items-center rounded"
      >
        <FolderDown />
        <span className="text-xs">Choose Images from your files</span>
      </div>
      <input
        ref={inputRef}
        type="file"
        id="input-image"
        onChange={(event) => handleImageChange(event.target.files[0])}
        className="hidden"
      />

      {imageToPred ? (
        <div className="bg-blue-100 text-blue-600 aspect-square m-4 flex object-cover justify-center items-center rounded">
          <img src={imageToPred.url} alt="image used for prediction" />
        </div>
      ) : (
        <div className="bg-blue-100 text-blue-600 aspect-square m-4 flex object-cover justify-center items-center rounded">
          <span className="text-xs">No Image selected</span>
        </div>
      )}

      <span className="m-4 font-medium text-sm">
        Output:{" "}
        <span className="text-green-800">
          {isPredicting ? "Predicting..." : predictedData.prediction}
        </span>
      </span>
    </div>
  );

  if (!isTrained) {
    modelActions = (
      <p className="text-sm m-4">Please train the model before exporting.</p>
    );
  }

  return (
    <section className="h-screen flex items-center sticky top-0">
      <div className="flex flex-col gap-2 bg-white w-[330px] my rounded-md shadow-md">
        <div className="flex justify-evenly my-4">
          <h1 className="font-medium py-2 mx-4">Preview Model</h1>
          <Button isExport disabled={isTrained}>
            <Download className="inline-block" size={18} /> Export Model
          </Button>
        </div>
        <hr />
        {modelActions}
      </div>
    </section>
  );
};

export default PreviewModel;
