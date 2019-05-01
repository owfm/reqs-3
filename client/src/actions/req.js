import * as actions from "actions/types";
import debounce from "lodash.debounce";

import { defaultPostParams } from "lib/defaults";

const requestDeleteReq = id => {
  return {
    type: actions.REQUEST_DELETE_REQ,
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

export function deleteReq(id) {
  return dispatch => {
    dispatch(requestDeleteReq(id));

    return fetch(`/reqs/${id}`, { method: "DELETE" }).then(
      response => {
        dispatch(deleteReqsSuccess(id));
      },
      error => dispatch(deleteReqFailure(new Error(error.message)))
    );
  };
}

export function submitReq(requisition) {
  return dispatch => {
    dispatch(requestSubmitReq(requisition));

    return fetch("/reqs", {
      ...defaultPostParams,
      body: JSON.stringify(requisition),
    })
      .then(
        response => response.json(),
        error => dispatch(submitReqFailure(new Error(error.message)))
      )
      .then(json => dispatch(submitReqSuccess(json.data)));
  };
}

const requestSubmitReq = payload => {
  return {
    type: actions.REQUEST_SUBMIT_REQ,
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

export function updateReq(requisition) {
  return dispatch => {
    dispatch(requestUpdateReq(requisition));
    return fetch(`/reqs/${requisition._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requisition),
    })
      .then(
        response => response.json(),
        error => dispatch(updateReqFailure(new Error(error.message)))
      )
      .then(json => dispatch(updateReqSuccess(json.data)));
  };
}

const requestUpdateReq = payload => {
  return {
    type: actions.REQUEST_UPDATE_REQ,
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

export const debouncedUpdateReq = debounce(updateReq, 500, { trailing: true });
