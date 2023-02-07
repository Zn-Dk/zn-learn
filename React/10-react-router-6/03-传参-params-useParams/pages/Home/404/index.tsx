import React from 'react'
import type { FC } from 'react'
import { Button, Card } from 'antd'
import { Navigate, useNavigate } from 'react-router-dom'

const NotFound: FC = () => {
  const nav = useNavigate()

  return (
    <Card>
      <h1>404 Not Found</h1>
      <h2>没有找到你想要的页面...</h2>
      <Button onClick={() => nav('/home')}> 点击返回首页 </Button>
    </Card>
  )
}

export default NotFound
