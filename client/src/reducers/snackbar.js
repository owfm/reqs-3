import { EMIT_SNACKBAR, CLOSE_SNACKBAR } from "actions/types";

const INITIAL_STATE = {
  open: false,
  message: "",
  undoable: false,
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case EMIT_SNACKBAR:
      return {
        ...state,
        open: true,
        message: action.payload.message,
        undoable: action.payload.undoable,
      };
    case CLOSE_SNACKBAR:
      return { INITIAL_STATE };
    default:
      return state;
  }
}
