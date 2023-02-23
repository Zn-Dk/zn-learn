import React, { useState } from 'react'
import StudentForm from './StudentForm'
import { useDeleteStudentMutation } from '@/store/queryAPI/studentApi'
import { Button } from 'antd'
import { useAppSelector } from '@/hooks/redux'

export default function StudentItem({ stu: { attributes, id }, isLogin }) {
  const [isEdit, setIsEdit] = useState(false)
  const cancelEdit = () => {
    setIsEdit(false)
  }

  const [newData, setNewData] = useState({})
  // useMutation的钩子返回的是一个数组
  // 数组中有两个东西，第一个是操作的触发器，第二个是结果对象 result { isSuccess , error, ...}
  const [delStudent, { isSuccess: isDeleted, isLoading, isError }] = useDeleteStudentMutation()

  const delStuHandler = () => {
    delStudent(id)
  }

  // 初次加载 使用原始数据, 第一次点击更新后使用最新数据
  const { name, gender, age, phone, email, is_vip } = newData.name ? newData : attributes
  return (
    <>
      {!isEdit && (
        <tr key={name}>
          <td>{name}</td>
          <td>{gender}</td>
          <td>{age}</td>
          <td>{phone}</td>
          <td>{email}</td>
          <td>{is_vip + ''}</td>
          {
            // 登录修改许可
            isLogin ? (
              <td>
                <Button onClick={() => setIsEdit(true)}>修改</Button>
                <Button onClick={() => delStuHandler()}>删除</Button>
              </td>
            ) : (
              <td>登录后修改</td>
            )
          }
        </tr>
      )}

      {isEdit && (
        <StudentForm
          id={id}
          isEdit={isEdit}
          onCancel={cancelEdit}
          updateDisplayData={setNewData}
        />
      )}

      {isLoading && (
        <tr>
          <td colSpan={7}>正在删除...</td>
        </tr>
      )}
      {isError && (
        <tr>
          <td colSpan={7}>删除失败...</td>
        </tr>
      )}
    </>
  )
}
