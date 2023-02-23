import React, { type FC } from 'react'
import './index.css'
import { useGetStudentsQuery } from '@/store/queryAPI/studentApi'
import { useAppSelector } from '@/hooks/redux'
import Button from 'antd/es/button'
import { useNavigate } from 'react-router-dom'
import StudentForm from './StudentForm'
import StudentItem from './StudentItem'
// import type { ColumnsType } from 'antd/es/table'
// import Table from 'antd/es/table'

// interface Student {
//   key: number
//   name: string
//   gender: string
//   age: number
//   control?: HTMLInputElement
// }

// const columns: ColumnsType<Student> = [
//   {
//     key: 'name',
//     title: 'Name',
//     dataIndex: 'name',
//   },
//   {
//     key: 'gender',
//     title: 'Gender',
//     dataIndex: 'gender',
//   },
//   {
//     key: 'age',
//     title: 'Age',
//     dataIndex: 'age',
//   },
//   {
//     key: 'control',
//     title: '操作',
//     dataIndex: 'control',
//   },
// ]
// const data: Student[] = [
//   {
//     key: 0,
//     name: 'Jack',
//     gender: 'nan',
//     age: 22,
//     control: <input type="text" />,
//   },
// ]

const StudentList: FC = () => {
  // 传入登录态
  const { isLogin } = useAppSelector(state => state.auth.value)
  const nav = useNavigate()
  const { isError, error, isLoading, isSuccess, isFetching, refetch, data: stuData } =
    // useQuery 的第二个参数 可配置项
    useGetStudentsQuery(null, {
      // 响应数据进行自定义处理...
      // selectFromResult: (result) => {
      //   console.log(result);
      //   if (result.data) {
      //     result.data = result.data.filter((item) => item.attributes.age < 25);
      //   }
      //   // 必须返回出去
      //   return result;
      // },
      // 设置轮询间隔,单位 ms, 默认: 0 表示不轮询
      // pollingInterval: 10000,
      // 是否跳过当前请求(可以在此加判断条件, 如 id 不存在...) 默认 false
      skip: false,
      // 组件挂载或参数改变时重发请求(不使用缓存)
      // boolean - 是否重发, number - 缓存有效期(s)
      refetchOnMountOrArgChange: 5,
      // 切换浏览器窗口时是否重新加载(需要预配置,见store/index.js)
      // refetchOnFocus: true,
      // 脱机后是否重新加载(需要预配置,见store/index.js)
      refetchOnReconnect: true,
    })
  return (
    <>
      <h2>学生列表</h2>
      <Button onClick={() => refetch()}>刷新数据</Button>
      {
        // 未登录时让用户跳转
        !isLogin && (
          <Button onClick={() => nav('/auth/login', { state: { from: location.pathname } })}>
            登录/注册
          </Button>
        )
      }

      <table
        border={1}
        style={{ minWidth: '980px' }}
      >
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
          {isLoading && <h2>正在加载,请稍后...</h2>}
          {isError && <h2>加载错误 : {error.status + ' ' + error.data.error.message}</h2>}
          {!isFetching &&
            isSuccess &&
            stuData.map(({ attributes, id }) => (
              <StudentItem
                isLogin={isLogin}
                stu={{ attributes, id }}
                key={id}
              />
            ))}
          {
            // 登录后可以添加表单
            isLogin && <StudentForm />
          }
          {/* <Table<Student>
            columns={columns}
            dataSource={data}
          ></Table> */}
        </tbody>
      </table>
    </>
  )
}

export default StudentList
