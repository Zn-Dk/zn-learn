<template>
  <main>
    <aside>
    </aside>
    <article>
      <header class="test">Suspense 异步组件</header>
      <!-- 异步组件必须配合 Suspense 使用 -->
      <div class="playground">
        <Suspense>
          <template #default>
            <Sus />
          </template>
          <template #fallback>
            <h3>Now loading, please wait...</h3>
          </template>
        </Suspense>
      </div>
    </article>
  </main>

</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
// 搭配 defineAsyncComponent + Suspense 使用异步组件
// 使用之后 打包 build 也会生成独立的属于异步组件的 .js .css
const Sus = defineAsyncComponent(() => import('./Suspense.vue'))
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

    .playground {
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