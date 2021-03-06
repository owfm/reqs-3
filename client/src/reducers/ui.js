import { combineReducers } from "redux";
import * as actions from "actions/types";
import addWeeks from "date-fns/addWeeks";
import addDays from "date-fns/addDays";
import isFriday from "date-fns/isFriday";
import isMonday from "date-fns/isMonday";

import eachDayOfInterval from "date-fns/eachDayOfInterval";
import startOfWeek from "date-fns/startOfWeek";
import lastDayOfWeek from "date-fns/lastDayOfWeek";
const initialModalState = {
  open: false,
  modalType: null,
  title: null,
  message: null,
  meta: {},
};

const currentDate = (state = { date: new Date(), error: null }, action) => {
  switch (action.type) {
    case actions.SET_CURRENT_DATE:
      return { error: null, date: action.payload };
    case actions.SET_DATE_FAILURE:
      return { error: action.payload, date: null };
    case actions.JUMP_WEEKS:
      return { error: null, date: addWeeks(state.date, action.payload) };

    // if Friday or Monday, skip weekend.
    case actions.FORWARD_ONE_DAY:
      return {
        error: null,
        date: addDays(state.date, isFriday(state.date) ? 3 : 1),
      };
    case actions.BACKWARD_ONE_DAY:
      return {
        error: null,
        date: addDays(state.date, isMonday(state.date) ? -3 : -1),
      };

    default:
      return state;
  }
};

const progressBarOpen = (state = false, action) => {
  switch (action.type) {
    case actions.AUTH_REQUEST:
    case actions.CREATE_REQS_REQUEST:
    case actions.FETCH_REQS_REQUEST:
    case actions.DELETE_REQS_REQUEST:
    case actions.UPDATE_REQS_REQUEST:
    case actions.CREATE_SCHOOLS_REQUEST:
    case actions.FETCH_SCHOOLS_REQUEST:
    case actions.DELETE_SCHOOLS_REQUEST:
    case actions.UPDATE_SCHOOLS_REQUEST:
    case actions.CREATE_LESSONS_REQUEST:
    case actions.FETCH_LESSONS_REQUEST:
    case actions.DELETE_LESSONS_REQUEST:
    case actions.UPDATE_LESSONS_REQUEST:
    case action.RESTORE_DELETED_REQ_REQUEST:
      return true;
    case actions.AUTH_USER:
    case actions.AUTH_ERROR:
    case actions.CREATE_REQS_SUCCESS:
    case actions.FETCH_REQS_SUCCESS:
    case actions.DELETE_REQS_SUCCESS:
    case actions.UPDATE_REQS_SUCCESS:
    case actions.CREATE_SCHOOLS_SUCCESS:
    case actions.FETCH_SCHOOLS_SUCCESS:
    case actions.DELETE_SCHOOLS_SUCCESS:
    case actions.UPDATE_SCHOOLS_SUCCESS:
    case actions.CREATE_LESSONS_SUCCESS:
    case actions.FETCH_LESSONS_SUCCESS:
    case actions.DELETE_LESSONS_SUCCESS:
    case actions.UPDATE_LESSONS_SUCCESS:
    case action.RESTORE_DELETED_REQ_SUCCESS:
    case actions.CREATE_REQS_FAILURE:
    case actions.FETCH_REQS_FAILURE:
    case actions.DELETE_REQS_FAILURE:
    case actions.UPDATE_REQS_FAILURE:
    case actions.CREATE_SCHOOLS_FAILURE:
    case actions.FETCH_SCHOOLS_FAILURE:
    case actions.DELETE_SCHOOLS_FAILURE:
    case actions.UPDATE_SCHOOLS_FAILURE:
    case actions.CREATE_LESSONS_FAILURE:
    case actions.FETCH_LESSONS_FAILURE:
    case actions.DELETE_LESSONS_FAILURE:
    case actions.UPDATE_LESSONS_FAILURE:
    case action.RESTORE_DELETED_REQ_FAILURE:
      return false;
    default:
      return state;
  }
};

const modal = (state = initialModalState, action) => {
  switch (action.type) {
    case actions.OPEN_MODAL:
      return {
        ...action.payload,
      };
    case actions.CLOSE_MODAL:
      return initialModalState;

    default:
      return state;
  }
};

const drawer = (state = false, action) => {
  switch (action.type) {
    case actions.OPEN_DRAWER:
      return true;
    case actions.CLOSE_DRAWER:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  currentDate,
  progressBarOpen,
  modal,
  drawer,
});

// selectors

export const getCurrentDate = state => {
  return state.ui.currentDate.date ? new Date(state.ui.currentDate.date) : null;
};

export const getDatesOfCurrentIsoWeek = state => {
  const currentDate = getCurrentDate(state);

  return currentDate
    ? eachDayOfInterval({
        start: startOfWeek(new Date(currentDate)),
        end: lastDayOfWeek(new Date(currentDate)),
      })
    : null;
};

// this function takes a weekday name and returns the index appropriate date from the array returned by getDatesOfCurrentIsoWeek
const map = {
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
};
export const getWeekdayIndexOfNamedWeekday = weekday => {
  return map[weekday];
};
