import React from "react";
import * as styles from "./styles";
import { Form, Radio } from "semantic-ui-react";

const ChooseTimetableWeeks = ({ onChange, school }) => {
  return (
    <>
      <styles.Label htmlFor="weekselect">
        Do you have a one or two week timetable?
      </styles.Label>
      <styles.FormInput>
        <Form.Field>
          <Radio
            label="1 week timetable"
            name="radioGroup"
            value={1}
            checked={school.timetableWeeks === 1}
            onChange={onChange}
          />
        </Form.Field>
        <Form.Field>
          <Radio
            label="2 week timetable"
            name="radioGroup"
            value={2}
            checked={school.timetableWeeks === 2}
            onChange={onChange}
          />
        </Form.Field>
      </styles.FormInput>
    </>
  );
};

export default ChooseTimetableWeeks;
