import { login } from "actions/auth";
import { connect } from "react-redux";
import { closeModal } from "actions/ui";
import LoginPresentation from "./LoginPresentation";

import { reduxForm } from "redux-form";

const validate = values => {
  const errors = {};
  const requiredFields = ["email"];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = "Invalid email address";
  }
  return errors;
};

const mapDispatchToProps = dispatch => {
  return {
    login: formProps => dispatch(login(formProps)),
    closeModal: () => dispatch(closeModal()),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(
  reduxForm({
    form: "LoginForm", // a unique identifier for this form
    validate,
    // asyncValidate
  })(LoginPresentation)
);
