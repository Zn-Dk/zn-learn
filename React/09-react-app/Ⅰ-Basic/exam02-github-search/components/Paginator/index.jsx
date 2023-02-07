import React, { Component } from "react";
import "./index.css";
import bus from "../../lib/mitt";

export default class Paginator extends Component {
  state = {
    pageStart: 0,
  };
  handlePageSwitch = (page) => {
    const { current_page, total_page } = this.props;
    const { pageStart } = this.state;

    if (page === current_page) return () => {};
    page = Math.min(total_page, Math.max(page, 1));
    return () => {
      bus.emit("onPageSwitch", page);
      this.setState({ pageStart: page > 10 ? pageStart + 1 : pageStart - 1 });
    };
  };
  render() {
    const { current_page, total_page } = this.props;
    const { pageStart } = this.state;
    return (
      <div className="paginator-container">
        <button
          className="btn btn-prev"
          onClick={this.handlePageSwitch(current_page - 1)}
        >
          &lt;
        </button>
        <ul className="paginator">
          {Array.from(
            new Array(total_page >= 10 ? 10 : total_page),
            (_, idx) => {
              const current = pageStart + idx + 1;
              console.log(current, pageStart);
              return (
                <li
                  key={current}
                  className={current === current_page ? "active" : ""}
                  onClick={this.handlePageSwitch(current)}
                >
                  {current}
                </li>
              );
            }
          )}
        </ul>
        <button
          className="btn btn-next"
          onClick={this.handlePageSwitch(current_page + 1)}
        >
          &gt;
        </button>
      </div>
    );
  }
}
