import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Reqs from "./components/Reqs";
import Req from "./components/Req";

function App() {
  return (
    <Router>
      <div>
        <Header />

        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route exact path={`/reqs`} component={Reqs} />
        <Route path={`/reqs/:id`} component={Req} />
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Header() {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/reqs">Reqs</Link>
      </li>
    </ul>
  );
}

export default App;
