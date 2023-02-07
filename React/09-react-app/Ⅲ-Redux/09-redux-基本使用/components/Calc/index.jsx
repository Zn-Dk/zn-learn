import React, { Component } from "react";
import store from "../../redux/store";

export default class Calc extends Component {
  // 每次组件挂载时订阅 store 的更新 否则数据更新后不响应
  // 这一步也可放在这个组件的上一层或者 App.jsx(见代码)
  // componentDidMount() {
  //   store.subscribe(() => {
  //     this.setState({});
  //   });
  // }

  increase = () => {
    console.log("当前 state", store.getState());
    // 传入的 action 对象, 必须有 type
    // 数据 payload(键名不限 可以自定 关键是要与在 reducer 接收的一致)
    store.dispatch({ type: "increase", payload: this.select.value });
  };
  decrease = () => {
    store.dispatch({ type: "decrease", payload: this.select.value });
  };
  multiply = () => {
    store.dispatch({ type: "multiply", payload: this.select.value });
  };
  increaseAsync = () => {
    setTimeout(() => {
      store.dispatch({ type: "increase", payload: this.select.value });
    }, 1000);
  };
  render() {
    return (
      <div>
        {/* getState 获取状态 */}
        <h1>store 的 count : {store.getState()}</h1>
        <select
          style={{ width: "100px" }}
          ref={(e) => (this.select = e)}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
        &nbsp;
        <button onClick={this.increase}>+</button>&nbsp;
        <button onClick={this.decrease}>-</button>&nbsp;
        <button onClick={this.multiply}>&#x00d7;</button>&nbsp;
        <button onClick={this.increaseAsync}>异步加</button>&nbsp;
      </div>
    );
  }
}
