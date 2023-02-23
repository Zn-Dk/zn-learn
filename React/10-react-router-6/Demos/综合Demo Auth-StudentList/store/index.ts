import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import auth from './slices/auth'
import authApi from '@/store/queryAPI/authApi'
import studentApi from '@/store/queryAPI/studentApi'

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [studentApi.reducerPath]: studentApi.reducer,
    auth,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(authApi.middleware, studentApi.middleware),
})

setupListeners(store.dispatch)

export default store

// TS 导出类型
export type AuthState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

/*
  类型示例
  import { configureStore } from '@reduxjs/toolkit'
  // ...

  const store = configureStore({
    reducer: {
      posts: postsReducer,
      comments: commentsReducer,
      users: usersReducer,
    },
  })

  // Infer the `RootState` and `AppDispatch` types from the store itself
  export type RootState = ReturnType<typeof store.getState>
  // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
  export type AppDispatch = typeof store.dispatch

*/
