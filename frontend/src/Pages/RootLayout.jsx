import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";
import ModelMetrics from "../components/ModelMetrics";

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <ModelMetrics />
      <Outlet />
    </>
  );
};

export default RootLayout;
