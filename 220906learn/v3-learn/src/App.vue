<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <p>{{count}}</p>
  <button @click="clickHandle">测试</button>
</template>
<script>


export default {
  name: 'App',
  data() {
    return {
      count:0
    }
  },
  methods: {
    clickHandle(){
     this.count++
    }
  },
  //生命周期构造


}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
