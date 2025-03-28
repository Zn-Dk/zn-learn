// 需要导入的某种中间件 通过 definePageMeta 在页面单独导入
export default defineNuxtRouteMiddleware((to, from) => {
  if (to.params.id === '1') {
    return abortNavigation() // abortNavigation
  }
})
