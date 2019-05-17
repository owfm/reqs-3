import * as actions from "actions/types";
import remove from "lodash.remove";

const initialState = {
  fetching: false,
  error: null,
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
    case actions.FETCH_LESSONS_SUCCESS:
      return {
        ...state,
        fetching: false,
        error: null,
        byPeriod: getLessonsByPeriod(action.payload),
      };

    case actions.DELETE_LESSON_SUCCESS:
      return {
        ...state,
        fetching: false,
        error: null,
        items: remove(state.items, item => item._id !== action.payload),
      };

    default:
      return state;
  }
}

const getLessonsByPeriod = lessons => {
  let lessonsByPeriod = {};
  for (var i = 0; i < lessons.length; i++) {
    let { week, day, period } = lessons[i];
    let session;
    if (!day || !period) {
      return false;
    }
    if (!week) {
      session = lessons[i].day + lessons[i].period;
    } else {
      session = lessons[i].week + lessons[i].day + lessons[i].period;
    }
    lessonsByPeriod[session] = { ...lessons[i] };
  }

  return lessonsByPeriod;
};
