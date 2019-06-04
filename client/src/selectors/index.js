import { createSelector } from "reselect";
import pickby from "lodash.pickby";
import isWithinInterval from "date-fns/isWithinInterval";
import startOfWeek from "date-fns/startOfWeek";
import lastDayOfWeek from "date-fns/lastDayOfWeek";
import differenceInCalendarWeeks from "date-fns/differenceInCalendarWeeks";
import addDays from "date-fns/addDays";
import isMonday from "date-fns/isMonday";
import isFriday from "date-fns/isFriday";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import setSeconds from "date-fns/setSeconds";
import eachDayOfInterval from "date-fns/eachDayOfInterval";

const getCurrentDate = state =>
  // set time to exactly Midday to make below selectors work with intervals
  setSeconds(
    setMinutes(setHours(new Date(state.ui.currentDate.date), 12), 0),
    0
  );
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

export const getHolidayDatesForSchool = createSelector(
  [getSchoolofCurrentUser],
  schoolofCurrentUser => {
    if (!schoolofCurrentUser) return [];
    const { termDates } = schoolofCurrentUser.preferences;
    var allSchoolDaysIncHolidays = eachDayOfInterval({
      start: new Date(termDates["Winter Half-Term 1"][0]),
      end: new Date(termDates["Summer Half-Term 2"][1]),
    });
    // remove holidays
    return allSchoolDaysIncHolidays.filter(d => !isDateInTerm(d, termDates));
  }
);

const isDateInTerm = (date, termDates) => {
  Object.keys(termDates).forEach(term => {
    if (isWithinInterval(date, { start: term[0], end: term[1] })) return true;
  });
  return false;
};

export const getCurrentWeek = createSelector(
  [getSchoolofCurrentUser, getCurrentDate],
  (schoolofCurrentUser, currentDate) => {
    if (!schoolofCurrentUser) return null;

    // BUG: doesn't get lessons if today is Tuesday and selected day is previous sunday...

    const { termDates } = schoolofCurrentUser.preferences;
    // find how many weeks have passed since start of term
    // find if currentDate is in term-time
    let inTerm = getTermDateIsIn(currentDate, termDates);

    if (!inTerm) return null; // must be in holidaytime

    const halfTermStartDate = new Date(
      schoolofCurrentUser.preferences.termDates[inTerm][0]
    );
    const weeksSinceTermStart = differenceInCalendarWeeks(
      startOfWeek(currentDate),
      startOfWeek(halfTermStartDate)
    );

    // check what week number the half-term started with
    const halfTermBeganWith =
      schoolofCurrentUser.preferences.timetableWeekTermStart[inTerm];
    // if even number of weeks since term start, must be on same week as starting week. Otherwise, swap the week.
    return weeksSinceTermStart % 2 === 0
      ? halfTermBeganWith
      : 3 - halfTermBeganWith;
  }
);

const getTermDateIsIn = (date, termDates) => {
  let inTerm = "";
  Object.keys(termDates).some(term => {
    let [start, end] = termDates[term];
    start = new Date(start);
    end = new Date(end);
    // HACKY: if start date is a Monday, move it to Sunday (back 1 day). This is because we want the following
    // week to show if the user's current day is set to a Sunday. Only a problem on the last day of a
    // holiday. Same reason at the end of term.
    start = isMonday(start) ? addDays(start, -1) : start;
    end = isFriday(end) ? addDays(end, 1) : end;

    // check if date is within term-time
    if (isWithinInterval(date, { start, end })) {
      inTerm = term;
      return true;
    }
    return false;
  });
  return inTerm;
};

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
      return isWithinInterval(new Date(reqs[key].date), {
        start: startOfWeek(currentDate),
        end: lastDayOfWeek(currentDate),
      });
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
