import * as actions from "actions/types";
import remove from "lodash.remove";

const initialState = {
  fetching: false,
  error: null,
  reqs: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actions.FETCH_REQS_REQUEST:
    case actions.REQUEST_DELETE_REQ:
    case actions.REQUEST_SUBMIT_REQ:
    case actions.REQUEST_UPDATE_REQ:
      return { ...state, fetching: true };

    case actions.FETCH_REQS_FAILURE:
    case actions.DELETE_REQ_FAILURE:
    case actions.UPDATE_REQ_FAILURE:
      return { ...state, fetching: false, error: action.payload };
    case actions.SUBMIT_REQ_SUCCESS:
      return {
        ...state,
        fetching: false,
        error: "LA DEE DAA",
        reqs: [...state.reqs, action.payload],
      };
    case actions.FETCH_REQS_SUCCESS:
      return { ...state, fetching: false, error: null, reqs: action.payload };
    case actions.DELETE_REQ_SUCCESS:
      return {
        ...state,
        fetching: false,
        error: null,
        reqs: remove(state.reqs, i => i._id !== action.payload),
      };
    case actions.UPDATE_REQ_SUCCESS:
      // remove old version and replace with new
      return {
        ...state,
        fetching: false,
        error: null,
        reqs: [
          ...remove(state.reqs, i => i._id !== action.payload._id),
          action.payload,
        ],
      };

    default:
      return state;
  }
}
