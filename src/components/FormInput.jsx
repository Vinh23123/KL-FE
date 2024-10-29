import PropTypes from "prop-types";
import Error from "./Error";

const FormInput = ({ children, label, error }) => {
  // console.log(children.props.id);

  return (
    <div>
      {label && <label htmlFor={children.props.id}>{label}</label>}
      {children}
      {error && <Error>{error} </Error>}
    </div>
  );
};

FormInput.prototype = {
  label: PropTypes.string,
  error: PropTypes.string,
};

export default FormInput;
