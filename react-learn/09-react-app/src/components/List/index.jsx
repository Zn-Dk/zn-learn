import React, { Component } from "react";
import "./index.css";
import bus from "../../lib/mitt";
import Paginator from "../Paginator";

export default class List extends Component {
  fetchData = async (query) => {
    const { keyword, page = 1 } = query;
    try {
      const res = await fetch(
        `https://api.github.com/search/users?q=${keyword}&page=${page}`
      );
      const data = await res.json();
      this.setState({
        keyword,
        users: data["items"],
        total: data["total_count"],
        err: "",
        // 计算总页数,
        total_page: Math.ceil(data["total_count"] / 30),
        current_page: page,
      });
    } catch (error) {
      this.setState({ err: error.message });
    }
  };
  // 搜索框发起搜索
  handleSearchParam = async (query) => {
    if (!query.keyword) return;
    this.setState({ isFirst: false, isLoading: true });
    this.fetchData(query);
    this.setState({ isLoading: false });
  };

  // 分页器切换页面
  handlePageSwitch = (page) => {
    this.setState({ isFirst: false, isLoading: true });
    this.fetchData({ keyword: this.state.keyword, page });
    this.setState({ isLoading: false });
  };

  componentDidMount() {
    bus.on("onSearchParam", this.handleSearchParam);
    bus.on("onPageSwitch", this.handlePageSwitch);
  }
  componentWillUnmount() {
    bus.off("onSearchParam", this.handleSearchParam);
    bus.off("onPageSwitch", this.handlePageSwitch);
  }

  state = {
    keyword: "",
    users: [],
    total: 0,
    total_page: 0,
    current_page: 1,
    err: "",
    isFirst: true,
    isLoading: false,
  };

  render() {
    const { users, total, err, isFirst, isLoading, total_page, current_page } =
      this.state;
    return isFirst ? (
      <h2>搜索 Github 头像!</h2>
    ) : isLoading ? (
      <h2> Loading, Please wait...</h2>
    ) : err ? (
      <h2 style={{ color: "red", fontSize: "32px" }}>搜索出错了! {err}</h2>
    ) : (
      <div className="list">
        <h2>搜索结果: {total} 条</h2>
        <Paginator total_page={total_page} current_page={current_page} />
        <div className="list-wrap">
          {users.map((userObj) => {
            const { avatar_url, id, html_url, login } = userObj;
            return (
              <a
                key={id}
                href={html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={avatar_url} alt={login} />
                <p>{login}</p>
              </a>
            );
          })}
        </div>
      </div>
    );
  }
}
