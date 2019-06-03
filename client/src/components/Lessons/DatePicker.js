import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Icon } from "semantic-ui-react";
import { setCurrentDate, jumpWeeks } from "actions/date";
import { getCurrentDate } from "reducers/ui";
import { getDatesOfCurrentIsoWeek } from "../../reducers/ui";
import { forwardOneDay } from "../../actions/date";
import { backwardOneDay } from "../../actions/date";

const datePicker = ({
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
    <>
      <Icon
        basic
        circular
        onClick={() => jumpWeeks(-1)}
        name="angle double left"
      />
      <Icon basic circular onClick={() => backwardOneDay()} name="angle left" />
      <Icon
        basic
        circular
        onClick={() => setCurrentDate(new Date())}
        name="home"
      />

      <Icon basic circular onClick={() => forwardOneDay()} name="angle right" />
      <Icon
        basic
        circular
        onClick={() => jumpWeeks(+1)}
        name="angle double right"
      />
    </>
  );
};

const mapStateToProps = state => {
  return {
    currentDate: getCurrentDate(state),
    datesOfCurrentIsoWeek: getDatesOfCurrentIsoWeek(state),
  };
};

const mapDispatchToProps = dispatch => ({
  setCurrentDate: date => dispatch(setCurrentDate(date)),
  jumpWeeks: weeks => dispatch(jumpWeeks(weeks)),
  forwardOneDay: () => dispatch(forwardOneDay()),
  backwardOneDay: () => dispatch(backwardOneDay()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(datePicker);
