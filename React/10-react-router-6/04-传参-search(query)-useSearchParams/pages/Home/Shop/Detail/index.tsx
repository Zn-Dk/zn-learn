import React from 'react'
import { Card } from 'antd'
import { useSearchParams } from 'react-router-dom'

export default function Detail() {
  // 获取 Search(Query) 参数 Hooks - useSearchParams
  // 返回值是类似 useState 的形式
  // 源码就是通过调用浏览器的 URLSearchParams API 故使用方法同
  // 因为是存储在链接的 query 可以方便的进行状态维持, 分享链接等
  const [URLSearchParams, SetURLSearchParams] = useSearchParams()

  // 可以借用 Object.fromEntries 处理成对象
  const { id, title } = Object.fromEntries(URLSearchParams)

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
