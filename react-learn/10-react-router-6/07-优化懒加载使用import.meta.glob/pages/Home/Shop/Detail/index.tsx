import React from 'react'
import { Card } from 'antd'
import { useLocation } from 'react-router-dom'

export default function Detail() {
  // 获取 state(Query) 参数 Hooks - useLocation
  // 其实就是利用浏览器 Location API 且 State 为 H5 HISTORY API 可以直接获取
  // Example : {pathname: '/home/shop/detail', search: '', hash: '', state: {…}, key: 'ppu3pj37'}
  const location = useLocation()
  console.log(location)
  const { id, title } = location.state

  const details = [
    { id: '01', price: '3999', desc: '8 + 128G' },
    { id: '02', price: '8999', desc: '8 + 256G' },
    { id: '03', price: '6999', desc: '12 + 512G' },
  ]

  const detailObj = details.find(item => {
    return item.id === id
  })

  return (
    <div>
      <h3>商品详情</h3>
      <Card>
        <div>
          <h3>ID: {id}</h3>
          <h3>Title: {title}</h3>
          <p>Price: {detailObj?.price || '??'}</p>
          <p>Desc: {detailObj?.desc || '??'}</p>
        </div>
      </Card>
    </div>
  )
}
