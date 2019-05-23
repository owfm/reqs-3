import { createSelector } from "reselect";
import pickby from "lodash.pickby";
import isWithinRange from "date-fns/is_within_range";
import startOfWeek from "date-fns/start_of_week";
import lastDayOfWeek from "date-fns/last_day_of_week";

// TODO get current week from store and filter lessons

const getCurrentDate = state => state.ui.currentDate;
const getCurrentWeek = state => state.ui.currentTimetableWeek;
const getLessons = state => state.entitiesById.lessons;
const getReqs = state => state.entitiesById.reqs;

const getLessonsForCurrentWeek = createSelector(
  [getCurrentWeek, getLessons],
  (currentWeek, lessons) => {
    return pickby(lessons, (value, key) => value.week === currentWeek);
  }
);

const getReqsForCurrentWeek = createSelector(
  [getCurrentDate, getReqs],
  (currentDate, reqs) => {
    return pickby(reqs, (value, key) => {
      return isWithinRange(
        reqs[key].date,
        startOfWeek(currentDate),
        lastDayOfWeek(currentDate)
      );
    });
  }
);

export const getSessionIdsForCurrentWeek = createSelector(
  [getLessonsForCurrentWeek, getReqsForCurrentWeek],
  (lessons, reqs) => {
    let lessonIdsOfVisibleReqs = Object.values(reqs).map(req => req.lesson);

    return [
      Object.keys(lessons).filter(lessonId =>
        lessonIdsOfVisibleReqs.includes(lessonId)
      ),
      Object.keys(lessons).filter(
        lessonId => !lessonIdsOfVisibleReqs.includes(lessonId)
      ),
      Object.keys(reqs),
    ];
  }
);
