<template>
  <div class="tabs-view-container">
    <router-link to="/">
      <el-tag :class="{'default': isHome}">首页</el-tag>
    </router-link>
    <router-link v-for="tag in Array.from(visitedViews)" :key="tag.path" :to="tag.path">
      <el-tag :closable="true" :type="isActive(tag.path)?'':'info'" @close="closeViewTabs(tag,$event)">
        {{ tag.name }}
      </el-tag>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isHome: true
    }
  },
  computed: {
    visitedViews() {
      const tagList = this.$store.state.app.visitedViews
      tagList.forEach((item, index) => {
        if (item.name === '信用查询详情' || item.name === '批量查看') {
          tagList.splice(index, 1)
        }
        if (item.name === '首页') {
          this.isHome = true
          tagList.splice(index, 1)
          return
        }
        this.isHome = false
      })
      return tagList.slice(-5)
    }
  },
  watch: {
    $route() {
      this.addViewTabs()
    }
  },
  methods: {
    closeViewTabs(view, $event) {
      this.$store.dispatch('delVisitedViews', view)
      $event.preventDefault()
    },
    generateRoute() {
      // 判断点击是否有首页
      if (this.$route.matched[0].path === '/') {
        this.isHome = true
      } else {
        this.isHome = false
      }

      if (this.$route.matched[this.$route.matched.length - 1].name) {
        return this.$route.matched[this.$route.matched.length - 1]
      }
      this.$route.matched[0].path = '/'
      return this.$route.matched[0]
    },
    addViewTabs() {
      this.$store.dispatch('addVisitedViews', this.generateRoute())
    },
    isActive(path) {
      if (path === '/') {
        return this.$route.path === '/dashboard'
      } else {
        return path === this.$route.path
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .tabs-view-container {
    // width: 85%;
    width:calc(100%-240px);
    display: inline-block;
    vertical-align: top;
    .router-link-exact-active{
      .el-tag{
        background:#4B75E1;
      }
    }
    .default{
      background:#4B75E1 !important;
    }
    .el-tag{
      font-size: 14px;
      font-family: Microsoft YaHei, Microsoft YaHei-Regular;
      font-weight: 400;
      color: #fff;
      letter-spacing: 1px;
      border: none;
      background:#598AFF;
      min-width: 118px;
      padding: 0px 10px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      border-radius: 0px;
    }
    ::v-deep.el-tag .el-tag__close{
      color: #fff;
    }

  }
</style>
