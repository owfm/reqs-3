import React from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import * as styles from "./styles";

import format from "date-fns/format";
import isSameDay from "date-fns/isSameDay";
import isSunday from "date-fns/isSunday";
import isSaturday from "date-fns/isSaturday";
import { getDatesOfCurrentIsoWeek, getCurrentDate } from "reducers/ui";
import { setCurrentDate } from "actions/date";

const DayHeader = ({ datesOfCurrentIsoWeek, setCurrentDate, currentDate }) => {
  if (!datesOfCurrentIsoWeek) {
    return null;
  }

  return datesOfCurrentIsoWeek.map(currentDay => {
    if (isSunday(currentDay) || isSaturday(currentDay)) return null;

    return (
      <Grid
        key={currentDay}
        container
        direction="column"
        alignItems="center"
        justify="center"
      >
        <Grid item>
          <Grid container direction="row" alignItems="center">
            <Grid item>
              <styles.DayName highlighted={isSameDay(currentDate, currentDay)}>
                {format(currentDay, "EEEEE")}
              </styles.DayName>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <styles.HeaderDate today={isSameDay(new Date(), currentDay)}>
            {format(currentDay, "do LLL")}{" "}
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
