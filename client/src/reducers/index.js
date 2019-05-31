import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import snackbar from "reducers/snackbar";
import ui from "reducers/ui";
import auth from "reducers/auth";
import createList, * as fromList from "./createList";
import createById from "./createById";

const listByEntity = combineReducers({
  reqs: createList("reqs"),
  lessons: createList("lessons"),
  schools: createList("schools"),
});

const entitiesById = combineReducers({
  reqs: createById("reqs"),
  lessons: createById("lessons"),
  schools: createById("schools"),
});

export default combineReducers({
  listByEntity,
  entitiesById,
  auth,
  snackbar,
  ui,
  form: formReducer,
});

const getErrorMessage = (state, entity) =>
  fromList.getErrorMessage(state.listByEntity[entity]);

const getIsFetching = (state, entity) =>
  fromList.getIsFetching(state.listByEntity[entity]);

export { getErrorMessage, getIsFetching };
