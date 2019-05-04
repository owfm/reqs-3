import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchReqs } from "actions/reqs";
import emitSnackbar from "actions/snackbar";
import { deleteReq, restoreDeletedReq } from "actions/req";
import NewReqActionButton from "components/NewReqActionButton";
import { Icon } from "semantic-ui-react";

const Reqs = ({ dispatch, items, error }) => {
  useEffect(() => {
    dispatch(fetchReqs());
  }, []);

  if (error) {
    dispatch(emitSnackbar(error.message));
  }

  return (
    <>
      <div className="Reqs">
        <header className="Reqs-header">
          <ul>
            {items.map(req => (
              <li key={req._id}>
                <Link to={`reqs/${req._id}`}>
                  {req.title} {req.draft ? "(Draft)" : ""}
                </Link>
                <button onClick={() => dispatch(deleteReq(req._id))}>
                  <Icon link name="delete" />
                </button>
              </li>
            ))}
          </ul>
        </header>
      </div>
      <button onClick={() => dispatch(restoreDeletedReq())}>Undo</button>
      <NewReqActionButton />
    </>
  );
};

const mapStateToProps = state => {
  const { items, fetching, error } = state.reqs;

  return {
    items: items || [],
    fetching,
    error,
  };
};

export default connect(mapStateToProps)(Reqs);
