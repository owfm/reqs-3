import * as actions from "actions/types";
import merge from "lodash.merge";
import omit from "lodash.omit";

const initialState = {
  fetching: false,
  error: null,
  byId: {},
  deleted: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actions.FETCH_REQ_REQUEST:
    case actions.FETCH_REQS_REQUEST:
    case actions.DELETE_REQ_REQUEST:
    case actions.SUBMIT_REQ_REQUEST:
    case actions.UPDATE_REQ_REQUEST:
      return { ...state, fetching: true };

    case actions.FETCH_REQ_FAILURE:
    case actions.FETCH_REQS_FAILURE:
    case actions.DELETE_REQ_FAILURE:
    case actions.UPDATE_REQ_FAILURE:
      return { ...state, fetching: false, error: action.payload };
    case actions.SUBMIT_REQ_SUCCESS:
      return {
        ...state,
        fetching: false,
        error: null,
        byId: merge({}, state.byId, { [action.payload._id]: action.payload }),
      };
    case actions.FETCH_REQS_SUCCESS:
      return {
        ...state,
        fetching: false,
        error: null,
        byId: merge({}, action.payload.entities.reqs, state.byId),
      };

    case actions.DELETE_REQ_SUCCESS:
      // get to-be deleted req from store to save it in 'deleted' array
      return {
        ...state,
        fetching: false,
        error: null,
        byId: omit(state.byId, action.payload),
        deleted: Object.assign({}, state.byId[action.payload]),
      };
    case actions.UPDATE_REQ_SUCCESS:
    case actions.FETCH_REQ_SUCCESS:
      // remove old version and replace with new
      return {
        ...state,
        fetching: false,
        error: null,
        byId: merge({}, state.byId, { [action.payload._id]: action.payload }),
      };

    case action.RESTORE_DELETED_REQ_REQUEST:
      if (state.deleted) {
        return {
          ...state,
          fetching: false,
          error: null,
          byId: [...state.byId, state.deleted],
          deleted: null,
        };
      } else {
        return state;
      }

    default:
      return state;
  }
}
