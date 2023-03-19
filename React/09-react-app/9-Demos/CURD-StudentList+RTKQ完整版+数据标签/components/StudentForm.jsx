import React, { useEffect, useState } from "react";
import {
  useGetStudentByIDQuery,
  useAddStudentMutation,
  useUpdateStudentMutation,
} from "@/store/studentApi";

export default function StudentForm({
  id,
  isEdit = false,
  onCancel = () => {},
  updateDisplayData,
}) {
  const [stuData, setStuData] = useState({
    name: "",
    age: 0,
    gender: "",
    phone: "",
    email: "",
  });
  const status = isEdit ? "更新" : "添加";
  // 每次点击修改的时候都获取最新数据
  const { isSuccess, data } = useGetStudentByIDQuery(id, {
    // 每次重新挂载都重发请求
    // refetchOnMountOrArgChange: true,
    // 非修改模式和无id时不进行请求
    skip: !isEdit || !id,
  });

  useEffect(() => {
    if (isEdit && isSuccess) {
      setStuData(data?.attributes);
      updateDisplayData(data?.attributes); // 同步更新静态表单
    }
  }, [isSuccess, isEdit, data?.attributes]);

  // HANDLERS
  // mutation 的使用:    result { isSuccess , error, ...}
  // const [addStudent, result] = useAddStudentMutation();
  const [addStudent, { isSuccess: isAdded, isError, error, isLoading }] =
    useAddStudentMutation();
  const [updateStudent, result] = useUpdateStudentMutation();

  const addStuHandler = () => {
    addStudent(stuData);
    setStuData({ name: "", age: 0, gender: "", phone: "", email: "" });
  };
  const updateStuHandler = () => {
    updateStudent({ stuData, id });
    onCancel();
  };

  return (
    <>
      <tr>
        <td>
          <input
            type="text"
            value={stuData?.name}
            onChange={(e) =>
              setStuData((prevState) => ({
                ...prevState,
                name: e.target.value,
              }))
            }
          ></input>
        </td>
        <td>
          <select
            value={stuData?.gender}
            onChange={(e) =>
              setStuData((prevState) => ({
                ...prevState,
                gender: e.target.value,
              }))
            }
          >
            <option
              value=""
              defaultChecked
            >
              Choose your gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="unknown">Unknown</option>
          </select>
        </td>
        <td>
          <input
            type="number"
            value={stuData?.age}
            onChange={(e) =>
              setStuData((prevState) => ({
                ...prevState,
                age: e.target.value,
              }))
            }
          ></input>
        </td>
        <td>
          <input
            type="text"
            value={stuData?.phone}
            onChange={(e) =>
              setStuData((prevState) => ({
                ...prevState,
                phone: e.target.value,
              }))
            }
          ></input>
        </td>
        <td>
          <input
            type="text"
            value={stuData?.email}
            onChange={(e) =>
              setStuData((prevState) => ({
                ...prevState,
                email: e.target.value,
              }))
            }
          ></input>
        </td>
        {isEdit && (
          <td colSpan={2}>
            <button onClick={updateStuHandler}>修改</button>
            {isEdit && <button onClick={onCancel}>取消</button>}
          </td>
        )}
        {!isEdit && (
          <td colSpan={3}>
            <button onClick={addStuHandler}>添加学生</button>
          </td>
        )}
      </tr>
      {isLoading && (
        <tr>
          <td colSpan={7}>正在{status}...</td>
        </tr>
      )}
      {error && (
        <tr>
          <td colSpan={7}>
            <strong>{status}不成功</strong>
          </td>
        </tr>
      )}
    </>
  );
}
