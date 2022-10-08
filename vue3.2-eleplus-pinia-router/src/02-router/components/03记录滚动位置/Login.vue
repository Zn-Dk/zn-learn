<template>
  <div class="long">我是超长的滚动条</div>
  <el-card class="login" style="width: 400px;">
    <template #header>
      <h2 style="text-align:center">登录</h2>
    </template>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="loginForm" label-width="100px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
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
import { FormInstance, FormItemRule, ElMessage } from 'element-plus';
import { reactive, ref, } from 'vue';
import { useRouter } from 'vue-router';


const router = useRouter()
// type FormInstance
const loginForm = ref<FormInstance>()

const ruleForm = reactive({
  username: '',
  pass: '',
  checkPass: '',
})
type rulesObject = {
  [key in keyof typeof ruleForm]: FormItemRule[]
} & { email?: FormItemRule[] }

const validCheckPass: FormItemRule["validator"] = (rule, value, cb) => {
  if (value !== ruleForm.pass) {
    cb(new Error('两次输入的密码不一致'))
  } else {
    cb()
  }
}

const rules: rulesObject = {
  username: [
    { required: true, trigger: 'blur', message: '请输入用户名' }
  ],
  pass: [
    { required: true, message: '请输入密码' }
  ],
  checkPass: [
    { required: true, validator: validCheckPass, trigger: 'blur' }
  ],
  email: [
  ]
}

const submitForm = () => {
  loginForm.value.validate((isValid) => {
    if (isValid) {
      window.localStorage.setItem('user', ruleForm.username)
      router.push({ name: 'Index' })
    } else {
      ElMessage({
        message: '表单信息有误,请检查后重试',
        type: 'warning',
        showClose: true, // 显示关闭按钮
      })
    }
  })
}
const resetForm = () => { }
</script>

<style lang="scss">
.long {
  font-size: 100px;
  padding: 0 600px;
  background-color: pink;
}

.login {
  margin: 15% auto;
}
</style>