import React from "react";
import { Button } from "semantic-ui-react";
import { reduxForm } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import * as actions from "actions/auth";

const SigninButton = ({ formProps, handleSubmit, signin, history }) => {
  const onClick = formProps => {
    signin(formProps, () => {
      history.push("/");
    });
  };

  return (
    <Button
      onClick={handleSubmit(onClick)}
      icon="sign-in"
      labelPosition="right"
      content="Sign in"
    />
  );
};

export default compose(
  connect(
    null,
    actions
  ),
  reduxForm({ form: "signin" })
)(SigninButton);
