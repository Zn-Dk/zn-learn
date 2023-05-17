<template>
  <div>
    <h2>通过 customRef 检测敏感词</h2>
    <textarea type="text" :value="iptA" @input="onInput" placeholder="请输入你的感想 (value-input 事件手动)" />
    <br>
    <textarea type="text" v-model="iptB" placeholder="请输入你的感想 (customRef)" />
  </div>
</template>

<script setup lang="ts">
  /*
    通过 customRef 检测敏感词 并**实时**替换
      需求:
        1. 输入框检测到指定敏感词时 替换成 **

      分析:
       1. ref + v-model 实现的双向绑定是一个黑盒 无法在数据变化时插入逻辑
  */

import { ref, customRef } from 'vue';

const BAD_WORDS = [/sb/gi,/nmb/gi,/傻逼/g,/弱智/g, /草(?:=你妈)?/g];
const replaceBadWords = (str:string) => {
  let finalStr = str;
  BAD_WORDS.forEach(reg => {
    finalStr = finalStr.replace(reg,'**')
  })
  return finalStr;
}

/** 方法 1 手动 onInput 事件 */
const iptA = ref('');
const onInput = (e) => {
  console.log(e.target.value);
  iptA.value = replaceBadWords(e.target.value);
}

/** 方法 2 customRef (使用不多 仅了解这个方法可以达到要求就行) */
const useFilterRef = (initStr = '') => {
  return customRef((track,trigger)=>{
    return {
      get(){
        track(); // 跟踪
        return initStr
      },
      set(newVal){
        initStr = replaceBadWords(newVal);
        trigger(); // 触发改动
      }
    }
  })
}
const iptB = useFilterRef('');
</script>

<style lang="less" scoped>

</style>
