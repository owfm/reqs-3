import React from "react";
import { connect } from "react-redux";

const teacherUse = {
  firstName: "ollie",
  lastName: "mansll",
  email: "ollie.mansell@olle.com",
  role: "Teacher",
  admin: false,
};

const technicianUse = {
  firstName: "samantha",
  lastName: "mansll",
  email: "samantha.mansell@olle.com",
  role: "Technician",
  admin: false,
};

const userSelector = ({ dispatch }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "flex-end",
        fontSize: "1.2rem",
        fontWeight: "bold",
        // flexDirection: "column",
      }}
    >
      <div
        onClick={() =>
          dispatch({
            type: "auth_user",
            payload: { user: teacherUse, token: "asdlkajsd" },
          })
        }
      >
        Login Teacher
      </div>
      <div
        onClick={() =>
          dispatch({
            type: "auth_user",
            payload: { user: technicianUse, token: "asdlkajsd" },
          })
        }
      >
        Login Technician
      </div>
      <div
        onClick={() =>
          dispatch({ type: "auth_user", payload: { user: null, token: null } })
        }
      >
        Logout
      </div>
    </div>
  );
};

export default connect()(userSelector);
