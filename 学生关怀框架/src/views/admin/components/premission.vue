<template>
  <div class="container">
    <el-dialog
      width="20%"
      title="权限分配"
      :visible.sync="preVisible"
      :before-close="cancel"
      append-to-body
      :close-on-click-modal="false"
    >
      <div class="content">
        <div class="left">
          <el-tree ref="tree" :check-strictly="true" class="tree" :data="treeData" show-checkbox node-key="id" :props="defaultProps" />
        </div>
      </div>
      <div class="footer">
        <el-button type="waring" @click="updataRolePremission">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getMeunTree, getSelfMeunTree, getRoleMeun } from '../../../api/user'
export default {
  props: {
    preVisible: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      treeData: [], // 菜单tree数据
      roleId: '', // 菜单id
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  mounted() {
    this.getMeunTree()
  },
  methods: {
    cancel() {
      this.$refs.tree.setCheckedKeys([])
      this.$emit('update:preVisible', false)
    },
    // 获取菜单列表
    getMeunTree() {
      getMeunTree().then((res) => {
        this.treeData = res.data
      })
    },
    // 获取个人菜单权限
    getSelfMeunTree(id) {
      this.roleId = id
      getSelfMeunTree(this.roleId).then((res) => {
        this.$nextTick(() => {
          res.data.forEach(value => {
            this.$refs.tree.setChecked(value, true, false)
          })
        })
      })
    },
    // 更新角色数据数据
    updataRolePremission() {
      const treeKeys = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys())
      console.log(treeKeys)
      const params = { menuIds: treeKeys.toString(), roleId: this.roleId }
      getRoleMeun(params).then(res => {
        this.$Notice({
          type: 'success',
          message: '更新权限成功'
        })
        this.cancel()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .el-dialog__body {
  padding: 15px 10px;
}
.content{
  .left{
    width: 300px;
    height: 460px;
    overflow-y: scroll;
    .lable{
      font-size: 14px;
      font-weight: 700;
      color: #1a1a1a;
      height: 50px;
      background: #fafafa;
      border-bottom: 1px solid #ebeef5;
      border-radius: 4px 4px 0px 0px;
      text-align: center;
      line-height: 50px;
    }
    .tree{
      padding: 15px;
      ::v-deep .el-checkbox__input.is-checked .el-checkbox__inner{
        background-color: #237AFC;
        border-color: #237AFC;
      }
      ::v-deep .el-checkbox__inner:hover{
        border-color: #237AFC;
      }
      ::v-deep .el-checkbox__input.is-indeterminate .el-checkbox__inner{
        background-color: #237AFC;
        border-color: #237AFC;
      }
    }
  }
}
.footer{
    text-align: center;
    margin-top: 40px;
    .el-button{
      padding: 8px 20px;
    }
  }
</style>
