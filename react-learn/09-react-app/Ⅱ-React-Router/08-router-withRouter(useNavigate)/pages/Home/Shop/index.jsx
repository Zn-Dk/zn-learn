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
  pushShow = (id, title) => {
    // 对于 params/query
    this.props.history.push(`/home/shop/${id}/${title}`);
    // 针对 state
    // this.props.history.push("/home/shop/", {
    //   id,
    //   title,
    // });
  };
  replaceShow = (id, title) => {
    // 对于 params/query
    this.props.history.replace(`/home/shop/${id}/${title}`);
    // 针对 state
    // this.props.history.replace("/home/shop/", {
    //   id,
    //   title,
    // });
  };
  render() {
    // 编程式导航五大方法 (history)
    // push/replace(path,?state)
    // go(step:number)
    // goBack/Forward 后退/前进
    const { go, goBack, goForward } = this.props.history;
    return (
      <div>
        <h2>商品列表</h2>
        <button onClick={goBack}> 后退 </button>
        <button onClick={goForward}> 前进 </button>
        <button onClick={() => go(-2)}> 后退2步 </button>
        <ul className="product-list">
          {productList.map((obj) => {
            const { id, title } = obj;
            return (
              <div>
                {/* 路由传参方式一 params (最常用) */}
                <NavLink
                  to={`/home/shop/${id}/${title}`}
                  key={id}
                >
                  {title}
                </NavLink>

                {/* 路由传参方式二 query */}
                {/* <NavLink
                  to={`/home/shop/?id=${id}&title=${title}`}
                  key={id}
                >
                  {title}
                </NavLink> */}

                {/*
                    路由传参方式三 state
                    这种方法不会留下任何地址栏可见的要素
                    而且因为 router 使用 history 保存信息, 刷新不会重置
                    但是 **清除缓存** 会导致失效
                    此外因为没有使用 HistoryAPI, HashRouter 刷新后 state 状态会失效
                */}
                {/* <NavLink
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
                </NavLink> */}

                {/* 编程式路由导航 */}
                <button onClick={() => this.pushShow(id, title)}>
                  push方法
                </button>
                <button onClick={() => this.replaceShow(id, title)}>
                  replace方法
                </button>
              </div>
            );
          })}
        </ul>
        {/*  :params 传入 => props.match.params 接收 */}
        <Route
          path="/home/shop/:id/:title"
          component={Detail}
        />

        {/*  query 无需传入 => props.location.search => qs 处理 */}
        {/* <Route
          path="/home/shop"
          component={Detail}
        /> */}

        {/*  state 无需传入 => props.location.state */}
        {/* <Route
          path="/home/shop"
          component={Detail}
        /> */}
      </div>
    );
  }
}
