import React, { useState, useEffect } from "react";
import { defaultReq } from "../lib/defaults.js";

const Req = ({ match }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    const { id } = match.params;
    fetch(`/reqs/${id}`)
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  console.log(data);

  return (
    <div>
      <h1>{data.title}</h1>
      <h3>Equipment</h3>
      <p>{data.equipment}</p>
      <h3>Notes</h3>
      <p>{data.notes}</p>
    </div>
  );
};
export default Req;
