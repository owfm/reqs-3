import React, { useState } from "react";
import { OPEN_REQUISITION } from "actions/modalTypes";
import * as styles from "./styles";
import { SessionItem } from "components/styles/SessionItem";
import { Grid, Typography } from "@material-ui/core";

const ReqMiniPresentation = ({ req, lesson, openModal }) => {
  if (!req || !lesson) return null;

  const [hover, setHover] = useState(false);

  return (
    <SessionItem
      style={hover ? hoverStyle : null}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      day={lesson.day}
      period={lesson.period}
    >
      <styles.SessionPaper
        onClick={() =>
          openModal({
            modalType: OPEN_REQUISITION,
            title: `${req.title || "[No title]"}`,
            meta: { id: req._id, existingRequisition: true },
          })
        }
      >
        <Grid container alignItems="center" justify="center" direction="column">
          <Grid item>
            <Typography variant={"h6"}>{req.title || "[No title]"}</Typography>
          </Grid>
          <Grid item>
            <Typography varient={"body"}>
              {`${lesson.room} ${lesson.week + lesson.day + lesson.period}`}
            </Typography>
          </Grid>
          <Grid />
        </Grid>
      </styles.SessionPaper>
    </SessionItem>
  );
};

export default ReqMiniPresentation;

const hoverStyle = {
  cursor: "pointer",
};
