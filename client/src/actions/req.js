import * as actions from "actions/types";
import { handleErrors } from "actions/utils";
import emitSnackbarWithTimeout from "./snackbar";
import * as schemas from "schemas";
import { normalize } from "normalizr";

const requestDeleteReq = id => {
  return {
    type: "DELETE_REQS_REQUEST",
    payload: id,
  };
};

const deleteReqFailure = error => {
  return {
    type: "DELETE_REQS_FAILURE",
    payload: error,
    error: true,
  };
};

const deleteReqsSuccess = id => {
  return {
    type: "DELETE_REQS_SUCCESS",
    payload: id,
  };
};

export const deleteReq = id => {
  return async dispatch => {
    dispatch(requestDeleteReq(id));
    return await fetch(`/reqs/${id}`, { method: "DELETE" })
      .then(handleErrors)
      .then(() => {
        const undoable = true;
        dispatch(deleteReqsSuccess(id));
        dispatch(emitSnackbarWithTimeout("Requisition deleted", undoable));
      })
      .catch(error => dispatch(deleteReqFailure(error)));
  };
};

const createReqRequest = payload => {
  return {
    type: "CREATE_REQS_REQUEST",
    payload,
  };
};

const createReqSuccess = payload => {
  return {
    type: "CREATE_REQS_SUCCESS",
    payload,
  };
};

const createReqFailure = payload => {
  return {
    type: "CREATE_REQS_FAILURE",
    payload,
  };
};

export function createSingleReq(requisition) {
  return dispatch => {
    dispatch(createReqRequest());
    return fetch("/reqs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requisition),
    })
      .then(handleErrors)
      .then(response => response.json())
      .then(json => {
        dispatch(createReqSuccess(normalize(json.data, schemas.reqs)));
        return json.data;
      })
      .catch(error => {
        dispatch(createReqFailure(new Error("Could not create new req.")));
        throw error;
      });
  };
}

const updateReqsRequest = payload => {
  return {
    type: "UPDATE_REQS_REQUEST",
    payload,
  };
};

const updateReqsSuccess = payload => {
  return {
    type: "UPDATE_REQS_SUCCESS",
    payload,
  };
};

const updateReqsFailure = payload => {
  return {
    type: "UPDATE_REQS_FAILURE",
    payload,
  };
};

export function updateReq(requisition) {
  return dispatch => {
    dispatch(updateReqsRequest(requisition._id));
    return fetch(`/reqs/${requisition._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requisition),
    })
      .then(handleErrors)
      .then(response => {
        return response.json();
      })
      .then(json => {
        dispatch(updateReqsSuccess(normalize(json.data, schemas.reqs)));
        return json.data;
      })
      .catch(error => dispatch(updateReqsFailure(error)));
  };
}

// payload == id
export const fetchReqRequest = payload => {
  return {
    type: actions.FETCH_REQ_REQUEST,
    payload,
  };
};

// payload == req object
export const fetchReqSuccess = payload => {
  return {
    type: actions.FETCH_REQ_SUCCESS,
    payload,
  };
};

// payload = error object
export const fetchReqFailure = payload => {
  return {
    type: actions.FETCH_REQ_FAILURE,
    payload,
  };
};

export function fetchSingleReq(id) {
  return dispatch => {
    dispatch(fetchReqRequest);
    return fetch(`/reqs/${id}`)
      .then(handleErrors)
      .then(response => response.json())
      .then(json => {
        dispatch(fetchReqSuccess(normalize(json.data, schemas.reqs)));
        return json;
      })
      .catch(error => dispatch(fetchReqFailure(error)));
  };
}

const restoreDeletedReqRequest = () => {
  return {
    type: actions.RESTORE_DELETED_REQ_REQUEST,
  };
};

const restoreDeletedReqSuccess = () => {
  return {
    type: actions.RESTORE_DELETED_REQ_SUCCESS,
  };
};

const restoreDeletedReqFailure = () => {
  return {
    type: actions.RESTORE_DELETED_REQ_FAILURE,
  };
};

// get deleted item from store and resubmit it

export function restoreDeletedReq() {
  return async (dispatch, getState) => {
    dispatch(restoreDeletedReqRequest);
    const { deleted } = getState().reqs;
    if (deleted) {
      const response = await dispatch(deleted);
      if (response.ok) {
        dispatch(restoreDeletedReqSuccess());
        dispatch(emitSnackbarWithTimeout("Requisition restored."));
      }
    } else {
      dispatch(restoreDeletedReqFailure());
    }
  };
}
