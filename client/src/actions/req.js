import * as actions from "actions/types";
import { handleErrors, getAuthToken } from "actions/utils";
import emitSnackbarWithTimeout from "./snackbar";
import * as schemas from "schemas";
import { normalize } from "normalizr";
import {
  getDatesOfCurrentIsoWeek,
  getWeekdayIndexOfNamedWeekday,
} from "reducers/ui";
import { openModal } from "actions/ui";
import emitSnackbar from "actions/snackbar";

import { OPEN_REQUISITION } from "actions/modalTypes";

const requestDeleteReq = id => {
  return {
    type: actions.DELETE_REQS_REQUEST,
    payload: id,
  };
};

const deleteReqFailure = error => {
  return {
    type: actions.DELETE_REQS_FAILURE,
    payload: error,
    error: true,
  };
};

const deleteReqsSuccess = id => {
  return {
    type: actions.DELETE_REQS_SUCCESS,
    payload: id,
  };
};

export const deleteReq = id => {
  return async (dispatch, getState) => {
    dispatch(requestDeleteReq(id));
    return await fetch(`api/v1/reqs/${id}`, {
      method: "DELETE",
      headers: { authorization: getAuthToken(getState) },
    })
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
    type: actions.CREATE_REQS_REQUEST,
    payload,
  };
};

const createReqSuccess = payload => {
  return {
    type: actions.CREATE_REQS_SUCCESS,
    payload,
  };
};

const createReqFailure = payload => {
  return {
    type: actions.CREATE_REQS_FAILURE,
    payload,
  };
};

export function createSingleReq(requisition) {
  return (dispatch, getState) => {
    dispatch(createReqRequest());

    // get date of current req
    const datesOfCurrentWeek = getDatesOfCurrentIsoWeek(getState());
    // get lesson this requisition being called with
    const lesson = getState().entitiesById.lessons[requisition.lesson];

    const date = datesOfCurrentWeek[getWeekdayIndexOfNamedWeekday(lesson.day)];
    // MAYBE BETTER: HAVE COMPONENT CALLING CREATESINGLEREQ ASSIGN DATE?

    return fetch("api/v1/reqs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: getAuthToken(getState),
      },
      body: JSON.stringify({ ...requisition, date }),
    })
      .then(handleErrors)
      .then(response => response.json())
      .then(json => {
        dispatch(createReqSuccess(normalize(json.data, schemas.reqs)));
        console.log("Date from returning Req: " + json.data.date);
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
    type: actions.UPDATE_REQS_REQUEST,
    payload,
  };
};

const updateReqsSuccess = payload => {
  return {
    type: actions.UPDATE_REQS_SUCCESS,
    payload,
  };
};

const updateReqsFailure = payload => {
  return {
    type: actions.UPDATE_REQS_FAILURE,
    payload,
  };
};

export function updateReq(requisition) {
  return (dispatch, getState) => {
    dispatch(updateReqsRequest(requisition._id));
    return fetch(`api/v1/reqs/${requisition._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: getAuthToken(getState),
      },
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

const fetchReqsRequest = () => {
  return {
    type: actions.FETCH_REQS_REQUEST,
  };
};

export const fetchReqsFailure = error => {
  return {
    type: actions.FETCH_REQS_FAILURE,
    payload: error,
  };
};

const fetchReqsSuccess = reqs => {
  return {
    type: actions.FETCH_REQS_SUCCESS,
    payload: reqs,
  };
};

export function fetchReqs(id = null) {
  return (dispatch, getState) => {
    const url = id ? `api/v1/reqs/${id}` : `api/v1/reqs`;
    dispatch(fetchReqsRequest());
    return fetch(url, { headers: { authorization: getAuthToken(getState) } })
      .then(handleErrors)
      .then(response => response.json())
      .then(json => {
        dispatch(fetchReqsSuccess(normalize(json.data, [schemas.reqs])));
      })
      .catch(error => {
        fetchReqsFailure(error);
      });
  };
}

const restoreDeletedReqRequest = () => {
  return {
    type: actions.RESTORE_DELETED_REQS_REQUEST,
  };
};

const restoreDeletedReqSuccess = () => {
  return {
    type: actions.RESTORE_DELETED_REQS_SUCCESS,
  };
};

const restoreDeletedReqFailure = () => {
  return {
    type: actions.RESTORE_DELETED_REQS_FAILURE,
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

export const createReqAndOpenModal = lessonId => {
  return async dispatch => {
    try {
      dispatch(setLoading({ entity: "lesson", id: lessonId, loading: true }));
      const requisition = await dispatch(createSingleReq(lessonId));
      dispatch(
        openModal({
          modalType: OPEN_REQUISITION,
          title: `Submit New Requisition`,
          meta: { id: requisition._id, existingRequisition: false },
        })
      );
    } catch (error) {
      dispatch(emitSnackbar("Sorry, something went wrong."));
    }
  };
};

export const setLoading = params => {
  // expects entity, id, loading args
  return {
    type: actions.SET_LOADING,
    ...params,
  };
};
