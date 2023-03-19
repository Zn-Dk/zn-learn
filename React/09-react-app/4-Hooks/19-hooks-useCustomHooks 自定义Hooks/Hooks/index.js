import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";

// 自定义 Hooks 使用原则
// 将逻辑直接提取包含在 useXXX 的函数中
// 函数名必须以 use 开头 React 才能检查 Hooks 使用是否符合原则
// 最后只需要返回需要的变量即可

/**
 * @returns {comments[]} comments 列表
 */
export const useGetComment = () => {
  const [comments, setComments] = useState([]);
  const getPosts = useCallback(async () => {
    const res = await axios.get("http://jsonplaceholder.typicode.com/posts");
    setComments(res.data);
  }, []);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return comments;
};

/**
 * @param {comments[]} data 数据列表
 * @param {string} search keywords
 * @returns {comments[]} filter 后的列表
 */
export const useDataFilters = (data, search) => {
  return useMemo(
    () =>
      data.filter(
        ({ title, body }) => title.includes(search) || body.includes(search)
      ),
    [search, data]
  );
};
