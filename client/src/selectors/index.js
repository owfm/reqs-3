import { createSelector } from "reselect";
import pickby from "lodash.pickby";

// TODO get current week from store and filter lessons
const getLessonsForCurrentWeek = state => {
  if (state.lessons.byId.length === 0) {
    return {};
  }

  return pickby(
    state.lessons.byId,
    (value, key) => value.week === state.ui.currentTimetableWeek
  );
};
const getReqsForCurrentWeek = state => {
  if (state.reqs.byId.length === 0) {
    return {};
  }

  return pickby(state.reqs.byId, (value, key) => {
    // throws error if not properly formatted lesson, wrap in try-catch.
    try {
      return (
        state.lessons.byId[value.lesson].week === state.ui.currentTimetableWeek
      );
    } catch {
      return false;
    }
  });
};
export const getSessionsForCurrentWeek = createSelector(
  [getLessonsForCurrentWeek, getReqsForCurrentWeek],
  (lessons, reqs) => {
    // get list of _ids of lessons with visible reqs assigned.
    let lessonIdsOfVisibleReqs = Object.values(reqs).map(req => req.lesson);

    return [
      pickby(lessons, (value, key) => !lessonIdsOfVisibleReqs.includes(key)),
      reqs,
    ];
  }
);

export const getLessonIdToDayPeriodMap = state => {
  let map = {};
  Object.keys(state.lessons.byId).map(lessonId => {
    map[lessonId] = {
      day: state.lessons.byId[lessonId].day,
      period: state.lessons.byId[lessonId].period,
    };
  });
  return map;
};
