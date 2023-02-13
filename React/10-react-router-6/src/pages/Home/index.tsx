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
      {/*
          使用嵌套路由 只需要在嵌套层级下建立 NavLink-Route 关系即可
            注意  路由要将之前的路由路径全部匹配进来
        */}
      <div className="home-top">
        <NavLink to="/home/news">新闻</NavLink>
        <NavLink to="/home/shop">商品</NavLink>
      </div>
      <div className="home-view">
        <Outlet />
      </div>
    </div>
  )
}
