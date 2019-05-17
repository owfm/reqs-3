import React, { useState } from "react";
import { Card } from "semantic-ui-react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import emitSnackbar from "actions/snackbar";

const LessonMini = ({ lesson }) => {
  const [redirect, setRedirect] = useState({ go: false, url: null });
  const createNewReqFromLesson = lesson => {
    return fetch("/reqs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lesson: lesson._id }),
    })
      .then(response => response.json())
      .then(json => {
        emitSnackbar(`New req created with id ${json.data._id}`);
        setRedirect({ go: true, url: `/reqs/${json.data._id}` });
      })
      .catch(error => emitSnackbar(`Something went wrong! ${error.message}`));
  };

  if (redirect.go) {
    return <Redirect to={redirect.url} />;
  }

  return (
    <Card
      onClick={() => createNewReqFromLesson(lesson)}
      header={lesson.classgroup}
      meta={`${lesson.room}`}
    />
  );
};

const mapDispatchToProps = dispatch => {
  return {
    emitSnackbar: message => dispatch(emitSnackbar(message)),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(LessonMini);
