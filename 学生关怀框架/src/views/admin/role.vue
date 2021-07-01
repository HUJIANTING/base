<template>
  <div class="role">
    <header>
      <div class="title">筛选条件</div>
      <el-form ref="searchFrom" class="search" :model="searchFrom" label-width="83px">
        <el-row class="el-row sreach-row" justify="center">
          <el-col :span="4.5" class="cell">
            <el-form-item label="角色名称：" prop="roleName">
              <el-input v-model="searchFrom.roleName" placeholder="请输入姓名" :maxlength="50" />
            </el-form-item>
          </el-col>
          <el-col :span="5" class="cell">
            <el-button type="success" @click="dataSearch()">查询</el-button>
            <el-button type="waring" @click="dataDelete()">清空</el-button>
          </el-col>
        </el-row>
      </el-form>
    </header>
    <main>
      <div class="subcontent">
        <span class="subtitle">数据列表</span>
        <el-button v-allow="'sys_role_add'" class="addbuttom" type="info" @click="handleAddRole"><i class="el-icon-plus icon" />添加角色</el-button>
      </div>
      <div class="content">
        <tableItem :table-head="tableHead" :is-check-box="isCheckBox" :table-list="tableList" :btn-list="btnList" last-item-width="250px" @handleButton="handleButton" />
      </div>
    </main>
    <footer class="footer">
      <pageNUm :page-no="searchFrom.current" :page-size="searchFrom.size" :total-count="totalCount" @currentPage="handleCurrentChange" @pageSizes="handleSizeChange" />
    </footer>
    <addItem :title-content="titleContent" :add-visible.sync="addVisible" />
    <premission ref="premission" :pre-visible.sync="preVisible" />
  </div>
</template>
<script>
import tableItem from '../../components/basics/table'
import pageNUm from '../../components/basics/pageNum'
import addItem from './components/addrole'
import premission from './components/premission'
import { getRolePage, getDeleteRole } from '../../api/user'
export default {
  components: {
    tableItem,
    pageNUm,
    addItem,
    premission
  },
  data() {
    return {
      searchFrom: {
        roleName: '',
        current: 1,
        size: 10
      },
      isCheckBox: false,
      tableHead: [ // 表头数据
        { columnName: '角色名称', params: 'roleName' },
        { columnName: '编码', params: 'roleCode' },
        { columnName: '描述', params: 'roleDesc', width: '500px' }
      ],
      tableList: [], // 表内容
      btnList: [ // 按钮数据
        { btnName: '修改', EngBtnName: 'edit', hasBtn: 'sys_role_edit' },
        { btnName: '删除', EngBtnName: 'delete', hasBtn: 'sys_role_del' },
        { btnName: '权限分配', EngBtnName: 'permission', hasBtn: 'sys_role_perm' }
      ],
      totalCount: 0,
      addVisible: false, // 新增修改弹窗
      titleContent: {
        title: '新增角色',
        titleEngName: 'add'
      },
      preVisible: false // 权限分配弹窗
    }
  },
  mounted() {
    this.getRolePage()
  },
  methods: {
    // 数据获取
    getRolePage() {
      getRolePage(this.searchFrom).then((res) => {
        this.tableList = res.data.records
        this.totalCount = res.data.total
      })
    },
    // 新增角色
    handleAddRole() {
      this.addVisible = true
      this.titleContent = { title: '新增角色', titleEngName: 'add' }
    },
    // 数据搜索
    dataSearch() {
      this.getRolePage()
    },
    // 数据清空
    dataDelete() {
      this.searchFrom.roleName = ''
    },
    // 按钮点击事件
    handleButton(payload) {
      if (payload.EngBtnName === 'edit') {
        this.addVisible = true
        this.titleContent = { title: '修改角色', titleEngName: 'edit', id: payload.row.roleId }
      } else if (payload.EngBtnName === 'delete') {
        this.getDeleteRole(payload.row.roleId)
      } else if (payload.EngBtnName === 'permission') {
        this.preVisible = true
        this.$refs.premission.getSelfMeunTree(payload.row.roleId)
      }
    },
    // 页码点击
    handleCurrentChange(payload) {
      this.searchFrom.current = payload
      this.getRolePage()
    },
    // 页面条数
    handleSizeChange(payload) {
      this.searchFrom.size = payload
      this.getRolePage()
    },
    // 删除角色
    getDeleteRole(id) {
      this.$customComfirm({
        title: '删除',
        type: 'warn',
        tips: '确定删除该角色信息？'
      }).then(() => {
        getDeleteRole(id).then((res) => {
          this.$Notice({
            type: 'success',
            message: '删除成功！'
          })
          this.getRolePage()
        })
      }).catch(() => {
        this.$message({
          message: '取消删除'
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.role{
  header{
    .title{
      font-size: 14px;
      font-weight: 700;
      color: #1b1c33;
      padding: 10px 20px;
    }
    .el-row{
      width: 100%;
      height: 75px;
      vertical-align: middle;
      background: #ffffff;
      border-radius: 4px;
      padding: 20px 0px 0px 20px;
    }
  }
  main{
    .subcontent{
      ::v-deep .el-button--info{
        border-color: #e5e5e5;
      }
      padding: 15px 0px 15px 20px;
      .subtitle{
        font-size: 14px;
        font-weight: 700;
        color: #1b1c33;
      }
      .addbuttom{
        margin-left: 18px;
        .icon{
          &:nth-child(1){
            color: #fff;
          }
        }
      }
      .el-button {
        padding: 8px 10px;
      }
    }
    .content{
      background-color: #ffffff;
      padding: 20px;
      border-radius: 4px;
      min-height: 375px;
    }
  }
  footer{
    background-color: #ffffff;
    padding: 30px 20px 30px 0px;
    text-align: right;
  }
}
</style>
