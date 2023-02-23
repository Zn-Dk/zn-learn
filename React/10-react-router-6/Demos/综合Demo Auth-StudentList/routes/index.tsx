import Loading from '@/components/Loading'
import Home from '@/pages/Home'
import NotFound from '@/pages/NotFound'
import UserInfo from '@/pages/UserInfo'
import Auth from '@/pages/Auth'
import NeedAuth from '@/components/NeedAuth'
import StudentList from '@/components/Student/StudentList'

import { lazy, Suspense, type ReactNode } from 'react'
import { Navigate, type RouteObject } from 'react-router-dom'
import HistoryContainer from '@/components/HistoryContainer'

// 路由懒加载使用

// lazyComponentFactory
const lazyComp = (pathToPage: string, fallback?: ReactNode) => {
  const LazyElement = lazy(() => import(`../pages/${pathToPage}`))
  return (
    <Suspense fallback={fallback ?? <Loading />}>
      <LazyElement />
    </Suspense>
  )
}

// 引入 NeedAuth 鉴权组件
export default [
  {
    path: '/',
    element: <HistoryContainer />,
    children: [
      {
        path: '/home/*',
        element: <Home />,
      },
      {
        path: '/auth/:type',
        element: <Auth />,
      },
      {
        path: '/userInfo',
        // 鉴权组件
        element: (
          <NeedAuth>
            <UserInfo />
          </NeedAuth>
        ),
      },
      {
        path: '/student',
        element: <StudentList />,
      },
      {
        path: '/',
        element: <Navigate to={'/home'} />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
] as RouteObject[]
