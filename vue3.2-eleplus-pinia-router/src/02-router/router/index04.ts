import { createRouter, createWebHistory, RouterOptions, RouteRecordRaw } from 'vue-router'

const options: RouterOptions = {
  history: createWebHistory(),
  routes: [
    {
      name: 'Home',
      path: '/', // 不写path 代表继承父路由的路径
      meta: {
        p: '/home',
        name: '首页',
      },
      // 路由懒加载
      // component: ListVue,
      component: () => import('../components/04结合breadcrumb/Home.vue'),
    },
    {
      name: 'List',
      path: '/list', // 不写path 代表继承父路由的路径
      meta: {
        p: '/list',
        name: '商品列表',
      },
      // 路由懒加载
      // component: ListVue,
      component: () => import('../components/04结合breadcrumb/List.vue'),
      children: [
        {
          name: 'Details',
          meta: {
            p: '/list/details',
            name: '详细信息',
          },
          path: ':id',
          component: () => import('../components/04结合breadcrumb/Details.vue'),
        },
      ],
    },
  ],
}

const router = createRouter(options)

export default router
