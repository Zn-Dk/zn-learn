import React, { Component } from "react";
import Calc from "./components/Calc";
import store from "./redux/store";

export default class App extends Component {
  // redux 更改的状态需要通过 subscribe 函数监听状态
  // 故将整个 App 包裹订阅
  componentDidMount() {
    // 订阅一个空状态改变
    store.subscribe(() => {
      this.setState({});
    });
  }
  render() {
    return (
      <div>
        <Calc />
      </div>
    );
  }
}
