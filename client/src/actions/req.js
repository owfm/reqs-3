import * as actions from "actions/types";
import { handleErrors } from "actions/utils";
import axios from "axios";
import { defaultPostParams } from "lib/defaults";

const requestDeleteReq = id => {
  return {
    type: actions.DELETE_REQ_REQUEST,
    payload: id,
  };
};

const deleteReqFailure = error => {
  return {
    type: actions.DELETE_REQ_FAILURE,
    payload: error,
    error: true,
  };
};

const deleteReqsSuccess = id => {
  return {
    type: actions.DELETE_REQ_SUCCESS,
    payload: id,
  };
};

export const deleteReq = id => {
  return async dispatch => {
    dispatch(requestDeleteReq(id));
    return await fetch(`/reqs/${id}`, { method: "DELETE" })
      .then(handleErrors)
      .then(() => {
        dispatch(deleteReqsSuccess(id));
      })
      .catch(error => dispatch(deleteReqFailure(error)));
  };
};

const submitReqRequest = payload => {
  return {
    type: actions.SUBMIT_REQ_REQUEST,
    payload,
  };
};

const submitReqSuccess = payload => {
  return {
    type: actions.SUBMIT_REQ_SUCCESS,
    payload,
  };
};

const submitReqFailure = payload => {
  return {
    type: actions.SUBMIT_REQ_FAILURE,
    payload,
  };
};
export function submitReq(requisition) {
  return async dispatch => {
    dispatch(submitReqRequest(requisition));

    return await fetch("/reqs", {
      ...defaultPostParams,
      body: JSON.stringify(requisition),
    })
      .then(handleErrors)
      .then(response => response.json())
      .then(json => {
        dispatch(submitReqSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(submitReqFailure(new Error(error.message))));
  };
}

const requestUpdateReq = payload => {
  return {
    type: actions.UPDATE_REQ_REQUEST,
    payload,
  };
};

const updateReqSuccess = payload => {
  return {
    type: actions.UPDATE_REQ_SUCCESS,
    payload,
  };
};

const updateReqFailure = payload => {
  return {
    type: actions.UPDATE_REQ_FAILURE,
    payload,
  };
};

export function updateReq(requisition) {
  return dispatch => {
    dispatch(requestUpdateReq(requisition));
    return fetch(`/reqs/${requisition._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requisition),
    })
      .then(handleErrors)
      .then(response => response.json())
      .then(json => {
        dispatch(updateReqSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(updateReqFailure(error)));
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
        dispatch(fetchReqSuccess(json));
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
      const submitted = await dispatch(submitReq(deleted));
      if (submitted) {
        dispatch(restoreDeletedReqSuccess());
      }
    } else {
      dispatch(restoreDeletedReqFailure());
    }
  };
}
