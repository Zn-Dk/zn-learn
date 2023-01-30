import About from '@/pages/About'
import Home from '@/pages/Home'
import { Navigate, type RouteObject } from 'react-router-dom'

// 创建路由表 React 会自动生成路由视图
export default [
  { path: '/about', element: <About /> },
  { path: '/home', element: <Home /> },
  { path: '/', element: <Navigate to={'/home'} /> },
] as RouteObject[]
