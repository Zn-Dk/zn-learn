import { createRouter, RouterOptions, createWebHashHistory, createWebHistory } from 'vue-router'

const option: RouterOptions = {
  history: createWebHistory(),
  // 存储滚动位置
  scrollBehavior(to, from, savePosition) {
    // 如果当前页面有滚动条 则显示滚动信息 { top, left } ||  否则为 null
    if (savePosition) {
      console.log(savePosition)
      // return savePosition // 常用 直接返回这个对象 下次刷新/浏览器后退按钮 会回滚到当前位置 但是 router.push 不行
      // return { top: 200, left: 0 } // 自定义

      // Promise 形式
      return new Promise(res => {
        setTimeout(() => {
          res(savePosition)
        }, 2000)
      })
    }
  },
  routes: [
    {
      name: 'Login',
      path: '/', // 不写path 代表继承父路由的路径
      // 路由懒加载
      component: () => import('../components/03记录滚动位置/Login.vue'),
    },
    {
      name: 'Index',
      path: '/index',
      alias: '/user',
      component: () => import('../components/03记录滚动位置/Index.vue'),
    },
  ],
}

const router = createRouter(option)

export default router
