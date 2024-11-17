import PropTypes from "prop-types";
import Error from "./Error";

import "../styles/_FormInput.scss";

const FormInput = () => {
  // console.log(children.props.id);

  return;
};

FormInput.prototype = {
  label: PropTypes.string,
  error: PropTypes.string,
};

export default FormInput;
