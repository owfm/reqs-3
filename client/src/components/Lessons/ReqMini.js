import React from "react";
import { Card } from "semantic-ui-react";
import { connect } from "react-redux";
import { openModal } from "actions/ui";
import getIsFetching from "reducers";
import { OPEN_REQUISITION } from "actions/modalTypes";

import emitSnackbar from "actions/snackbar";

import { SessionItem } from "components/styles/SessionItem";

const ReqMini = ({ req, lesson, openModal }) => {
  if (!req || !lesson) return null;

  return (
    <SessionItem day={lesson.day} period={lesson.period}>
      <Card
        fluid
        color={req.isDone ? "green" : "red"}
        onClick={() =>
          openModal({
            modalType: OPEN_REQUISITION,
            title: req.title,
            meta: { id: req._id, existingRequisition: true },
          })
        }
        header={`${req.title || "[No title]"}`}
        meta={`${lesson.classgroup} ${lesson.room}`}
      />
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
