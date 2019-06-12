import React, { useEffect } from "react";
import { Icon } from "semantic-ui-react";

const DatePickerPresentation = ({
  currentDate,
  setCurrentDate,
  jumpWeeks,
  forwardOneDay,
  backwardOneDay,
}) => {
  useEffect(() => {
    if (!currentDate) {
      setCurrentDateToToday();
    }
  });

  const setCurrentDateToToday = () => {
    setCurrentDate(new Date());
  };

  if (!currentDate) return null;

  return (
    <div>
      <Icon
        size="large"
        circular
        onClick={() => jumpWeeks(-1)}
        name="angle double left"
      />
      <Icon
        size="large"
        circular
        onClick={() => backwardOneDay()}
        name="angle left"
      />
      <Icon
        size="large"
        circular
        onClick={() => setCurrentDate(new Date())}
        name="home"
      />

      <Icon
        size="large"
        circular
        onClick={() => forwardOneDay()}
        name="angle right"
      />
      <Icon
        size="large"
        circular
        onClick={() => jumpWeeks(+1)}
        name="angle double right"
      />
    </div>
  );
};

export default DatePickerPresentation;
