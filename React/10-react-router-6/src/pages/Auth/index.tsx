import React, { useEffect, useState, type FormEvent } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
// antd
import { Button, Card } from 'antd'
import { useAntdMessage } from '@/hooks/message'
// rtkq
import { useLoginMutation, useRegisterMutation } from '@/store/queryAPI'
// redux
import { setUserState } from '@/store/slices/auth'
import { useAppDispatch } from '@/hooks/redux'

const Auth = () => {
  const nav = useNavigate()
  const { type } = useParams()
  const isLogin = type === 'login'
  const displayWord = isLogin ? '登录' : '注册'
  const displayOpsWord = isLogin ? '注册' : '登录'
  const [msgHandler, contextHolder] = useAntdMessage()

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
  })

  // redux dispatch hooks(with TS)
  const dispatch = useAppDispatch()
  // RTKQuery Mutations
  const [submitReg, { error: regError }] = useRegisterMutation()
  const [submitLogin, { error: loginError }] = useLoginMutation()

  const submitHandler = (e: FormEvent) => {
    e.preventDefault()
    isLogin ? loginHandler() : regHandler()
  }

  // 注册
  const regHandler = async () => {
    const res = await submitReg(formData)
    console.log('regResult', res)
    if ('error' in res) {
      console.log(regError)
      const { message } = res.error.data.error
      msgHandler(`注册出错: ${message}`)
      return
    }
    msgHandler('注册成功,跳转至登录页面', { type: 'success' })
    setTimeout(() => {
      nav('/auth/login')
    }, 1000)
    // TODO 可以清空表单
  }

  // 登录
  type LoginRes = {
    data: {
      jwt: string
      user: {
        id: number
        username: string
        email: string
        provider: string
        confirmed: boolean
        blocked: boolean
        createdAt: string
        updatedAt: string
      }
    }
  }
  const loginHandler = async () => {
    const res = await submitLogin({
      identifier: formData.username,
      password: formData.password,
    })
    console.log('loginResult', res)

    if ('error' in res) {
      const { message } = res.error.data.error
      msgHandler(`登录出错: ${message}`)
      return
    }
    // 登录完成存储用户状态
    dispatch(
      setUserState({
        token: res.data.jwt,
        user: res.data.user,
      }),
    )
    // Message 展示
    msgHandler(`欢迎您,尊敬的 ${formData.username}`, { type: 'success' })
    // 跳转回首页
    nav('/')
  }

  return (
    <>
      {contextHolder}
      <Card>
        <h3>Welcome, let's {displayWord}</h3>
        <form onSubmit={submitHandler}>
          <div className="form-item">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={e =>
                setFormData(prevState => ({ ...prevState, username: e.target.value.trim() }))
              }
              placeholder="请输入用户名.."
            />
          </div>
          <div className="form-item">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={e =>
                setFormData(prevState => ({ ...prevState, password: e.target.value.trim() }))
              }
              placeholder="请输入密码.."
            />
          </div>
          {type === 'register' && (
            <div className="form-item">
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={e =>
                  setFormData(prevState => ({ ...prevState, email: e.target.value.trim() }))
                }
                placeholder="请输入Email.."
              />
            </div>
          )}
          <Button
            type="primary"
            htmlType="submit"
          >
            {displayWord}
          </Button>
          <NavLink to={isLogin ? '/auth/register' : '/auth/login'}>
            还未{displayOpsWord}?点击{displayOpsWord}
          </NavLink>
        </form>
      </Card>
    </>
  )
}

export default Auth
