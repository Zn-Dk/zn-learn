<template>
  <main>
    <aside>
      <!-- 使用全局组件 -->
      <GlobalCard v-for="item in list" :main-t="item.mainT" :sub-t="item?.subT" :body="item.body"></GlobalCard>

      <!-- 使用全局组件内的插槽 -->
      <GlobalCard>
        <template #head-main>
          <img src="/vite.svg" alt="!">
        </template>
        <template #head-sub>
          <a href="http://www.baidu.com" style="color:brown;" target="_blank">百度</a>
        </template>
        <template #body>
          <input type="text" placeholder="使用了body插槽">
        </template>
      </GlobalCard>
    </aside>
    <article>
      <header class="test">Hello World</header>
      <div class="card-list">
        <!-- 使用全局组件 -->
        <GlobalCard v-for="item in 50"></GlobalCard>
      </div>
    </article>
  </main>

</template>

<script setup lang="ts">
import { reactive } from 'vue';

import { ICardList } from './interfaces';
// interface List {
//   main: string,
//   sub?: string,
//   body: string
// }

const list = reactive<ICardList[]>([
  {
    mainT: '标题1',
    subT: '副标题1',
    body: 'ABCABC'
  },
  {
    mainT: '标题2',
    body: 'ABCABC'
  },
  {
    mainT: '标题3',
    subT: '副标题3',
    body: 'ABCABC'
  },
])
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
}

main {
  display: flex;
  height: 100vh;

  aside {
    width: 20%;
    padding: 20px;
    box-shadow: -2px 0 10px #ccc inset;
  }

  article {
    display: flex;
    flex-direction: column;
    width: 100%;

    header {
      height: 20%;
    }

    .card-list {
      flex: 1;
      padding: 10px;
      overflow-y: auto;
      height: 80vh;
    }
  }

  // 测试at-root
  @at-root {
    .test {
      font-size: 24px;
      text-align: center;
      margin-top: 30px;
    }
  }
}
</style>