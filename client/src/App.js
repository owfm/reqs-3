import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Reqs from "components/Reqs/Reqs";
import Header from "components/Header";
import LoadingBar from "components/LoadingBar";
import Req from "components/Req/Req";
import Snackbar from "components/Snackbar";
import { Provider } from "react-redux";
import store from "store";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme();

function App() {
  return (
    <Provider store={store}>
      <Router>
        <>
          <CssBaseline>
            <MuiThemeProvider theme={theme}>
              <LoadingBar />
              <Header />
              <Switch>
                <Route path="/about" component={About} />
                <Route exact path={`/reqs/`} component={Reqs} />
                <Route path={`/reqs/:id`} component={Req} />
                <Route path={"/tits"} component={Tits} />
                <Route component={NotFound} />
              </Switch>
              <Snackbar />
            </MuiThemeProvider>
          </CssBaseline>
        </>
      </Router>
    </Provider>
  );
}

const Tits = () => {
  return <p>tits</p>;
};

function About() {
  return <h2>About</h2>;
}

const NotFound = () => {
  return <div>Not found...</div>;
};

export default App;
