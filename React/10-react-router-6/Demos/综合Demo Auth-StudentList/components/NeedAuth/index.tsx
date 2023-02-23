import React, { type PropsWithChildren } from 'react'
import type { FC } from 'react'
import { useAppSelector } from '@/hooks/redux'
import Redirect from '@/components/Redirect'
import { useLocation } from 'react-router-dom'

// 路由鉴权 路由守卫
const NeedAuth: FC<PropsWithChildren> = props => {
  const isLogin = useAppSelector(({ auth }) => auth.value.isLogin)
  console.log(isLogin, '<--isLogin')
  // 记录用户之前的位置
  // 以便登录成功后跳转回到之前页面
  const from = useLocation()
  return isLogin ? <>{props.children}</> : <Redirect from={from} />
}

export default NeedAuth
