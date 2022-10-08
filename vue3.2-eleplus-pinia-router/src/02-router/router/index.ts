import { createRouter, RouterOptions, createWebHashHistory, createWebHistory } from 'vue-router'
import Father from '../components/00/Father.vue'
// vue-router 4 使用 createRouter 创建路由
const option: RouterOptions = {
  // 地址栏模式 需要调用 hooks
  // vue2 mode "history" vue3  createWebHistory()
  // vue2 mode  "hash"   vue3  createWebHashHistory()
  // vue2 mode "abstact" vue3  createMemoryHistory()

  history: createWebHashHistory(),

  routes: [
    {
      name: 'Shop',
      path: '/',
      component: Father,
      // 子路由
      children: [
        {
          name: 'List',
          path: '', // 不写path 代表继承父路由的路径
          // 路由懒加载
          // component: ListVue,
          component: () => import('../components/00/List.vue'),
        },
        {
          name: 'Details',
          path: '/item/:id',
          component: () => import('../components/00/Details.vue'),
        },
      ],
    },
  ],
}

const router = createRouter(option)

export default router
