import React, { useState } from "react";
import { connect } from "react-redux";
import requireAuth from "components/requireAuth";
import { Input, Form, Button, Icon, Divider } from "semantic-ui-react";
import emitSnackbar from "actions/snackbar";
import history from "history/history";

const CreateSchool = ({ auth, dispatch }) => {
  const [school, setSchool] = useState({ name: "" });

  const handleChange = e => {
    setSchool({ [e.target.name]: e.target.value });
  };

  const save = async () => {
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
    <Form>
      <Input
        placeholder={"What's your school name?"}
        name={"name"}
        onChange={handleChange}
        value={school.name}
        fluid
      />

      <Divider />
      <Button
        type="submit"
        disabled={!school.name}
        onClick={e => {
          e.preventDefault();
          save();
        }}
      >
        <Icon link name="paper plane" />
      </Button>
    </Form>
  );
};

export default requireAuth(connect()(CreateSchool));
