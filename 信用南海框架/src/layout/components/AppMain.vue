<template>

  <div class="app-main">
    <transition name="fade" mode="out-in">
      <router-view :key="key" />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    }
  }
}
</script>

<style scoped>
.app-main{
  width: 100%;
  min-height: calc(100vh - 110px);
  background: #f1f1f1;
  padding: 20px;
}
</style>
