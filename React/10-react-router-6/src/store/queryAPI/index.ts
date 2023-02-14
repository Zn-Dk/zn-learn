import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:1337/api/auth/local',
  }),
  endpoints(build) {
    return {
      register: build.mutation({
        query(user) {
          return {
            url: 'register',
            method: 'POST',
            body: user,
          }
        },
      }),
      login: build.mutation({
        query(user) {
          return {
            url: '',
            method: 'POST',
            body: user, // 验证的 key 不是 username 而是 identifier (因为可能有 email 登录)
          }
        },
      }),
    }
  },
})

export const { useLoginMutation, useRegisterMutation } = authApi

export default authApi
