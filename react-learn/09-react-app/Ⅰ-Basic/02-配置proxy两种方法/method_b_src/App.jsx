import axios from "axios";
import React, { Component } from "react";
const $http = axios.create();

$http.interceptors.response.use(
  (response) => {
    console.log("请求成功");
    // console.log(response);
    return response.data;
  },
  (err) => {
    console.error("请求失败", err);
  }
);

// 多个主机进行开发代理调试时,请在 src 下新建 setProxy.js
export default class App extends Component {
  async getStudents() {
    const res = await $http.get("http://localhost:3000/api1/student");
    console.log(res);
  }
  async getCars() {
    const res = await $http.get("http://localhost:3000/api2/car");
    console.log(res);
  }
  render() {
    return (
      <div>
        <button onClick={this.getStudents}>获取学生数据</button>
        <button onClick={this.getCars}>获取汽车数据</button>
      </div>
    );
  }
}
