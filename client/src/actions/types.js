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
  return `${operation.toUpperCase()}_${entity.toUpperCase()}_${status.toUpperCase()}`;
};

export const CREATE_SCHOOLS_REQUEST = "CREATE_SCHOOLS_REQUEST";
export const CREATE_SCHOOLS_SUCCESS = "CREATE_SCHOOLS_SUCCESS";
export const CREATE_SCHOOLS_FAILURE = "CREATE_SCHOOLS_FAILURE";

export const FETCH_SCHOOLS_REQUEST = "FETCH_SCHOOLS_REQUEST";
export const FETCH_SCHOOLS_SUCCESS = "FETCH_SCHOOLS_SUCCESS";
export const FETCH_SCHOOLS_FAILURE = "FETCH_SCHOOLS_FAILURE";

export const UPDATE_SCHOOLS_REQUEST = "UPDATE_SCHOOLS_REQUEST";
export const UPDATE_SCHOOLS_SUCCESS = "UPDATE_SCHOOLS_SUCCESS";
export const UPDATE_SCHOOLS_FAILURE = "UPDATE_SCHOOLS_FAILURE";

export const DELETE_SCHOOLS_REQUEST = "DELETE_SCHOOLS_REQUEST";
export const DELETE_SCHOOLS_SUCCESS = "DELETE_SCHOOLS_SUCCESS";
export const DELETE_SCHOOLS_FAILURE = "DELETE_SCHOOLS_FAILURE";

export const CREATE_REQS_REQUEST = "CREATE_REQS_REQUEST";
export const CREATE_REQS_SUCCESS = "CREATE_REQS_SUCCESS";
export const CREATE_REQS_FAILURE = "CREATE_REQS_FAILURE";

export const FETCH_REQS_REQUEST = "FETCH_REQS_REQUEST";
export const FETCH_REQS_SUCCESS = "FETCH_REQS_SUCCESS";
export const FETCH_REQS_FAILURE = "FETCH_REQS_FAILURE";

export const UPDATE_REQS_REQUEST = "UPDATE_REQS_REQUEST";
export const UPDATE_REQS_SUCCESS = "UPDATE_REQS_SUCCESS";
export const UPDATE_REQS_FAILURE = "UPDATE_REQS_FAILURE";

export const DELETE_REQS_REQUEST = "DELETE_REQS_REQUEST";
export const DELETE_REQS_SUCCESS = "DELETE_REQS_SUCCESS";
export const DELETE_REQS_FAILURE = "DELETE_REQS_FAILURE";

export const CREATE_LESSONS_REQUEST = "CREATE_LESSONS_REQUEST";
export const CREATE_LESSONS_SUCCESS = "CREATE_LESSONS_SUCCESS";
export const CREATE_LESSONS_FAILURE = "CREATE_LESSONS_FAILURE";

export const FETCH_LESSONS_REQUEST = "FETCH_LESSONS_REQUEST";
export const FETCH_LESSONS_SUCCESS = "FETCH_LESSONS_SUCCESS";
export const FETCH_LESSONS_FAILURE = "FETCH_LESSONS_FAILURE";

export const UPDATE_LESSONS_REQUEST = "UPDATE_LESSONS_REQUEST";
export const UPDATE_LESSONS_SUCCESS = "UPDATE_LESSONS_SUCCESS";
export const UPDATE_LESSONS_FAILURE = "UPDATE_LESSONS_FAILURE";

export const DELETE_LESSONS_REQUEST = "DELETE_LESSONS_REQUEST";
export const DELETE_LESSONS_SUCCESS = "DELETE_LESSONS_SUCCESS";
export const DELETE_LESSONS_FAILURE = "DELETE_LESSONS_FAILURE";

export const RESTORE_DELETED_REQS_REQUEST = "RESTORE_DELETED_REQS_REQUEST";
export const RESTORE_DELETED_REQS_SUCCESS = "RESTORE_DELETED_REQS_SUCCESS";
export const RESTORE_DELETED_REQS_FAILURE = "RESTORE_DELETED_REQS_FAILURE";

// UI constants

export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";

export const OPEN_DRAWER = "OPEN_DRAWER";
export const CLOSE_DRAWER = "CLOSE_DRAWER";

export const EMIT_SNACKBAR = "EMIT_SNACKBAR";
export const CLOSE_SNACKBAR = "CLOSE_SNACKBAR";

export const AUTH_REQUEST = "AUTH_REQUEST";
export const AUTH_USER = "auth_user";
export const AUTH_ERROR = "auth_error";

export const SET_CURRENT_DATE = "SET_CURRENT_DATE";
export const SET_DATE_FAILURE = "SET_DATE_FAILURE";
export const JUMP_WEEKS = "JUMP_WEEKS";

export const FORWARD_ONE_DAY = "FORWARD_ONE_DAY";
export const BACKWARD_ONE_DAY = "BACKWARD_ONE_DAY";

export const SET_LOADING = "SET_LOADING";
