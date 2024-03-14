import { createContext, useCallback, useState } from "react";

export const ModelContext = createContext({
  modelData: {
    id: "",
    accuracyPlotData: "",
    lossPlotData: "",
    confusionMatrixData: "",
    isTrained: false,
    imageToPred: {},
  },
  setModelData: () => {},
  setPredImage: () => {},
});

const ModelContextProvder = ({ children }) => {
  const [fetchedData, setFetchedData] = useState({
    id: "",
    accuracyPlotData: "",
    lossPlotData: "",
    confusionMatrixData: "",
    isTrained: false,
  });

  const handleSetFetchedData = useCallback(function handleSetFetchedData(data) {
    setFetchedData((prevState) => ({
      ...prevState,
      id: data.id,
      accuracyPlotData: data.accuracy_plot,
      lossPlotData: data.loss_plot,
      confusionMatrixData: data.confusion_matrix,
      isTrained: true,
    }));
  }, []);

  function handleSetImage(image) {
    setFetchedData((prevState) => ({
      ...prevState,
      imageToPred: image,
    }));
  }

  const modelCtx = {
    modelData: fetchedData,
    setModelData: handleSetFetchedData,
    setPredImage: handleSetImage,
  };

  return (
    <ModelContext.Provider value={modelCtx}>{children}</ModelContext.Provider>
  );
};

export default ModelContextProvder;
