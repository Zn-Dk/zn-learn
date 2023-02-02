import React, { Component } from "react";
import Child from "./Child";
import Error from "./Error";

// 定义错误边界组件 只能使用class方式创建组件
class ErrorBoundary extends Component {
  state = {
    error: null,
  };

  // 当子组件抛出异常，这里会接收到error
  // 通过返回对象 修改state中的error(也可以自定义名)
  static getDerivedStateFromError(error) {
    return { error };
  }

  // 子组件产生错误的钩子 (在这里进行错误上报..)
  componentDidCatch(error, info) {
    if (typeof (this.props?.onError === "function")) {
      this.props?.onError(error, info);
    } else {
      console.log("[error] 发生错误, 上报服务器");
      console.log("[msg] 错误信息: ", error, info);
    }
  }

  render() {
    const { children, fallBackView } = this.props;
    if (this.state.error) {
      return (
        <div>
          {fallBackView ? React.createElement(fallBackView) : <Error />}
        </div>
      );
    }
    return children;
  }
}

const customErrorHandler = (error, info) => {
  console.log("[error] 自定义函数------发生错误, 上报服务器");
  console.log("[msg] 自定义函数--------错误信息: ", error, info);
};

export default function App() {
  return (
    <div>
      <h1>React 进阶: 错误边界捕获和处理</h1>
      <hr />
      <p>
        有意地在 Child 组件中产生错误, 如果不捕获错误边界,
        一旦某个子组件失效就会引起整个网站的瘫痪,这是不好的
      </p>
      <p>
        使用错误边界正确地处理错误, 提供用户的 Fallback 引导以及错误及时上报
      </p>
      <p>
        <i>
          PS. 旧版本 React 开发模式可能会直接停留在报错界面,
          但在生产模式下是正常表现的
        </i>
      </p>
      <ErrorBoundary
        onError={customErrorHandler}
        fallBackView={() => <h2>501 Server Unavailable</h2>}
      >
        <Child />
      </ErrorBoundary>
    </div>
  );
}
