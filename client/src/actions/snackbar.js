import { EMIT_SNACKBAR, CLOSE_SNACKBAR } from "actions/types";

const emitSnackbar = message => {
  return { type: EMIT_SNACKBAR, payload: message };
};

const closeSnackbar = () => {
  return { type: CLOSE_SNACKBAR };
};

const emitSnackbarWithTimeout = message => dispatch => {
  dispatch(emitSnackbar(message));
  setTimeout(() => dispatch(closeSnackbar()), 3000);
};

export default emitSnackbarWithTimeout;
