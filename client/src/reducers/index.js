import { combineReducers } from "redux";
import snackbar from "reducers/snackbar";
import reqs from "reducers/reqs";

export default combineReducers({
  snackbar,
  reqs
});
