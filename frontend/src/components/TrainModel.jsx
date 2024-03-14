import { useContext, useState, useEffect } from "react";

import Button from "./UI/Button";
import Input from "./UI/Input";
import Loader from "../widgets/Loader";
import useHttp from "../hooks/useHttp";
import { ClassContext } from "../store/ClassContextProvider";
import { ModelContext } from "../store/ModelContextProvder";
import { ChevronDown, ChevronUp } from "lucide-react";

const initialModalData = {};

const TrainModel = () => {
  const [isAdvanceClicked, setIsAdvanceClicked] = useState(false);
  const [advanceActions, setAdvanceActions] = useState({
    epochs: 15,
    batchSize: 32,
    learningRate: 0.001,
  });

  const {
    isLoading,
    fetchedData: modelData,
    fetchModel: fetchModelTrain,
  } = useHttp("http://localhost:5000/train", initialModalData);

  const classCtx = useContext(ClassContext);
  const modelCtx = useContext(ModelContext);
  const { setModelData } = modelCtx;

  const handleTrainModel = async () => {
    const formData = new FormData();
    classCtx.classes.forEach((classItem) => {
      classItem.images.forEach((image) => {
        formData.append(classItem.name, image.file);
      });
    });

    formData.append("epochs", advanceActions.epochs);
    formData.append("learning_rate", advanceActions.learningRate);
    formData.append("batch_size", advanceActions.batchSize);

    fetchModelTrain(formData);
  };

  useEffect(() => {
    if (modelData) {
      console.log(modelData);
      setModelData(modelData);
    }
  }, [modelData, setModelData]);

  function handleClick() {
    setIsAdvanceClicked((prev) => !prev);
  }

  function handleOnChange(identifier, value) {
    setAdvanceActions((prevState) => ({
      ...prevState,
      [identifier]: value,
    }));
  }

  return (
    <section className="h-screen flex items-center sticky top-0">
      {isLoading && <Loader />}
      <div className="flex flex-col gap-2 bg-white w-[250px] my rounded-md shadow-md">
        <h1 className="font-medium mx-4 py-2 mt-2">Training</h1>
        <Button onClick={handleTrainModel}>
          {isLoading ? "Training..." : "Train Model"}
        </Button>
        <hr />
        <div
          className="flex justify-between text-gray-700 hover:bg-blue-100 hover:text-blue-600 py-2 px-4 cursor-pointer"
          onClick={handleClick}
        >
          <button className="text-sm">Advanced</button>
          {isAdvanceClicked ? <ChevronUp /> : <ChevronDown />}
        </div>
        <hr />
        {isAdvanceClicked && (
          <div className="flex flex-col mx-4">
            <Input
              label={"Epochs:"}
              type={"number"}
              defaultValue={advanceActions.epochs}
              onChange={(event) => handleOnChange("epochs", event.target.value)}
            />
            <hr />
            <Input
              label={"Batch size:"}
              type={"number"}
              defaultValue={advanceActions.batchSize}
              onChange={(event) =>
                handleOnChange("batchSize", event.target.value)
              }
            />
            <hr />
            <Input
              label={"Batch size:"}
              type={"number"}
              defaultValue={advanceActions.learningRate}
              onChange={(event) =>
                handleOnChange("learningRate", event.target.value)
              }
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default TrainModel;
