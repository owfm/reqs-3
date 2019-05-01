import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { defaultReq } from "../../lib/defaults";
import { fetchReqsFailure } from "actions/reqs";
import emitSnackbar from "actions/snackbar";

const Req = ({ match, dispatch }) => {
  const [requisition, setRequisition] = useState(defaultReq);

  useEffect(() => {
    const { id } = match.params;

    fetch(`/reqs/${id}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.statusText);
        }
      })
      .then(data => {
        setRequisition(data);
      })
      .catch(error => {
        dispatch(emitSnackbar("Something went wrong! " + error.message));
        dispatch(fetchReqsFailure(error));
      });
  }, []);

  // useEffect(() => {
  //   dispatch(updateReq(requisition));
  // }, [requisition]);

  const handleChange = function(e) {
    let form = { ...requisition };
    form[e.target.name] = e.target.value;
    setRequisition(form);
  };

  return (
    <div>
      <fieldset>
        <input
          type="text"
          name="title"
          value={requisition.title}
          onChange={handleChange}
        />
        {requisition.day}
        {requisition.period}
        <h3>Equipment</h3>
        <input
          type="text"
          name="equipment"
          value={requisition.equipment}
          onChange={handleChange}
        />

        <h3>Notes</h3>
        <input
          type="text"
          name="notes"
          value={requisition.notes}
          onChange={handleChange}
        />
      </fieldset>
    </div>
  );
};

export default connect()(Req);
