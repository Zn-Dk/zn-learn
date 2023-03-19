import React, { Component } from "react";
import { connect } from "react-redux";
import { addPerson } from "@/redux/actions/person";

class Person extends Component {
  addPerson = () => {
    const p = {
      id: Math.random().toString(16).slice(2),
      name: this.name.value,
      age: this.age.value,
    };
    this.props.addPerson(p);
  };
  render() {
    return (
      <div>
        <h2>Count 组件的和为: {this.props.count}</h2>
        <input
          ref={(c) => (this.name = c)}
          type="text"
          placeholder="输入人名"
        />
        <input
          ref={(c) => (this.age = c)}
          type="text"
          placeholder="输入年龄"
        />
        <button onClick={this.addPerson}>添加人名册</button>
        <ul>
          {this.props.personArr.map((p) => {
            return (
              <li key={p.id}>
                姓名: {p.name} | 年龄: {p.age} |
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
// 如果为了看起来更清晰 可以分开书写
const mapStateToProps = (state) => ({
  count: state.count,
  personArr: state.person,
});

const mapDispatchToProps = { addPerson };

export default connect(mapStateToProps, mapDispatchToProps)(Person);
