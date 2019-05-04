import * as actions from "actions/types";
import { handleErrors } from "actions/utils";

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

export function fetchReqs() {
  return dispatch => {
    dispatch(fetchReqsRequest());
    return fetch("/reqs")
      .then(handleErrors)
      .then(response => response.json())
      .then(json => {
        dispatch(fetchReqsSuccess(json.data));
        return json.data;
      })
      .catch(error => {
        fetchReqsFailure(error);
      });
  };
}
