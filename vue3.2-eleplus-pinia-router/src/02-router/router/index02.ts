import { createRouter, RouterOptions, createWebHashHistory, createWebHistory } from 'vue-router'

import Progress from '@/02-router/components/02导航守卫/progress'

const option: RouterOptions = {
  history: createWebHistory(),
  routes: [
    {
      name: 'Login',
      path: '/', // 不写path 代表继承父路由的路径
      // 路由懒加载
      component: () => import('../components/02导航守卫/Login.vue'),
    },
    {
      name: 'Index',
      path: '/index',
      alias: '/user',
      component: () => import('../components/02导航守卫/Index.vue'),
    },
    {
      name: '404',
      // Vue3 删除了 * 通配符作为 404 路由
      // 现在必须使用自定义的 regex 参数来定义所有路由(*、/*) , 下面 pathMatch 是参数的名称, 意为 match .* 的任意多个字符
      path: '/:pathMatch(.*)',
      alias: '/:pathMatch(404)',
      component: () => import('../components/NotFound.vue'),
    },
  ],
}

const router = createRouter(option)

const WhiteList = ['/']
// 全局守卫
router.beforeEach((to, from, next) => {
  Progress.start()
  if (WhiteList.includes(to.path) && window.localStorage.getItem('user')) {
    next('/index')
  } else if (to.name === 'Index' && !window.localStorage.getItem('user')) {
    next('/')
  } else {
    next()
  }
})
router.afterEach((to, from) => {
  Progress.end()
})

export default router
