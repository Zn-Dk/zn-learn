import React, { Component } from "react";
import "./index.css";

export default class Home extends Component {
  componentDidMount() {
    document.title = this.constructor.name;
  }
  render() {
    console.log(`Home 组件收到了`, this.props);
    return (
      <div>
        Home
        <p>Hello World</p>
      </div>
    );
  }
}
