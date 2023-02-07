import React from 'react'
import { Card } from 'antd'
import { useParams } from 'react-router-dom'

export default function Detail() {
  // 获取 Params Hooks - useParams
  const { id = '未知', title = '未知' } = useParams()
  console.log(useParams())

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
