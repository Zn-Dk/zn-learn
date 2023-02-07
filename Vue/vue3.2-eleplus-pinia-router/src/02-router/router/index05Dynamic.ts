import { nextTick } from 'vue'
import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
  RouterOptions,
  RouteRecordRaw,
} from 'vue-router'

const options: RouterOptions = {
  history: createWebHashHistory(),
  routes: [
    {
      name: 'Login',
      path: '/',
      alias: '/login',
      meta: {
        title: '登录页面',
      },
      component: () => import('../demo/05动态路由/Login.vue'),
    },
    {
      name: 'Index',
      path: '/index',
      redirect: { name: 'User' },
      meta: {
        isAuth: true,
        title: '个人中心',
      },
      component: () => import('../demo/05动态路由/Index.vue'),
      children: [
        {
          name: 'User',
          path: '/index/user',
          meta: {
            title: '个人信息维护',
          },
          component: () => import('../demo/05动态路由/User.vue'),
        },
      ],
    },
    {
      name: '404',
      // Vue3 删除了 * 通配符作为 404 路由
      // 现在必须使用自定义的 regex 参数来定义所有路由(*、/*) , 下面 pathMatch 是参数的名称, 意为 match .* 的任意多个字符
      path: '/:pathMatch(.*)*',
      component: () => import('../demo/02导航守卫/NotFound.vue'),
    },
  ],
}

const router = createRouter(options)

router.beforeEach((to, from) => {
  /*       标题修改       */
  let title = to.meta?.title as string
  title && (document.title = title)

  /*       动态路由持久化 - 动态路由权限验证     */
  const stor = window.sessionStorage.getItem('route')
  let list
  if (stor) {
    list = JSON.parse(stor)
    list.forEach((item: RouteRecordRaw) => {
      router.addRoute('Index', {
        name: item.name,
        path: item.path,
        meta: item.meta,
        component: () => import(`../demo/05动态路由/${item.component}`),
      })
    })
  }

  // 如果此时没有找到对应的路径(用户直接输入地址栏) 读取存储中的路由数据进行动态添加
  // if (!to.matched.length) {
  if (to.matched[0].name === '404' && to.path !== from.path) {
    // 添加完后,这里还要再次匹配(如果此时有 matched, 用户才有权限访问这个路径, 否则应该返回 或者 404)
    let flag = router.getRoutes().findIndex(route => route.path === to.path)
    return flag === -1 ? { name: '404', path: '/404' } : to.path
  }

  /*  鉴权 */
  if (to.name !== 'Login' && to.meta?.isAuth && !window.localStorage.getItem('user')) {
    return { name: 'Login' }
  }
})

export default router
