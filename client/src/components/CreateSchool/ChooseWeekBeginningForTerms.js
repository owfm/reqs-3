import React from "react";
import * as styles from "./styles";
import { Radio, Form } from "semantic-ui-react";
import isEmpty from "lodash.isempty";

const ChooseWeekBeginningForTerms = ({
  onChange,
  termDates,
  timetableWeekTermStart,
}) => {
  if (isEmpty(termDates)) return null;

  const handleChange = (e, { name, value }) => {
    onChange({ ...timetableWeekTermStart, [name]: value });
  };

  return (
    <>
      <styles.Label>
        On this page, tell us which timetable each half-term begins on. We can
        then work out what timetable week to use on a given date.
      </styles.Label>
      <styles.FormInput>
        <styles.CurrentTermDatesContainer columns={2}>
          <styles.TermRowItem>
            <b>Term</b>
          </styles.TermRowItem>
          <styles.TermRowItem>
            <b>Timetable on first week</b>
          </styles.TermRowItem>

          {Object.keys(termDates).map(term => (
            <React.Fragment key={term}>
              <styles.TermRowItem>{term}</styles.TermRowItem>
              <styles.TermRowItem>
                <Form.Field>
                  <Radio
                    label="Week 1"
                    name={term}
                    value={1}
                    checked={timetableWeekTermStart[term] === 1}
                    onChange={handleChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Radio
                    label="Week 2"
                    name={term}
                    value={2}
                    checked={timetableWeekTermStart[term] === 2}
                    onChange={handleChange}
                  />
                </Form.Field>
              </styles.TermRowItem>
            </React.Fragment>
          ))}
        </styles.CurrentTermDatesContainer>
      </styles.FormInput>
    </>
  );
};

export default ChooseWeekBeginningForTerms;
