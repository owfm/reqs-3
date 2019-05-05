import React from "react";
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
import {} from "semantic-ui-react";
import {} from "semantic-ui-react";

const styles = {
  title: { fontWeight: "bold", fontSize: "1.05rem" },
  textArea: {},
};

const ReqPresentation = ({
  requisition,
  handleChange,
  toggleDone,
  save,
  discard,
}) => {
  return (
    <ReqPageContainer>
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
