import Loading from '@/components/Loading'
import About from '@/pages/About'
import Home from '@/pages/Home'
import NotFound from '@/pages/Home/404'

import { lazy, Suspense, type ReactNode } from 'react'
import { Navigate, type RouteObject } from 'react-router-dom'

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
    path: '/about',
    element: <About />,
  },
  {
    path: '/home/*',
    element: <Home />,
    children: [
      {
        path: 'news',
        element: lazyComp('Home/News'),
      },
      {
        path: 'shop/*',
        element: lazyComp('Home/Shop'),
        children: [
          {
            path: 'detail/:id/:title',
            element: lazyComp('Home/Shop/Detail'),
          },
        ],
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
