import { createSelector } from "reselect";
import pickby from "lodash.pickby";
import isWithinRange from "date-fns/is_within_range";
import startOfWeek from "date-fns/start_of_week";
import lastDayOfWeek from "date-fns/last_day_of_week";
import isWithinInterval from "date-fns/isWithinInterval";
import differenceInCalendarWeeks from "date-fns/differenceInCalendarWeeks";

const getCurrentDate = state => state.ui.currentDate;
const getCurrentUser = state => state.auth.user;
const getSchools = state => state.entitiesById.schools;
const getLessons = state => state.entitiesById.lessons;
const getReqs = state => state.entitiesById.reqs;

export const getReqById = (state, id) => {
  if (!id) return null;
  return getReqs(state)[id];
};

export const getLessonByReqId = (state, id) => {
  if (!id) return null;
  try {
    const { lesson } = getReqById(state, id);
    return getLessons(state)[lesson];
  } catch (error) {
    console.error("req doesn't exist: can't select lesson");
    return null;
  }
};

const getSchoolofCurrentUser = createSelector(
  [getSchools, getCurrentUser],
  (schools, currentUser) => {
    if (!currentUser) return null;
    try {
      return schools[currentUser.school];
    } catch (error) {
      console.error("Current user doesn't have a school.");
    }
  }
);

const getCurrentWeek = createSelector(
  [getSchoolofCurrentUser, getCurrentDate],
  (schoolofCurrentUser, currentDate) => {
    if (!schoolofCurrentUser) return null;
    const { termDates } = schoolofCurrentUser.preferences;
    // find how many weeks have passed since start of term
    // find if currentDate is in term-time
    let inTerm = "";
    Object.keys(termDates).forEach(term => {
      let [start, end] = termDates[term];
      start = new Date(start);
      end = new Date(end);
      if (isWithinInterval(currentDate, { start, end })) inTerm = term;
    });

    if (!inTerm) return null; // must be in holidaytime

    // check what week number the half-term started with
    const halfTermBeganWith =
      schoolofCurrentUser.preferences.timetableWeekTermStart[inTerm];

    const halfTermStartDate = new Date(
      schoolofCurrentUser.preferences.termDates[inTerm][0]
    );

    const weeksSinceTermStart = differenceInCalendarWeeks(
      startOfWeek(currentDate),
      startOfWeek(halfTermStartDate)
    );
    // if even number of weeks since term start, must be on same week as starting week. Otherwise, swap the week.
    return weeksSinceTermStart % 2 === 0
      ? halfTermBeganWith
      : 3 - halfTermBeganWith;
  }
);

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
      Object.keys(lessons).filter(
        lessonId => !lessonIdsOfVisibleReqs.includes(lessonId)
      ),
      Object.keys(reqs),
    ];
  }
);
