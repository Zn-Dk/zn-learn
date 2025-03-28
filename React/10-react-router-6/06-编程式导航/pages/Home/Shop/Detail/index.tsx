import React from 'react'
import { Card } from 'antd'
import { useLocation, useParams } from 'react-router-dom'

export default function Detail() {
  const { id, title } = useParams()

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
