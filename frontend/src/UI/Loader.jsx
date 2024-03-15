import { createPortal } from "react-dom";

import "./loader.css";

const Loader = () => {
  return createPortal(
    <div className="centered-loading-overlay">
      <div className="boxes">
        <div className="box">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="box">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="box">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="box">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div className="train-message">Training... Please stand by</div>
    </div>,
    document.getElementById("loader")
  );
};

export default Loader;
