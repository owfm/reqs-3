import React from "react";
import { connect } from "react-redux";
import { openModal } from "actions/ui";
import getIsFetching from "reducers";
import { OPEN_REQUISITION } from "actions/modalTypes";
import DoneOutline from "@material-ui/icons/DoneOutline";
import Warning from "@material-ui/icons/Warning";

import emitSnackbar from "actions/snackbar";
import { SessionItem } from "components/styles/SessionItem";
import { Paper, Grid, Typography } from "@material-ui/core";

const ReqMini = ({ req, lesson, openModal }) => {
  if (!req || !lesson) return null;

  return (
    <SessionItem day={lesson.day} period={lesson.period}>
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

const mapStateToProps = (state, ownProps) => {
  const req = state.entitiesById.reqs[ownProps.reqId];

  return {
    req,
    lesson: state.entitiesById.lessons[req.lesson],
    loading: getIsFetching(state, "reqs"),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openModal: params => dispatch(openModal(params)),
    emitSnackbar: message => dispatch(emitSnackbar(message)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReqMini);
