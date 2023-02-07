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
         RouterV6使用嵌套路由 只需要在嵌套层级下建立 NavLink 然后使用 Outlet 组件
         进行嵌套 功能类比 vue-router 的 router-view 组件
          - 现在支持书写相对路径 ./path 和 path 两种形态了 不一定写绝对路径
      */}
      <div className="home-top">
        {/* 三种方式 */}
        {/* <NavLink to="/home/news">新闻</NavLink> */}
        {/* <NavLink to="./news">新闻</NavLink> */}
        <NavLink to="news">新闻</NavLink>
        <NavLink to="/home/shop">商品</NavLink>
      </div>
      <div className="home-view">
        <Outlet />
      </div>
    </div>
  )
}
