import * as actions from "actions/types";

export const setCurrentDate = payload => {
  return {
    type: actions.SET_CURRENT_DATE,
    payload,
  };
};

export const jumpWeeks = weeks => {
  return { type: actions.JUMP_WEEKS, payload: weeks };
};
