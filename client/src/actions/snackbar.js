import { EMIT_SNACKBAR, CLOSE_SNACKBAR } from "actions/types";

const emitSnackbar = (message, undoable) => {
  return { type: EMIT_SNACKBAR, payload: { message, undoable } };
};

export const closeSnackbar = () => {
  return { type: CLOSE_SNACKBAR };
};

const emitSnackbarWithTimeout = (message, undoable = false) => dispatch => {
  dispatch(emitSnackbar(message, undoable));
  if (!undoable) {
    setTimeout(() => dispatch(closeSnackbar()), 6000);
  }
};

export default emitSnackbarWithTimeout;
