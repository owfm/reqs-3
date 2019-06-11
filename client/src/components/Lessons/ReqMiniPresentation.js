import React, { useState } from "react";
import { OPEN_REQUISITION } from "actions/modalTypes";
import DoneOutline from "@material-ui/icons/DoneOutline";
import Warning from "@material-ui/icons/Warning";

import { SessionItem } from "components/styles/SessionItem";
import { Paper, Grid, Typography } from "@material-ui/core";

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
      <Paper
        onClick={() =>
          openModal({
            modalType: OPEN_REQUISITION,
            title: `${req.title || "[No title]"}`,
            meta: { id: req._id, existingRequisition: true },
          })
        }
      >
        <Grid container direction="column" alignItems="center" justify="center">
          <Grid item>
            <Grid container spacing={3} direction="row" alignItems="center">
              <Typography variant={"h6"}>
                {req.title || "[No title]"}
              </Typography>
              {req.isDone && (
                <Grid item>
                  <DoneOutline style={{ color: "green" }} />
                </Grid>
              )}
              {req.hasIssue && (
                <Grid item>
                  <Warning style={{ color: "red" }} />
                </Grid>
              )}
            </Grid>
          </Grid>
          <Grid item>{`${lesson.classgroup} ${lesson.room}`}</Grid>
        </Grid>
      </Paper>
    </SessionItem>
  );
};

export default ReqMiniPresentation;

const hoverStyle = {
  cursor: "pointer",
};
