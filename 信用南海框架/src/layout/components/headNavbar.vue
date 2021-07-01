<template>
  <div class="headContainer">
    <div class="headWarp">
      <img class="logo" src="../../../static/login/mark.png">
      <div class="title">学生关怀信息系统</div>
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
export default {
  components: {
    passwordItem
  },
  data() {
    return {
      addVisible: false
    }
  },
  methods: {
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
  .headWarp {
    background-color: #fff;
    width: 100%;
    height: 60px;
    position: relative;
  }
  .logo {
    margin-left: 22px;
    vertical-align: middle;
  }
  .title {
    font-size: 30px;
    font-family: Source Han Sans CN, Source Han Sans CN-Medium;
    font-weight: 700;
    text-align: left;
    color: #3a4450;
    letter-spacing: 2px;
    text-align: left;
    margin-left: 20px;
    display: inline-block;
    vertical-align: middle;
    letter-spacing: 5px;
    line-height: 60px;
  }
  .avatar-container {
    margin-right: 50px;
    height: 64px;
    float: right;
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
