import React, { Component } from "react";
import { NavLink, Route } from "react-router-dom";
import Detail from "./Detail";
import "./index.css";

const productList = [
  { id: "01", title: "小米手机13" },
  { id: "02", title: "iPhone 14 Pro" },
  { id: "03", title: "vivo X90 Pro+" },
];
export default class Shop extends Component {
  render() {
    return (
      <div>
        <h2>商品列表</h2>
        <ul className="product-list">
          {productList.map((obj) => {
            const { id, title } = obj;
            return (
              // 路由传参方式一 params (最常用)
              // <NavLink
              //   to={`/home/shop/${id}/${title}`}
              //   key={id}
              // >
              //   {title}
              // </NavLink>

              // 路由传参方式二 query
              // <NavLink
              //   to={`/home/shop/?id=${id}&title=${title}`}
              //   key={id}
              // >
              //   {title}
              // </NavLink>

              // 路由传参方式三 state
              // 这种方法不会留下任何地址栏可见的要素
              // 而且因为 router 使用 history 保存信息, 刷新不会重置
              // 但是 **清除缓存** 会导致失效
              <NavLink
                to={{
                  // 使用对象方法进行传参
                  pathname: `/home/shop`,
                  state: {
                    id,
                    title,
                  },
                }}
                key={id}
              >
                {title}
              </NavLink>
            );
          })}
        </ul>
        {/*  :params 传入 => props.match.params 接收 */}
        {/* <Route
          path="/home/shop/:id/:title"
          component={Detail}
        /> */}

        {/*  query 无需传入 => props.location.search => qs 处理 */}
        {/* <Route
          path="/home/shop"
          component={Detail}
        /> */}

        {/*  state 无需传入 => props.location.state */}
        <Route
          path="/home/shop"
          component={Detail}
        />
      </div>
    );
  }
}
