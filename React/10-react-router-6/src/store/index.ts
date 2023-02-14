import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import queryAPI from './queryAPI'
import auth from './slices/auth'

const store = configureStore({
  reducer: {
    [queryAPI.reducerPath]: queryAPI.reducer,
    auth,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(queryAPI.middleware),
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
