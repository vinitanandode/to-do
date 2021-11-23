import React from "react";
import "./App.css";
import Todo from "./components/Todo";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Verify from "./components/Verify";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/home">
          <Todo />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/verify">
          <Verify />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
