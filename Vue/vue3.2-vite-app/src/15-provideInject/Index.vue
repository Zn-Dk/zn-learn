<template>
  <main>
    <aside>
    </aside>
    <article>
      <header class="test">Provide Inject</header>
      <div class="playground">
        <AAA />
      </div>
    </article>
  </main>

</template>

<script setup lang="ts">
import { provide, reactive, ref } from 'vue';
import AAA from './A.vue';
provide('foo', ref(true))
provide('bar', ref({
  a: 1,
  b: 2
}))
provide('buz', ref(123))
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