import { createRouter, RouterOptions, createWebHashHistory, createWebHistory } from 'vue-router'

const option: RouterOptions = {
  history: createWebHistory(),

  routes: [
    {
      name: 'root',
      path: '/',
      // redirect:'/path',
      redirect: { path: '/root1', query: { name: 'bar' } },
      props: route => {
        const { params, query } = route
        return { ...params, ...query }
      },
      // 函数式写法
      // redirect(to) {
      //   // 返回路径 '/index'
      //   // 返回对象 { name: 'Foo', query: { name: 'bar' } }
      // },
      component: () => import('../components/01命名视图/Root.vue'),
      children: [
        {
          name: 'root1',
          path: 'root1',
          // 视图别名 string | string[]
          alias: ['/root1', '/root0'],
          // 命名视图 形式 - 对象 默认展示的视图为 default
          components: {
            aaa: () => import('../components/01命名视图/AAA.vue'),
          },
        },
        {
          name: 'root2',
          path: 'root2',
          meta: { requiredAuth: true },
          // 命名视图 形式 - 对象 默认展示的视图为 default
          components: {
            default: () => import('../components/01命名视图/BBB.vue'),
            ccc: () => import('../components/01命名视图/CCC.vue'),
          },
          // 路由独享守卫
          beforeEnter: (to, from) => {
            // reject the navigation
            alert('没有登录, 不允许进入!')
            return false
          },
        },
        {
          name: 'root3',
          path: 'root3',
          // 命名视图 形式 - 对象 默认展示的视图为 default
          components: {
            default: () => import('../components/01命名视图/DDD.vue'),
          },
        },
      ],
    },
  ],
}

const router = createRouter(option)

// 登录认证
// const token = ''
// router.beforeResolve((to, from) => {
//   if (to.meta.requiredAuth && !token) {
//     alert('需要登录!')
//     return false
//   }
// })

export default router
