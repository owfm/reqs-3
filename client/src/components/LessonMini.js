import React from "react";
import { Card } from "semantic-ui-react";
import { connect } from "react-redux";
import history from "history/history";
import emitSnackbar from "actions/snackbar";
import { createSingleReq } from "actions/req";

import SessionItem from "components/styles/SessionItem";

const LessonMini = ({ lesson, createNewReqFromLessonId }) => {
  const createReq = async () => {
    try {
      const requisition = await createNewReqFromLessonId(lesson._id);
      emitSnackbar("New requisition created!");
      history.push(`/reqs/${requisition._id}`);
    } catch (error) {
      console.error(error);
      emitSnackbar("Sorry, something went wrong.");
      history.push("/");
    }
  };
  return (
    <SessionItem day={lesson.day} period={lesson.period}>
      <Card
        onClick={() => createReq()}
        header={lesson.classgroup}
        meta={`${lesson.room} ${lesson.week + lesson.day + lesson.period}`}
      />
    </SessionItem>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    emitSnackbar: message => dispatch(emitSnackbar(message)),
    createNewReqFromLessonId: lessonId =>
      dispatch(createSingleReq({ lesson: lessonId })),
  };
};

const mapStateToProps = (state, ownProps) => {
  const { lessonId } = ownProps;
  return {
    lesson: state.entitiesById.lessons[lessonId],
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LessonMini);
