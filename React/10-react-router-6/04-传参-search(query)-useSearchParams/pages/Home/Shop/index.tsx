import { Button } from 'antd'
import React from 'react'
import { NavLink, Outlet, useNavigate, useRoutes } from 'react-router-dom'
import './index.css'

const productList = [
  { id: '01', title: '小米手机13' },
  { id: '02', title: 'iPhone 14 Pro' },
  { id: '03', title: 'vivo X90 Pro+' },
]
export default function Shop() {
  const nav = useNavigate();
  const goBack = () => {
    nav(-1);
  }
  const goForward = () => {
    nav(1);
  }

  return (
    <div>
      <h2>商品列表</h2>
      <Button onClick={goBack}> 后退 </Button>
      <Button onClick={goForward}> 前进 </Button>
      <Button onClick={() => nav(-2)}> 后退2步 </Button>
      <ul className="product-list">
        {productList.map(obj => {
          const { id, title } = obj
          return (
            <NavLink
              key={id}
              to={`detail?id=${id}&title=${title}`}
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
