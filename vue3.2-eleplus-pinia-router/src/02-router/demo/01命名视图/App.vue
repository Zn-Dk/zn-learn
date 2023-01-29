<template>
  <!-- 命名视图可以在同一级（同一个组件）中展示更多的路由视图，而不是嵌套显 -->
  <!-- 类似插槽 视图的默认名称也是 default -->
  <!-- 需要起名的时候在路由的 components 里设置 -->
  <div>
    <h2>命名视图</h2>
    <el-tabs
      v-model="currentTab"
      @tab-click="tabClick"
      type="border-card"
      tab-position="left"
      style="height: 200px"
    >
      <el-tab-pane
        name="root1"
        label="ROOT1"
      >
        <router-view name="aaa"></router-view>
      </el-tab-pane>
      <el-tab-pane
        name="root2"
        label="ROOT2"
      >
        <!-- 不写 name 显示为当前层级 router-view 下 component 配置为 default 的视图 -->
        <router-view></router-view>
        <router-view name="ccc"></router-view>
      </el-tab-pane>
      <el-tab-pane
        name="root3"
        label="ROOT3"
      >
        <router-view name="ddd"></router-view>
      </el-tab-pane>
    </el-tabs>
  </div>

</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const currentTab = ref('')
onMounted(() => {
  // const realPath = location.pathname
  // if (realPath === '/') router.push('/root1')
  // else {
  // router.push(realPath)
  currentTab.value = route.path.split('/')[1]
  // }
})
const tabClick = tab => {
  const tabName = tab.props.label.toLowerCase()
  currentTab.value = tabName
  router.push({
    name: tabName,
    // 在 v4.1.4 里面移除了未定义的params传递，
    // https://github.com/vuejs/router/commit/e8875705eb8b8a0756544174b85a1a3c2de55ff6
    params: { foo: 1 },
    state: { bar: 'bar' } // 如果要隐式传参 (仅 History API)
  })
}

// 模拟环境 el-tab 切换前的拦截,(路由守卫拦截还是会导致 tab 显示的切换,所以要附加这个)
// (如果没有获取到 token 不进行切换 应 return false)
// 模拟获取 token
let token = ''
// const pathsNeedAuth = ['root2']
// const leaveHandler = active => {
//   if (pathsNeedAuth.includes(active) && !token) {
//     return false
//   }
//   return true
// }
</script>

<style lang="scss">

</style>
