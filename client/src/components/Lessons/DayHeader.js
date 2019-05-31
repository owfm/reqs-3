import React from "react";
import { connect } from "react-redux";
import format from "date-fns/format";
import { getDatesOfCurrentIsoWeek } from "reducers/ui";

const DayHeader = ({ datesOfCurrentIsoWeek }) => {
  if (!datesOfCurrentIsoWeek) {
    console.info("RETURNING NULL");
    return null;
  }
  return ["Mon", "Tue", "Wed", "Thu", "Fri"].map((day, index) => (
    <div style={{ justifySelf: "center", fontWeight: "bold" }} key={`${day}`}>
      <>
        {day}
        <br />
        {format(datesOfCurrentIsoWeek[index + 1], "eee dd-MM")}
      </>
    </div>
  ));
};

const mapStateToProps = state => {
  return {
    datesOfCurrentIsoWeek: getDatesOfCurrentIsoWeek(state),
  };
};

export default connect(mapStateToProps)(DayHeader);
