import React from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import format from "date-fns/format";
import isSameDay from "date-fns/isSameDay";
import { getFormattedDistanceToDateToNow } from "utils/dateUtils";
import { getDatesOfCurrentIsoWeek, getCurrentDate } from "reducers/ui";
import { setCurrentDate } from "actions/date";

const DayHeader = ({ datesOfCurrentIsoWeek, setCurrentDate, currentDate }) => {
  if (!datesOfCurrentIsoWeek) {
    return null;
  }

  return ["Mon", "Tue", "Wed", "Thu", "Fri"].map((day, index) => {
    const renderingDate = datesOfCurrentIsoWeek[index + 1];

    return (
      <Paper
        elevation={isSameDay(currentDate, renderingDate) ? "5" : "0"}
        onClick={() => setCurrentDate(renderingDate)}
        key={`${day}`}
      >
        <Box textAlign={"center"}>
          <Typography variant="h6">
            {format(datesOfCurrentIsoWeek[index + 1], "eee dd-MM")}
          </Typography>
          <Typography variant="caption">
            {getFormattedDistanceToDateToNow(datesOfCurrentIsoWeek[index + 1])}
          </Typography>
        </Box>
      </Paper>
    );
  });
};

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
)(DayHeader);
