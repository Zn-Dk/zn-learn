// 0.从下面的路径引入RTKQ(必须是这个才能自动生成钩子函数)
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

// 1.createApi 用于创建 RTKQ 的 api 对象
const studentApi = createApi({
  // Api 唯一标识 name 不能和其他api和reducer重复
  reducerPath: "studentApi",
  // 请求使用的工具库 fetch..axios 推荐 fetchBaseQuery (fetch 封装)
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:1337/api",
  }),
  // 2.配置端点 - 配置 API 的方法/接口
  endpoints(build) {
    // build 请求构建器 通过 build 创建处理接口方法
    // .query (查询,可缓存)  .mutation(更新)
    return {
      getStudents: build.query({
        // 指定请求的子路径 即跟 baseUrl 拼接
        query: () => "students",
        // 响应数据拦截回调 去除外层 data
        transformResponse: (baseQueryReturnValue) => {
          return baseQueryReturnValue.data;
        },
        // **缓存设置** (下次执行)函数时, 如果未超过如下时间(秒,默认 60s), 默认使用缓存
        keepUnusedDataFor: 5,
      }),
      getStudentByID: build.query({
        query: (id) => `students/${id}`,
        // 请求完成时回调
        // onQueryStarted: (...args) => {
        //   console.log("qs", args);
        // },
        transformResponse: (baseQueryReturnValue) => {
          return baseQueryReturnValue.data;
        },
        keepUnusedDataFor: 5,
      }),
      // updateStudent: build.mutation()
    };
  },
});

// 3.Api 对象创建后, 会根据定义的方法自动生成对应的 Hooks
// 命名规则 getStudents: build.query => useGetStudentsQuery

export const { useGetStudentsQuery, useGetStudentByIDQuery } = studentApi;

export default studentApi;
