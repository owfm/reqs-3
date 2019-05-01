import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import { connect } from "react-redux";

const SnackbarWrapper = props => {
  if (!props.snackbar.open) return null;

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left"
      }}
      open={props.snackbar.open}
      autoHideDuration={6000}
      ContentProps={{
        "aria-describedby": "message-id"
      }}
      message={<span id="message-id">{props.snackbar.message}</span>}
    />
  );
};

const mapStateToProps = state => {
  const { snackbar } = state;
  return { snackbar };
};

export default connect(mapStateToProps)(SnackbarWrapper);
