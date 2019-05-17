import React from "react";
import styled from "styled-components";
import {
  Input,
  Form,
  TextArea,
  Button,
  Icon,
  Checkbox,
  Divider,
} from "semantic-ui-react";
import { ReqPageContainer } from "./styles";

const styles = {
  title: { fontWeight: "bold", fontSize: "1.05rem" },
  textArea: {},
  heading: { padding: 0, marginBottom: 0 },
  subheading: { fontWeight: 100, marginTop: 0 },
};

const Heading = styled.h1`
  margin-bottom: 0;
`;
const SubHeading = styled.h3`
  margin-top: 0;
  color: #474a4f;
`;
const ReqPresentation = ({
  requisition,
  handleChange,
  toggleDone,
  save,
  discard,
}) => {
  return (
    <ReqPageContainer>
      <span>
        <Heading styles={styles.heading}>
          {requisition.lesson.classgroup}
        </Heading>
        <SubHeading styles={styles.subheading}>
          {requisition.lesson.week}
          {requisition.lesson.day}
          {requisition.lesson.period}
        </SubHeading>
      </span>
      <Divider />
      <Form>
        <h5>Lesson Title</h5>

        <Input
          style={styles.title}
          placeholder={"What's your lesson title?"}
          name={"title"}
          onChange={handleChange}
          value={requisition.title}
          fluid
        />
        <h5>Equipment</h5>
        <TextArea
          rows={3}
          placeholder={"What do you need?"}
          value={requisition.equipment}
          name={"equipment"}
          onChange={handleChange}
        />
        <h5>Notes</h5>
        <TextArea
          placeholder={"Anything else?"}
          value={requisition.notes}
          name={"notes"}
          onChange={handleChange}
        />
        <Divider />
        <Checkbox
          checked={requisition.isDone}
          onChange={toggleDone}
          toggle
          label="Mark this requisition as done."
        />
        <Divider />
        <Button.Group>
          <Button
            onClick={e => {
              e.preventDefault();
              discard(requisition._id);
            }}
          >
            <Icon link name="delete" />
          </Button>
          <Button
            onClick={e => {
              e.preventDefault();
              save("draft");
            }}
          >
            <Icon link name="edit outline" />
          </Button>
          <Button
            type="submit"
            disabled={!requisition.title}
            onClick={e => {
              e.preventDefault();
              save("final");
            }}
          >
            <Icon link name="paper plane" />
          </Button>
        </Button.Group>
      </Form>
    </ReqPageContainer>
  );
};

export default ReqPresentation;
