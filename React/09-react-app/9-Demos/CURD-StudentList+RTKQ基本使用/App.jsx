import React, { useEffect } from "react";
import { useGetStudentsQuery } from "./store/studentApi";
import StudentList from "./components/StudentList";

export default function App() {
  // 5.使用 RTKQ hooks
  /*
    console.log("-->useGetStudentsQuery", useGetStudentsQuery());
    参数返回值
    currentData: undefined // 当前参数的最新数据(可以忽略)
    data: undefined // 最新的数据
    isError: false // 布尔值，是否有错误
    error: Error // 错误对象, 结构 { data:{...}, status }，有错时才存在
    isFetching: true // 布尔值，数据是否正在获取
    isLoading: true // 布尔值，数据是否加载
    isSuccess: false // 布尔值，请求是否成功
    isUninitialized: false // 布尔值，请求是否还没有开始发送
    refetch: ƒ () // 函数，用来重新加载数据
    status: "pending" // 字符串，请求的状态
  */

  const { isError, error, isLoading, isSuccess, refetch, data } =
    // useQuery 的第二个参数 可配置项
    useGetStudentsQuery(null, {
      // 响应数据进行自定义处理...
      // selectFromResult: (result) => {
      //   console.log(result);
      //   if (result.data) {
      //     result.data = result.data.filter((item) => item.attributes.age < 25);
      //   }
      //   // 必须返回出去
      //   return result;
      // },
      // 设置轮询间隔,单位 ms, 默认: 0 表示不轮询
      pollingInterval: 10000,
      // 是否跳过当前请求(可以在此加判断条件, 如 id 不存在...) 默认 false
      skip: false,
      // 组件挂载或参数改变时重发请求(不使用缓存)
      // boolean - 是否重发, number - 缓存有效期(s)
      // refetchOnMountOrArgChange: 3,
      // 切换浏览器窗口时是否重新加载(需要预配置,见store/index.js)
      // refetchOnFocus: true,
      // 脱机后是否重新加载(需要预配置,见store/index.js)
      refetchOnReconnect: true,
    });
  return (
    <div>
      {isLoading && <h2>正在加载,请稍后...</h2>}
      {isError && (
        <h2>加载错误 : {error.status + " " + error.data.error.message}</h2>
      )}
      {isSuccess && (
        <StudentList
          stuData={data}
          refetch={refetch}
        />
      )}
    </div>
  );
}
