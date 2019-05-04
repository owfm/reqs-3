import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import emitSnackbar from "actions/snackbar";
import axios from "axios";

const style = {
  margin: 0,
  top: "auto",
  right: 20,
  bottom: 20,
  left: "auto",
  position: "fixed",
};

function FloatingActionButtons() {
  const [redirect, setRedirect] = useState({ go: false, url: null });

  const createNewReqAndRedirect = async () => {
    try {
      const response = await axios.post(`/reqs/`, {});
      emitSnackbar(`New req created with id ${response.data.data._id}`);
      setRedirect({ go: true, url: `/reqs/${response.data.data._id}` });
    } catch (error) {
      emitSnackbar(`Something went wrong! ${error.message}`);
    }
  };

  if (redirect.go) {
    return <Redirect to={redirect.url} />;
  }

  return (
    <>
      <Fab
        onClick={createNewReqAndRedirect}
        style={style}
        color="primary"
        aria-label="Add"
      >
        <AddIcon />
      </Fab>
    </>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    emitSnackbar: message => dispatch(emitSnackbar(message)),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(FloatingActionButtons);
