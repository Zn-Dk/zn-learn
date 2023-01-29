import React, { Component } from "react";
import { NavLink, Route, Switch, Redirect } from "react-router-dom";

import Calc from "./components/Calc";
import Person from "./components/Person";

export default class App extends Component {
  render() {
    return (
      <div>
        <header>
          <NavLink to="/calc">Calc 组件</NavLink>
          &nbsp;
          <NavLink to="/person">Person 组件</NavLink>
        </header>
        <main>
          <Switch>
            <Route
              path="/calc"
              component={Calc}
            />
            <Route
              path="/person"
              component={Person}
            />
            <Redirect to="/calc" />
          </Switch>
        </main>
      </div>
    );
  }
}
