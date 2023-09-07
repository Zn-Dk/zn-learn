<template>
  <div class="poster-wrap">
    <header>
      <slot name="pic">
        <img
          :src="ViteSvg"
          alt="default-icon"
        />
      </slot>
      <h2>
        <slot name="header">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium modi sint id iste
          quod assumenda eligendi aspernatur molestias quisquam, quo necessitatibus. Maxime delectus
          nemo iure doloribus? Quos maxime facere nemo!
        </slot>
      </h2>
    </header>
    <!-- 具有类型监测 Type 'number' is not assignable to type 'string'.ts(2322) -->
    <!-- <slot :info="num"></slot> -->
    <main>
      <p>
        <slot :info="str">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus hic eligendi nesciunt
          totam? Asperiores reiciendis, minima est nulla voluptatibus veniam, perspiciatis sequi
          ratione rerum quaerat sint repudiandae enim! Nobis, blanditiis. ratione rerum quaerat sint
          repudiandae enim! Nobis, blanditiis. ratione rerum quaerat sint repudiandae enim! Nobis,
          blanditiis. ratione rerum quaerat sint repudiandae enim! Nobis, blanditiis. ratione rerum
          quaerat sint repudiandae enim! Nobis, blanditiis. ratione rerum quaerat sint repudiandae
          enim! Nobis, blanditiis.
        </slot>
      </p>
    </main>
  </div>
</template>

<script setup lang="ts">
import ViteSvg from '/vite.svg';
/**
 * Some current limitations:
 * Required slots checking is not yet implemented in volar / vue-tsc.
 * Slot function return type is currently ignored and can be any, but we may leverage it for slot content checking in the future.
 */
defineSlots<{
  pic?: () => any;
  header?: () => any;
  default?: (props: { info: string }) => any;
}>();

const num = 1234;
const str = 'Hello from Poster';
</script>

<style scoped>
.poster-wrap {
  width: 60vh;
  min-height: 800px;
  box-shadow: 0 4px 8px #666;
  border-radius: 6px;
}

header {
  display: flex;
}

img {
  width: 25%;
  min-height: 100px;
  padding: 20px;
}

header h2 {
  width: 75%;
  max-height: 140px;
  overflow: hidden;
}

main p {
  font-size: 24px;
  padding: 10px 15px;
  line-height: 1.5;
  text-align: left;
  word-break: break-all;
}
</style>
