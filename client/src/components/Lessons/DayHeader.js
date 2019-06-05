import React from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import * as styles from "./styles";

import Typography from "@material-ui/core/Typography";
import Today from "@material-ui/icons/Today";

import format from "date-fns/format";
import isSameDay from "date-fns/isSameDay";
import { getDatesOfCurrentIsoWeek, getCurrentDate } from "reducers/ui";
import { setCurrentDate } from "actions/date";

const DayHeader = ({ datesOfCurrentIsoWeek, setCurrentDate, currentDate }) => {
  if (!datesOfCurrentIsoWeek) {
    return null;
  }

  return ["Mon", "Tue", "Wed", "Thu", "Fri"].map((day, index) => {
    const renderingDate = datesOfCurrentIsoWeek[index + 1];

    return (
      <Grid container direction="column" alignItems="center" justify="center">
        <Grid item>
          <Grid container direction="row" alignItems="center">
            <Grid item>
              <styles.DayName
                highlighted={isSameDay(currentDate, renderingDate)}
              >
                {format(renderingDate, "EEEEE")}
              </styles.DayName>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <styles.HeaderDate today={isSameDay(new Date(), renderingDate)}>
            {format(renderingDate, "EE LLL io Y")}{" "}
          </styles.HeaderDate>
        </Grid>
      </Grid>
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
