<template>
  <div class="container">
    <el-dialog
      width="42%"
      :title="titleContent.title"
      :visible.sync="addVisible"
      :before-close="cancel"
      append-to-body
      :close-on-click-modal="false"
    >
      <div>
        <el-form
          ref="searchFrom"
          class="search"
          :model="searchFrom"
          :rules="addRules"
          label-width="95px"
        >
          <el-form-item label="姓名：" prop="wxname">
            <el-input
              v-model="searchFrom.wxname"
              placeholder="请输入姓名"
              :maxlength="50"
            />
          </el-form-item>
          <el-form-item label="昵称：" prop="nickname">
            <el-input
              v-model="searchFrom.nickname"
              placeholder="请输入昵称"
              :maxlength="50"
            />
          </el-form-item>
          <el-form-item label="手机号码：" prop="phone">
            <el-input
              v-model="searchFrom.phone"
              :disabled="searchFrom.phone === null && titleContent.titleEngName === 'edit'"
              placeholder="请输入手机号码"
              :maxlength="50"
            />
          </el-form-item>
          <el-form-item label="密码：" :prop="searchFrom.password!=null||fakepassword==null? 'password':''">
            <el-input
              v-model="searchFrom.password"
              :disabled="searchFrom.phone === null &&titleContent.titleEngName === 'edit'"
              placeholder="请输入密码"
              :maxlength="50"
            />
          </el-form-item>
          <el-form-item label="性别：" prop="sex">
            <el-radio-group v-model="searchFrom.sex">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="2">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="邮箱地址：" prop="email">
            <el-input
              v-model="searchFrom.email"
              placeholder="请输入邮箱地址"
              :maxlength="50"
            />
          </el-form-item>
          <el-form-item label="地区：" prop="region">
            <selectRegion ref="regionView" :region="searchFrom.city" @change="regioChange" />
          </el-form-item>
          <el-form-item label="头像：" prop="ava">
            <el-upload
              class="avatar-uploader"
              action="http://106.53.145.9:8765/app/file/upload/images"
              :show-file-list="false"
              :auto-upload="false"
              :on-change="beforeAvatarUpload"
            >
              <img
                v-if="searchFrom.avatar"
                :src="searchFrom.avatar"
                class="avatar"
              >
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </el-form-item>
          <el-form-item label="状态：" prop="lockFlag">
            <el-radio-group v-model="searchFrom.lockFlag">
              <el-radio label="0">有效</el-radio>
              <el-radio label="9">锁定</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <div class="footer">
        <el-button type="waring" @click="handleUser">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { validPhone } from '@/utils/validate'
import { getAddUser, getmodifyUser, getChechUser, uploadAvatar, deleteAvatar } from '../../../api/user'
import selectRegion from 'components/business/selectRegion/index.vue'

