import useFetch from "@/hooks/useFetch";
import { StuContext } from "@/store/studentContext";
import React, { useContext, useState } from "react";

export default function StudentForm({
  isEdit = false,
  stu: { attributes = {}, id } = {},
}) {
  const { fetchData: refresh } = useContext(StuContext);
  const keyWord = isEdit ? "更新" : "添加";

  const [name, setName] = useState(attributes.name || "");
  const [gender, setGender] = useState(attributes.gender || "");
  const [age, setAge] = useState(attributes.age || 0);
  const [phone, setPhone] = useState(attributes.phone || "");
  const [email, setEmail] = useState(attributes.email || "");

  const {
    loading,
    error,
    fetchData: updateStudent,
  } = useFetch(
    {
      method: isEdit ? "PUT" : "POST",
      id: isEdit ? id : null,
    },
    refresh
  );

  const formHandler = () => {
    updateStudent({
      name,
      age,
      gender,
      phone,
      email,
    });
  };

  return (
    <>
      <tr>
        <td>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
        </td>
        <td>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
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
            value={age}
            onChange={(e) => setAge(e.target.value)}
          ></input>
        </td>
        <td>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          ></input>
        </td>
        <td>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </td>
        <td colSpan={2}>
          <button
            onClick={formHandler}
            style={{ width: "100%" }}
          >
            {" "}
            {keyWord}
          </button>
        </td>
      </tr>
      {loading && (
        <tr>
          <td colSpan={7}>正在{keyWord}...</td>
        </tr>
      )}
      {error && (
        <tr>
          <td colSpan={7}>
            <strong>{keyWord}不成功</strong>
          </td>
        </tr>
      )}
    </>
  );
}
