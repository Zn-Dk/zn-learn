import Loading from '@/components/Loading'
import Home from '@/pages/Home'
import NotFound from '@/pages/404'
import UserInfo from '@/pages/UserInfo'
import Auth from '@/pages/Auth'

import { lazy, Suspense, type ReactNode } from 'react'
import { Navigate, type RouteObject } from 'react-router-dom'

// 路由懒加载使用
// const News = lazy(() => import('../pages/Home/News'))
// const Shop = lazy(() => import('../pages/Home/Shop'))
// const Detail = lazy(() => import('../pages/Home/Shop/Detail'))
// lazyComponentFactory
const lazyComp = (pagePath: string, fallback?: ReactNode) => {
  const LazyElement = lazy(() => import(`../pages/${pagePath}`))
  return (
    <Suspense fallback={fallback ?? <Loading />}>
      <LazyElement />
    </Suspense>
  )
}
export default [
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
    element: <UserInfo />,
  },
  {
    path: '/',
    element: <Navigate to={'/home'} />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
] as RouteObject[]
