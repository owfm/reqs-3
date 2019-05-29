import React, { useState } from "react";
import { Input, Form, Button, Icon, Divider } from "semantic-ui-react";
import emitSnackbar from "actions/snackbar";
import history from "history/history";
import format from "date-fns/format";

import { FormContainer, Label } from "./styles";

import MultipleDatePicker from "react-multiple-datepicker";

const CreateSchool = ({ auth, dispatch }) => {
  const [termDates, setTermDates] = useState([]);
  const [school, setSchool] = useState({ name: "" });

  console.log(termDates);

  const handleDatesSelect = dates => {
    if (dates.length !== 12) {
      dispatch(
        emitSnackbar(
          "You must select 12 dates—the first and last day of each half term."
        )
      );
      setTermDates([]);
    }
    // convert to dates
    let termDates = dates.map(d => new Date(d));
    // sort dates
    termDates = termDates.sort((a, b) => a.getTime() - b.getTime());
    setTermDates(termDates);
  };

  const handleChange = e => {
    setSchool({ [e.target.name]: e.target.value });
  };

  const save = async event => {
    event.preventDefault();
    try {
      const response = await fetch("/school", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(school),
      });
      if (response.ok) {
        const json = response.json();
        dispatch(emitSnackbar(`School ${json.data.name} created.`));
        history.push("/lessons");
      }
    } catch (err) {}
  };

  return (
    <>
      <FormContainer>
        <Label>Click on all the start and end dates of your terms.</Label>
        <MultipleDatePicker
          dates={termDates}
          onSubmit={dates => handleDatesSelect(dates)}
        />
        {
          <ul>
            {termDates.map(date => (
              <li>{format(date, "d-LLL-u")}</li>
            ))}
          </ul>
        }

        <Label for="schoolNameInput">What's the name of your school?</Label>
        <Input
          placeholder={"What's your school name?"}
          name={"name"}
          onChange={handleChange}
          value={school.name}
          fluid
        />
      </FormContainer>
      <Button onClick={() => save()} type="submit" disabled={!school.name}>
        <Icon link name="paper plane" />
      </Button>
    </>
  );
};

export default CreateSchool;

const defaultTermDates = {
  winter1: { startDate: null, endDate: null },
  winter2: { startDate: null, endDate: null },
  spring1: { startDate: null, endDate: null },
  spring2: { startDate: null, endDate: null },
  summer1: { startDate: null, endDate: null },
  summer2: { startDate: null, endDate: null },
};
