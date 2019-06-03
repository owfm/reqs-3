import * as actions from "actions/types";
import * as schemas from "schemas";
import { normalize } from "normalizr";
import { handleErrors } from "actions/utils";
import emitSnackbarWithTimeout from "./snackbar";

const fetchLessonsRequest = () => {
  return {
    type: actions.FETCH_LESSONS_REQUEST,
  };
};

export const fetchLessonsFailure = error => {
  return {
    type: actions.FETCH_LESSONS_FAILURE,
    payload: error,
  };
};

const fetchLessonsSuccess = lessons => {
  return {
    type: actions.FETCH_LESSONS_SUCCESS,
    payload: lessons,
  };
};

export function fetchLessons() {
  return dispatch => {
    dispatch(fetchLessonsRequest());
    return fetch("api/v1/lessons")
      .then(handleErrors)
      .then(response => {
        return response.json();
      })
      .then(json => {
        dispatch(fetchLessonsSuccess(normalize(json.data, [schemas.lesson])));
        return json.data;
      })
      .catch(error => {
        fetchLessonsFailure(error);
      });
  };
}

const requestDeleteLesson = id => {
  return {
    type: actions.DELETE_LESSONS_REQUEST,
    payload: id,
  };
};

const deleteLessonFailure = error => {
  return {
    type: actions.DELETE_LESSONS_FAILURE,
    payload: error,
    error: true,
  };
};

const deleteLessonsSuccess = id => {
  return {
    type: actions.DELETE_LESSONS_SUCCESS,
    payload: id,
  };
};

export const deleteLesson = id => {
  return async dispatch => {
    dispatch(requestDeleteLesson(id));
    return await fetch(`api/v1/lessons/${id}`, { method: "DELETE" })
      .then(handleErrors)
      .then(() => {
        dispatch(deleteLessonsSuccess(id));
        dispatch(emitSnackbarWithTimeout("Lesson deleted"));
      })
      .catch(error => dispatch(deleteLessonFailure(error)));
  };
};
