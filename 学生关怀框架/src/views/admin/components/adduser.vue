<template>
  <div class="container">
    <el-dialog
      width="43%"
      :title="titleContent.title"
      :visible.sync="addVisible"
      :before-close="cancel"
      append-to-body
      :close-on-click-modal="false"
    >
      <div>
        <el-form ref="searchFrom" class="search" :model="searchFrom" :rules="addRules">
          <el-form-item label="姓名：" prop="wxname">
            <el-input v-model="searchFrom.wxname" placeholder="请输入姓名" :maxlength="50" />
          </el-form-item>
          <el-form-item label="昵称：" prop="nickname">
            <el-input v-model="searchFrom.nickname" placeholder="请输入昵称" :maxlength="50" />
          </el-form-item>
          <el-form-item label="账号：" prop="username">
            <el-input v-model="searchFrom.username" placeholder="请输入账号" :maxlength="50" />
          </el-form-item>
          <el-form-item v-if="titleContent.titleEngName === 'edit'" label="密码：" prop="fakepassword">
            <el-input v-model="searchFrom.fakepassword" placeholder="***********" :maxlength="50" />
          </el-form-item>
          <el-form-item v-else label="密码：" prop="password">
            <el-input v-model="searchFrom.password" placeholder="请输入密码" :maxlength="50" />
          </el-form-item>
          <el-form-item label="手机号码：" prop="phone">
            <el-input v-model="searchFrom.phone" placeholder="请输入手机号码" :maxlength="50" />
          </el-form-item>
          <el-form-item label="角色类型：" prop="roleList">
            <el-select
              v-model="searchFrom.roleList"
              placeholder="请选择"
            >
              <el-option
                v-for="item in roleoptions"
                :key="item.roleName"
                :label="item.roleName"
                :value="item.roleName"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="所属部门：" prop="deptIdList">
            <el-cascader
              v-model="searchFrom.deptIdList"
              :options="deptoptions"
              :props="props"
              clearable
            />
          </el-form-item>
          <el-form-item label="邮箱地址：" prop="email">
            <el-input v-model="searchFrom.email" placeholder="请输入邮箱地址" :maxlength="50" />
          </el-form-item>
          <el-form-item label="状态：" prop="lockFlag">
            <el-radio-group v-model="searchFrom.lockFlag">
              <el-radio label="0">有效</el-radio>
              <el-radio label="9">锁定</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="性别：" prop="sex">
            <el-radio-group v-model="searchFrom.sex">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="2">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item class="item-box" label="所属权限地区：" prop="region">
            <selectRegion ref="regionView" :region="region" @change="regioChange" />
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
import { getAddUser, getmodifyUser, getChechUser, getRoleList } from '../../../api/user'
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
    var validatePass = (value, callback, jumpNull) => {
      const reg = /[\u4E00-\u9FA5]/
      const reg2 = /^(?=.*[0-9].*)(?=.*[A-Z].*)(?=.*[a-z].*).{8,30}$/
      const reg3 = /^(?=.*[@#$%^&*])[\da-zA-Z@#$%^&*]{8,30}$/

      if (jumpNull && typeof value === 'undefined' || value === null || value === '') {
        callback()
        return
      }

      if (typeof value === 'undefined' || value === null || value === '') {
        callback(new Error('密码不能为空!'))
      } else if (reg.test(value)) {
        callback(new Error('密码不能包含中文'))
      } else if (value.length < 8) {
        callback(new Error('密码长度不能少于8个字符'))
      } else if (value.length > 30) {
        callback(new Error('密码长度不能超过30个字符'))
      } else if (!reg2.test(value)) {
        callback(new Error('密码必须包含数字、大小写字母'))
      } else if (!reg3.test(value)) {
        callback(new Error('密码必须包含@#$%^&*字符'))
      } else {
        callback()
      }
    }

    return {
      props: { multiple: false, checkStrictly: true }, // 配置选项
      searchFrom: {
        'wxname': '',
        'nickname': '',
        'username': '',
        'password': '',
        'fakepassword': '',
        'sex': '',
        'phone': '',
        'deptIdList': [],
        'email': '',
        'province': '',
        'city': '',
        'district': '',
        'roleList': [],
        'lockFlag': ''
      },
      addRules: {
        wxname: [
          {
            required: true,
            message: '姓名不能为空',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 20,
            message: '长度在 2 到 20 个字符',
            trigger: 'blur'
          }
        ],
        password: { required: true, validator: (rule, value, callback) => { validatePass(value, callback, false) }, trigger: 'blur' },
        fakepassword: { required: true, validator: (rule, value, callback) => { validatePass(value, callback, true) }, trigger: 'blur' },
        // password: [
        //   {
        //     required: true,
        //     message: '密码不能为空',
        //     trigger: 'blur'
        //   }
        // ],
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
        ],
        deptIdList: [
          {
            required: true,
            message: '请选择所属部门',
            trigger: 'change'
          }
        ],
        roleList: [
          {
            required: true,
            message: '角色类型不能为空',
            trigger: 'blur'
          }
        ]
      },
      roleoptions: [],
      region: []
    }
  },
  watch: {
    titleContent(payload) {
      if (payload.titleEngName === 'edit') {
        this.getChechUser()
      } else {
        this.searchFrom = {
          'wxname': '',
          'nickname': '',
          'username': '',
          'password': '',
          'sex': '',
          'phone': '',
          'deptIdList': [],
          'email': '',
          'province': '',
          'city': '',
          'district': '',
          'roleList': '',
          'lockFlag': ''
        }
      }
    }
  },
  created() {
    getRoleList().then(res => {
      this.roleoptions = res.data
    })
  },
  methods: {
    cancel() {
      this.$emit('update:addVisible', false)
      this.region = []
      this.$refs.searchFrom.clearValidate()
    },

    // 添加修改用户
    handleUser() {
      this.$refs.searchFrom.validate((valid) => {
        if (valid) {
          let data = {
            'wxname': this.searchFrom.wxname,
            'username': this.searchFrom.username,
            'nickname': this.searchFrom.nickname,
            'password': this.searchFrom.password,
            'sex': this.searchFrom.sex,
            'phone': this.searchFrom.phone,
            'role': [],
            'deptId': Object.prototype.toString.call(this.searchFrom.deptIdList) === '[object Array]' ? this.searchFrom.deptIdList.pop() : this.searchFrom.deptIdList,
            'email': this.searchFrom.email,
            'province': this.searchFrom.province,
            'city': this.searchFrom.city,
            'district': this.searchFrom.district,
            'lockFlag': this.searchFrom.lockFlag
          }
          this.roleoptions.forEach(ite => {
            if (this.searchFrom.roleList === ite.roleName) {
              data.role.push(ite.roleId)
            }
          })
          if (this.titleContent.titleEngName === 'edit') {
            if (this.searchFrom.fakepassword !== '') {
              data.password = this.searchFrom.fakepassword
            } else {
              data.password = null
            }
            data['userId'] = this.searchFrom.userId
            getmodifyUser(data).then((res) => {
              this.$message({
                message: '修改用户成功',
                type: 'success'
              })
              this.fakepassword = ''
              this.$parent.getUserList()
              this.cancel()
            })
          } else {
            getAddUser(data).then((res) => {
              this.$message({
                message: '添加用户成功',
                type: 'success'
              })
              this.$parent.getUserList()
              this.cancel()
            })
          }
        }
      })
    },
    // 选择区域
    regioChange(value) {
      this.searchFrom.province = value[0]
      this.searchFrom.city = value[1]
      this.searchFrom.district = value[2]
    },
    // 查看用户
    getChechUser() {
      getChechUser(this.titleContent.id).then((res) => {
        this.searchFrom = JSON.parse(JSON.stringify(res.data))
        if (this.searchFrom.province !== null) {
          this.region = [this.searchFrom.province, this.searchFrom.city, this.searchFrom.district].filter(Boolean)
        }
        this.searchFrom.deptIdList = res.data.deptId
        this.searchFrom.roleList = ''
        res.data.roleList.map(re => {
          this.searchFrom.roleList = re.roleName
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-dialog__body {
  padding: 30px;
}
.el-select-dropdown .el-select-dropdown__item.selected{
  color:#FFB230!important
}
::v-deep .el-input__icon{
  line-height:33px
}
.el-select{
  width: 100%;
}
::v-deep .el-radio__label{
  color:black!important
}
::v-deep .el-radio__input.is-checked .el-radio__inner{
  border-color:#10CE52;
  background:#10CE52
}
.footer{
  text-align: center;
  margin-top: 30px;
  height: 32px;
    .el-button {
    width: 76px;
    height: 32px;
    line-height: 0.6;
  }
}
.search{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  ::v-deep.el-form-item__label{
    width: 100px;
    display: inline-block;
  }
  ::v-deep.el-form-item__content{
    display: inline-block;
    width: 63%;
  }
  .el-form-item{
    width: 50%;
  }
  .item-box{
    width: 100%;
    ::v-deep .el-form-item__label{
      width: 110px;
    }
    ::v-deep.el-form-item__content{
      display: inline-block;
      width: 80%;
    }
  }
}

</style>

