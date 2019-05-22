const operations = ["fetch", "create", "update", "delete"];
const entities = ["reqs", "lessons"];
const statuses = ["request, success, failure"];

export const actionTypeCreator = (operation, entity, status) => {
  if (
    !operations.includes(operation) ||
    !entities.includes(entity) ||
    !statuses.includes(status)
  ) {
    throw new Error();
  }
  console.log(
    `${operation.toUpperCase()}_${entity.toUpperCase()}_${status.toUpperCase()}`
  );
  return `${operation.toUpperCase()}_${entity.toUpperCase()}_${status.toUpperCase()}`;
};

export const EMIT_SNACKBAR = "EMIT_SNACKBAR";
export const CLOSE_SNACKBAR = "CLOSE_SNACKBAR";

export const FETCH_REQ_REQUEST = "FETCH_REQ_REQUEST";
export const FETCH_REQ_SUCCESS = "FETCH_REQ_SUCCESS";
export const FETCH_REQ_FAILURE = "FETCH_REQ_FAILURE";

export const FETCH_REQS_REQUEST = "FETCH_REQS_REQUEST";
export const FETCH_REQS_SUCCESS = "FETCH_REQS_SUCCESS";
export const FETCH_REQS_FAILURE = "FETCH_REQS_FAILURE";

export const DELETE_REQ_REQUEST = "DELETE_REQ_REQUEST";
export const DELETE_REQ_SUCCESS = "DELETE_REQ_SUCCESS";
export const DELETE_REQ_FAILURE = "DELETE_REQ_FAILURE";

export const SUBMIT_REQ_REQUEST = "SUBMIT_REQ_REQUEST";
export const SUBMIT_REQ_SUCCESS = "SUBMIT_REQ_SUCCESS";
export const SUBMIT_REQ_FAILURE = "SUBMIT_REQ_FAILURE";

export const UPDATE_REQ_REQUEST = "UPDATE_REQ_REQUEST";
export const UPDATE_REQ_SUCCESS = "UPDATE_REQ_SUCCESS";
export const UPDATE_REQ_FAILURE = "UPDATE_REQ_FAILURE";

export const RESTORE_DELETED_REQ_REQUEST = "RESTORE_DELETED_REQ_REQUEST";
export const RESTORE_DELETED_REQ_SUCCESS = "RESTORE_DELETED_REQ_SUCCESS";
export const RESTORE_DELETED_REQ_FAILURE = "RESTORE_DELETED_REQ_FAILURE";

export const FETCH_LESSONS_REQUEST = "FETCH_LESSONS_REQUEST";
export const FETCH_LESSONS_SUCCESS = "FETCH_LESSONS_SUCCESS";
export const FETCH_LESSONS_FAILURE = "FETCH_LESSONS_FAILURE";

export const DELETE_LESSON_SUCCESS = "DELETE_LESSON_SUCCESS";
export const DELETE_LESSON_FAILURE = "DELETE_LESSON_FAILURE";
export const DELETE_LESSON_REQUEST = "DELETE_LESSON_REQUEST";

// UI constants
export const SET_PROGRESS_BAR = "SET_PROGRESS_BAR";

export const AUTH_USER = "auth_user";
export const AUTH_ERROR = "auth_error";

export const SET_CURRENT_DATE = "SET_CURRENT_DATE";
export const JUMP_WEEKS = "JUMP_WEEKS";
