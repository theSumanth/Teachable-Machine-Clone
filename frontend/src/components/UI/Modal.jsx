const Modal = ({ children }) => {
  return (
    <dialog>
      {children}
      <form></form>
    </dialog>
  );
};

export default Modal;
