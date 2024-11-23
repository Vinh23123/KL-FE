import PropTypes from "prop-types";
import Error from "./Error";

const FormRow = ({ children, label, error }) => {
  // console.log(children.props);

  return (
    <div className="form-row">
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
