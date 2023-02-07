<template>
  <main>
    <aside>
    </aside>
    <article>
      <header class="test">Hello World</header>
      <div class="playground">
        <button @click="flag = !flag">Switch Component</button>
        <!-- include 希望保持状态的组件 -->
        <!-- exclude 不希望保持状态的组件 -->
        <!-- max 保持状态组件的最大数目(最好不要超过10) -->
        <keep-alive :include="['CompA']" :exclude="['CompB']" max="2">
          <component :is="flag ? CompA : CompB"></component>
        </keep-alive>
      </div>
    </article>
  </main>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import CompA from './CompA.vue';
import CompB from './CompB.vue';

let flag = ref(true)
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