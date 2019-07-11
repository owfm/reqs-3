import axios from "axios";
import * as actions from "actions/types";

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

export const login = (formProps, callback) => async dispatch => {
  try {
    console.log("hi login action");
    dispatch(loginRequest());
    const response = await axios.post("/api/v1/auth/login", formProps);
    dispatch({ type: actions.AUTH_USER, payload: response.data });
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    return response;
  } catch (error) {
    dispatch({ type: actions.AUTH_ERROR, payload: error });
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  return {
    type: actions.AUTH_USER,
    payload: "",
  };
};
