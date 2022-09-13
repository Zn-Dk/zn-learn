<template>
  <div>
    {{ msg }}
  </div>
</template>

<script>
export default {
  name: 'CompB',

  data() {
    return {
      msg: '',
    }
  },

  mounted() {
    this.$bus.on('showMsg', this.showMsg)
  },
  unMounted() {
    this.$bus.off('showMsg', this.showMsg)
  },
  methods: {
    showMsg(msg) {
      console.log('CompB received message')
      this.msg = msg
    },
  },
}
</script>

<style lang="stylus" scoped></style>
