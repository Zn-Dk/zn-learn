<template>
  <p>ENV 环境测试</p>
  <p>refV:</p>
</template>

<script setup lang="ts">
// 默认以 VITE_ 开头的环境变量会通过 import.meta.env 暴露在你的客户端源码中。

import { ref, shallowRef } from 'vue'

// 可以在 vite.config.ts 中通过 envPrefix 设定为一系列的字符串开头
console.log(import.meta.env)

// 根据当前运行的 vite serve --mode 输出不同的结果
console.log(import.meta.env.VITE_CURRENT_ENV)

/*
在生产环境中，这些环境变量会在构建时被静态替换，
因此，在引用它们时请使用完全静态的字符串。动态的 key 将无法生效。
例如，动态 key 取值 import.meta.env[key] 是无效的。

它还将替换出现在 JavaScript 和 Vue 模板中的字符串。这本应是非常少见的，但也可能是不小心为之的。
在这种情况下你可能会看到类似 Missing Semicolon 或 Unexpected token 等错误，
例如当 "process.env.NODE_ENV" 被替换为 ""development": "。有一些方法可以避免这个问题：

对于 JavaScript 字符串，你可以使用 unicode 零宽度空格来分割这个字符串，例如： 'import.meta\u200b.env.MODE'。

对于 Vue 模板或其他编译到 JavaScript 字符串的 HTML，你可以使用 <wbr> 标签，例如：import.meta.<wbr>env.MODE。


*/
</script>

<style lang="scss"></style>
