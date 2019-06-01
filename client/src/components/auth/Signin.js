import React from "react";
import { Input, Form } from "semantic-ui-react";
import { reduxForm, Field } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import * as actions from "actions/auth";

const Signin = ({ signin, history, errorMessage }) => {
  return (
    <>
      <Form>
        <Form.Field>
          <label>Email</label>
          <Field
            name="email"
            type="text"
            component={Input}
            autoComplete="none"
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <Field
            name="password"
            type="password"
            component={Input}
            autoComplete="none"
          />
        </Form.Field>
      </Form>
      <div>{errorMessage}</div>
    </>
  );
};

function mapStateToProps(state) {
  return { errorMessage: state.auth.errorMessage };
}

export default compose(
  connect(
    mapStateToProps,
    actions
  ),
  reduxForm({ form: "signin" })
)(Signin);
