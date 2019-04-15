import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Reqs from "./components/Reqs";
import Req from "./components/Req";
import NewReq from "./components/NewReq";

function App() {
  return (
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
  );
}

export default App;
