import React, { useState } from "react";
import { useTheme } from "@material-ui/styles";
import AddCircle from "@material-ui/icons/AddCircle";

import AddCircleOutline from "@material-ui/icons/AddCircleOutline";
import { SessionItem } from "components/styles/SessionItem";
import { Grid, Typography } from "@material-ui/core";
import * as styles from "./styles";

const LessonMiniPresentation = ({ lesson, onPaperClick }) => {
  const [hover, setHover] = useState(false);

  const theme = useTheme();

  return (
    <SessionItem day={lesson.day} period={lesson.period}>
      <styles.SessionPaper
        onClick={() => onPaperClick()}
        style={
          hover
            ? { color: theme.palette.primary.main, cursor: "pointer" }
            : null
        }
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
          <Grid>{hover ? <AddCircle /> : <AddCircleOutline />}</Grid>
          <Grid />
        </Grid>
      </styles.SessionPaper>
    </SessionItem>
  );
};

export default LessonMiniPresentation;
