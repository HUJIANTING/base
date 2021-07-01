<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <headNavbar />
    <!-- <navbar class="navbar" /> -->
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <app-main />
    </div>
  </div>
</template>

<script>
// import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import AppMain from './components/AppMain'
import headNavbar from './components/headNavbar'
export default {
  components: {
    // Navbar,
    Sidebar,
    AppMain,
    headNavbar
  },
  data() {
    return {}
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    }
  },
  methods: { }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/mixin.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  overflow: scroll;
  &.hideSidebar {
    .sidebar-container {
      width: 36px;
      overflow: inherit;
    }
    .main-container {
      margin-left: 36px;
      min-height: calc(100% - 110px)!important;
    }
  }
  .sidebar-container {
    transition: width 0.28s ease-out;
    width: 210px;
    position: fixed;
    top: 110px!important;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .main-container {
     min-height: calc(100% - 110px)!important;
    transition: margin-left 0.28s ease-out;
    margin-left: 210px;
  }
}
</style>
