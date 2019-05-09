import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import snackbar from "reducers/snackbar";
import reqs from "reducers/reqs";
import ui from "reducers/ui";
import auth from "reducers/auth";

export default combineReducers({
  auth,
  snackbar,
  reqs,
  ui,
  form: formReducer,
});
