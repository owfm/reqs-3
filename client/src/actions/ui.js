import { SET_PROGRESS_BAR } from "./types";

export const setLoadingBar = progressBarOpen => {
  return {
    type: SET_PROGRESS_BAR,
    progressBarOpen,
  };
};
