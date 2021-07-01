<template>
  <div class="container">
    <div class="infotmationBox">
      <div class="left">
        <div class="title">你好，欢迎登录</div>
        <div class="subtitle">Login System</div>
        <img src="../../../static/login/login_icon_qianwang.png">
      </div>
      <div class="content-box">
        <div class="title">
          <img src="../../../static/login/mark.png">
          <span>学生关怀信息系统</span>
        </div>
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules">
          <el-form-item prop="username">
            <div class="username">
              <el-input v-model="loginForm.username" placeholder="请输入用户名" /><img class="left-icon" src="../../../static/login/login_i_username@2x.png" alt="">
            </div>
          </el-form-item>
          <el-form-item prop="password">
            <div class="password">
              <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" @keyup.enter.native="handleLogin" /><img class="left-icon" src="../../../static/login/login_i_password@2x.png" alt="">
            </div>
          </el-form-item>
          <el-form-item prop="code" class="input-code">
            <div class="codeBox">
              <el-input v-model="loginForm.code" placeholder="请输入验证码" @keyup.enter.native="handleLogin" />
              <img class="code" :src="codeImg" @click="refreshCode">
            </div>
          </el-form-item>
          <div class="btn"><el-button type="primary" :loading="loading" @click.native.prevent="handleLogin">登录</el-button></div>
        </el-form>
      </div>
    </div>

    <footer class="footer">©2019-2021  广东金赋科技股份有限公司  <!--<a href="https://beian.miit.gov.cn/" target="_blank"> 粤ICP备2020100800号</a>--></footer>
  </div>
</template>

<script>
import { randomLenNum } from '../../utils/validate'
export default {
  name: 'Login',
  data() {
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能小于5位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: '',
        code: '',
        randomStr: '',
        grant_type: 'password',
        scope: 'server'
      },
      loginRules: {
        username: [
          {
            required: true,
            message: '账户不能为空',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 20,
            message: '长度在 3 到 20 个字符',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            trigger: 'blur',
            validator: validatePass
          }
        ],
        code: [
          {
            required: true,
            message: '验证码不能为空',
            trigger: 'blur'
          }
        ]
      },
      loading: false,
      codeImg: ''
    }
  },
  mounted() {
    this.refreshCode()
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('loginByToken', this.loginForm).then(() => {
            this.$router.push({ path: '/' })
            this.loading = false
          }) .catch(() => {
            this.loading = false
            this.refreshCode()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    refreshCode() { // 重新刷新code
      this.loginForm.code = ''
      this.loginForm.randomStr = randomLenNum(4, true)
      this.codeImg =
      process.env.VUE_APP_BASE_CODE_API + '/code?randomStr=' + this.loginForm.randomStr
    }
  }
}
</script>

<style scoped  lang="scss">
.container {
  position: relative;
  background: url(../../../static/login/login.jpg) repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .infotmationBox {
    // position: absolute;
    // top: 40%;
    // transform: translateY(-40%);
    // right: 370px;
    width: auto;
    height: 466px;
    border-radius: 6px;
    background-color: #fff;
    display: flex;
    .left{
      background: url(../../../static/login/login_bg_2.png) repeat;
      background-size: 100% 100%;
      width: 280px;
      height: 466px;
      text-align: center;
      .title{
        font-size: 28px;
        font-family: Microsoft YaHei, Microsoft YaHei-Regular;
        font-weight: 400;
        color: #ffffff;
        letter-spacing: 1px;
        margin-top: 175px;
      }
      .subtitle{
        font-size: 18px;
        font-family: Microsoft YaHei, Microsoft YaHei-Light;
        font-weight: 300;
        color: #ffffff;
        letter-spacing: 1px;
        margin-top: 25px;
      }
      img{
        margin-top: 40px;
      }
    }
    .content-box{
      width: 500px;
      height: 450px;
      border-radius: 6px;
      text-align: center;
      overflow: hidden;
      margin: 0 auto;
      margin-top: 8px;
      .title {
        margin-top: 56px;
        opacity: 1;
        font-size: 30px;
        font-family: Microsoft YaHei, Microsoft YaHei-Bold;
        font-weight: 700;
        text-align: center;
        color: #000000;
        letter-spacing: 2px;
        img{
          vertical-align: top;
          margin-right: 10px;
        }
      }
    }

    .edition {
      margin-top: 15px;
      height: 19px;
      font-size: 18px;
      font-family: Microsoft YaHei, Microsoft YaHei-Regular;
      font-weight: 400;
      color: #1B1C33;
    }
    .username {
      position: relative;
      width: 300px;
      height: 40px;
      margin: 40px auto 0px auto;
    }
    .password {
      position: relative;
      width: 300px;
      height: 40px;
      margin: 0px auto 0px auto;
    }
    .codeBox {
      position: relative;
      width: 300px;
      height: 40px;
      margin: 0px auto 0px auto;
      display: flex;
      .code {
        cursor: pointer;
        margin-left: 7px;
        width: 100px;
      }
    }
    .left-icon{
      position: absolute;
      right: 12px;
      top: 11px;
    }
    ::v-deep .el-input__inner{
      padding-left: 18px;;
    }
    ::v-deep .el-form-item__error{
      margin-left: 120px;
    }
    .btn {
      margin: 45px auto 0px auto;
      width: 300px;
      height: 40px;
      .el-button--primary {
        width: 100%;
        height: 100%;
        background-color: #237AFC;
        border-color: #237AFC;
      }
    }
  }
  .footer{
    width: 100%;
    font-size: 14px;
    font-weight: 400;
    text-align: center;
    color: #fff;
    position: absolute;
    bottom: 10px;
  }
}
</style>
