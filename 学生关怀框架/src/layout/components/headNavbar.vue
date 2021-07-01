<template>
  <div class="headContainer">
    <div class="headWarp">
      <div class="head-left">
        <img class="logo" src="../../../static/login/logo.png">
        <div class="title">学生关怀信息系统</div>
      </div>
      <!-- 缩放 -->
      <div
        class="hamburger-box"
        :class="{'is-active':sidebar.opened}"
        @click="toggleSideBar"
      >
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-common_i_folded" />
        </svg>
      </div>

      <!-- 用户名和退出功能 -->
      <el-dropdown class="avatar-container" trigger="click">
        <div class="userMenu">
          <img class="headimage" src="../../../static/login/head.png">
          <span
            v-if="this.$store.state.user.userInfo.sysUser.wxname"
            class="username"
          >{{ this.$store.state.user.userInfo.sysUser.wxname }}</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <el-dropdown-item>
            <span
              style="display: block"
              @click="$router.push({ path: '/' })"
            >首页</span>
          </el-dropdown-item>
          <!-- <el-dropdown-item divided>
            <span style="display: block" @click="addVisible=true">修改密码</span>
          </el-dropdown-item> -->
          <el-dropdown-item divided>
            <span style="display: block" @click="logout">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <passwordItem :add-visible.sync="addVisible" />
  </div>
</template>

<script>
import passwordItem from '../../views/admin/components/password'
import { mapGetters } from 'vuex'
export default {
  components: {
    passwordItem
  },
  data() {
    return {
      addVisible: false
    }
  },
  computed: { ...mapGetters(['sidebar']) },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}
</script>

<style  lang="scss" scoped>
.headContainer {
  width: 100%;
  height: 60px;
  position: fixed;
  z-index: 100;
  box-shadow: 0px 1px 4px 0px rgba(0,21,41,0.12);
  .headWarp {
    background-color: #fff;
    width: 100%;
    height: 60px;
    position: relative;
    display: flex;
    align-items: center;
    .head-left{
      width: 239px;
      background-color: #2C76B5;
    }
    .hamburger-box{
      width: 30px;
      height: 30px;
      margin-left: 20px;
      cursor: pointer;
      transform: rotate(0deg);
      transition: .38s;
      transform-origin: 50% 50%;
      .icon{
        width: 30px;
        height: 30px;
      }
    }
  }
  .logo {
    width: 32px;
    height: 32px;
    margin-left: 22px;
    vertical-align: middle;
  }
  .title {
    font-size: 16px;
    font-family: Source Han Sans CN, Source Han Sans CN-Medium;
    font-weight: 700;
    text-align: left;
    color: #fff;
    margin-left: 20px;
    display: inline-block;
    vertical-align: middle;
    line-height: 60px;
  }
  .avatar-container {
    height: 64px;
    // margin-right: 50px;
    // float: right;
    position: absolute;
    right: 20px;
  }
  .userMenu {
    color: #3a4450;
    line-height: 60px;
    cursor: pointer;
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Chrome/Safari/Opera */
    -khtml-user-select: none; /* Konqueror */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently*/
    .headimage {
      margin-right: 15px;
      vertical-align: middle;
    }
    .username {
      font-size: 18px;
      margin-right: 15px;
      display: inline-block;
    }
  }
}
</style>
