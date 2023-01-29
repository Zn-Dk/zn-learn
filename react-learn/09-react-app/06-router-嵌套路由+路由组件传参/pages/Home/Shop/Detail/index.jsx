import React, { Component } from "react";

export default class Detail extends Component {
  priceInfo = [
    { id: "01", price: "3999" },
    { id: "02", price: "8999" },
    { id: "03", price: "6999" },
  ];
  render() {
    console.log(this.props);

    // params 方式接收属性 (最常用)
    // console.log(this.props.match.params);
    // const { id, title } = this.props.match.params;

    // query 方式接收属性
    // console.log(this.props.location.search);
    // const sParams = new URLSearchParams(this.props.location.search);
    // const id = sParams.get("id");
    // const title = sParams.get("title");

    // state 方式接收属性 (需要解决报错问题)
    const { id, title } = this.props.location.state || {};

    const detailObj =
      this.priceInfo.find((obj) => {
        return id === obj.id;
      }) || {};
    return (
      <div>
        <h3>商品详情</h3>
        <div>
          <h3>ID: {id}</h3>
          <h3>Title: {title}</h3>
          <h3>Price: {detailObj.price}</h3>
        </div>
      </div>
    );
  }
}
