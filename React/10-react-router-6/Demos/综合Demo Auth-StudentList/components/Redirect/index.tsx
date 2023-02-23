import React, { useEffect, useState, type PropsWithoutRef } from 'react'
import type { FC } from 'react'
import { Button, Card } from 'antd'
import { useNavigate } from 'react-router-dom'

// 路由鉴权 路由守卫
const Redirect: FC<PropsWithoutRef<any>> = props => {
  const nav = useNavigate()
  const [countdown, setCountdown] = useState(3)
  // 携带之前的 location 进行跳转

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prev => prev - 1)
    }, 1000)
    const timer = setTimeout(() => {
      nav('/auth/login', {
        replace: true,
        state: { from: props?.from },
      })
    }, 3100)

    return () => {
      clearInterval(interval)
      clearTimeout(timer)
    }
  }, [])

  return (
    <Card
      style={{
        display: 'flex',
        width: '80vw',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <h2>很抱歉, 您未登录, {countdown}秒后自动跳转去登录注册页</h2>
      <Button
        style={{ margin: 'auto' }}
        onClick={() =>
          nav('/auth/login', {
            replace: true,
            state: { from: props?.from },
          })
        }
      >
        登录/注册
      </Button>
    </Card>
  )
}

export default Redirect
