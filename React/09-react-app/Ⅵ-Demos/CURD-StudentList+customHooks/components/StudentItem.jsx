import useFetch from "@/hooks/useFetch";
import { StuContext } from "@/store/studentContext";
import React, { useContext, useState } from "react";
import StudentForm from "./StudentForm";

export default function StudentItem({ stu }) {
  const { fetchData: refresh } = useContext(StuContext);
  const [isEdit, setIsEdit] = useState(false);

  const {
    loading,
    error,
    fetchData: delStu,
  } = useFetch(
    {
      method: "delete",
      id: stu.id,
    },
    refresh
  );

  const { name, gender, age, phone, email, is_vip } = stu.attributes;
  return (
    <>
      {!isEdit && (
        <tr key={name}>
          <td>{name}</td>
          <td>{gender}</td>
          <td>{age}</td>
          <td>{phone}</td>
          <td>{email}</td>
          <td>{is_vip + ""}</td>
          <td>
            <button onClick={() => setIsEdit(true)}>修改</button>
            <button onClick={() => delStu()}>删除</button>
          </td>
        </tr>
      )}

      {isEdit && (
        <StudentForm
          stu={stu}
          isEdit={isEdit}
        />
      )}

      {loading && (
        <tr>
          <td colSpan={6}>正在删除...</td>
        </tr>
      )}
      {error && (
        <tr>
          <td colSpan={6}>删除失败...</td>
        </tr>
      )}
    </>
  );
}
