import React, { useEffect } from "react";
import isEmpty from "lodash.isempty";
import getDay from "date-fns/getDay";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

import Refresh from "@material-ui/icons/Refresh";
import * as styles from "./styles";

import LessonMini from "components/Lessons/LessonMini";
import ReqMini from "components/Lessons/ReqMini";
import DatePicker from "components/Lessons/DatePicker";
import PeriodRow from "components/Lessons/PeriodRow";
import DayHeader from "components/Lessons/DayHeader";
import { SessionItem } from "components/styles/SessionItem";

const LessonsPresentation = ({
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
        <IconButton
          onClick={() => {
            fetchLessons();
            fetchReqs();
            fetchSchool("5cf03b50b1de672505fe2592");
          }}
        >
          <Refresh />
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

export default LessonsPresentation;
