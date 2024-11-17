import "../styles/_Modal.scss";
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

      document.addEventListener("click", handleClickOutSide, true);
      return removeEventListener("click", handleClickOutSide, true);
    },
    [onCloseModal]
  );
  useEffect(() => {
    const handKeyPress = (e) => {
      console.log(e);
      if (e.key === "q") {
        onCloseModal();
      }
    };

    document.addEventListener("keypress", handKeyPress, true);

    return removeEventListener("keypress", handKeyPress, true);
  }, [onCloseModal]);

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
