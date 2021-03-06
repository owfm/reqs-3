import axios from "axios";
import * as actions from "actions/types";
import { fetchSingleSchool } from "actions/schools";
import emitSnackbar from "actions/snackbar";

export const signup = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post("api/v1/auth/signup", formProps);

    dispatch({ type: actions.AUTH_USER, payload: response.data });
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));

    callback();
  } catch (error) {
    dispatch({
      type: actions.AUTH_ERROR,
      payload: new Error("Signup failed."),
    });
  }
};

const loginRequest = () => {
  return { type: actions.AUTH_REQUEST };
};

export const login = formProps => async dispatch => {
  try {
    dispatch(loginRequest());
    const response = await axios.post("/api/v1/auth/login", formProps);
    dispatch({ type: actions.AUTH_USER, payload: response.data.data });
    dispatch(emitSnackbar("Logged in!"));
    localStorage.setItem("token", response.data.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.data.user));
    // also, fetch school of logged in person and put it in localstorage
    fetchSingleSchool(response.data.data.user.school);
  } catch (error) {
    dispatch({ type: actions.AUTH_ERROR, payload: error });
    dispatch(
      emitSnackbar("Sorry, there was a problem with your crediantials.")
    );
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("school");
  return {
    type: actions.AUTH_USER,
    payload: "",
  };
};
