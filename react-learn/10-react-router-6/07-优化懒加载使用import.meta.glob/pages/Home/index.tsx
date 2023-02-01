import React, { lazy, Suspense } from 'react'
import './index.css'
import { NavLink, Outlet, Route, Routes, useRoutes } from 'react-router-dom'
import Loading from '@/components/Loading'
import routes from '@/routes'

export default function Home() {
  const element = useRoutes(routes)

  return (
    <div>
      <p>Home 组件</p>
      <div className="home-top">
        <NavLink to="news">新闻</NavLink>
        <NavLink to="shop">商品</NavLink>
      </div>
      <div className="home-view">
        <Outlet />
      </div>
    </div>
  )
}
