import React, { useEffect } from "react";
import useFetch from "./hooks/useFetch";
import { StuContext } from "./store/studentContext";
import StudentList from "./components/StudentList";

export default function App() {
  const { error, loading, resData, fetchData } = useFetch();
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      <StuContext.Provider value={{ fetchData, stuData: resData }}>
        {loading && <td>正在加载,请稍后...</td>}
        {error && <td>Error : {error.message}</td>}
        {!error && !loading && <StudentList />}
      </StuContext.Provider>
    </div>
  );
}
