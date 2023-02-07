import { increase, decrease, multiply, incAsync } from "@/redux/actions/count";
import React, { Component } from "react";
// 使用 connect API
import { connect } from "react-redux";
// 引入需要用到的 action

class Calc extends Component {
  increase = () => {
    this.props.increase(this.select.value);
  };
  decrease = () => {
    this.props.decrease(this.select.value);
  };
  multiply = () => {
    this.props.multiply(this.select.value);
  };
  increaseAsync = () => {
    this.props.incAsync(this.select.value, 1000);
  };
  render() {
    // 使用了 combineReducers 后 需要解构分别取内部的 state
    return (
      <div>
        {/* getState 获取状态 */}
        <h1>store 的 count : {this.props.count}</h1>
        <h2>Person 的人数 : {this.props.personAmount}</h2>
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

/*
react-redux 模型
  [容器组件 ==getStore/dispatch=> [UI视图 (通过 props 获取数据)] ] <==> Redux

  connect: 连接 redux 和 react-dom 的 API
  第一段 参数 function mapStateToProps , 维护 store 的状态(传入 state 即整个 store 的状态)
          - 返回希望传入 UI组件 的 Props 对象
        参数 mapDispatchToProps , 维护修改 store 的状态方法 即 action+reducer
          - 可以传入一个函数         doSth: (dispatch) => dispatch(SomeAction)
          - 可以传入一个对象(最常用)  doSth: SomeAction (默认内部就将整个Action 使用 dispatch 执行)
  第二段
        传入原始的 React Component (这里称为 UI组件)

  最后将包装的容器组件导出即可
*/
export default connect(
  // mapStateToProps  this.props.foo => state.[foo(reducerName)]
  (state) => ({
    count: state.count,
    personAmount: state.person.length,
  }),
  // mapDispatchToProps
  // 最终在 UI 组件中 prop.increase === store.dispatch(increaseAction)
  {
    // 也可以起别名 foo : doFooAction ==> this.props.foo(...args)
    increase,
    decrease,
    multiply,
    incAsync,
  }
)(Calc);
