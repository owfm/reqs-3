import React, { useState, useEffect } from "react";
import { defaultReq, defaultPostParams } from "../lib/defaults.js";
import { deleteReq } from "../lib/dataFetchHelpers";
import { Link } from "react-router-dom";
import _ from "lodash";

const Reqs = () => {
  const [reqs, setReqs] = useState([]);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState(defaultReq);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/reqs");

        if (response.ok) {
          const data = await response.json();
          setReqs(data.data);
        } else {
          throw new Error(response.statusText);
        }
      } catch (error) {
        setMessage("Something went wrong: " + error.message);
      }
    }
    fetchData();
  }, []);

  const handleChange = e => {
    let form = { ...formData };
    form[e.target.name] = e.target.value;
    setFormData(form);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!formData.title) {
      setMessage("A title is required.");
      return;
    }
    postReq(formData);
  };

  const postReq = async formData => {
    try {
      const response = await fetch("/reqs", {
        ...defaultPostParams,
        body: JSON.stringify(formData) // body data type must match "Content-Type" header
      });
      if (response.ok) {
        const data = await response.json();
        setReqs([...reqs, data.data]);
        setMessage(data.message);
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      setMessage(error.message); // parses JSON response into native Javascript objects
    }
  };

  const handleDelete = async id => {
    try {
      const data = await deleteReq(id);
      setReqs(_.remove(reqs, i => i._id !== id));
    } catch (error) {
      setMessage(`Something went wrong: ${error.message}`);
    }
  };

  return (
    <>
      <fieldset>
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
            {reqs.map(req => (
              <li key={req._id}>
                <Link to={`reqs/${req._id}`}>
                  {req.title} {req.draft ? "(Draft)" : ""}
                </Link>
                <button onClick={() => handleDelete(req._id)}>Delete</button>
              </li>
            ))}
          </ul>
          <p>{message}</p>
        </header>
      </div>
    </>
  );
};

export default Reqs;
