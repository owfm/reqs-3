import * as actions from "actions/types";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";

export const setCurrentDate = payload => {
  try {
    const date = setTimeToMidday(payload);
    return {
      type: actions.SET_CURRENT_DATE,
      payload: date,
    };
  } catch (error) {
    return {
      type: actions.SET_DATE_FAILURE,
      payload: "Problem setting the date.",
    };
  }
};

export const jumpWeeks = weeks => {
  return { type: actions.JUMP_WEEKS, payload: weeks };
};

export const forwardOneDay = () => {
  return { type: actions.FORWARD_ONE_DAY };
};

export const backwardOneDay = () => {
  return { type: actions.BACKWARD_ONE_DAY };
};

const setTimeToMidday = dateString => {
  // return new Date(dateString);
  return setMinutes(setHours(new Date(dateString), 12), 0);
};
