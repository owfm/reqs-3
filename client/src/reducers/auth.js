import { AUTH_USER, AUTH_ERROR } from "actions/types";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  authenticated: localStorage.getItem("token") || null,
  errorMessage: "",
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        authenticated: action.payload.token,
        user: action.payload.user || null,
      };
    case AUTH_ERROR:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
}
