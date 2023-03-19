import React, { useState } from "react";
import { useEffect } from "react";

export default function StudentForm({
  stuData,
  setStuData,
  isEdit = false,
  onCancel = () => {},
}) {
  const keyWord = isEdit ? "更新" : "添加";
  const formHandler = () => {
    // updateStudent({
    //   name,
    //   age,
    //   gender,
    //   phone,
    //   email,
    // });
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
        <td colSpan={2}>
          <button
            style={{ width: "50%" }}
            onClick={formHandler}
          >
            {keyWord}
          </button>
          {isEdit && (
            <button
              style={{ width: "50%" }}
              onClick={onCancel}
            >
              取消
            </button>
          )}
        </td>
      </tr>
      {/* {loading && (
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
      )} */}
    </>
  );
}
