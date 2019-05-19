import React, { useState } from "react";
import { Card } from "semantic-ui-react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import emitSnackbar from "actions/snackbar";

const ReqMini = ({ requisition, lesson }) => {
  const [redirect, setRedirect] = useState({ go: false, url: null });

  if (redirect.go) {
    return <Redirect to={redirect.url} />;
  }

  if (!lesson) return <p>Loading...</p>;

  const getReqUrl = () => {
    return `/reqs/${requisition._id}`;
  };

  return (
    <Card
      onClick={() => setRedirect({ go: true, url: getReqUrl() })}
      header={`${requisition.title} with ${lesson.classgroup}`}
      meta={`${lesson.room}`}
    />
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    lesson: state.lessons.byId[ownProps.requisition.lesson],
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
