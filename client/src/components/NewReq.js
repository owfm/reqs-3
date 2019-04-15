import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { defaultPostParams } from "../lib/defaults";
import {
  debouncedPostPatch,
  deleteReq,
  postPatch
} from "../lib/dataFetchHelpers";

const NewReq = () => {
  const [requisition, setRequisition] = useState({});
  const [message, setMessage] = useState("Creating new requisition...");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetch(`/reqs/`, defaultPostParams, {})
      .then(response => {
        if (response.ok) {
          setMessage("Req created.");
          return response.json();
        } else {
          throw new Error(response.statusText);
        }
      })
      .then(data => {
        setRequisition(data.data);
        setMessage(`New req created with id ${data.data._id}`);
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
      debouncedPostPatch(requisition._id, requisition);
    } catch (error) {}
  };

  const discardDraft = async function() {
    try {
      deleteReq(requisition._id);
      setRedirect(true);
    } catch (error) {
      setMessage("Something went wrong! " + error.message);
    }
  };

  const saveDraft = async function(postStatus) {
    try {
      let requisitionUpdate = { ...requisition };
      const draft = postStatus === "draft";
      requisitionUpdate.draft = draft;
      console.log(requisitionUpdate);

      const response = await postPatch(requisition._id, requisitionUpdate);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setRedirect(true);
      }
    } catch (error) {
      console.error(error);
      setRedirect(true);
    }
  };

  if (redirect) {
    return <Redirect to="/reqs" />;
  }

  return (
    <div>
      <fieldset disabled={!requisition._id}>
        <h3>Title</h3>
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
        <br />
        <button onClick={() => discardDraft()}>Discard</button>
        <button onClick={() => saveDraft("draft")}>Save Draft</button>
        <button onClick={() => saveDraft("final")}>Submit</button>
        <p>{message}</p>
      </fieldset>
    </div>
  );
};

export default NewReq;
