import React, { useState } from "react";
import moment from "moment";
import { Button } from "semantic-ui-react";
import * as styles from "./styles";

import isEmpty from "lodash.isempty";
import { DateRangePicker } from "react-dates";

const terms = [
  "Winter Half-Term 1",
  "Winter Half-Term 2",
  "Spring Half-Term 1",
  "Spring Half-Term 2",
  "Summer Half-Term 1",
  "Summer Half-Term 2",
];

const DisplayCurrentTermDates = ({ termDates }) => {
  if (isEmpty(termDates)) return null;
  if (!checkTermDatesValidMoments(termDates)) return null;

  return (
    <styles.CurrentTermDatesContainer columns={3}>
      <styles.TermRowItem>
        <b>Term</b>
      </styles.TermRowItem>
      <styles.TermRowItem>
        <b>Start</b>
      </styles.TermRowItem>
      <styles.TermRowItem>
        <b>End</b>
      </styles.TermRowItem>

      {Object.keys(termDates).map(term => {
        return (
          <React.Fragment key={term}>
            <styles.TermRowItem>{term}</styles.TermRowItem>
            <styles.TermRowItem>
              {termDates[term][0].format("MMM Do YY")}
            </styles.TermRowItem>
            <styles.TermRowItem>
              {termDates[term][1].format("MMM Do YY")}
            </styles.TermRowItem>
          </React.Fragment>
        );
      })}
    </styles.CurrentTermDatesContainer>
  );
};

const ChooseTermDates = ({ termDates, setTermDates, reset }) => {
  const [currentStartDate, setCurrentStartDate] = useState(null);
  const [currentEndDate, setCurrentEndDate] = useState(null);
  const [focus, setFocus] = useState(null);

  const [currentTermIndex, setCurrentTermIndex] = useState(0);

  const handleDateSelect = (startDate, endDate) => {
    setCurrentStartDate(startDate);
    setCurrentEndDate(endDate);
    setTermDates({
      ...termDates,
      [terms[currentTermIndex]]: [startDate, endDate],
    });
    if (startDate && endDate) {
      setCurrentTermIndex(currentTermIndex + 1);
      setCurrentStartDate(null);
      setCurrentEndDate(null);
    }
  };

  return (
    <>
      <styles.Label>
        Choose the first and last school day:
        <br /> <b>{terms[currentTermIndex]}</b>
        <Button
          onClick={() => {
            reset();
            setCurrentTermIndex(0);
          }}
        >
          Clear dates and start again.
        </Button>
      </styles.Label>
      <styles.FormInput>
        <DateRangePicker
          noBorder
          isOutsideRange={day => checkIfDayIsInTermtime(termDates, day)}
          // startDatePlaceholderText={terms[currentTermIndex] + " start date"}
          // endDatePlaceholderText={terms[currentTermIndex] + " end date"}
          startDate={currentStartDate} // momentPropTypes.momentObj or null,
          startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
          endDate={currentEndDate} // momentPropTypes.momentObj or null,
          endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
          onDatesChange={({ startDate, endDate }) =>
            handleDateSelect(startDate, endDate)
          } // PropTypes.func.isRequired,
          focusedInput={focus} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
          onFocusChange={f => setFocus(f)} // PropTypes.func.isRequired,
        />

        <DisplayCurrentTermDates termDates={termDates} />
      </styles.FormInput>
    </>
  );
};

export default ChooseTermDates;

const checkIfDayIsInTermtime = (termDates, day) => {
  if (termDates.length === 0) return false;
  if (!moment.isMoment(day)) return false;
  if (!checkTermDatesValidMoments) return false;

  const dates = [];

  Object.keys(termDates).forEach(term => {
    termDates[term].forEach(date => {
      if (!moment.isMoment(date)) return;
      dates.push(date);
    });
  });

  if (dates.length === 0) return false;

  const maxDate = moment.max(dates);
  return !day.isAfter(maxDate);
};

const checkTermDatesValidMoments = termDates => {
  let flag = true;
  Object.keys(termDates).forEach(term => {
    termDates[term].forEach(date => {
      if (!moment.isMoment(date)) flag = false;
    });
  });
  return flag;
};
