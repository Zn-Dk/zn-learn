import { createRouter, RouterOptions, createWebHashHistory, createWebHistory } from 'vue-router'
const option: RouterOptions = {
  history: createWebHistory(),

  routes: [
    {
      name: 'root',
      path: '/',
      redirect: { path: '/root1', query: { name: 'bar' } },
      props: route => {
        const { params, query } = route
        console.log(route.params)
        return { ...params, ...query }
      },
      // 函数式写法
      // redirect(to) {
      //   // 返回路径 '/index'
      //   // 返回对象 { name: 'Foo', query: { name: 'bar' } }
      // },
      component: () => import('../demo/01命名视图/App.vue'),
      children: [
        {
          name: 'root1',
          path: '/root1',
          // 视图别名 string | string[]
          alias: ['/root1', '/root0'],
          // 命名视图 形式 - 对象 默认展示的视图为 default
          components: {
            aaa: () => import('../demo/01命名视图/components/AAA.vue'),
          },
        },
        {
          name: 'root2',
          path: '/root2',
          meta: { requiredAuth: true },
          // 命名视图 形式 - 对象 router-view 默认展示的视图为 default
          components: {
            default: () => import('../demo/01命名视图/components/BBB.vue'),
            ccc: () => import('../demo/01命名视图/components/CCC.vue'),
          },
          // 路由独享守卫
          // beforeEnter: (to, from) => {
          //   // reject the navigation
          //   alert('没有登录, 不允许进入!')
          //   return false
          // },
        },
        {
          name: 'root3',
          path: '/root3/:foo(.*)*',
          props: true,
          components: {
            ddd: () => import('../demo/01命名视图/components/DDD.vue'),
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
