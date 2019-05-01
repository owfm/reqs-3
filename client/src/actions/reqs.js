import {
  FETCH_REQS_REQUEST,
  FETCH_REQS_FAILURE,
  FETCH_REQS_SUCCESS,
} from "actions/types";

const fetchReqsRequest = () => {
  return {
    type: FETCH_REQS_REQUEST,
  };
};

export const fetchReqsFailure = error => {
  return {
    type: FETCH_REQS_FAILURE,
    payload: error,
  };
};

const fetchReqsSuccess = reqs => {
  return {
    type: FETCH_REQS_SUCCESS,
    payload: reqs,
  };
};

export function fetchReqs() {
  return dispatch => {
    dispatch(fetchReqsRequest());

    return fetch("/reqs")
      .then(
        response => response.json(),
        error => dispatch(fetchReqsFailure(new Error(error.message)))
      )
      .then(json => dispatch(fetchReqsSuccess(json.data)));
  };
}
