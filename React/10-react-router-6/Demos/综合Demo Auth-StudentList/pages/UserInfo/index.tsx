import { useAppSelector } from '@/hooks/redux'
import React, { useState } from 'react'

export default function About() {
  const { username, email } = useAppSelector(s => s.auth.value.user)
  return (
    <div>
      <h2>个人信息页:</h2>
      <h3>欢迎您: {username}</h3>
      <h3>现在是: {new Date().toLocaleDateString('zh-cn')}</h3>
      <h3>您的邮箱地址: {email}</h3>
    </div>
  )
}
