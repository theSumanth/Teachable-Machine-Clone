import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children, open, onEscapeModal }) => {
  const dialogRef = useRef();

  useEffect(() => {
    console.log(open);
    const modal = dialogRef.current;
    if (open) {
      modal.showModal();
    }

    return () => {
      console.log("clean up", open);
      modal.close();
    };
  }, [open]);

  return createPortal(
    <dialog
      ref={dialogRef}
      className="rounded p-6 shadow-lg"
      onClose={onEscapeModal}
    >
      {children}
    </dialog>,
    document.getElementById("modal")
  );
};

export default Modal;
