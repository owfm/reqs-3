import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import snackbar from "reducers/snackbar";
import reqs from "reducers/reqs";
import lessons from "reducers/lessons";
import ui from "reducers/ui";
import auth from "reducers/auth";

export default combineReducers({
  auth,
  snackbar,
  reqs,
  ui,
  lessons,
  form: formReducer,
});
