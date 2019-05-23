import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import isEmpty from "lodash.isempty";

import { fetchLessons } from "actions/lessons";
import { fetchReqs } from "actions/req";

import { getErrorMessage, getIsFetching } from "reducers";
import { getSessionIdsForCurrentWeek } from "selectors";

import LessonMini from "components/LessonMini";
import ReqMini from "components/ReqMini";
import DatePicker from "components/DatePicker";
import PeriodRow from "components/PeriodRow";
import DayHeader from "components/DayHeader";

export const MainGrid = styled.div`
  padding: 20px;
  display: grid;
  grid-template-rows: auto repeat(${props => props.periods.length + 1}, auto);
  grid-gap: 10px;
  grid-template-columns: auto repeat(5, 1fr);
`;

export const SessionGrid = styled.div`
  display: grid;
  grid-gap: 5px;
`;

const Lessons = ({
  dispatch,
  skippedIds,
  lessonIds = [],
  reqIds = [],
  fetchingLessons,
  fetchingReqs,
  currentWeek,
}) => {
  useEffect(() => {
    if (isEmpty(reqIds)) {
      dispatch(fetchReqs());
    }
  }, []);

  useEffect(() => {
    if (isEmpty(lessonIds)) {
      dispatch(fetchLessons());
    }
  }, []);

  const LessonSessions = lessonIds.map(lessonId => (
    <LessonMini key={lessonId} lessonId={lessonId} />
  ));

  console.log("component lessonIds:\n");
  console.log(lessonIds);

  console.log("Skipped Ids:\n");
  console.log(skippedIds);

  const ReqSessions = reqIds.map(reqId => (
    <ReqMini key={reqId} reqId={reqId} />
  ));

  if (fetchingReqs || fetchingLessons) {
    return <p>Loading...</p>;
  }

  // if (lessonIds.length === 0) {
  //   return <p>You don't have any timetabled lessons.</p>;
  // }

  return (
    <>
      <button
        onClick={() => {
          dispatch(fetchLessons());
          dispatch(fetchReqs());
        }}
      >
        ReFetch
      </button>
      import
      <button onClick={() => dispatch({ type: "TOGGLE_WEEK" })}>
        {`Currently week ${currentWeek}. Click to toggle.`}
      </button>
      <DatePicker />
      <MainGrid periods={6}>
        <div />
        <PeriodRow />
        <DayHeader />
        {ReqSessions}
        {LessonSessions}{" "}
      </MainGrid>
    </>
  );
};

const mapStateToProps = state => {
  const [skippedIds, lessonIds, reqIds] = getSessionIdsForCurrentWeek(state);

  console.log("MSTP lessonIds:\n");
  console.log(lessonIds);

  return {
    skippedIds,
    // lessonIds: [],
    lessonIds,
    // lessonIds: lessonIds.filter(
    //   lessonId => !lessonIdsOfVisibleReqs.includes(lessonId)
    // ),
    // lessonIds,
    reqIds,
    currentWeek: state.ui.currentTimetableWeek,
    lessonError: getErrorMessage(state, "lessons"),
    reqsError: getErrorMessage(state, "reqs"),
    fetchingLessons: getIsFetching(state, "lessons"),
    fetchingReqs: getIsFetching(state, "reqs"),
  };
};

export default connect(mapStateToProps)(Lessons);
