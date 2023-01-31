<template>
  <h1>欢迎你, 尊敬的 {{ userName }}</h1>
  <el-button type="danger" @click="logout">退出登录</el-button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';

const router = useRouter()

const userName = ref(window.localStorage.getItem('user') || '默认用户')

const logout = () => {
  ElMessage.success({
    message: '再见,尊敬的' + userName.value,
    duration: 1000 // 默认3秒关闭
  })
  router.push('/')
  window.localStorage.removeItem('user')
}
</script>

<style lang="scss">

</style>
