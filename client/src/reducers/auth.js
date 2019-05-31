import { AUTH_USER, AUTH_ERROR } from "actions/types";

const defaultUser = {
  admin: false,
  _id: "5cf03e83b1de672505fe2597",
  email: "o.mansell@holyfamily.waltham.sch.uk",
  password: "$2a$10$F9AfCSx2RTzjefZNh7rLCOq9KoeBsNrevtQjTIzEJzT389hZGJMYu",
  school: "5cf1036d92d4dc378f0a43e6",
};

const INITIAL_STATE = {
  user: defaultUser,
  // user: JSON.parse(localStorage.getItem("user")) || null,
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
