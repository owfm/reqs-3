import * as actions from "actions/types";
import remove from "lodash.remove";
import merge from "lodash.merge";

const initialState = {
  fetching: false,
  error: null,
  byId: {},
  byPeriod: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actions.FETCH_LESSONS_REQUEST:
    case actions.DELETE_LESSON_REQUEST:
      return { ...state, fetching: true };

    case actions.FETCH_LESSONS_FAILURE:
    case actions.DELETE_LESSON_FAILURE:
      return { ...state, fetching: false, error: action.payload };

    case actions.FETCH_REQ_SUCCESS:
    case actions.FETCH_REQS_SUCCESS:
    case actions.FETCH_LESSONS_SUCCESS:
      return {
        ...state,
        fetching: false,
        error: null,
        byId: merge({}, action.payload.entities.lessons, state.byId),
      };

    case actions.DELETE_LESSON_SUCCESS:
      return {
        ...state,
        fetching: false,
        error: null,
        byId: remove(state.items, item => item._id !== action.payload),
      };

    default:
      return state;
  }
}
