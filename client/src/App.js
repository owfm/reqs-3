import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "store";
import history from "history/history";
import CssBaseline from "@material-ui/core/CssBaseline";
import TopBar from "components/TopBar";
import Welcome from "components/Welcome";
import Signup from "components/auth/Signup";
import Signout from "components/auth/Signout";
import Signin from "components/auth/Signin";
import Lessons from "components/Lessons";
import Header from "components/Header";
import LoadingBar from "components/LoadingBar";
import Req from "components/Req/Req";
import Snackbar from "components/Snackbar";
import CreateSchool from "components/CreateSchool/index";

import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import UserSelector from "components/userSelector";

function App() {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Provider store={store}>
        <Router history={history}>
          <>
            <CssBaseline>
              {/* <ThemeProvider theme={theme}> */}
              <LoadingBar />
              <TopBar />
              <Header />
              <Switch>
                <Route path="/" exact component={Welcome} />
                <Route path="/signup" component={Signup} />
                <Route path="/signout" component={Signout} />
                <Route path="/signin" component={Signin} />
                <Route path="/about" component={About} />
                <Route path="/newschool" component={CreateSchool} />
                <Route path={`/reqs/:id`} component={Req} />
                <Route exact path={`/lessons/`} component={Lessons} />
                <Route component={NotFound} />
              </Switch>
              <Snackbar />
              <UserSelector />
              {/* </ThemeProvider> */}
            </CssBaseline>
          </>
        </Router>
      </Provider>
    </MuiPickersUtilsProvider>
  );
}

function About() {
  return <h2>About</h2>;
}

const NotFound = () => {
  return <div>Not found...</div>;
};

export default App;
