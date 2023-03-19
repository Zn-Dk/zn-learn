import React, { Component } from "react";
import "./index.css";
import bus from "../../lib/mitt";

export default class Search extends Component {
  searchGitUser = () => {
    // 发布搜索事件
    bus.emit("onSearchParam", { keyword: this.inputEle.value, page: 1 });
  };
  render() {
    return (
      <div className="search-wrap">
        <input
          ref={(c) => (this.inputEle = c)}
          type="text"
          placeholder="Type user you want to search..."
        />
        <div className="search-gradient"></div>
        <button className="search-btn" onClick={this.searchGitUser}>
          Search
        </button>
      </div>
    );
  }
}
