import {
  Outlet,
  createBrowserRouter,
  RouterProvider,
  useLoaderData,
} from 'react-router-dom'

const requestUser = function () {
  return Promise.resolve({
    id: '001',
    name: 'jack',
    account: '123',
  })
}

async function loader() {
  const user = await requestUser()
  return user
}

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

function Login() {
  //获取数据
  console.log(useLoaderData()) //{id: '001', name: 'jack', account: '123'}
  return <span>Login</span>
}
