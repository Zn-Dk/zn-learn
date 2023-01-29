<template>
  <el-card>
    <template #header>
      <h1>欢迎你, 尊敬的 {{ props.userName }}</h1>
    </template>
    <el-button type="danger" @click="logout">退出登录</el-button>
  </el-card>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
const router = useRouter()

const props = defineProps<{
  userName: string
}>()
const logout = () => {
  ElMessage.success({
    message: '再见,尊敬的' + props.userName,
    duration: 1000, // 默认3秒关闭
  })
  router.push('/')
  window.localStorage.removeItem('user')
}
</script>

<style lang="scss"></style>
