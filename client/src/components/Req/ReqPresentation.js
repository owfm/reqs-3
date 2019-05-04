import React from "react";
import { Input, Form, TextArea, Button } from "semantic-ui-react";
import { ReqPageContainer } from "./styles";
import { Icon } from "semantic-ui-react";

const styles = {
  title: { fontWeight: "bold", fontSize: "1.3rem" },
  textArea: {},
};

const ReqPresentation = ({ requisition, handleChange, save, discard }) => {
  return (
    <ReqPageContainer>
      <Form>
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
        <br />
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
