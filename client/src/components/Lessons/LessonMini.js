import React, { useState } from "react";
import { connect } from "react-redux";
import AddCircleOutline from "@material-ui/icons/AddCircleOutline";
import AddCircle from "@material-ui/icons/AddCircle";
import { SessionItem } from "components/styles/SessionItem";
import { Paper, Grid, Typography } from "@material-ui/core";

import { createReqAndOpenModal } from "actions/req";

const LessonMini = ({ lesson, onPaperClick }) => {
  const [hover, setHover] = useState(false);

  return (
    <SessionItem day={lesson.day} period={lesson.period}>
      <Paper
        style={hover ? hoverStyle : null}
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => onPaperClick()}
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

const mapDispatchToProps = (dispatch, ownProps) => {
  const { lessonId } = ownProps;
  return {
    onPaperClick: () => dispatch(createReqAndOpenModal({ lesson: lessonId })),
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
