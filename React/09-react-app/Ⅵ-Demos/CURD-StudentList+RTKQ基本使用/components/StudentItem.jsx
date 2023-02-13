import React, { useState, useEffect } from "react";
import StudentForm from "./StudentForm";
import { useGetStudentByIDQuery } from "@/store/studentApi";

export default function StudentItem({ stu: { attributes: initAttrs, id } }) {
  const [isEdit, setIsEdit] = useState(false);

  const [stuData, setStuData] = useState({
    name: "",
    age: 0,
    gender: "",
    phone: "",
    email: "",
    is_vip: false,
  });
  // 每次点击修改的时候都获取最新数据

  const { isSuccess, data } = useGetStudentByIDQuery(id, {
    // 每次重新挂载都重发请求
    // refetchOnMountOrArgChange: true,
    // 非修改模式和无id时不进行请求
    skip: !isEdit || !id,
  });
  useEffect(() => {
    isEdit && isSuccess && setStuData(data?.attributes);
  }, [isSuccess, isEdit, data?.attributes]);

  const delStu = () => {};
  const cancelEdit = () => {
    setIsEdit(false);
  };

  // 初次加载 使用原始数据, 第一次点击更新后使用最新数据
  const { name, gender, age, phone, email, is_vip } =
    stuData.name === "" ? initAttrs : stuData;
  // initAttrs;
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
          stuData={stuData}
          setStuData={setStuData}
          isEdit={isEdit}
          onCancel={cancelEdit}
        />
      )}

      {/* {loading && (
        <tr>
          <td colSpan={6}>正在删除...</td>
        </tr>
      )}
      {error && (
        <tr>
          <td colSpan={6}>删除失败...</td>
        </tr>
      )} */}
    </>
  );
}
