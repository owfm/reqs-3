import React, { useEffect } from "react";
import { connect } from "react-redux";
import isEmpty from "lodash.isempty";
import getDay from "date-fns/getDay";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

import Button from "@material-ui/core/Button";

import Refresh from "@material-ui/icons/Refresh";
import * as styles from "./styles";

import { fetchLessons } from "actions/lessons";
import { fetchReqs } from "actions/req";
import { fetchSingleSchool } from "actions/schools";

import { getErrorMessage, getIsFetching } from "reducers";
import { getDatesOfCurrentIsoWeek } from "reducers/ui";
import { getSessionIdsForCurrentWeek } from "selectors";

import requireAuth from "components/auth/requireAuth";
import LessonMini from "components/Lessons/LessonMini";
import ReqMini from "components/Lessons/ReqMini";
import DatePicker from "components/Lessons/DatePicker";
import PeriodRow from "components/Lessons/PeriodRow";
import DayHeader from "components/Lessons/DayHeader";
import { SessionItem } from "components/styles/SessionItem";
import { getHolidayDatesForCurrentWeek } from "../../selectors";

const Lessons = ({
  lessonIds = [],
  reqIds = [],
  holidayDates,
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

  if (fetchingReqs || fetchingLessons) {
    return <p>Loading...</p>;
  }

  console.log(holidayDates);

  const LessonSessions = lessonIds.map(lessonId => (
    <LessonMini key={lessonId} lessonId={lessonId} />
  ));

  const ReqSessions = reqIds.map(reqId => (
    <ReqMini key={reqId} reqId={reqId} />
  ));

  const Holidays = holidayDates.map(date => (
    <>
      <SessionItem period={1} day={`${getDay(date)}`}>
        <Typography variant={"h6"} align="center">
          Holiday
        </Typography>
      </SessionItem>
    </>
  ));

  // BUG WHY IS THIS FETCHING A HOLIDAY TODAY?

  return (
    <>
      <styles.HeaderWrapper>
        <DatePicker />
        <IconButton>
          <Refresh
            onClick={() => {
              fetchLessons();
              fetchReqs();
              fetchSchool("5cf03b50b1de672505fe2592");
            }}
          />
        </IconButton>
      </styles.HeaderWrapper>
      <styles.MainGrid periods={6}>
        {/* empty div below is top left corner box of this grid */}
        <div />
        <PeriodRow />
        <DayHeader />
        {Holidays}
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
    datesOfCurrentIsoWeek: getDatesOfCurrentIsoWeek(state),
    holidayDates: getHolidayDatesForCurrentWeek(state),
    lessonError: getErrorMessage(state, "lessons"),
    reqsError: getErrorMessage(state, "reqs"),
    fetchingLessons: getIsFetching(state, "lessons"),
    fetchingReqs: getIsFetching(state, "reqs"),
  };
};

export default requireAuth(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Lessons)
);
