import {
  Outlet,
  createBrowserRouter,
  RouterProvider,
  useLoaderData,
} from 'react-router-dom'

// MOCK AJAX
const requestUser = function () {
  return Promise.resolve({
    id: '001',
    name: 'jack',
    account: '123',
  })
}

// 1.自定义Loader
async function loader() {
  const user = await requestUser()
  return user
}

// 2.路由表定义loader函数
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: 'login',
        element: <Login />,
        loader,
      },
    ],
  },
])

// APP
function App() {
  return <RouterProvider router={router} />
}

function Home() {
  return (
    <span>
      Home
      <Outlet />
    </span>
  )
}

// useLoaderData 获取数据
function Login() {
  console.log(useLoaderData()) //{id: '001', name: 'jack', account: '123'}
  return <span>Login</span>
}
