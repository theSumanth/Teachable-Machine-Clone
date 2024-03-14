import Classes from "../components/Classes/Classes";
import PreviewModel from "../components/PreviewModel";
import TrainModel from "../components/TrainModel";

const CreateModel = () => {
  return (
    <main className="flex gap-12 justify-center">
      <Classes />
      <TrainModel />
      <PreviewModel />
    </main>
  );
};

export default CreateModel;
