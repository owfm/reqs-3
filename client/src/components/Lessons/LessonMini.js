import React from "react";
import { Card } from "semantic-ui-react";
import { connect } from "react-redux";
import emitSnackbar from "actions/snackbar";
import { createSingleReq } from "actions/req";
import { openModal } from "actions/ui";
import { OPEN_REQUISITION } from "actions/modalTypes";

import SessionItem from "components/styles/SessionItem";

const LessonMini = ({ lesson, createNewReqFromLessonId, openModal }) => {
  const createReq = async () => {
    try {
      const requisition = await createNewReqFromLessonId(lesson._id);
      emitSnackbar("New requisition created!");
      openModal({
        modalType: OPEN_REQUISITION,
        title: `Submit New Requisition`,
        meta: { id: requisition._id },
      });
    } catch (error) {
      emitSnackbar("Sorry, something went wrong.");
    }
  };

  return (
    <SessionItem day={lesson.day} period={lesson.period}>
      <Card
        fluid
        onClick={() => createReq()}
        header={lesson.classgroup}
        meta={`${lesson.room} ${lesson.week + lesson.day + lesson.period}`}
      />
    </SessionItem>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    openModal: params => dispatch(openModal(params)),
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
