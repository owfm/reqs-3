import React from "react";
import { Card } from "semantic-ui-react";
import { connect } from "react-redux";
import history from "history/history";
import getIsFetching from "reducers";

import emitSnackbar from "actions/snackbar";

import SessionItem from "components/styles/SessionItem";

const ReqMini = ({ req, lesson }) => {
  if (!req || !lesson) return <p>Help me</p>;

  const getReqUrl = () => {
    return `/reqs/${req._id}`;
  };

  return (
    <SessionItem day={lesson.day} period={lesson.period}>
      <Card
        onClick={() => history.push(getReqUrl())}
        header={`${req.title} with ${lesson.classgroup}`}
        meta={`${lesson.room}`}
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
    emitSnackbar: message => dispatch(emitSnackbar(message)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReqMini);
