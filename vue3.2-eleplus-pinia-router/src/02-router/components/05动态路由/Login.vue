<template>
  <el-card class="login" style="width: 400px">
    <template #header>
      <h2 style="text-align: center">登录</h2>
    </template>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="loginForm" label-width="100px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { FormInstance, FormItemRule, ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'
import { RouteRecordRaw, useRouter } from 'vue-router'
import axios from 'axios'
const router = useRouter()
// type FormInstance
const loginForm = ref<FormInstance>()

const ruleForm = reactive({
  username: '',
  password: '',
  checkPass: '',
})
type rulesObject = {
  [key in keyof typeof ruleForm]: FormItemRule[]
}

const validCheckPass: FormItemRule['validator'] = (rule, value, cb) => {
  if (!value) {
    cb(new Error('请确认密码'))
  }
  if (value !== ruleForm.password) {
    cb(new Error('两次输入的密码不一致'))
  } else {
    cb()
  }
}

const rules: rulesObject = {
  username: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
  password: [{ required: true, message: '请输入密码' }],
  checkPass: [{ required: true, validator: validCheckPass, trigger: 'change' }],
}

const submitForm = () => {
  loginForm.value.validate(async isValid => {
    if (isValid) {
      window.localStorage.setItem('user', ruleForm.username)
      try {
        let res = await axios.post('http://localhost:9999/login', ruleForm)
        // 根据用户权限添加路由 (嵌套到 Index 路由)
        if (res.data?.length) {
          // TODO 路由持久化
          // 将路由存入 sessionStorage/pinia
          window.sessionStorage.setItem('route', JSON.stringify(res.data))
          res.data.forEach((item: RouteRecordRaw) => {
            router.addRoute('Index', {
              name: item.name,
              path: item.path,
              meta: item.meta,
              component: () => import(`./${item.component}`),
            })
          })
          console.log(router.getRoutes())
          router.push({ name: 'Index' })
        }
      } catch (error) {
        console.error(error)
        ElMessage({
          message: '登录失败',
          type: 'error',
        })
      }
    } else {
      ElMessage({
        message: '表单信息有误,请检查后重试',
        type: 'warning',
        showClose: true, // 显示关闭按钮
      })
    }
  })
}
const resetForm = () => {}
</script>

<style lang="scss">
.login {
  margin: 15% auto;
}
</style>
