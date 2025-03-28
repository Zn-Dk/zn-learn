// 全局中间件 以 global.ts 结尾, 不需要通过 definePageMeta 注册
// 路由拦截 example
export default defineNuxtRouteMiddleware((to, from) => {
  const { redirect } = to.query;
  if (redirect) {
    if (redirect === '/index') {
      return navigateTo('/')
    }
    return navigateTo(redirect as string);
  }
})

