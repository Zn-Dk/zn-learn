<template>
  <!-- 基础用法 -->
  <el-button color="#626aef" class="btn-block">基础用法 el-cascader</el-button>
  <el-cascader v-model="selectVal" @visible-change="onSelected" :options="options1"></el-cascader>
  <el-button color="#626aef" class="btn-block">多选 + 事件 el-cascader</el-button>
  <el-cascader
    v-model="selectVal"
    @visible-change="onSelected"
    clearable
    :options="options2"
    :props="props1"
  ></el-cascader>
  <el-button color="#626aef" class="btn-block"
    >可搜索(自定义逻辑实现大小写匹配) el-cascader</el-button
  >
  <el-cascader
    v-model="selectVal"
    clearable
    :options="options2"
    filterable
    :filter-method="filterMethod"
  ></el-cascader>
  <el-button color="#626aef" class="btn-block">自定义props 名称 el-cascader</el-button>
  <el-cascader v-model="selectVal" @visible-change="onSelected" :options="options2"></el-cascader>
  <!-- 面板模式 + 自定义插槽 -->
  <el-cascader-panel :options="options3" :props="props2" style="background-color: #fff">
    <template v-slot="{ node, data }">
      <template v-if="!data.children">
        <el-link :href="data.route" target="_blank" v-if="!data.cannot">{{ data.title }}</el-link>
      </template>
      <template v-else>{{ data.title }}</template>
    </template>
  </el-cascader-panel>
</template>

<style lang="scss">
.btn-block {
  display: block !important;
  margin: 10px 0;
}
.el-cascader-panel .el-link {
  display: block;
}
</style>

<script setup lang="ts">
import { CascaderProps, ElMessage } from 'element-plus'
import { ref } from 'vue'

let selectVal = ref([])

const onSelected = status => {
  console.log(status)
  //变为false 时 选择器消失说明用户已选择完毕 获取 value
  if (!status) {
    let msg = selectVal.value.reduce((acc, curr, index) => {
      acc += index + '.' + curr.join('/') + '<br/>'
      return acc
    }, '')
    ElMessage.success({
      // 使用html 不推荐 这里只是演示
      dangerouslyUseHTMLString: true,
      message: msg,
    })
  }
}

// 自定义搜索逻辑，第一个参数是node，第二个参数是keyword，返回的布尔值表示是否保留该选项
const filterMethod = (node, keyword) => {
  // console.log(node, keyword)
  return node.data.value.includes(keyword) || node.data.label.includes(keyword)
}

const props1: CascaderProps = {
  expandTrigger: 'hover',
  multiple: true, //设置为多选
}

// 自定义 props 键名以便使用 options
const props2: CascaderProps = {
  value: 'route',
  label: 'title',
  disabled: 'cannot',
}

// 基础使用
const options1 = ref([
  {
    value: 'A',
    label: 'A',
    children: [
      { value: 'AA', label: 'AA' },
      {
        value: 'AB',
        label: 'AB',
        children: [
          { value: 'AAA', label: 'AAA' },
          { value: 'AAB', label: 'AAB' },
        ],
      },
    ],
  },
  { value: 'B', label: 'B' },
  { value: 'C', label: 'C', disabled: true },
])

const options2 = [
  {
    value: 'guide',
    label: 'Guide',
    children: [
      {
        value: 'disciplines',
        label: 'Disciplines',
        children: [
          {
            value: 'consistency',
            label: 'Consistency',
          },
          {
            value: 'feedback',
            label: 'Feedback',
          },
          {
            value: 'efficiency',
            label: 'Efficiency',
          },
          {
            value: 'controllability',
            label: 'Controllability',
          },
        ],
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'side nav',
            label: 'Side Navigation',
          },
          {
            value: 'top nav',
            label: 'Top Navigation',
          },
        ],
      },
    ],
  },
  {
    value: 'component',
    label: 'Component',
    children: [
      {
        value: 'basic',
        label: 'Basic',
        children: [
          {
            value: 'layout',
            label: 'Layout',
          },
          {
            value: 'color',
            label: 'Color',
          },
          {
            value: 'typography',
            label: 'Typography',
          },
          {
            value: 'icon',
            label: 'Icon',
          },
          {
            value: 'button',
            label: 'Button',
          },
        ],
      },
      {
        value: 'form',
        label: 'Form',
        children: [
          {
            value: 'radio',
            label: 'Radio',
          },
          {
            value: 'checkbox',
            label: 'Checkbox',
          },
          {
            value: 'input',
            label: 'Input',
          },
          {
            value: 'input-number',
            label: 'InputNumber',
          },
          {
            value: 'select',
            label: 'Select',
          },
          {
            value: 'cascader',
            label: 'Cascader',
          },
          {
            value: 'switch',
            label: 'Switch',
          },
          {
            value: 'slider',
            label: 'Slider',
          },
          {
            value: 'time-picker',
            label: 'TimePicker',
          },
          {
            value: 'date-picker',
            label: 'DatePicker',
          },
          {
            value: 'datetime-picker',
            label: 'DateTimePicker',
          },
          {
            value: 'upload',
            label: 'Upload',
          },
          {
            value: 'rate',
            label: 'Rate',
          },
          {
            value: 'form',
            label: 'Form',
          },
        ],
      },
      {
        value: 'data',
        label: 'Data',
        children: [
          {
            value: 'table',
            label: 'Table',
          },
          {
            value: 'tag',
            label: 'Tag',
          },
          {
            value: 'progress',
            label: 'Progress',
          },
          {
            value: 'tree',
            label: 'Tree',
          },
          {
            value: 'pagination',
            label: 'Pagination',
          },
          {
            value: 'badge',
            label: 'Badge',
          },
        ],
      },
      {
        value: 'notice',
        label: 'Notice',
        children: [
          {
            value: 'alert',
            label: 'Alert',
          },
          {
            value: 'loading',
            label: 'Loading',
          },
          {
            value: 'message',
            label: 'Message',
          },
          {
            value: 'message-box',
            label: 'MessageBox',
          },
          {
            value: 'notification',
            label: 'Notification',
          },
        ],
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'menu',
            label: 'Menu',
          },
          {
            value: 'tabs',
            label: 'Tabs',
          },
          {
            value: 'breadcrumb',
            label: 'Breadcrumb',
          },
          {
            value: 'dropdown',
            label: 'Dropdown',
          },
          {
            value: 'steps',
            label: 'Steps',
          },
        ],
      },
      {
        value: 'others',
        label: 'Others',
        children: [
          {
            value: 'dialog',
            label: 'Dialog',
          },
          {
            value: 'tooltip',
            label: 'Tooltip',
          },
          {
            value: 'popover',
            label: 'Popover',
          },
          {
            value: 'card',
            label: 'Card',
          },
          {
            value: 'carousel',
            label: 'Carousel',
          },
          {
            value: 'collapse',
            label: 'Collapse',
          },
        ],
      },
    ],
  },
  {
    value: 'resource',
    label: 'Resource',
    children: [
      {
        value: 'axure',
        label: 'Axure Components',
      },
      {
        value: 'sketch',
        label: 'Sketch Templates',
      },
      {
        value: 'docs',
        label: 'Design Documentation',
      },
    ],
  },
]

const options3 = [
  {
    route: 'common',
    title: '常用网站',
    children: [
      { route: 'https://www.baidu.com', title: '百度' },
      { route: 'https://cn.vuejs.org', title: 'Vue' },
      { route: 'https://www.juejin.cn', title: '掘金' },
      { route: '/google', title: 'Google', cannot: true },
    ],
  },
]
</script>
