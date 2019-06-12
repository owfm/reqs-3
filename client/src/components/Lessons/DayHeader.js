import DayHeaderPresentation from "./DayHeaderPresentation";
import { connect } from "react-redux";
import { getDatesOfCurrentIsoWeek, getCurrentDate } from "reducers/ui";
import { setCurrentDate } from "actions/date";

const mapStateToProps = state => {
  return {
    datesOfCurrentIsoWeek: getDatesOfCurrentIsoWeek(state),
    currentDate: getCurrentDate(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrentDate: date => dispatch(setCurrentDate(date)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DayHeaderPresentation);
