import "../styles/Modal.scss";
import { useEffect, useRef } from "react";

const Modal = ({ children, onCloseModal }) => {
  const ref = useRef();
  console.log(ref);

  useEffect(
    function () {
      const handleClickOutSide = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
          console.log("outside", e.target);
          onCloseModal();
        }
      };

      const handKeyPress = (e) => {
        console.log(e);
        if (e.key === "Escape") {
          onCloseModal();
        }
      };
      document.addEventListener("click", handleClickOutSide, true);
      document.addEventListener("keypress", handKeyPress, true);
      return removeEventListener("click", handleClickOutSide, true);
    },
    [onCloseModal]
  );

  return (
    <div className="modal">
      <div className="modal__content" ref={ref}>
        {children}
      </div>
      <div className="modal__backdrop"></div>
    </div>
  );
};

export default Modal;
