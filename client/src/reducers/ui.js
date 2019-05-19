import * as actions from "actions/types";

const initialState = {
  currentTimetableWeek: 1,
  fetching: false,
  progressBarOpen: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "TOGGLE_WEEK":
      return {
        ...state,
        currentTimetableWeek: 3 - state.currentTimetableWeek,
      };
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
}
