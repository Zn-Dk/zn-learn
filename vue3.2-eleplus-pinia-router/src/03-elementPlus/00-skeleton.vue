<template>
  <!--
        Skeleton 插槽#
        插槽名	      说明	        作用域
        default	  正在渲染的DOM   	$attrs
        template	自定义渲染      skeleton 模板	{ key: number }


        Skeleton 属性#
        属性名	    说明	                                      类型	默认值
        animated	是否使用动画	                               boolean	false
        count	    渲染多少个 template, 建议使用尽可能小的数字	      number	1
        loading	  是否显示加载结束后的 DOM 结构	                  boolean	false
        rows	    骨架屏段落数量	                                  number	3
        throttle	延迟占位 DOM 渲染的时间, 单位是毫秒	                number	0
     -->
  <div class="playground">

    <!-- <el-skeleton />
    <br />
    <el-skeleton style="--el-skeleton-circle-size: 100px">
      <template #template>
        <el-skeleton-item variant="circle" />
      </template>
    </el-skeleton> -->
    <!-- 行数 动画 -->
    <el-skeleton animated :rows="5"></el-skeleton>
  </div>

  <div class="playground">
    <el-switch v-model="loading"></el-switch>loading switch
    <!-- loading -->
    <el-skeleton :count="4" style="width: 240px" :loading="loading" animated>
      <!-- 加载中骨架屏 slot名称 template -->
      <template #template>
        <el-skeleton-item variant="image" style="width: 240px; height: 240px" />
        <div style="padding: 14px">
          <el-skeleton-item variant="h3" style="width: 50%" />
          <div style="
              display: flex;
              align-items: center;
              justify-items: space-between;
              margin-top: 16px;
              height: 16px;
            ">
            <el-skeleton-item variant="text" style="margin-right: 16px" />
            <el-skeleton-item variant="text" style="width: 30%" />
          </div>
        </div>
      </template>
      <!-- 加载完成显示的内容 slot名称为默认 default -->
      <template #default>
        <el-card :body-style="{ padding: '0px', marginBottom: '1px' }" v-for="item in loadedList" :key="item.id">
          <el-image style="width: 300px; height: 300px;" :src="item.picSrc" class="image" />
          <div style="padding: 14px">
            <h3>{{item.title}}</h3>
            <span>{{item.des}}</span>
            <div class="bottom card-header">
              <div>现价 : <strong>{{ item.price }}</strong></div>
              <el-button class="button">立刻购买</el-button>
            </div>
          </div>
        </el-card>
      </template>
    </el-skeleton>
  </div>

</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import list from '@/assets/data.json'



interface List {
  id: string;
  title: string;
  des: string;
  price: string;
  thumbSrc: string;
  picSrc: string;
}
let loadedList = ref<List[]>([])
let loading = ref(true)

const currentDate = new Date().toDateString()
onMounted(() => {
  setTimeout(() => {
    loadedList.value = list
    loading.value = false
  }, 3000)
})

</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  background-color: #fff !important;
}

.playground {
  width: 70%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  box-shadow: 0 0 4px #ddd;
  border-radius: 8px;
}
</style>