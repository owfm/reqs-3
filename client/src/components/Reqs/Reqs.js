import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Icon } from "semantic-ui-react";
import requireAuth from "components/requireAuth";
import NewReqActionButton from "components/NewReqActionButton";
import { fetchReqs } from "actions/reqs";
import emitSnackbar from "actions/snackbar";
import { deleteReq } from "actions/req";

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
