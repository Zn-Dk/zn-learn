import { StuContext } from "@/store/studentContext";
import React, { useContext } from "react";
import StudentForm from "./StudentForm";
import StudentItem from "./StudentItem";

export default function StudentList() {
  const { fetchData: refresh, stuData } = useContext(StuContext);
  return (
    <>
      <h2>学生列表</h2>
      <button onClick={() => refresh()}>Refresh</button>
      <table border={1}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Vip</th>
          </tr>
        </thead>
        <tbody>
          {stuData &&
            stuData.map(({ attributes, id }) => (
              <StudentItem
                stu={{ attributes, id }}
                key={id}
              />
            ))}
          <StudentForm />
        </tbody>
      </table>
    </>
  );
}
