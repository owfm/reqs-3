import React, { useState, useEffect } from "react";
import { defaultReq } from "../lib/defaults";
import { debouncedPostPatch } from "../lib/dataFetchHelpers";
import _ from "lodash";

const Req = ({ match }) => {
  const [requisition, setRequisition] = useState(defaultReq);
  const [saveState, setSaveState] = useState({ saving: false, error: false });
  const [message, setMessage] = useState("");

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
        setMessage("Something went wrong! " + error.message);
      });
  }, []);

  const handleChange = function(e) {
    let form = { ...requisition };
    form[e.target.name] = e.target.value;
    setRequisition(form);
    try {
      debouncedPostPatch(match.params.id, requisition);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {saveState.saving ? <p>Saving...</p> : <p>Changes up to date.</p>}
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
        <p>{message}</p>
      </fieldset>
    </div>
  );
};
export default Req;
