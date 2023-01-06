import React, { Component } from "react";
import Welcome from "./components/Welcome";
export default class App extends Component {
  state = {
    count: 0,
  };

  addCount = () => {
    let { count } = this.state;
    this.setState({ count: ++count });
  };
  render() {
    return (
      <div>
        <h1>Hello React</h1>
        <button onClick={this.addCount}>Count is {this.state.count}</button>
        <Welcome msg="Hello, this component is made by Create React App." />
      </div>
    );
  }
}
