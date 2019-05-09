import React, { useState } from "react";
import { connect } from "react-redux";
import requireAuth from "components/requireAuth";
import { Input, Form, Button, Icon, Divider } from "semantic-ui-react";

const CreateSchool = ({ auth }) => {
  const [school, setSchool] = useState({ name: "" });

  const handleChange = e => {
    setSchool({ [e.target.name]: e.target.value });
  };

  const save = async () => {
    const response = await fetch("/school", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(school),
    });
    const json = response.json();
    console.log(json);
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
