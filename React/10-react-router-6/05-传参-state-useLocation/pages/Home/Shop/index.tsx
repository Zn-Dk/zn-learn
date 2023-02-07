import { Button } from 'antd'
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
      <Button onClick={() => {}}> 后退 </Button>
      <Button onClick={() => {}}> 前进 </Button>
      <Button onClick={() => {}}> 后退2步 </Button>
      <ul className="product-list">
        {productList.map(obj => {
          const { id, title } = obj
          return (
            <NavLink
              key={id}
              to={'detail'}
              // 不需要像 v5 的时候写在 to 对象里, 而是直接提供了 state props
              state={obj}
            >
              {title}
            </NavLink>
          )
        })}
      </ul>
      <Outlet />
    </div>
  )
}
