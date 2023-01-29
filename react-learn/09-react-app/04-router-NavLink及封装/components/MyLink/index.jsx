import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class MyLink extends Component {
  render() {
    console.log(this.props);
    // this.props 携带的 children 属性是捕获组件双标签的 <Comp>内容</Comp>
    // 因此这个封装的组件可以直接使用解构赋值
    return <NavLink {...this.props} />;
  }
}
