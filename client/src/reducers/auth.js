import * as actions from "actions/types";

const defaultUser = {
  admin: false,
  firstName: "Oliver",
  lastName: "Mansell",
  _id: "5cf03e83b1de672505fe2597",
  email: "o.mansell@holyfamily.waltham.sch.uk",
  password: "$2a$10$F9AfCSx2RTzjefZNh7rLCOq9KoeBsNrevtQjTIzEJzT389hZGJMYu",
  school: "5cf1036d92d4dc378f0a43e6",
};

// const INITIAL_STATE_LOGGED_OUT = {
//   user: null,
//   authenticated: null,
//   errorMessage: "",
// };

const INITIAL_STATE_LOGGED_IN = {
  user: defaultUser,
  // user: JSON.parse(localStorage.getItem("user")) || null,
  authenticated:
    localStorage.getItem("token") ||
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1Y2YwM2U4M2IxZGU2NzI1MDVmZTI1OTciLCJpYXQiOjE1NTkzMzY2MTc0MTZ9.iUK_bfHnwqJRB8SwT61bKkGyYtkbiTDB-tiiU34HeuI",
  errorMessage: "",
};

export default function(state = INITIAL_STATE_LOGGED_IN, action) {
  switch (action.type) {
    case actions.AUTH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actions.AUTH_USER:
      return {
        ...state,
        loading: false,
        authenticated: action.payload.token,
        user: action.payload.user || null,
      };
    case actions.AUTH_ERROR:
      return { ...state, loading: false, errorMessage: action.payload };
    default:
      return state;
  }
}
