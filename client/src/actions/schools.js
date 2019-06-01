import * as actions from "./types";
import { handleErrors } from "./utils";
import * as schemas from "schemas";
import { normalize } from "normalizr";

const createSchoolRequest = payload => {
  return {
    type: actions.CREATE_SCHOOLS_REQUEST,
    payload,
  };
};

const createSchoolSuccess = payload => {
  return {
    type: actions.CREATE_SCHOOLS_SUCCESS,
    payload,
  };
};

const createSchoolFailure = payload => {
  return {
    type: actions.CREATE_SCHOOLS_FAILURE,
    payload,
  };
};

export function createSchool(school) {
  return dispatch => {
    dispatch(createSchoolRequest());

    return fetch("/schools", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...school }),
    })
      .then(handleErrors)
      .then(response => response.json())
      .then(json => {
        dispatch(createSchoolSuccess(normalize(json.data, schemas.school)));
        return json.data;
      })
      .catch(error => {
        dispatch(
          createSchoolFailure(new Error("Could not create new school."))
        );
        throw error;
      });
  };
}

// payload == id
export const fetchSchoolRequest = payload => {
  return {
    type: actions.FETCH_SCHOOLS_REQUEST,
    payload,
  };
};

// payload == req object
export const fetchSchoolSuccess = payload => {
  return {
    type: actions.FETCH_SCHOOLS_SUCCESS,
    payload,
  };
};

// payload = error object
export const fetchSchoolFailure = payload => {
  return {
    type: actions.FETCH_SCHOOLS_FAILURE,
    payload,
  };
};

export function fetchSingleSchool(id) {
  return dispatch => {
    dispatch(fetchSchoolRequest(id));
    return fetch(`/schools/${id}`)
      .then(handleErrors)
      .then(response => response.json())
      .then(json => {
        dispatch(fetchSchoolSuccess(normalize(json, schemas.school)));
        return json;
      })
      .catch(error => dispatch(fetchSchoolFailure(error.message)));
  };
}
