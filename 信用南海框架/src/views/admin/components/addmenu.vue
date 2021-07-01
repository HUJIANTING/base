<template>
  <div class="container">
    <el-dialog
      width="55%"
      :title="titleContent.title"
      :visible.sync="addVisible"
      :before-close="cancel"
      append-to-body
      :close-on-click-modal="false"
    >
      <div>
        <el-form ref="searchFrom" class="search" :model="searchFrom" :rules="addRules" label-width="100px">
          <el-row class="el-row" justify="center">
            <el-col :span="9">
              <el-form-item label="类型：" prop="type">
                <el-select v-model="searchFrom.type" size="small" :disabled="titleContent.titleEngName === 'edit'">
                  <el-option v-for="(item,index) in typeArray" :key="index" :label="item.name" :value="item.key" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="标题：" prop="name">
                <el-input v-model="searchFrom.name" placeholder="请输入菜单/按钮名称" :maxlength="50" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="el-row" justify="center">
            <el-col :span="9">
              <el-form-item label="路径编码：" prop="permission">
                <el-input v-model="searchFrom.permission" placeholder="请输入路径编码" :maxlength="50" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="资源地址：" prop="path">
                <el-input v-model="searchFrom.path" placeholder="请输入资源地址" :maxlength="50" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="searchFrom.type === 0 " class="el-row" justify="center">
            <el-col :span="9">
              <el-form-item label="图标名称：" prop="icon">
                <el-input v-model="searchFrom.icon" placeholder="请输入图标名称" :maxlength="50" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="排序：" prop="sort">
                <el-input v-model="searchFrom.sort" placeholder="请输入排序" :maxlength="50" />
              </el-form-item>
            </el-col>
          </el-row>
          <div class="footer">
            <el-button type="waring" @click="handleMenu">确定</el-button>
          </div>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getMenuTree, getAddMeun, getEditMeun } from '../../../api/user'
export default {
  props: {
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
    },
    parentId: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      searchFrom: { // 提交参数
        icon: undefined,
        keepAlive: 0,
        name: '',
        path: '',
        sort: undefined,
        type: 0,
        permission: '',
        parentId: -1
      },
      typeArray: [ // 类型选择
        { key: 0, name: '菜单' },
        { key: 1, name: '按钮' }
      ],
      menuArray: [], // 菜单列表
      addRules: {
        name: [
          {
            required: true,
            message: '菜单/按钮名称不能为空',
            trigger: 'blur'
          }
        ],
        permission: [
          {
            required: true,
            message: '路径编码名称不能为空',
            trigger: 'blur'
          }
        ],
        path: [
          {
            required: true,
            message: '资源地址不能为空',
            trigger: 'blur'
          }
        ],
        icon: [
          {
            required: true,
            message: '图标名称不能为空',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  watch: {
    parentId(payload) {
      this.searchFrom.parentId = payload
    },
    titleContent(payload) {
      if (payload.titleEngName === 'edit') {
        this.searchFrom = payload.row
        this.searchFrom.type = Number(payload.row.type)
      }
    }
  },
  mounted() {
    this.getMenuTree()
    this.searchFrom.parentId = this.parentId

    if (this.titleContent.titleEngName === 'edit') {
      this.searchFrom = this.titleContent.row
      this.searchFrom.type = Number(this.titleContent.row.type)
    }
  },
  methods: {
    cancel() {
      this.$emit('update:addVisible', false)
    },
    // 添加修改菜单
    handleMenu() {
      this.$refs.searchFrom.validate((valid) => {
        if (valid) {
          if (this.titleContent.titleEngName === 'edit') {
            getEditMeun(this.searchFrom).then((res) => {
              this.$Notice({
                type: 'success',
                message: this.searchFrom.type === 0 ? '修改菜单成功' : '修改按钮成功'
              })
              this.cancel()
              this.clearFrom()
              this.$parent.getAdminMeun()
              this.$parent.getMenuList(this.parentId)
            })
          } else {
            console.log(this.searchFrom.type)
            console.log(this.searchFrom.parentId)
            if (this.searchFrom.type === 1 && this.searchFrom.parentId === -1) {
              this.$customComfirm({
                title: '提示',
                type: 'warn',
                tips: '请先选择目录菜单'
              }).then(() => {})
              return
            }
            getAddMeun(this.searchFrom).then((res) => {
              this.$Notice({
                type: 'success',
                message: this.searchFrom.type === 0 ? '添加菜单成功' : '添加按钮成功'
              })
              this.cancel()
              this.clearFrom()
              this.$parent.getAdminMeun()
              this.$parent.getMenuList(this.parentId)
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 获取下拉根菜单
    getMenuTree() {
      getMenuTree().then((res) => {
        this.menuArray = res.data
      })
    },
    // 清空数据
    clearFrom() {
      this.searchFrom = { // 提交参数
        icon: undefined,
        keepAlive: 0,
        name: '',
        path: '',
        sort: undefined,
        type: 0,
        permission: '',
        parentId: this.searchFrom.type !== -1 ? this.searchFrom.parentId : -1
      }
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
  margin-top: 40px;
}
::v-deep .el-dialog__footer {
  position: relative;
  text-align: center;
  padding: 0;
  height: 75px;
  .el-button {
    margin-top: 10px;
    width: 76px;
    height: 32px;
    line-height: 0.6;
  }
}

</style>

