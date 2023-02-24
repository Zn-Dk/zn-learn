import { useAntdMessage } from '@/hooks/message'
import { createSelector, createSlice } from '@reduxjs/toolkit'

export type UserResp = {
  token: string
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
type UserState = {
  isLogin: boolean
  token: string
  user: Partial<UserResp['user']>
  expTime: number
}
const initUserState: UserState = {
  isLogin: false,
  token: '',
  user: {},
  expTime: 0,
}

const getLocalStor = (key: string) => {
  return window.localStorage.getItem(key)
}
const setLocalStor = (key: string, value: string) => {
  return window.localStorage.setItem(key, value)
}
const removeLocalStor = (key: string) => {
  return window.localStorage.removeItem(key)
}

const authSlice = createSlice({
  name: 'auth',
  // 使用函数处理 initialState 实现持久化用户登录态
  initialState: () => {
    const token = getLocalStor('token')
    return token
      ? {
          value: {
            isLogin: true,
            token,
            user: JSON.parse(getLocalStor('user')!) as UserState['user'],
            expTime: +getLocalStor('expTime')! as UserState['expTime'],
          },
        }
      : {
          value: initUserState,
        }
  },
  reducers: {
    setUserState: (state, { payload }: { type: string; payload: UserResp }) => {
      // local 持久化 有效期 7d
      const timeout = 1000 * 60 * 60 * 24 * 7
      state.value = {
        isLogin: true,
        token: payload.token,
        user: payload.user,
        expTime: Date.now() + timeout,
      }
      setLocalStor('token', payload.token)
      setLocalStor('user', JSON.stringify(payload.user))
      setLocalStor('expTime', '' + state.value.expTime)
    },
    clearUserState: state => {
      state.value = {
        ...initUserState,
      }
      removeLocalStor('token')
      removeLocalStor('user')
      removeLocalStor('expTime')
    },
  },
})

// 导出 Actions
export const { setUserState, clearUserState } = authSlice.actions

// 导出 Reducer
export default authSlice.reducer
