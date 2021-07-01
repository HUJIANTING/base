<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger
      class="hamburger-container"
      :class="{'hamburger-width':!sidebar.opened}"
      :toggle-click="toggleSideBar"
      :is-active="sidebar.opened"
    />
    <tabs-view />
  </el-menu>
</template>
<script>
import { mapGetters } from 'vuex'
import TabsView from './TabsView'
import Hamburger from '@/components/basics/Hamburger'
export default {
  components: {
    TabsView,
    Hamburger
  },
  data() {
    return {}
  },
  computed: { ...mapGetters(['sidebar']) },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  width: 100%;
  height: 50px;
  line-height: 50px;
  border-radius: 0 !important;
  position: fixed;
  top: 60px;
  z-index: 1002;
  background-color: #598AFF;
  .hamburger-container {
    width: 240px;
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px 0px 25px;
    background: linear-gradient(135deg,#49cdff, #598aff);
    -webkit-transition:width 0.3s; /*为Chrome/Safari*/
    -moz-transition:width 0.3s; /*为Firefox*/
    -ms-transition:width 0.3s; /*为IE*/
    -o-transition:width 0.3s; /*为Opera*/
    transition:width 0.3s;
  }
  .hamburger-width{
    width: 52px;
    padding: 0 0px 0px 15px;
    -webkit-transition:width 0.3s; /*为Chrome/Safari*/
    -moz-transition:width 0.3s; /*为Firefox*/
    -ms-transition:width 0.3s; /*为IE*/
    -o-transition:width 0.3s; /*为Opera*/
    transition:width 0.3s;
  }
}
</style>
