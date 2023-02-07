import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import './index.css'

const productList = [
  { id: '01', title: '小米手机13' },
  { id: '02', title: 'iPhone 14 Pro' },
  { id: '03', title: 'vivo X90 Pro+' },
]
export default function Shop() {
  return (
    <div>
      <h2>商品列表</h2>
      <button onClick={() => {}}> 后退 </button>
      <button onClick={() => {}}> 前进 </button>
      <button onClick={() => {}}> 后退2步 </button>
      <ul className="product-list">
        {productList.map(obj => {
          const { id, title } = obj
          return <NavLink key={id} to={'/detail'}></NavLink>
        })}
      </ul>
      <Outlet />
    </div>
  )
}
