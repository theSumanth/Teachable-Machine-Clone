import { useContext } from "react";

import useHttp from "../hooks/useHttp";

import { Download } from "lucide-react";
import Button from "../UI/Button";
import PythonCodeDisplay from "../UI/PythonCodeDisplay";
import { ModelContext } from "../store/ModelContextProvder";

const ExportModel = ({ onEscapeModal }) => {
  const { fetchModel } = useHttp(`http://localhost:5000/export-model`);

  const { modelData } = useContext(ModelContext);

  async function handleDownloadModel() {
    const formData = new FormData();
    formData.append("unique_name", modelData.id);

    const response = await fetchModel(formData, { responseType: "blob" });

    const blobUrl = window.URL.createObjectURL(new Blob([response.data]));

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = `exported_model.h5`;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
  }

  return (
    <main className="h-[700px] w-[800px]">
      <div className="flex justify-center">
        <Button isExport type="button" onClick={handleDownloadModel}>
          <Download className="inline-block" size={18} /> Download Model
        </Button>
        <Button type="submit" onClick={onEscapeModal}>
          Cancel
        </Button>
      </div>
      <div className="flex flex-col m-4">
        <h3 className="font-medium">
          Snippet to use the downloaded model in your projects.
        </h3>
        <div className="text-sm font-mono p-2">
          <PythonCodeDisplay />
        </div>
      </div>
    </main>
  );
};

export default ExportModel;
