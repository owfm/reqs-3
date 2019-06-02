import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { deleteReq, updateReq, fetchReqs } from "actions/req";
import { closeModal } from "actions/ui";
import emitSnackbar from "actions/snackbar";
import ReqPresentation from "./ReqPresentation";
import { getErrorMessage, getIsFetching } from "../../reducers";
import { getLessonByReqId, getReqById } from "selectors";

const Req = ({
  error,
  req,
  lesson,
  fetchReqs,
  deleteReq,
  updateReq,
  emitSnackbar,
  match,
  loading,
  closeModal,
  id,
}) => {
  const [requisition, setRequisition] = useState();

  // TODO: move the handling of currently-editing req to the redux store + action creator/thunks to clean up this component.

  useEffect(() => {
    if (!req) {
      (async id => {
        const response = await fetchReqs(id);
        setRequisition(response.data);
      })(match.params.id);
    }

    if (req) {
      setRequisition(req);
    }
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
    closeModal();
  };

  const toggleDone = async () => {
    try {
      await updateReq({ ...requisition, isDone: !requisition.isDone });
      setRequisition({ ...requisition, isDone: !requisition.isDone });
      emitSnackbar(
        `Req marked as ${!requisition.isDone ? "done!" : "still to do."}`
      );
      closeModal();
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
    closeModal();
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
      lesson={lesson}
      save={save}
      discard={discard}
      handleChange={handleChange}
    />
  );
};

function mapDispatchToProps(dispatch) {
  return {
    closeModal: () => dispatch(closeModal()),
    fetchReqs: id => dispatch(fetchReqs(id)),
    updateReq: req => dispatch(updateReq(req)),
    deleteReq: id => dispatch(deleteReq(id)),
    emitSnackbar: message => dispatch(emitSnackbar(message)),
  };
}

function mapStateToProps(state, ownProps) {
  const { id } = ownProps;
  return {
    lesson: getLessonByReqId(state, id),
    req: getReqById(state, id),
    fetching: getIsFetching(state, "reqs"),
    error: getErrorMessage(state, "reqs"),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Req);
