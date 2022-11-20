<template>
  <el-card>
    <template #header>
      <h1>欢迎你, 尊敬的 {{ userName }}</h1>
    </template>
    <el-menu>
      <el-menu-item></el-menu-item>
    </el-menu>
    <el-card>
      <template #header>
        <h2>今日工作</h2>
      </template>
      <div>
        <h3>待办事项</h3>
        <el-card
          v-show="!item.isDone"
          v-for="item in toDoList"
          :key="item.id"
          shadow="hover"
          style="margin-top: 10px"
        >
          类型: {{ item.type }} 内容:{{ item.content }}
          <input type="checkbox" v-model="item.isDone" />
        </el-card>
      </div>
      <div>
        <h3>已办事项</h3>
        <el-card
          v-show="item.isDone"
          v-for="item in toDoList"
          :key="item.id"
          shadow="hover"
          style="margin-top: 10px"
        >
          类型: {{ item.type }} 内容:{{ item.content }}
          <input type="checkbox" v-model="item.isDone" />
        </el-card>
      </div>
    </el-card>
    <el-button type="danger" @click="logout">退出登录</el-button>
  </el-card>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const toDoList = reactive([
  { id: 1, type: '紧急', content: '上班准备会议PPT', isDone: false },
  { id: 2, type: '次要', content: '月底之前提交工作汇报', isDone: false },
  { id: 3, type: '备忘', content: '晚上记得买菜', isDone: false },
])

const unDoneList = computed(() => {
  return toDoList.filter(item => !item.isDone)
})
const doneList = computed(() => {
  return toDoList.filter(item => item.isDone)
})

const router = useRouter()

const userName = ref(window.localStorage.getItem('user') || '默认用户')

const logout = () => {
  ElMessage.success({
    message: '再见,尊敬的' + userName.value,
    duration: 1000, // 默认3秒关闭
  })
  router.push('/')
  window.localStorage.removeItem('user')
}
</script>

<style lang="scss"></style>
