import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { closeSnackbar } from "actions/snackbar";
import { restoreDeletedReq } from "actions/req";
import { connect } from "react-redux";

const SnackbarWrapper = ({ snackbar, closeSnackbar, handleUndo }) => {
  if (!snackbar.open) return null;

  function handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    closeSnackbar();
  }

  if (snackbar.undoable) {
    return (
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={snackbar.open}
        autoHideDuration={8000}
        ContentProps={{
          "aria-describedby": "message-id",
        }}
        message={<span id="message-id">{snackbar.message}</span>}
        action={[
          <Button
            key="undo"
            color="secondary"
            size="small"
            onClick={handleUndo}
          >
            UNDO
          </Button>,
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            // className={classes.close}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    );
  }

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={snackbar.open}
      autoHideDuration={6000}
      ContentProps={{
        "aria-describedby": "message-id",
      }}
      message={<span id="message-id">{snackbar.message}</span>}
      action={
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          // className={classes.close}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      }
    />
  );
};

const mapDispatchToProps = dispatch => {
  return {
    closeSnackbar: () => dispatch(closeSnackbar()),
    handleUndo: () => dispatch(restoreDeletedReq()),
  };
};

const mapStateToProps = state => {
  const { snackbar } = state;
  return { snackbar };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SnackbarWrapper);
