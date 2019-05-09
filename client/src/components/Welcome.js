import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Welcome = ({ auth }) => {
  if (auth.authenticated)
    return (
      <>
        <div>Hi {auth.user.firstName}!</div>
        <Link to="signout">Logout</Link>
      </>
    );

  return (
    <div>
      Welcome! Please <Link to="signup">Signup</Link> or{" "}
      <Link to="signin">Login</Link>!
    </div>
  );
};

const mapStateToProps = ({ auth }) => {
  return {
    auth,
  };
};
export default connect(mapStateToProps)(Welcome);
