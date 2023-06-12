<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage, FormInstance } from 'element-plus'

const ruleFormRef = ref<FormInstance>()

const ruleForm = reactive({
  username: '',
  pass: '',
  captcha: '',
})

const showMsg = (text ='', type : "error" | "success" | "warning" | "info") => {
  ElMessage({
    showClose: true,
    message: text,
    type: type || 'success',
  })
}

const request = async (formData) => {
  const res = await fetch('api/login',{
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(formData)
  })

  const {code, text} = await res.json();

  const state = code === 0 ? 'success' : 'error'
  if(text) {
    showMsg(text, state)
  }
}

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  request(ruleForm)
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    status-icon
    label-width="120px"
    class="demo-ruleForm"
  >
  <el-form-item required label="Username" prop="username">
    <el-input v-model="ruleForm.username" autocomplete="off" clearable />
  </el-form-item>
    <el-form-item required label="Password" prop="pass">
      <el-input v-model="ruleForm.pass" type="password" autocomplete="off" clearable />
    </el-form-item>
    <el-form-item required label="Captcha" prop="captcha" clearable>
      <el-row :gutter="10">
        <el-col :span="16"><el-input v-model="ruleForm.captcha" /></el-col>
        <el-col :span="8"><el-image src="api/captcha" style="display: flex; align-items: center;"></el-image></el-col>
      </el-row>


    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)"
        >Login</el-button>
      <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>
</style>
