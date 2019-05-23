import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setCurrentDate, jumpWeeks } from "actions/date";
// import DateFnsUtils from "@date-io/date-fns"; // choose your lib

const datePicker = ({ currentDate, setCurrentDate, jump }) => {
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
      <br />
      <button onClick={() => jump(-1)}>Back 1 week</button>
      <button onClick={() => setCurrentDateToToday()}>Today</button>
      <p>{currentDate.toString()}</p>
      <button onClick={() => jump(+1)}>Forward 1 week</button>
    </>
  );
};

const mapStateToProps = state => {
  const { currentDate } = state.ui;
  return {
    currentDate,
  };
};

const mapDispatchToProps = dispatch => ({
  setCurrentDate: date => dispatch(setCurrentDate(date)),
  jump: weeks => dispatch(jumpWeeks(weeks)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(datePicker);
