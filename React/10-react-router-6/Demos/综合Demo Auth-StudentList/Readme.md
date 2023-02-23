## Demo 说明



# Main Structure
```
Page Structure :

main.tsx
  |
  BrowserRouter - (Providers: React-Redux | MyHistoryProvider)
    |
    App
      |-routes
        |-HistoryContainer // 容器(自定义ctx 历史栈存储 pathname)
          |-Home        // 首页
          |-Auth        // 登录注册
          |-NeedAuth    // 用户中心(鉴权组件)
          |    |-UserInfo
          |    |-Redirect 无登录态访问url
          |-StudentList  // 学生列表(内部有isLogin 判断)
          |-重定向 '/' --> '/home'
          |- * --> NotFound  // 404

store:
  index.ts
   |
   |- authApi   // RTK QUERY 处理登录注册POST API
      |-register
      |-login
   |-studentApi // RTK QUERY 处理学生表单CURD API
      |-baseQuery-prepareHeaders(获取 auth-token 并添加至 Header)
      |-getStudents
      |-getStudentByID
      |-addStudent
      |-updateStudent
      |-deleteStudent
   |- auth, // slice 管理登入登出,登录态持久化和有效时间
      |-setUserState
      |-clearUserState

```