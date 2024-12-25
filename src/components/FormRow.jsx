import PropTypes from "prop-types";
import Error from "./Error";

const FormRow = ({ children, label, error, isHidden = true }) => {
  // console.log(children.props);

  return (
    <div className={isHidden ? "form-row" : "hidden"}>
      {label && (
        <label className="form-row__label" htmlFor={children.props.id}>
          {label}
        </label>
      )}
      {children}
      {error && <Error>{error}</Error>}
    </div>
  );
};

// FormRow.prototype = {
//   label: PropTypes.string,
//   error: PropTypes.string,
// };

export default FormRow;
