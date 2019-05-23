import { combineReducers } from "redux";
import * as actions from "actions/types";
import { addWeeks } from "date-fns";
import eachDay from "date-fns/each_day";
import startOfWeek from "date-fns/start_of_week";
import lastDayOfWeek from "date-fns/last_day_of_week";
const initialState = {
  currentTimetableWeek: 1,
  fetching: false,
  progressBarOpen: false,
};

const currentDate = (state = null, action) => {
  switch (action.type) {
    case actions.SET_CURRENT_DATE:
      return action.payload;
    case actions.JUMP_WEEKS:
      return addWeeks(state, action.payload);
    default:
      return state;
  }
};

const currentTimetableWeek = (state = 1, action) => {
  switch (action.type) {
    case "TOGGLE_WEEK":
      return 3 - state;
    default:
      return state;
  }
};

const progressBar = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_PROGRESS_BAR:
      return {
        ...state,
        progressBarOpen: action.payload,
      };
    case actions.FETCH_REQ_REQUEST:
    case actions.FETCH_REQS_REQUEST:
    case actions.DELETE_REQ_REQUEST:
    case actions.SUBMIT_REQ_REQUEST:
    case actions.UPDATE_REQ_REQUEST:
      return {
        ...state,
        progressBarOpen: true,
      };
    case actions.FETCH_REQ_FAILURE:
    case actions.FETCH_REQS_FAILURE:
    case actions.DELETE_REQ_FAILURE:
    case actions.UPDATE_REQ_FAILURE:
    case actions.SUBMIT_REQ_SUCCESS:
    case actions.FETCH_REQS_SUCCESS:
    case actions.DELETE_REQ_SUCCESS:
    case actions.UPDATE_REQ_SUCCESS:
    case actions.FETCH_REQ_SUCCESS:
    case action.RESTORE_DELETED_REQ_REQUEST:
      return {
        ...state,
        progressBarOpen: false,
      };
    default:
      return state;
  }
};

export default combineReducers({
  currentDate,
  currentTimetableWeek,
  progressBar,
});

export const getDatesOfCurrentIsoWeek = state => {
  if (!state.ui.currentDate) return null;
  const currentDateObj = new Date(state.ui.currentDate);
  return eachDay(startOfWeek(currentDateObj), lastDayOfWeek(currentDateObj));
};

// this function takes a weekday name and returns the index appropriate date from the array returned by getDatesOfCurrentIsoWeek
export const getWeekdayIndexOfNamedWeekday = weekday => {
  const map = {
    Mon: 2,
    Tue: 3,
    Wed: 4,
    Thu: 5,
    Fri: 6,
  };
  return map[weekday];
};
