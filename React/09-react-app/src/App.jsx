import React from "react";
import { useGetStudentsQuery } from "./store/studentApi";

export default function App() {
  const res = useGetStudentsQuery();

  return <div>App</div>;
}
