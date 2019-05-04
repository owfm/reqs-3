import { combineReducers } from "redux";
import snackbar from "reducers/snackbar";
import reqs from "reducers/reqs";
import ui from "reducers/ui";

export default combineReducers({
  snackbar,
  reqs,
  ui,
});
