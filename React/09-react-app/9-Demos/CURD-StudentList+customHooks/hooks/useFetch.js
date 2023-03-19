import { useCallback, useState } from "react";

/**
 * @description Student API - CURD请求
 *  @param {{
 * method:'GET'|'POST'|'PUT'|'DELETE',
 * id?:string,
 * body:object
 * }} data
 *  @param {Function} cb
 */
export default function useFetch(opts = { method: "GET", id: "" }, cb) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resData, setResData] = useState(null);

  const fetchData = useCallback(async (body) => {
    const method = opts?.method ?? "GET";
    try {
      setLoading(true);
      setError(null);
      setResData(null);
      const res = await fetch(
        `http://localhost:1337/api/students/${opts.id ?? ""}`,
        {
          method: method,
          headers: {
            "Content-type": "application/json",
          },
          body: method === "GET" ? null : JSON.stringify({ data: body }),
        }
      );
      if (res.ok) {
        const data = await res.json();
        setResData(data.data);
        typeof cb === "function" && cb();
      } else {
        throw new Error("网络繁忙,请稍后再试!");
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    resData,
    fetchData,
  };
}
