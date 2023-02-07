import React, { Component } from "react";
import "./index.css";

export default class About extends Component {
  componentDidMount() {
    document.title = this.constructor.name;
  }
  render() {
    return <div>About</div>;
  }
}
