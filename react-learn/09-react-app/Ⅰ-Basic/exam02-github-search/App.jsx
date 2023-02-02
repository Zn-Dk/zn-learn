import React, { Component } from "react";
import "./App.css";
import Search from "./components/Search";
import List from "./components/List";

export default class App extends Component {
  render() {
    return (
      <div className="container">
        <h1>Search Github</h1>
        <Search />
        <List />
      </div>
    );
  }
}
