import { createRouter, createWebHistory, RouterOptions, RouteRecordRaw } from 'vue-router'

const options: RouterOptions = {
  history: createWebHistory(),
  routes: [
    {
      name: 'Home',
      path: '/', // 不写path 代表继承父路由的路径
      alias: '/home',
      meta: {
        title: '首页',
      },
      // 路由懒加载
      // component: ListVue,
      component: () => import('../components/04breadcrumb/Home.vue'),
    },
    {
      name: 'List',
      path: '/list',
      meta: {
        title: '商品列表',
      },
      component: () => import('../components/04breadcrumb/List.vue'),
    },
    {
      name: 'Details',
      meta: {
        title: '详细信息',
      },
      path: '/list/:id',
      component: () => import('../components/04breadcrumb/Details.vue'),
      children: [
        {
          path: 'promo',
          name: 'Promo',
          meta: {
            title: '商品推荐',
          },
          component: () => import('../components/04breadcrumb/Promotion.vue'),
        },
      ],
    },
    {
      name: 'About',
      path: '/about',
      meta: {
        title: '关于我们',
      },
      component: () => import('../components/04breadcrumb/AboutUs.vue'),
      children: [
        {
          path: 'bread1',
          name: 'Bread1',
          meta: {
            title: 'BreadCrumb1',
          },
          component: () => import('../components/04breadcrumb/Bread1.vue'),
          children: [
            {
              path: 'bread2',
              name: 'Bread2',
              meta: {
                title: 'BreadCrumb2',
              },
              component: () => import('../components/04breadcrumb/Bread2.vue'),
            },
          ],
        },
      ],
    },
  ],
}

const router = createRouter(options)

export default router
