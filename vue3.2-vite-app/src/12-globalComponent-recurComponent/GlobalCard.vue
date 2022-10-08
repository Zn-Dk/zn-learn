<template>
  <div class="my-card">
    <section class="my-card-head">
      <slot name="head-main">
        <p class="card-head--main">{{ mainT }}</p>
      </slot>
      <slot name="head-sub">
        <p>{{ subT }}</p>
      </slot>
    </section>
    <section class="my-card-body">
      <slot name="body">
        <p>
          {{ body }}
        </p>
      </slot>
    </section>
  </div>
</template>

<script setup lang="ts">
// 自定义全局组件 Card

// 不支持从外部文件引入直接进行类型定义 defineProps
// (但是可以引入后在定义的属性里使用 比如 list: IList[])
// import {  ICardList } from './interfaces'

interface ICardList {
  mainT?: string
  subT?: string
  body?: string
}

withDefaults(defineProps<ICardList>(), {
  mainT: '默认主标题',
  subT: '默认副标题',
  body: '默认卡片主体内容',
})
</script>

<style lang="scss">
.my-card {
  margin-bottom: 10px;
  padding: 10px;
  font-family: 'PingFang SC';
  border: 1px solid #ccc;
  border-radius: 4px;

  &-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;

    & .card-head--main {
      font-size: 18px;
      line-height: 2;
    }
  }

  &-body {
    font-size: 16px;
    padding: 20px 0;
  }
}
</style>
