import React from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";

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
      <Button
        onClick={() =>
          dispatch({
            type: "auth_user",
            payload: { user: teacherUse, token: "asdlkajsd" },
          })
        }
      >
        Login Teacher
      </Button>
      <Button
        onClick={() =>
          dispatch({
            type: "auth_user",
            payload: {
              user: technicianUse,
              token:
                "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1Y2YwM2U4M2IxZGU2NzI1MDVmZTI1OTciLCJpYXQiOjE1NTkzMzY2MTc0MTZ9.iUK_bfHnwqJRB8SwT61bKkGyYtkbiTDB-tiiU34HeuI",
            },
          })
        }
      >
        Login Technician
      </Button>
      <Button
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          dispatch({ type: "auth_user", payload: "" });
        }}
      >
        Logout
      </Button>
    </div>
  );
};

export default connect()(userSelector);
