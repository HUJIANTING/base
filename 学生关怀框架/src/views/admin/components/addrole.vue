<template>
  <div class="container">
    <el-dialog
      width="34%"
      :title="titleContent.title"
      :visible.sync="addVisible"
      :before-close="cancel"
      append-to-body
      :close-on-click-modal="false"
    >
      <div>
        <el-form ref="searchFrom" class="search" :model="searchFrom" :rules="addRules" label-width="100px">
          <el-form-item label="角色名称：" prop="roleName">
            <el-input v-model="searchFrom.roleName" placeholder="请输入角色名称" :maxlength="50" />
          </el-form-item>
          <el-form-item label="编码：" prop="roleCode">
            <el-input v-model="searchFrom.roleCode" placeholder="请输入编码" :maxlength="50" />
          </el-form-item>
          <el-form-item label="数据权限：" prop="dataScope">
            <el-select v-model="searchFrom.dataScope" size="small">
              <el-option v-for="(item,index) in typeArray" :key="index" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="描述：" prop="roleDesc">
            <el-input v-model="searchFrom.roleDesc" placeholder="请输入描述" :maxlength="50" />
          </el-form-item>
          <div class="footer">
            <el-button type="waring" @click="handleRole">确定</el-button>
          </div>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getAddRole, getmodifyRole, getChechRole } from '../../../api/user'
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
    }
  },
  data() {
    return {
      searchFrom: {
        roleName: '',
        roleCode: '',
        roleDesc: '',
        dataScope: '1'
      },
      typeArray: [ // 类型选择
        { value: '1', label: '全部数据权限' },
        { value: '6', label: '查询本用户部门的二级部门数据权限' }
      ],
      addRules: {
        roleName: [
          {
            required: true,
            message: '角色名称不能为空',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 20,
            message: '长度在 3 到 20 个字符',
            trigger: 'blur'
          }
        ],
        roleCode: [
          {
            required: true,
            message: '编码名称不能为空',
            trigger: 'blur'
          }
        ],
        dataScope: [
          {
            required: true,
            message: '数据权限不能为空',
            trigger: 'change'
          }
        ]
      }
    }
  },
  watch: {
    titleContent(payload) {
      if (payload.titleEngName === 'edit') {
        this.getChechRole()
      }
    }
  },
  methods: {
    cancel() {
      this.clearData()
      this.$emit('update:addVisible', false)
    },
    // 添加修改角色
    handleRole() {
      this.$refs.searchFrom.validate((valid) => {
        if (valid) {
          if (this.titleContent.titleEngName === 'edit') {
            getmodifyRole(this.searchFrom).then((res) => {
              this.$Notice({
                type: 'success',
                message: '修改角色成功'
              })
              this.cancel()
              this.$parent.getRolePage()
            })
          } else {
            getAddRole(this.searchFrom).then((res) => {
              this.$Notice({
                type: 'success',
                message: '添加角色成功'
              })
              this.cancel()
              this.$parent.getRolePage()
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 查看角色
    getChechRole() {
      getChechRole(this.titleContent.id).then((res) => {
        this.searchFrom = res.data
      })
    },
    // 清空数据
    clearData() {
      this.searchFrom = {
        roleName: '',
        roleCode: '',
        roleDesc: '',
        dataScope: '1'
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
::v-deep .el-select{
  width:100%;
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

