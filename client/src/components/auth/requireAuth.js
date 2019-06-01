import React, { Component } from "react";
import { connect } from "react-redux";
import emitSnackbar from "actions/snackbar";

export default ChildComponent => {
  class ComposedComponent extends Component {
    // Our component just got rendered
    componentDidMount() {
      this.shouldNavigateAway();
    }

    // Our component just got updated
    componentDidUpdate() {
      this.shouldNavigateAway();
    }

    shouldNavigateAway() {
      if (!this.props.auth) {
        this.props.history.push("/");
      }
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
      emitSnackbar: message => dispatch(emitSnackbar(message)),
    };
  };

  function mapStateToProps(state) {
    return { auth: state.auth.authenticated };
  }

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(ComposedComponent);
};
