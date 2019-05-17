import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { deleteReq, updateReq, fetchSingleReq } from "actions/req";
import emitSnackbar from "actions/snackbar";
import ReqPresentation from "./ReqPresentation";

const Req = ({
  error,
  fetchReq,
  deleteReq,
  updateReq,
  emitSnackbar,
  match,
  loading,
  history,
}) => {
  const [requisition, setRequisition] = useState();

  useEffect(() => {
    (async id => {
      const response = await fetchReq(id);
      setRequisition(response.data);
    })(match.params.id);
  }, []);

  const handleChange = function(e) {
    setRequisition({ ...requisition, [e.target.name]: e.target.value });
  };

  const save = async function(draft) {
    try {
      await updateReq({ ...requisition, draft: draft === "draft" });
      emitSnackbar(
        `Requisition ${draft === "draft" ? " saved as draft." : "submitted!"}`
      );
    } catch (error) {
      emitSnackbar(`Something went wrong: ${error.message}`);
    }
    history.push("/lessons");
  };

  const toggleDone = async () => {
    try {
      await updateReq({ ...requisition, isDone: !requisition.isDone });
      setRequisition({ ...requisition, isDone: !requisition.isDone });
      emitSnackbar(
        `Req marked as ${!requisition.isDone ? "done!" : "still to do."}`
      );
    } catch (error) {
      emitSnackbar(`Something went wrong: ${error.message}`);
    }
  };

  const discard = async function(id) {
    try {
      await deleteReq(id);
      emitSnackbar("Requisition deleted.");
    } catch (error) {
      emitSnackbar(error.message);
    }
    history.push("/lessons");
  };

  if (!requisition || loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    emitSnackbar(error.message);
  }

  return (
    <ReqPresentation
      toggleDone={toggleDone}
      requisition={requisition}
      save={save}
      discard={discard}
      handleChange={handleChange}
    />
  );
};

function mapDispatchToProps(dispatch) {
  return {
    fetchReq: id => dispatch(fetchSingleReq(id)),
    updateReq: req => dispatch(updateReq(req)),
    deleteReq: id => dispatch(deleteReq(id)),
    emitSnackbar: message => dispatch(emitSnackbar(message)),
  };
}

function mapStateToProps(state) {
  const { loading, error } = state.reqs;

  return {
    loading,
    error,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Req);
