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
