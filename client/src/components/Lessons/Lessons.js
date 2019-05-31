import React, { useEffect } from "react";
import { connect } from "react-redux";
import isEmpty from "lodash.isempty";
import * as styles from "./styles";
import { fetchLessons } from "actions/lessons";
import { fetchReqs } from "actions/req";
import { fetchSingleSchool } from "actions/schools";

import { getErrorMessage, getIsFetching } from "reducers";
import { getSessionIdsForCurrentWeek } from "selectors";

import LessonMini from "components/Lessons/LessonMini";
import ReqMini from "components/Lessons/ReqMini";
import DatePicker from "components/Lessons/DatePicker";
import PeriodRow from "components/Lessons/PeriodRow";
import DayHeader from "components/Lessons/DayHeader";

const Lessons = ({
  lessonIds = [],
  reqIds = [],
  fetchingLessons,
  fetchingReqs,
  fetchReqs,
  fetchLessons,
  fetchSchool,
}) => {
  useEffect(() => {
    if (isEmpty(reqIds)) {
      fetchReqs();
    }
  }, []);

  useEffect(() => {
    if (isEmpty(lessonIds)) {
      fetchLessons();
    }
  }, []);

  useEffect(() => {
    fetchSchool("5cf1036d92d4dc378f0a43e6");
  }, []);

  const LessonSessions = lessonIds.map(lessonId => (
    <LessonMini key={lessonId} lessonId={lessonId} />
  ));

  const ReqSessions = reqIds.map(reqId => (
    <ReqMini key={reqId} reqId={reqId} />
  ));

  if (fetchingReqs || fetchingLessons) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <button
        onClick={() => {
          fetchLessons();
          fetchReqs();
          fetchSchool("5cf03b50b1de672505fe2592");
        }}
      >
        ReFetch
      </button>
      import
      <DatePicker />
      <styles.MainGrid periods={6}>
        <div />
        <PeriodRow />
        <DayHeader />
        {ReqSessions}
        {LessonSessions}{" "}
      </styles.MainGrid>
    </>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSchool: id => dispatch(fetchSingleSchool(id)),
    fetchReqs: () => dispatch(fetchReqs()),
    fetchLessons: () => dispatch(fetchLessons()),
  };
};

const mapStateToProps = state => {
  const [lessonIds, reqIds] = getSessionIdsForCurrentWeek(state);

  return {
    lessonIds,
    reqIds,
    currentWeek: state.ui.currentTimetableWeek,
    lessonError: getErrorMessage(state, "lessons"),
    reqsError: getErrorMessage(state, "reqs"),
    fetchingLessons: getIsFetching(state, "lessons"),
    fetchingReqs: getIsFetching(state, "reqs"),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lessons);
