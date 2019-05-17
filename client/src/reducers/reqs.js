import * as actions from "actions/types";
import remove from "lodash.remove";
import { normalize, schema } from "normalizr";

const initialState = {
  fetching: false,
  error: null,
  items: [],
  entities: [],
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
        items: [...state.items, action.payload],
      };
    case actions.FETCH_REQS_SUCCESS:
      return {
        ...state,
        fetching: false,
        error: null,
        byPeriod: getReqsByPeriod(action.payload),
        ...normalize({ response: action.payload }, reqs),
      };

    case actions.DELETE_REQ_SUCCESS:
      // get to-be deleted req from store to save it in 'deleted' array
      const deleted = {
        ...state.items.filter(item => item._id === action.payload)[0],
      };

      return {
        ...state,
        fetching: false,
        error: null,
        items: remove(state.items, item => item._id !== action.payload),
        deleted,
      };
    case actions.UPDATE_REQ_SUCCESS:
    case actions.FETCH_REQ_SUCCESS:
      // remove old version and replace with new
      return {
        ...state,
        fetching: false,
        error: null,
        items: [
          ...remove(state.items, item => item._id !== action.payload._id),
          action.payload,
        ],
      };

    case action.RESTORE_DELETED_REQ_REQUEST:
      if (state.deleted) {
        return {
          ...state,
          fetching: false,
          error: null,
          items: [...state.items, state.deleted],
          deleted: null,
        };
      } else {
        return state;
      }

    default:
      return state;
  }
}

const getReqsByPeriod = reqs => {
  let reqsByPeriod = {};
  for (var i = 0; i < reqs.length; i++) {
    let { week, day, period } = reqs[i].lesson;
    let session;
    if (!day || !period) {
      continue;
    }
    if (!week) {
      session = String(day) + String(period);
    } else {
      session = String(week) + String(day) + String(period);
    }
    reqsByPeriod[session] = { ...reqs[i] };
  }

  return reqsByPeriod;
};
const user = new schema.Entity("users", {
  idAttribute: "_id",
});
const school = new schema.Entity(
  "schools",
  {
    admin: user,
    staff: [user],
  },
  {
    idAttribute: "_id",
  }
);
const lesson = new schema.Entity(
  "lessons",
  {
    teacher: user,
    school: school,
  },
  {
    idAttribute: "_id",
  }
);
const req = new schema.Entity(
  "req",
  {
    teacher: user,
    lesson: lesson,
  },
  {
    idAttribute: "_id",
  }
);

const reqs = new schema.Entity(
  "reqs",
  {
    response: [req],
  },
  {
    idAttribute: "_id",
  }
);
