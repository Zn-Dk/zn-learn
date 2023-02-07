// 必须引入这个才能自动生成钩子函数
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

// createApi 用于创建 RTKQ 的 api 对象
const studentApi = createApi({
  // Api 唯一标识 name 不能和其他api和reducer重复
  reducerPath: "studentApi",
  // 请求使用的工具库 fetch..axios 推荐 fetchBaseQuery (fetch 封装)
  baseQuery: fetchBaseQuery({
    baseUrl: "example.com/api",
  }),
  // 端点 - 配置 API 的方法/接口
  endpoints(build) {
    // build 请求构建器 通过 build 创建处理接口方法
    // .query (查询,可缓存)  .mutation(更新)
    return {
      getStudents: build.query({
        // 指定请求的子路径 即跟 baseUrl 拼接
        query: () => "students",
      }),
      // getStudentByID: build.query(),
      // updateStudent: build.mutation()
    };
  },
});

// Api 对象创建后, 会根据定义的方法自动生成对应的 Hooks
// 命名规则 getStudents: build.query => useGetStudentsQuery

export const { useGetStudentsQuery } = studentApi;

export default studentApi;
