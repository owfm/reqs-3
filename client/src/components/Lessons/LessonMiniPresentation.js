import React, { useState } from "react";
import AddCircleOutline from "@material-ui/icons/AddCircleOutline";
import { SessionItem } from "components/styles/SessionItem";
import { Grid, Typography, Button } from "@material-ui/core";
import * as styles from "./styles";

const LessonMiniPresentation = ({ lesson, onPaperClick }) => {
  const [hover, setHover] = useState(false);

  return (
    <SessionItem day={lesson.day} period={lesson.period}>
      <styles.SessionPaper
        style={hover ? hoverStyle : null}
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
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
          <Grid>
            {hover ? (
              <Button
                onClick={() => onPaperClick()}
                size="small"
                style={{ color: "red" }}
              >
                Add Req
              </Button>
            ) : (
              <AddCircleOutline />
            )}
          </Grid>
          <Grid />
        </Grid>
      </styles.SessionPaper>
    </SessionItem>
  );
};

export default LessonMiniPresentation;

const hoverStyle = { color: "red" };
