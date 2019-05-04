import React from "react";
import { connect } from "react-redux";
import TopBarProgress from "react-topbar-progress-indicator";

const LoadingBar = ({ progressBarOpen }) => {
  if (progressBarOpen) {
    return <TopBarProgress />;
  } else {
    return null;
  }
};

function mapStateToProps(state) {
  const { progressBarOpen } = state.ui;

  return {
    progressBarOpen,
  };
}

export default connect(mapStateToProps)(LoadingBar);
