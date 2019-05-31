import React from "react";
import { Input } from "semantic-ui-react";
import * as styles from "./styles";

const ChooseSchoolName = ({ onChange, school }) => {
  return (
    <>
      <h1>Create a new school</h1>
      <styles.Label htmlFor="schoolNameInput">
        What's the name of your school?
      </styles.Label>
      <Input
        placeholder={"What's your school name?"}
        name={"name"}
        onChange={onChange}
        value={school.name}
        fluid
      />
    </>
  );
};

export default ChooseSchoolName;
