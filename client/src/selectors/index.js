import { createSelector } from "reselect";
import pickby from "lodash.pickby";

// TODO get current week from store and filter lessons

const getCurrentWeek = state => {
  return state.ui.currentTimetableWeek;
};

const getLessons = state => {
  return state.entitiesById.lessons;
};

const getReqs = state => {
  return state.entitiesById.reqs;
};

const getLessonsForCurrentWeek = createSelector(
  [getCurrentWeek, getLessons],
  (currentWeek, lessons) => {
    return pickby(lessons, (value, key) => value.week === currentWeek);
  }
);

const getReqsForCurrentWeek = createSelector(
  [getCurrentWeek, getReqs, getLessons],
  (currentWeek, reqs, lessons) => {
    return pickby(reqs, (value, key) => {
      return lessons[value.lesson].week === currentWeek;
    });
  }
);
export const getSessionIdsForCurrentWeek = createSelector(
  [getLessonsForCurrentWeek, getReqsForCurrentWeek],
  (lessons, reqs) => {
    let lessonIdsOfVisibleReqs = Object.values(reqs).map(req => req.lesson);

    return [
      Object.keys(lessons).filter(
        lessonId => !lessonIdsOfVisibleReqs.includes(lessonId)
      ),
      Object.keys(reqs),
    ];
  }
);
