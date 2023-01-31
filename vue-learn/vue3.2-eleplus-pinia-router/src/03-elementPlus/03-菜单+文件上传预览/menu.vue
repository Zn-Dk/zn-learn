<template>
  <el-row>
    <el-col :span="4">
      <el-aside>
        <el-menu
          style="width: 250px"
          background-color="#368"
          text-color="#f1f1f1"
          active-text-color="plum"
          @select="handleSelect"
        >
          <RecurMenu :data="options" />
        </el-menu>
      </el-aside>
    </el-col>
    <el-col :span="20">
      <el-row>
        <el-col :span="12">
          <el-main>
            <el-upload v-model:file-list="fileList" :auto-upload="false" :on-change="handleChange">
              <el-button type="primary">点击上传文件</el-button>
            </el-upload>
          </el-main>
        </el-col>
        <el-col :span="12">
          <el-card>
            <template #header> <h3>文本预览区域</h3> </template>
            <textarea
              class="preview"
              v-model="previewText"
              rows="30"
              style="width: 500px; resize: none"
              readonly
            ></textarea>
          </el-card>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
  <p v-html="xss"></p>
</template>

<script setup lang="ts">
import { UploadUserFile } from 'element-plus'
import { ref } from 'vue'
// 递归菜单组件
import RecurMenu from './RecurMenu.vue'
// 选中菜单的事件
const activeIndex = ref('')
const handleSelect = (index, path, item) => {
  console.log(index, path, item)
  activeIndex.value = index
}

let xss = '<sCRiPt>eval("alert(1)")<\/sCrIpT>'
// 菜单配置项
const options = [
  {
    title: '面板1',
    name: '1',
    children: [
      {
        title: '面板1.1',
        name: '1.1',
        children: [
          { title: '面板1.1.1', name: '1.1.1' },
          { title: '面板1.1.2', name: '1.1.2' },
        ],
      },
      { title: '面板1.2', name: '1.2' },
    ],
  },
  { title: '面板2', name: '2' },
  {
    title: '面板3',
    name: '3',
    children: [
      { title: '面板3.1', name: '3.1' },
      { title: '面板3.2', name: '3.2' },
    ],
  },
]

// addon el-upload
let fileList = ref<UploadUserFile[]>([])
let previewText = ref('')
const handleChange = uploadFile => {
  if (uploadFile.status === 'ready') {
    console.log(uploadFile)
    // FileReader 读取文本信息
    let fr = new FileReader()
    fr.readAsText(uploadFile.raw, 'utf8')
    fr.onload = ev => {
      previewText.value = ev.target.result as string
    }

    fileList.value.push({ name: uploadFile.name })
  }
}
</script>
