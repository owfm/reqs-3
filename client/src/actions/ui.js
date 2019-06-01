import * as actions from "./types";

export const openModal = ({
  modalType,
  title = "",
  message = "",
  meta = {},
}) => {
  return {
    type: actions.OPEN_MODAL,
    payload: { open: true, modalType, title, message, meta },
  };
};

export const closeModal = () => {
  return {
    type: actions.CLOSE_MODAL,
  };
};

export const openDrawer = () => {
  return {
    type: actions.OPEN_DRAWER,
  };
};

export const closeDrawer = () => {
  return {
    type: actions.CLOSE_DRAWER,
  };
};
