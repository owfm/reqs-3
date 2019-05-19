import * as actions from "actions/types";
import * as schemas from "schemas";
import { handleErrors } from "actions/utils";
import { normalize } from "normalizr";

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
        dispatch(fetchReqsSuccess(normalize(json.data, [schemas.reqs])));
      })
      .catch(error => {
        fetchReqsFailure(error);
      });
  };
}
