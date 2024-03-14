import { createContext, useCallback, useState } from "react";

export const ModelContext = createContext({
  modelData: {
    id: "",
    accuracyPlotData: "",
    lossPlotData: "",
    confusionMatrixData: "",
    isTrained: false,
    showMetrics: false,
    imageToPred: {},
  },
  setModelData: () => {},
  setPredImage: () => {},
  setShowMetrics: () => {},
});

const ModelContextProvder = ({ children }) => {
  const [fetchedData, setFetchedData] = useState({
    id: "",
    accuracyPlotData: "",
    lossPlotData: "",
    confusionMatrixData: "",
    isTrained: false,
    showMetrics: false,
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

  function handleShowMetrics() {
    console.log("show metrics");
    setFetchedData((prevState) => ({
      ...prevState,
      showMetrics: !prevState.showMetrics,
    }));
  }

  const modelCtx = {
    modelData: fetchedData,
    setModelData: handleSetFetchedData,
    setPredImage: handleSetImage,
    setShowMetrics: handleShowMetrics,
  };

  return (
    <ModelContext.Provider value={modelCtx}>{children}</ModelContext.Provider>
  );
};

export default ModelContextProvder;
