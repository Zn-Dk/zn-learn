import { createRouter, RouterOptions, createWebHashHistory, createWebHistory } from 'vue-router'

import Progress from '@/02-router/demo/02导航守卫/progress'

const option: RouterOptions = {
  history: createWebHistory(),
  routes: [
    {
      name: 'Login',
      path: '/', // 不写path 代表继承父路由的路径
      // 路由懒加载
      component: () => import('../demo/02导航守卫/Login.vue'),
    },
    {
      name: 'Index',
      path: '/index',
      alias: '/user',
      component: () => import('../demo/02导航守卫/Main.vue'),
    },
    {
      name: '404',
      // Vue3 删除了 * 通配符作为 404 路由
      // 现在必须使用自定义的 regex 参数来定义所有路由(*、/*) , 下面 pathMatch 是自定义的 params, 意为 match .* 的任意多个字符(传与不传都可以)
      path: '/:pathMatch(.*)*',
      // 设置 /404 路径作为别名
      alias: '/:pathMatch(404)',
      component: () => import('../demo/02导航守卫/NotFound.vue'),
    },
  ],
}

const router = createRouter(option)

// 白名单
const WhiteList = ['/']
// 全局守卫
router.beforeEach((to, from, next) => {
  Progress.start()
  if (WhiteList.includes(to.path) && window.localStorage.getItem('user')) {
    // 如果访问根路径并持有 token 跳转用户中心
    next('/index')
  } else if (to.name === 'Index' && !window.localStorage.getItem('user')) {
    // 如果访问 index 而且 没有 token
    next('/')
  } else {
    next()
  }
})
router.afterEach((to, from) => {
  Progress.end()
})

export default router
