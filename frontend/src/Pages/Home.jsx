import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex h-screen flex-col justify-center items-start">
        <h1 className="text-5xl font-bold text-blue-600 mb-6">
          Teachable Machine
        </h1>
        <h1 className="text-2xl font-bold mb-2">
          Train a model to classify your images using{" "}
          <span className="text-blue-500">Transfer Learning</span> which is
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
      <div></div>
    </div>
  );
};

export default HomePage;
