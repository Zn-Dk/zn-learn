<template>
  <h2>Vue Router Test</h2>
  <!--
    transition 和 keep-alive 现在必须通过 v-slot API 在 RouterView 内部使用：
    <router-view v-slot="{ Component }">
      <transition>
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
   -->

  <router-view #default="{ Component }">
    <transition appear name="test" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>

  <!--  这么写会有警告
  <transition appear name="test" mode="out-in">
    <router-view> </router-view>
  </transition> -->
</template>

<script setup lang="ts"></script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

html,
body,
#app {
  // overflow: hidden;
  height: 100%;
}

#app {
  padding: 20px 20px 0;
}

.test-enter-active,
.test-leave-active {
  transition: 0.4s all;
}

.test-enter-from,
.test-leave-to {
  opacity: 0;
  transform: scale(1.2);
}
</style>
