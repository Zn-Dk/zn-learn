import React from 'react'
import './index.css'
import { NavLink, Outlet, useRoutes, useNavigate } from 'react-router-dom'
import routes from '@/routes'

export default function Home() {
  const element = useRoutes(routes)
  let navigate = useNavigate()
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
