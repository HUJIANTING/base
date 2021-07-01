<template>
  <div class="menu-wrapper">
    <template v-for="item in routes">
      <!-- 一级菜单可点击路由 -->
      <!-- 菜单首页添加单独样式menu-home -->
      <router-link
        v-if="item.children.length === 0 && item.name ==='首页'"
        :key="item.id"
        :to="item.path"
        :class="$route.path===item.path?'isActive':''"
      >
        <i class="line" />
        <el-menu-item :index="item.path" class="submenu-title-noDropdown menu-home">
          <svg class="icon" aria-hidden="true">
            <use :xlink:href="item.icon" />
          </svg>
          <span slot="title">{{ item.name }}</span>
        </el-menu-item>
      </router-link>

      <router-link
        v-else-if="item.children.length === 0 && item.name !=='首页'"
        :key="item.id"
        :to="item.path"
        :class="$route.path===item.path?'isActive':''"
      >
        <i class="line" />
        <el-menu-item :index="item.path" class="submenu-title-noDropdown">
          <svg class="icon" aria-hidden="true">
            <use :xlink:href="item.icon" />
          </svg>
          <span slot="title">{{ item.name }}</span>
        </el-menu-item>
      </router-link>

      <!-- 一级菜单不可点击路由-->
      <el-submenu v-else :key="item.id.toString()" :index="item.path">
        <template slot="title">
          <svg class="icon" aria-hidden="true">
            <use :xlink:href="item.icon" />
          </svg>
          <span>{{ item.name }}</span>
        </template>
        <!-- 二级菜单 -->
        <template v-for="child in item.children">
          <router-link
            v-if="child.path != null && child.path.indexOf('http') != 0 && child.type != 'dirt' "
            :key="child.id.toString()"
            :to="child.children.length === 0 ? child.path : ''"
            :class="$route.path===child.path?'isActive':''"
            class="two-intent"
          >

            <el-menu-item v-if="child.children.length === 0" :index="child.path">
              <span>{{ child.name }}</span>
            </el-menu-item>

            <!-- 三级菜单 -->
            <el-submenu v-else :key="child.id.toString()" :index="child.path">
              <template slot="title">
                <span>{{ child.name }}</span>
              </template>
              <template v-for="chi in child.children">
                <router-link
                  v-if="chi.path != null &&chi.path.indexOf('http') != 0 &&chi.type != 'dirt'"
                  :key="chi.id.toString()"
                  :to="chi.path"
                  :class="$route.path===chi.path?'isActive':''"
                  class="third-intent"
                >
                  <el-menu-item v-if="chi.children.length === 0" :index=" chi.path" :class="{'over-text': chi.name.length>=10 }">
                    <span>{{ chi.name }}</span>
                  </el-menu-item>
                </router-link>
              </template>
            </el-submenu>

          </router-link>
        </template>
      </el-submenu>
    </template>
  </div>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array,
      default() {
        return []
      }
    }
  },
  created() {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.icon {
  width: 1.5em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  margin-left: 15px;
  margin-right: 12px;
}
.isActive{
  ::v-deep li{
    background-color: #155891 !important;
  }
  .icon{
    color: #0090FF;
  }
}
// 过长的文字提示修改
.over-text{
  text-align: left;
  white-space: normal;
  height: 0px !important;
  line-height: 20px !important;
  padding: 10px 45px 50px 50px !important;
}
.over-text-two{
  text-align: center;
  white-space: normal;
  height: 0px !important;
  line-height: 20px !important;
  padding: 10px 40px 50px 40px !important;
}
.el-menu-item{
  padding-left: 60px !important;
}
// 首页pandding设置
.menu-home{
  padding-left: 20px !important;
}
.two-intent{
  ::v-deep.el-submenu__title {
    padding-left: 60px !important;
  }
}
.third-intent{
 .el-menu-item{
  padding-left: 80px !important;
 }
}
</style>

