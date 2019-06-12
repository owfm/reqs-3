import DatePickerPresentation from "./DatePickerPresentation";
import { connect } from "react-redux";
import { setCurrentDate, jumpWeeks } from "actions/date";
import { getCurrentDate } from "reducers/ui";
import { getDatesOfCurrentIsoWeek } from "../../reducers/ui";
import { forwardOneDay } from "../../actions/date";
import { backwardOneDay } from "../../actions/date";

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
)(DatePickerPresentation);
