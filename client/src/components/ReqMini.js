import React, { useState } from "react";
import { Card } from "semantic-ui-react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import emitSnackbar from "actions/snackbar";

const ReqMini = ({ requisition }) => {
  const [redirect, setRedirect] = useState({ go: false, url: null });

  if (redirect.go) {
    return <Redirect to={redirect.url} />;
  }

  const getReqUrl = () => {
    return `/reqs/${requisition._id}`;
  };

  return (
    <Card
      onClick={() => setRedirect({ go: true, url: getReqUrl() })}
      header={`${requisition.title} with ${requisition.lesson.classgroup}`}
      meta={`${requisition.lesson.room}`}
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
)(ReqMini);
