import axios from "axios";
import { AUTH_USER, AUTH_ERROR } from "actions/types";

export const signup = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post("api/v1/auth/signup", formProps);

    dispatch({ type: AUTH_USER, payload: response.data });
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));

    callback();
  } catch (error) {
    dispatch({ type: AUTH_ERROR, payload: new Error("Signup failed.") });
  }
};

export const login = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post("/api/v1/auth/login", formProps);
    dispatch({ type: AUTH_USER, payload: response.data });
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    return response;
  } catch (error) {
    dispatch({ type: AUTH_ERROR, payload: error });
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  return {
    type: AUTH_USER,
    payload: "",
  };
};
