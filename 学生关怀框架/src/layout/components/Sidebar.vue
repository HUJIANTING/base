<template>
  <el-menu mode="vertical" unique-opened :default-active="$route.path" :collapse="isCollapse">
    <sidebar-item :routes="menus" />
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'sidebar',
      'menus'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  mounted() {}
}
</script>
