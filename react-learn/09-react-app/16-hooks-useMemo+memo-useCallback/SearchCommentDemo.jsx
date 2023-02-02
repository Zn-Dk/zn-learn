import React, { useCallback, useEffect, useMemo } from "react";

import axios from "axios";

export default function SearchCommentDemo() {
  const [search, setSearch] = React.useState("");
  const [comments, setComments] = React.useState([]);

  // useCallback 缓存函数
  const getPosts = useCallback(async () => {
    const res = await axios.get("http://jsonplaceholder.typicode.com/posts");
    setComments(res.data);
  }, []);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  console.log(comments);

  // 我们使用 useMemo 返回一个计算属性 当且仅当 input 框改变或 comments 改变时响应
  const filterList = useMemo(
    () =>
      comments.filter(
        ({ title, body }) => title.includes(search) || body.includes(search)
      ),
    [search, comments]
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search comments by username or content"
        value={search}
        style={{ width: "600px", padding: "10px" }}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div>
        <h2>Search Result: ( Total {filterList.length} results.)</h2>
        <ul>
          {filterList.map(({ id, title, body }) => {
            return (
              <li key={id}>
                <p> - id : {id}</p>
                <p> - title : {title}</p>
                <p> - body : {body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
