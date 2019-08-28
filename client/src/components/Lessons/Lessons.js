import LessonsPresentation from "./LessonsPresentation";
import { connect } from "react-redux";

import { fetchLessons } from "actions/lessons";
import { fetchReqs } from "actions/req";
import { fetchSingleSchool } from "actions/schools";

import { getErrorMessage, getIsFetching } from "reducers";
import { getDatesOfCurrentIsoWeek } from "reducers/ui";
import { getSessionIdsForCurrentWeek } from "selectors";

import requireAuth from "components/auth/requireAuth";
import { getHolidayDatesForCurrentWeek } from "../../selectors";

const mapDispatchToProps = dispatch => {
  return {
    fetchSchool: id => dispatch(fetchSingleSchool(id)),
    fetchReqs: () => dispatch(fetchReqs()),
    fetchLessons: () => dispatch(fetchLessons()),
  };
};

const mapStateToProps = state => {
  const [lessonIds, reqIds] = getSessionIdsForCurrentWeek(state);

  return {
    lessonIds,
    reqIds,
    datesOfCurrentIsoWeek: getDatesOfCurrentIsoWeek(state),
    holidayDates: getHolidayDatesForCurrentWeek(state),
    lessonError: getErrorMessage(state, "lessons"),
    reqsError: getErrorMessage(state, "reqs"),
    fetchingLessons: getIsFetching(state, "lessons"),
    fetchingReqs: getIsFetching(state, "reqs"),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LessonsPresentation);
