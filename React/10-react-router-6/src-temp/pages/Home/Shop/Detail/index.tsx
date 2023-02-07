import React, { Component } from 'react'

export default function Detail() {
  const priceInfo = [
    { id: '01', price: '3999' },
    { id: '02', price: '8999' },
    { id: '03', price: '6999' },
  ]

  return (
    <div>
      <h3>商品详情</h3>
      <div>
        {/* <h3>ID: {id}</h3> */}
        {/* <h3>Title: {title}</h3> */}
        {/* <h3>Price: {detailObj.price}</h3> */}
      </div>
    </div>
  )
}
