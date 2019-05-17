import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchLessons } from "actions/lessons";
import styled from "styled-components";
import LessonMini from "components/LessonMini";
import ReqMini from "components/ReqMini";
import { fetchReqs } from "actions/reqs";

export const MainGrid = styled.div`
  padding: 20px;
  display: grid;
  grid-template-rows: auto repeat(${props => props.periods.length}, auto);
  grid-gap: 10px;
  grid-template-columns: auto repeat(5, 1fr);
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
}) => {
  const [searchString, setSearchString] = useState("");
  const updateSearch = e => {
    setSearchString(e.target.value);
  };

  useEffect(() => {
    dispatch(fetchReqs());
  }, []);

  useEffect(() => {
    dispatch(fetchLessons());
  }, []);

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const periods = ["1", "2", "3", "4", "5", "6"];
  const week = "1";

  const sessionGridContents = [];
  const dayHeaders = days.map(day => (
    <div style={{ justifySelf: "center", fontWeight: "bold" }} key={`d${day}`}>
      {day}
    </div>
  ));

  periods.forEach(period => {
    sessionGridContents.push(
      <div
        style={{
          alignSelf: "center",
          justifySelf: "center",
          fontWeight: "bold",
        }}
      >
        {period}
      </div>
    );

    days.forEach(day => {
      if (requisitions[week + day + period]) {
        sessionGridContents.push(
          <SessionGrid>
            <ReqMini requisition={requisitions[week + day + period]} />
          </SessionGrid>
        );
      } else if (lessons[week + day + period]) {
        sessionGridContents.push(
          <SessionGrid>
            <LessonMini lesson={lessons[week + day + period]} />
          </SessionGrid>
        );
      } else {
        sessionGridContents.push(
          <SessionGrid>
            <div />
          </SessionGrid>
        );
      }
    });
  });

  if (fetching) {
    return <p>Loading...</p>;
  }

  if (lessons.length === 0) {
    return <p>You don't have any timetabled lessons.</p>;
  }

  return (
    <>
      <input onChange={updateSearch} value={searchString} />

      <MainGrid periods={6}>
        <div />
        {dayHeaders}
        {sessionGridContents}
      </MainGrid>
    </>
  );
};

const mapStateToProps = state => {
  return {
    lessons: state.lessons.byPeriod,
    requisitions: state.reqs.byPeriod,
    error: state.lessons.error,
    fetching: state.lessons.fetching,
  };
};

export default connect(mapStateToProps)(Lessons);
