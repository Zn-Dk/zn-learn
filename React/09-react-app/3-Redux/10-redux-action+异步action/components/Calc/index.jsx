import {
  DECREASE_ACTION,
  INCREASE_ACTION,
  MULTIPLY_ACTION,
  ASYNC_INC_ACTION,
} from "@/redux/actions/count";
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
    // console.log("当前 state", store.getState());
    // 传入的 action 对象, 必须有 type
    // 数据 payload(键名不限 可以自定 关键是要与在 reducer 接收的一致)
    store.dispatch(INCREASE_ACTION(this.select.value));
  };
  decrease = () => {
    store.dispatch(DECREASE_ACTION(this.select.value));
  };
  multiply = () => {
    store.dispatch(MULTIPLY_ACTION(this.select.value));
  };
  increaseAsync = () => {
    store.dispatch(ASYNC_INC_ACTION(this.select.value, 1000));
  };
  render() {
    // 使用了 combineReducers 后 需要解构分别取内部的 state
    const { count } = store.getState();
    return (
      <div>
        {/* getState 获取状态 */}
        <h1>store 的 count : {count}</h1>
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
