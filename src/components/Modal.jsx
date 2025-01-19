import { createPortal } from "react-dom";
import "../styles/_Modal.scss";
import { useEffect, useRef } from "react";

const Modal = ({ children, onCloseModal }) => {
  const ref = useRef();

  useEffect(() => {
    const handleClickOutSide = (e) => {
      if (ref.current && !ref.current.contains(e.target) && onCloseModal) {
        onCloseModal();
      }
    };

    document.addEventListener("click", handleClickOutSide, true);
    return removeEventListener("click", handleClickOutSide, true);
  }, [onCloseModal]);
  useEffect(() => {
    const handKeyPress = (e) => {
      if (e.key === "q") {
        onCloseModal();
      }
    };

    document.addEventListener("keypress", handKeyPress, true);

    return removeEventListener("keypress", handKeyPress, true);
  }, [onCloseModal]);

  return createPortal(
    <div className="modal">
      <div className="modal__content" ref={ref}>
        {children}
      </div>
      <div className="modal__backdrop"></div>
    </div>,
    document.body
  );
};

export default Modal;
