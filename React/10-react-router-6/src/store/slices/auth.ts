import { createSelector, createSlice } from '@reduxjs/toolkit'

type UserState = {
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
const initUserState: {
  isLogin: boolean
  token: string
  user: Partial<UserState['user']>
} = {
  isLogin: false,
  token: '',
  user: {},
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    value: { ...initUserState },
  },
  reducers: {
    setUserState: (state, { payload }: { type: string; payload: UserState }) => {
      state.value = {
        isLogin: true,
        token: payload.token,
        user: payload.user,
      }
    },
    clearUserState: state => {
      state.value = {
        ...initUserState,
      }
    },
  },
})

// 导出 Actions
export const { setUserState, clearUserState } = authSlice.actions

// 导出 Reducer
export default authSlice.reducer