export default {
  components: {
    selectRegion
  },
  props: {
    deptoptions: {
      type: Array,
      default() {
        return []
      }
    },
    titleContent: {
      type: Object,
      default() {
        return {}
      }
    },
    addVisible: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('密码不能为空'))
      }
      if (/[\u4E00-\u9FA5]/g.test(value)) {
        return callback(new Error('密码不能为中文'))
      } else if (value.length < 8) {
        return callback(new Error('密码长度不能少于8个字符'))
      } else if (value.length > 20) {
        return callback(new Error('密码长度不能超过20个字符'))
      } else {
        return callback()
      }
    }
    return {
      searchFrom: {
        wxname: '',
        nickname: '',
        username: '',
        password: '',
        sex: '',
        phone: '',
        email: '',
        city: [],
        roleList: [3],
        lockFlag: '',
        avatar: ''
      },
      addRules: {
        wxname: [
          {
            min: 2,
            max: 20,
            message: '长度在 2 到 20 个字符',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            validator: validatePass,
            trigger: 'blur'
          }
        ],
        username: [
          {
            required: true,
            message: '账号不能为空',
            trigger: 'blur'
          }
        ],
        phone: { required: true, validator: validPhone, trigger: 'blur' },
        // phone: [
        //   {
        //     required: true,
        //     message: '手机号码不能为空',
        //     trigger: 'blur'
        //   },
        //   {
        //     min: 11,
        //     max: 11,
        //     message: '手机格式错误',
        //     trigger: 'blur'
        //   }
        // ],
        lockFlag: [
          {
            required: true,
            message: '状态不能为空',
            trigger: 'blur'
          }
        ]
      },
      fakepassword: '',
      roleoptions: [],
      getFile: '', // 获取文件信息
      oldAvatarUrl: ''
    }
  },
  watch: {
    titleContent(payload) {
      this.getFile = ''
      if (payload.titleEngName === 'edit') {
        this.getChechUser()
      } else {
        this.oldAvatarUrl = ''
        this.searchFrom = {
          wxname: '',
          nickname: '',
          username: '',
          password: '',
          sex: '',
          phone: '',
          email: '',
          city: [],
          deptId: 8,
          roleList: [3],
          lockFlag: '',
          avatar: ''
        }
        this.fakepassword = ''
      }
    }
  },
  created() {},
  methods: {
    cancel() {
      this.$emit('update:addVisible', false)
      this.$refs.searchFrom.clearValidate()
    },
    // 上传头像
    beforeAvatarUpload(file) {
      const isJPG = file.raw.type === 'image/jpeg' || file.raw.type === 'image/png'
      const isLt2M = file.raw.size / 1024 / 1024 < 1
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
        return
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 1MB!')
        return
      }
      this.getFile = file
      let reader = new FileReader() // 把文件转换成base64进行展示
      reader.readAsDataURL(file.raw)
      reader.onload = () => {
        this.searchFrom.avatar = reader.result
      }
      reader.onerror = function(error) {
        console.log('Error: ', error)
      }
    },
    // 添加修改用户
    handleUser() {
      this.$refs.searchFrom.validate((valid) => {
        if (valid) {
          if (this.getFile !== '') {
            const formData = new FormData()
            formData.append('images', this.getFile.raw)
            uploadAvatar(formData).then(res => {
              if (res.code === 1) {
                this.searchFrom.avatar = res.data[0].attachPath
                this.uploadDate()
              }
            })
          } else {
            this.uploadDate()
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 选择区域
    regioChange(value) {
      this.searchFrom.city = value
    },
    // 提交用户信息
    uploadDate() {
      let data = {
        wxname: this.searchFrom.wxname,
        username: this.searchFrom.phone,
        nickname: this.searchFrom.nickname,
        password: this.searchFrom.password,
        sex: this.searchFrom.sex,
        phone: this.searchFrom.phone,
        role: [3],
        email: this.searchFrom.email,
        city: '',
        lockFlag: this.searchFrom.lockFlag,
        avatar: this.searchFrom.avatar
      }
      if (this.searchFrom.city !== null) {
        data.city = this.searchFrom.city.join(' ')
      }
      if (this.titleContent.titleEngName === 'edit') {
        data.role = []
        this.searchFrom.roleList.forEach((item) => {
          data.role.push(item.roleId)
        })
        data['userId'] = this.searchFrom.userId
        if (data.username === null) {
          data.username = this.searchFrom.openid
        }
        getmodifyUser(data).then((res) => {
          if (res.code === 1) {
            this.$message({
              message: '修改用户成功',
              type: 'success'
            })
            if (this.searchFrom.avatar !== this.oldAvatarUrl) {
              deleteAvatar({ 'url': this.oldAvatarUrl })
            }
            this.fakepassword = ''
            this.$parent.getUserList()
            this.cancel()
          } else {
            this.$message({
              message: res.msg,
              type: 'fail'
            })
          }
        })
      } else {
        data.systemType = 2
        getAddUser(data).then((res) => {
          if (res.code === 1) {
            this.$message({
              message: '添加用户成功',
              type: 'success'
            })
            this.$parent.getUserList()
            this.cancel()
          } else {
            this.$message.error({
              message: res.msg
            })
          }
        })
      }
    },
    // 查看用户
    getChechUser() {
      getChechUser(this.titleContent.id).then((res) => {
        this.searchFrom = JSON.parse(JSON.stringify(res.data))
        this.fakepassword = JSON.parse(JSON.stringify(this.searchFrom.password))
        this.searchFrom.password = null
        if (this.searchFrom.city !== null) {
          this.searchFrom.city = this.searchFrom.city.split(' ')
        }
        this.oldAvatarUrl = res.data.avatar
      })
    }
  }
}
</script>

<style scoped lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
}
::v-deep .el-dialog__body {
  padding: 30px;
}
.el-select-dropdown .el-select-dropdown__item.selected {
  color: #ffb230 !important;
}
::v-deep .el-input__icon {
  line-height: 33px;
}
.el-select {
  width: 100%;
}
::v-deep .el-radio__label {
  color: black !important;
}
::v-deep .el-radio__input.is-checked .el-radio__inner {
  border-color: #10CE52;
  background: #10CE52;
}
.footer {
  text-align: center;
  margin-top: 30px;
  height: 32px;
  .el-button {
    width: 76px;
    height: 32px;
    line-height: 0.6;
  }
}
.search {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .el-form-item {
    width: 47%;
  }
  .el-form-item:nth-child(8) {
    width: 100%;
  }
}
</style>

