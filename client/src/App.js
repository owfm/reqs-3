import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
// import CssBaseline from "@material-ui/core/CssBaseline";

import store from "store";
import history from "history/history";

import Drawer from "components/Navigation/Drawer";
import TopBar from "components/Navigation/TopBar";
import LoadingBar from "components/Navigation/LoadingBar";
import Welcome from "components/Welcome";
import Signup from "components/auth/Signup";
import Signout from "components/auth/Signout";
import Signin from "components/auth/Signin";
import Lessons from "components/Lessons/Lessons";
import Snackbar from "components/Snackbar";
import CreateSchool from "components/CreateSchool/index";
import ModalWrapper from "components/Modals/ModalWrapper";
import Dashboard from "components/Dashboard/Dashboard";
import StickyFooter from "components/StickyFooter";

import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

// import UserSelector from "components/userSelector";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});
function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <ThemeProvider theme={theme}>
            <LoadingBar />
            <TopBar />
            <Drawer />
            <ModalWrapper />
            <Switch>
              <Route path="/" exact component={Welcome} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/signup" component={Signup} />
              <Route path="/signout" component={Signout} />
              <Route path="/signin" component={Signin} />
              <Route path="/about" component={About} />
              <Route path="/newschool" component={CreateSchool} />
              <Route exact path={`/lessons/`} component={Lessons} />
              <Route component={NotFound} />
              <Snackbar />
              {/* <UserSelector /> */}
            </Switch>
            <StickyFooter />
          </ThemeProvider>
        </MuiPickersUtilsProvider>
      </Router>
    </Provider>
  );
}

function About() {
  return <h2>About</h2>;
}

const NotFound = () => {
  return <div>Not found...</div>;
};

export default App;
