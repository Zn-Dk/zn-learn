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
  // 高级使用 1. 定义数据标签 - (指定标签的 type)
  tagTypes: ["student"],
  // 2.配置端点 - 配置 API 的方法/接口
  endpoints(build) {
    // build 请求构建器 通过 build 创建处理接口方法
    // .query (查询,可缓存)  .mutation(更新 POST/PUT/DELETE)
    // 高级使用 标签示例 在 query 方法中 providesTags(提供tag) - 在 mutation 方法中 invalidatesTags(tag失效)
    // 高级使用 这个标签对的失活机制可以让对应的 query 函数自动refetch (典型场景,注册登录,添加用户,更新列表...)
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
        // 单标签命名重复,失活时一并失活其他选项 不适合细粒度优化请求
        // providesTags: ["student"],
        // 使用对象参数打数据标签
        providesTags: [{ type: "student", id: "ALL" }],
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
        // 使用函数形式取得参数(返回数组)
        providesTags: (result, error, args) => {
          // console.log("getStudentByID in API->", result, error, args);
          return [{ type: "student", id: args }];
        },
      }),
      addStudent: build.mutation({
        query: (stuData) => ({
          url: "students",
          method: "POST",
          body: { data: stuData },
        }),
        //
        invalidatesTags: [{ type: "student", id: "ALL" }],
      }),
      updateStudent: build.mutation({
        query: ({ stuData, id }) => ({
          url: `students/${id}`,
          method: "PUT",
          body: { data: stuData },
        }),
        //
        invalidatesTags: (result, error, args) => {
          // 同时让 list 和 id 失活
          return [
            { type: "student", id: args.id },
            { type: "student", id: "ALL" },
          ];
        },
      }),
      deleteStudent: build.mutation({
        query: (id) => ({
          url: `students/${id}`,
          method: "DELETE",
        }),
        //
        invalidatesTags: [{ type: "student", id: "ALL" }],
      }),
    };
  },
});

// 3.Api 对象创建后, 会根据定义的方法自动生成对应的 Hooks
// 命名规则
// query - getStudents: build.query => useGetStudentsQuery
// mutation - addStudent: build.mutation => useAddStudentMutation

export const {
  useGetStudentsQuery,
  useGetStudentByIDQuery,
  useAddStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} = studentApi;

export default studentApi;
