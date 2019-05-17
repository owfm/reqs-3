import * as actions from "actions/types";
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
    return fetch("/lessons")
      .then(handleErrors)
      .then(response => {
        return response.json();
      })
      .then(json => {
        dispatch(fetchLessonsSuccess(json.data));

        return json.data;
      })
      .catch(error => {
        fetchLessonsFailure(error);
      });
  };
}

const requestDeleteLesson = id => {
  return {
    type: actions.DELETE_LESSON_REQUEST,
    payload: id,
  };
};

const deleteLessonFailure = error => {
  return {
    type: actions.DELETE_LESSON_FAILURE,
    payload: error,
    error: true,
  };
};

const deleteLessonsSuccess = id => {
  return {
    type: actions.DELETE_LESSON_SUCCESS,
    payload: id,
  };
};

export const deleteLesson = id => {
  return async dispatch => {
    dispatch(requestDeleteLesson(id));
    return await fetch(`/lessons/${id}`, { method: "DELETE" })
      .then(handleErrors)
      .then(() => {
        dispatch(deleteLessonsSuccess(id));
        dispatch(emitSnackbarWithTimeout("Lesson deleted"));
      })
      .catch(error => dispatch(deleteLessonFailure(error)));
  };
};
