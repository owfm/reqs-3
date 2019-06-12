import React from "react";
import Grid from "@material-ui/core/Grid";
import { useTheme } from "@material-ui/styles";
import * as styles from "./styles";

import format from "date-fns/format";
import isSameDay from "date-fns/isSameDay";
import isSunday from "date-fns/isSunday";
import isSaturday from "date-fns/isSaturday";

const DayHeaderPresentation = ({
  datesOfCurrentIsoWeek,
  setCurrentDate,
  currentDate,
}) => {
  if (!datesOfCurrentIsoWeek) {
    return null;
  }

  const theme = useTheme();

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
              <styles.DayName
                theme={theme}
                highlighted={isSameDay(currentDate, currentDay)}
              >
                {format(currentDay, "EEEEE")}
              </styles.DayName>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <styles.HeaderDate
            theme={theme}
            today={isSameDay(new Date(), currentDay)}
          >
            {format(currentDay, "do LLL")}{" "}
          </styles.HeaderDate>
        </Grid>
      </Grid>
    );
  });
};

export default DayHeaderPresentation;
