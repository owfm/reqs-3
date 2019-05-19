import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchLessons } from "actions/lessons";
import styled from "styled-components";
import LessonMini from "components/LessonMini";
import ReqMini from "components/ReqMini";
import { fetchReqs } from "actions/reqs";
import {
  getSessionsForCurrentWeek,
  getLessonIdToDayPeriodMap,
} from "selectors";

export const MainGrid = styled.div`
  padding: 20px;
  display: grid;
  grid-template-rows: auto repeat(${props => props.periods.length + 1}, auto);
  grid-gap: 10px;
  grid-template-columns: auto repeat(5, 1fr);
`;

const dayToColMap = {
  Mon: 2,
  Tue: 3,
  Wed: 4,
  Thu: 5,
  Fri: 6,
};

const periodToRowMap = {
  1: 2,
  2: 3,
  3: 4,
  4: 5,
  5: 6,
  6: 7,
};

const SessionItem = styled.div`
  grid-column-start: ${props => dayToColMap[props.day]}
  grid-row-start: ${props => periodToRowMap[props.period]}
`;

const PeriodLabel = styled.div`
  grid-column-start: 1;
  grid-row-start: ${props => parseInt(props.period) + 1};
`;

export const SessionGrid = styled.div`
  display: grid;
  grid-gap: 5px;
`;

const Lessons = ({
  dispatch,
  lessons = [],
  requisitions = [],
  fetching,
  error,
  currentWeek,
  lessonIdToDayPeriodMap,
}) => {
  useEffect(() => {
    if (lessons.length !== 0) {
      dispatch(fetchReqs());
    }
  }, []);

  useEffect(() => {
    if (requisitions.length !== 0) {
      dispatch(fetchLessons());
    }
  }, []);

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const periods = ["1", "2", "3", "4", "5", "6"];

  const dayHeaders = days.map(day => (
    <div style={{ justifySelf: "center", fontWeight: "bold" }} key={`d${day}`}>
      {day}
    </div>
  ));

  const LessonSessions = Object.keys(lessons).map(lessonId => (
    <SessionItem period={lessons[lessonId].period} day={lessons[lessonId].day}>
      <LessonMini lesson={lessons[lessonId]} />
    </SessionItem>
  ));

  const RequisitionSessions = Object.keys(requisitions).map(requisitionId => (
    <SessionItem
      day={lessonIdToDayPeriodMap[requisitions[requisitionId].lesson].day}
      period={lessonIdToDayPeriodMap[requisitions[requisitionId].lesson].period}
    >
      <ReqMini requisition={requisitions[requisitionId]} />
    </SessionItem>
  ));

  const periodRow = periods.map(period => (
    <PeriodLabel period={period}>{period}</PeriodLabel>
  ));

  if (fetching) {
    return <p>Loading...</p>;
  }

  if (lessons.length === 0) {
    return <p>You don't have any timetabled lessons.</p>;
  }

  return (
    <>
      <button onClick={() => dispatch({ type: "TOGGLE_WEEK" })}>
        {`Currently week ${currentWeek}. Click to toggle.`}
      </button>

      <MainGrid periods={6}>
        <div />
        {periodRow}
        {dayHeaders}
        {RequisitionSessions}
        {LessonSessions}{" "}
      </MainGrid>
    </>
  );
};

const mapStateToProps = state => {
  const [lessons, requisitions] = getSessionsForCurrentWeek(state);

  return {
    currentWeek: state.ui.currentTimetableWeek,
    lessons,
    requisitions,
    lessonIdToDayPeriodMap: getLessonIdToDayPeriodMap(state),
    error: state.lessons.error,
    fetching: state.lessons.fetching,
  };
};

export default connect(mapStateToProps)(Lessons);
