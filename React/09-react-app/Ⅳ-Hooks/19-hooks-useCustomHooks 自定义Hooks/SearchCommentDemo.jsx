import React from "react";
import { useGetComment, useDataFilters } from "./Hooks";

export default function SearchCommentDemo() {
  const [search, setSearch] = React.useState("");

  // 通过 Hooks 抽离逻辑 实现代码低耦合和高可复用

  const comment = useGetComment();

  const filterList = useDataFilters(comment, search);

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
