import React from "react";
import formatDistance from "date-fns/formatDistance";
import format from "date-fns/format";
import {
  Input,
  Form,
  TextArea,
  Button,
  Checkbox,
  Divider,
  List,
} from "semantic-ui-react";
import { ReqPageContainer } from "./styles";

const styles = {
  title: { fontWeight: "bold", fontSize: "1.05rem" },
  textArea: {},
  heading: { padding: 0, marginBottom: 0 },
  subheading: { fontWeight: 100, marginTop: 0 },
};

const ReqPresentation = ({
  requisition,
  lesson,
  handleChange,
  toggleDone,
  save,
  discard,
}) => {
  if (!requisition || !lesson) return null;
  return (
    <ReqPageContainer>
      <List>
        <List.Item>
          <List.Icon name="users" />
          <List.Content>{lesson.classgroup}</List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name="calendar outline" />
          <List.Content>{`${format(
            new Date(requisition.date),
            "cccc MMM Mo"
          )} (in ${formatDistance(
            new Date(requisition.date),
            new Date()
          )})`}</List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name="time" />
          <List.Content>{`Period ${lesson.period}`}</List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name="building outline" />
          <List.Content>{lesson.room}</List.Content>
        </List.Item>
      </List>
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
        <Button
          negative
          onClick={e => {
            e.preventDefault();
            discard(requisition._id);
          }}
          icon={"delete"}
          labelPosition={"left"}
          content={requisition.title ? "Delete" : "Cancel"}
        />
        <Button
          disabled={!requisition.title}
          onClick={e => {
            e.preventDefault();
            save("draft");
          }}
          icon={"edit outline"}
          content={"Save as draft"}
        />
        <Button
          positive
          type="submit"
          icon="paper plane"
          labelPosition="right"
          content="Send!"
          disabled={!requisition.title}
          onClick={e => {
            e.preventDefault();
            save("final");
          }}
        />
      </Form>
    </ReqPageContainer>
  );
};

export default ReqPresentation;
