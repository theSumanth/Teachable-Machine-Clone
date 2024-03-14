import { useContext } from "react";
import { ModelContext } from "../store/ModelContextProvder";

import { BarChart3, X } from "lucide-react";

function Metric({ title, altText, data }) {
  return (
    <>
      <section className="p-6 text-sm text-blue-600">
        <span>{title}</span>
        <div className="text-blue-600 aspect-square my-2 flex object-cover justify-center items-center rounded">
          {data && <img src={`data:image/png;base64,${data}`} alt={altText} />}
        </div>
      </section>
      <hr className="h-[0.1rem]" />
    </>
  );
}

const ModelMetrics = () => {
  const modelCtx = useContext(ModelContext);
  const { modelData, setShowMetrics } = modelCtx;
  const { showMetrics } = modelData;

  let cssClass = "";

  if (showMetrics) {
    cssClass += "flex justify-end";
  } else {
    cssClass += "hidden";
  }

  let header = (
    <>
      <header className="flex p-6 justify-between">
        <span className="flex font-semibold gap-2">
          Under The Hood <BarChart3 className="inline" />
        </span>
        <X className="cursor-pointer" onClick={setShowMetrics} />
      </header>
      <hr className="h-[0.1rem]" />
      <p className="text-sm font-medium px-6 pt-6">
        Here are a few graphs that can help you understand how well your model
        is working.
      </p>
      <p className="text-sm px-6 pt-2 pb-6">
        Graphs below show the confusion matrix, accuracy plot and loss plot.
      </p>
      <hr />
    </>
  );

  return (
    <div className={cssClass}>
      <aside className="h-screen shadow-2xl z-10 w-[410px] fixed bg-white overflow-y-scroll">
        {header}
        <Metric
          title={"Confusion Matrix"}
          altText={"Confusion Matrix"}
          data={modelData.confusionMatrixData}
        />
        <Metric
          title={"Accuracy per epoch"}
          altText={"Accuracy Plot"}
          data={modelData.accuracyPlotData}
        />
        <Metric
          title={"Loss per epoch"}
          altText={"Loss Plot"}
          data={modelData.lossPlotData}
        />
      </aside>
    </div>
  );
};

export default ModelMetrics;
