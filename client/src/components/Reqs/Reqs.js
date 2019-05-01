import React, { useState, useEffect } from "react";
import { defaultReq } from "../../lib/defaults.js";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchReqs } from "actions/reqs";
import { deleteReq, submitReq } from "actions/req";

const Reqs = ({ dispatch, reqs }) => {
  const [formData, setFormData] = useState(defaultReq);

  useEffect(() => {
    dispatch(fetchReqs());
  }, []);

  const handleChange = e => {
    let form = { ...formData };
    form[e.target.name] = e.target.value;
    setFormData(form);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!formData.title) {
      return;
    }
    dispatch(submitReq(formData));
  };

  return (
    <>
      <button onClick={() => dispatch("success", "this is a test!")}>
        Click Me!
      </button>
      <fieldset>
        <h4>Title</h4>
        <textarea
          name="title"
          onChange={handleChange}
          value={formData.title}
          placeholder="Title"
        />
        <textarea
          name="equipment"
          onChange={handleChange}
          value={formData.equipment}
          placeholder="Equipment"
        />
        <textarea
          name="notes"
          onChange={handleChange}
          value={formData.notes}
          placeholder="Notes"
        />
        <input
          name="period"
          onChange={handleChange}
          value={formData.period}
          placeholder="Period"
        />

        <input
          name="day"
          onChange={handleChange}
          value={formData.day}
          placeholder="Day"
        />
        <button onClick={handleSubmit} type="submit">
          Submit
        </button>
      </fieldset>
      <div className="Reqs">
        <header className="Reqs-header">
          <ul>
            {/* {console.log(data)} */}
            {reqs.reqs.map(req => (
              <li key={req._id}>
                <Link to={`reqs/${req._id}`}>
                  {req.title} {req.draft ? "(Draft)" : ""}
                </Link>
                <button onClick={() => dispatch(deleteReq(req._id))}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </header>
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return { reqs: state.reqs || [] };
};

export default connect(mapStateToProps)(Reqs);
