import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Reqs from "components/Reqs/Reqs";
import Req from "components/Req/Req";
import NewReq from "components/NewReq";
import Snackbar from "components/Snackbar";
import { Provider } from "react-redux";
import store from "store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Header />
          <Route exact path="/test" component={Test} />
          <Route path="/about" component={About} />
          <Route exact path={`/reqs`} component={Reqs} />
          <Switch>
            <Route path={`/reqs/new`} component={NewReq} />
            <Route path={`/reqs/:id`} component={Req} />
          </Switch>
        </div>
      </Router>
      <Snackbar />
    </Provider>
  );
}

function Test() {
  const [testText, setTestText] = useState("Waiting...");
  useEffect(() => {
    fetch("/test")
      .then(response => response.text())
      .then(data => {
        setTestText(data);
      });
  }, []);
  return <h2>{testText}</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Header() {
  return (
    <>
      <ul>
        <li>
          <Link to="/test">Test</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/reqs">Reqs</Link>
        </li>
        <li>
          <Link to="/reqs/new">Post New Req</Link>
        </li>
      </ul>
    </>
  );
}

export default App;
