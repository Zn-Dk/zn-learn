import Loading from '@/components/Loading'
import About from '@/pages/About'
import Home from '@/pages/Home'
import NotFound from '@/pages/Home/404'

import { lazy, Suspense, createElement, type ReactNode } from 'react'
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

// 创建路由表, 引入组件后通过 useRoutes 来解析返回 React.element 对象创建路由视图
export default [
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/home/*', // 必须加上 /* 匹配
    element: <Home />,
    // 嵌套路由的 path 书写规则与 vue-router 相似, 不加 / 或 ./ 视为相对路径
    children: [
      {
        path: 'news',
        element: lazyComp('Home/News'),
      },
      {
        path: 'shop',
        element: lazyComp('Home/Shop'),
        children: [
          {
            path: 'detail',
            element: lazyComp('Home/Detail'),
          },
        ],
      },
      // 配置默认子页面重定向
      {
        path: '*',
        element: <Navigate to={'news'} />,
      },
    ],
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
