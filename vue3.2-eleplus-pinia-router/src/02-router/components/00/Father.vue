<template>
  <h1>我是父路由</h1>
  <main>
    <aside>
      <h2>侧边栏</h2>
    </aside>
    <article>
      <router-view ></router-view>
    </article>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'

let pw = ref('')
</script>
<script></script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

aside {
  width: 200px;
  height: 100%;
  background-color: gray;
}

article {
  flex: 1;
  border: 1px solid #000;
}

main {
  display: flex;
  height: 80vh;
}
</style>
