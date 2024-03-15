import { Link } from "react-router-dom";

import classesImg from "/classes.png";
import trainImg from "/train.png";
import exportImg from "/export.png";

const steps = [
  {
    img: classesImg,
    title: "1 Gather",
    description:
      "Gather and group your examples into classes, or categories, that you want the model to learn.",
  },
  {
    img: trainImg,
    title: "2 Train",
    description:
      "Train your model, then instantly test it out to see whether it can correctly classify new examples.",
  },
  {
    img: exportImg,
    title: "3 Export",
    description:
      "Export your model for your projects: sites, apps, and more. You can download your model or host it online.",
  },
];

const HomePage = () => {
  return (
    <div className="flex items-center justify-center bg-white flex-col">
      <div className="flex h-screen flex-col justify-center items-start">
        <h1 className="text-5xl font-bold text-blue-600 mb-6">
          Teachable Machine
        </h1>
        <h1 className="text-2xl font-bold mb-2">
          Train a model to classify your images using
          <span className="text-blue-500"> Transfer Learning</span> which is
          built in this app.
        </h1>
        <h3 className="font-medium">
          A fast, easy way to create machine learning models for your sites,
          apps, and more - no expertise or coding required.
        </h3>
        <Link to={"/create-model"} className="mt-5">
          <button className="px-12 py-3 bg-blue-600 text-white hover:bg-blue-500 rounded-md">
            Get Started
          </button>
        </Link>
      </div>
      <div className="flex flex-col items-center mb-28">
        <h1 className="text-4xl font-bold mb-6">How do I use it?</h1>
        <ol className="flex gap-8">
          {steps.map((step) => (
            <li
              key={step.title}
              className="flex flex-col gap-2 w-96 object-cover p-8"
            >
              <img src={step.img} alt={step.description} className="my-8" />
              <h1 className="text-xl font-medium mb-3">{step.title}</h1>
              <p className="font-medium">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default HomePage;
