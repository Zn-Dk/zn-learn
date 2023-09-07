<template>
  <div>
    <h1>Vue 3.3 新特性之</h1>
    <h2>defineSlots 插槽 ts 类型注解</h2>
    <div class="show-case">
      <Poster>
        <template #pic>
          <img
            src="@/assets/vue.svg"
            alt="vue-logo"
          />
        </template>
        <template #default="{ info }">
          Info from default-slot: {{ info }} <br /><br />
          Hello World Hello World Hello World Hello World Hello World Hello World Hello World Hello
          World Hello World Hello World Hello World World Hello World Hello World Hello World World
          Hello World Hello World Hello World
        </template>
      </Poster>
    </div>
  </div>
</template>

<script setup lang="ts">
import Poster from './Poster.vue';
</script>
