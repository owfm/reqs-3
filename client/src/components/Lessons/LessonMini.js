import React, { useState } from "react";
import { connect } from "react-redux";
import AddCircleOutline from "@material-ui/icons/AddCircleOutline";
import AddCircle from "@material-ui/icons/AddCircle";

import emitSnackbar from "actions/snackbar";
import { createSingleReq } from "actions/req";
import { openModal } from "actions/ui";
import { OPEN_REQUISITION } from "actions/modalTypes";

import { SessionItem } from "components/styles/SessionItem";
import { Paper, Grid, Typography } from "@material-ui/core";

const LessonMini = ({ lesson, createNewReqFromLessonId, openModal }) => {
  const createReq = async () => {
    try {
      const requisition = await createNewReqFromLessonId(lesson._id);
      emitSnackbar("New requisition created!");
      openModal({
        modalType: OPEN_REQUISITION,
        title: `Submit New Requisition`,
        meta: { id: requisition._id, existingRequisition: false },
      });
    } catch (error) {
      emitSnackbar("Sorry, something went wrong.");
    }
  };

  const [hover, setHover] = useState(false);

  return (
    <SessionItem day={lesson.day} period={lesson.period}>
      <Paper
        style={hover ? hoverStyle : null}
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => createReq()}
      >
        <Grid container alignItems="center" justify="center" direction="column">
          <Grid item>
            <Typography variant={"h6"}>{lesson.classgroup}</Typography>
          </Grid>
          <Grid item>
            <Typography varient={"body"}>
              {`${lesson.room} ${lesson.week + lesson.day + lesson.period}`}
            </Typography>
          </Grid>
          <Grid>{hover ? <AddCircle /> : <AddCircleOutline />}</Grid>
          <Grid />
        </Grid>
      </Paper>
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

const hoverStyle = { color: "red", cursor: "pointer" };
