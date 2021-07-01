<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {
      network: true
    }
  },
  mounted() {
    // 检测断网
    window.addEventListener('offline', () => {
      console.log('已断网')
      this.network = false
      this.$message.error({ message: '网络已断开', onClose: () => {
        this.$router.push({ path: '/login' })
        window.location.reload()
      } })
    })

    window.addEventListener('online', () => {
      console.log('网络已连接')
      this.network = true
    })
  }
}
</script>
<style lang="scss">
  @import 'styles/index.scss'; // 全局自定义的css样式
  #app{
    min-width: 1500px;
  }
</style>
