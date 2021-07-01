<template>
  <div class="container">
    <el-dialog
      width="38%"
      title="修改密码"
      :visible.sync="addVisible"
      :before-close="cancel"
      append-to-body
      :close-on-click-modal="false"
    >
      <div>
        <el-form ref="searchFrom" class="search" :model="searchFrom" :rules="addRules" label-width="110px" label-position="left">
          <el-form-item label="原密码：" prop="password">
            <el-input v-model="searchFrom.password" placeholder="请输入原密码" :maxlength="50" />
          </el-form-item>
          <el-form-item label="新密码：" prop="newpassword1">
            <el-input v-model="searchFrom.newpassword1" placeholder="请输入新密码：" :maxlength="50" />
          </el-form-item>
          <el-form-item label="确认新密码：" prop="reNewPassword">
            <el-input v-model="searchFrom.reNewPassword" placeholder="确认新密码" :maxlength="50" />
          </el-form-item>
        </el-form>
      </div>
      <div class="footer">
        <el-button type="waring" @click="handleEdit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getUserEdit } from '../../../api/user'
export default {
  props: {
    addVisible: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    const valiPassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('再次确认密码不能为空'))
      } else if (value !== this.searchFrom.newpassword1) {
        return callback(new Error('确认密码与新密码不一致'))
      } else {
        callback()
      }
    }
    return {
      searchFrom: {
        'username': this.$store.state.user.userInfo.sysUser.wxname,
        'password': '',
        'newpassword1': '',
        'reNewPassword': ''
      },
      addRules: {
        password: [
          {
            required: true,
            message: '旧密码不能为空或者中文',
            trigger: 'blur',
            pattern: '[A-Za-z0-9]+'
          }
        ],
        newpassword1: [
          {
            required: true,
            message: '新密码不能为空',
            trigger: 'blur',
            pattern: '[A-Za-z0-9]+'
          }
        ],
        reNewPassword: [
          {
            required: true,
            trigger: 'blur',
            validator: valiPassword,
            pattern: '[A-Za-z0-9]+'
          }
        ]
      }
    }
  },

  methods: {
    cancel() {
      this.$emit('update:addVisible', false)
    },
    // 确定按钮
    handleEdit() {
      this.$refs.searchFrom.validate((valid) => {
        if (valid) {
          const params = (({ username, password, newpassword1 }) => ({ username, password, newpassword1 }))(this.searchFrom)
          console.log(params)
          getUserEdit(params).then((res) => {
            this.$Notice({
              type: 'success',
              message: '修改密码成功'
            })
            this.cancel()
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-dialog__body {
  padding: 30px;
}
.footer{
  text-align: center;
}
</style>

