<template>
  <el-breadcrumb class="app-levelbar" separator="/">
    <el-breadcrumb-item v-for="(item,index) in levelList" :key="index">
      <!-- <span v-if='item.redirect==="noredirect"||index==levelList.length-1' class="no-redirect">{{item.name}}</span> -->
      <router-link :to="item.redirect||item.path">{{ item.name }}</router-link>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.name === this.$route.name)
      const first = matched[0]
      if (first && (first.name !== '首页')) {
        matched = [{ name: '首页', path: '/' }].concat(matched)
      }
      this.levelList = matched
      console.log(this.levelList)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-levelbar.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 10px;
    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
</style>
