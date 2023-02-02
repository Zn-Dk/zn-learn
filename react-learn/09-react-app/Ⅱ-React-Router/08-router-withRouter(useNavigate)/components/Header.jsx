import React, { Component } from "react";
import { withRouter } from "react-router-dom";

// 解决在普通组件中使用路由方法的 API
class Header extends Component {
  render() {
    const { go, goBack, goForward } = this.props.history;
    return (
      <div>
        <h1>react-router-dom withRouter(V6: useNavigate)</h1>
        <button onClick={goBack}> 后退 </button>
        <button onClick={goForward}> 前进 </button>
        <button onClick={() => go(-2)}> 后退2步 </button>
      </div>
    );
  }
}
// 导出时将类使用 withRouter 包裹( V6 版本改为 useNavigate )
export default withRouter(Header);
