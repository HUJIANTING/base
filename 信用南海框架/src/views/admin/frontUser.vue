<template>
  <div class="user">
    <header>
      <div class="title">筛选条件</div>
      <el-form ref="searchFrom" class="search" :model="searchFrom" label-width="80px">
        <el-row class="el-row sreach-row" justify="center">
          <el-col :span="4" class="cell">
            <el-form-item label="昵称" prop="username">
              <el-input v-model="searchFrom.nickname" placeholder="请输入昵称" :maxlength="50" />
            </el-form-item>
          </el-col>
          <el-col :span="4" class="cell">
            <el-form-item label="手机号码" prop="username">
              <el-input v-model="searchFrom.phone" placeholder="请输入号码" :maxlength="50" />
            </el-form-item>
          </el-col>
          <el-col :span="4" class="cell">
            <el-form-item label="状态" prop="username">
              <el-select v-model="searchFrom.lockFlag" placeholder="请选择">
                <el-option
                  v-for="item in statusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5" class="cell">
            <el-button type="success" @click="dataSearch()">查询</el-button>
            <el-button type="waring" @click="dataDelete()">清空</el-button>
          </el-col>
        </el-row>
      </el-form>
    </header>
    <main class="main">
      <div class="subcontent">
        <span class="subtitle">数据列表</span>
        <el-button v-allow="'sys_front_user_add'" class="addbuttom" type="info" @click="handleAddUser"><i class="el-icon-plus icon" />添加用户</el-button>
      </div>
      <div class="content">
        <tableItem :table-head="tableHead" :is-check-box="false" :table-list="tableList" :btn-list="btnList" @handleButton="handleButton" />
      </div>
    </main>
    <footer class="footer">
      <pageNUm :page-no="searchFrom.current" :page-size="searchFrom.size" :total-count="totalCount" @currentPage="handleCurrentChange" @pageSizes="handleSizeChange" />
    </footer>
    <addItem :deptoptions="deptoptions" :title-content="titleContent" :add-visible.sync="addVisible" />
  </div>
</template>
<script>
import tableItem from '../../components/basics/table'
import pageNUm from '../../components/basics/pageNum'
import addItem from './components/addFrontUser'
import { getDepartmentTree, getDeleteUser, getUserPage } from '../../api/user'
export default {
  components: {
    tableItem,
    pageNUm,
    addItem
  },
  data() {
    return {
      tableHead: [ // 表头数据
        { columnName: '头像', params: 'avatar', avatar: true },
        { columnName: '昵称', params: 'nickname' },
        { columnName: '手机号码', params: 'phone' },
        { columnName: '角色类型', params: 'roleList', tagName: 'roleName', itemArry: true },
        { columnName: '状态', params: 'lockFlag' }
      ],
      tableList: [], // 表内容
      btnList: [ // 按钮数据
        { btnName: '修改', EngBtnName: 'edit', hasBtn: 'sys_front_user_edit' },
        { btnName: '删除', EngBtnName: 'delete', hasBtn: 'sys_front_user_del' }
      ],
      searchFrom: {
        systemType: 2,
        current: 1,
        size: 10,
        nickname: '',
        lockFlag: '',
        phone: ''
      },
      titleContent: {
        title: '新增用户',
        titleEngName: 'add'
      },
      addVisible: false, // 新增修改弹窗
      totalCount: 0,
      statusOptions: [
        {
          value: '',
          label: '全部'
        }, {
          value: '0',
          label: '有效'
        }, {
          value: '9',
          label: '锁定'
        }],
      deptoptions: []
    }
  },
  mounted() {
    getDepartmentTree().then(res => {
      this.deptoptions = res.data
    })
    this.getUserList()
    this.titleContent = { title: '新增用户', titleEngName: 'add' }
  },
  methods: {
    // 获取用户数据
    getUserList() {
      getUserPage(this.searchFrom).then((res) => {
        this.tableList = res.data.records
        this.tableList.forEach(item => {
          if (item.lockFlag === '0') {
            item.lockFlag = '有效'
          } else {
            item.lockFlag = '锁定'
          }
        })
        this.totalCount = res.data.total
      })
    },
    // 按钮点击事件
    handleButton(payload) {
      if (payload.EngBtnName === 'edit') {
        this.addVisible = true
        this.titleContent = { title: '修改用户', titleEngName: 'edit', id: payload.row.userId }
      } else if (payload.EngBtnName === 'delete') {
        this.getDeleteRole(payload.row.userId)
      }
    },
    // 删除用户
    getDeleteRole(payload) {
      this.$customComfirm({
        title: '删除用户',
        type: 'warn',
        message: '是否删除用户'
      })
        .then(() => {
          getDeleteUser(payload).then(res => {
            if (res.code === 1) {
              this.$message({
                message: '删除用户成功',
                type: 'success'
              })
            }
            this.getUserList()
          })
        })
        .catch(() => {
          this.$message({
            message: '取消删除'
          })
        })
    },
    // 搜索
    dataSearch() {
      this.searchFrom.current = 1
      this.getUserList()
    },
    // 清空数据
    dataDelete() {
      this.searchFrom.nickname = ''
      this.searchFrom.lockFlag = ''
      this.searchFrom.phone = ''
      this.searchFrom.current = 1
    },
    // 页码点击
    handleCurrentChange(payload) {
      this.searchFrom.current = payload
      this.getUserList()
    },
    // 页面条数
    handleSizeChange(payload) {
      this.searchFrom.size = payload
      this.getUserList()
    },
    // 新增用户
    handleAddUser() {
      this.addVisible = true
      this.titleContent = { title: '新增用户', titleEngName: 'add' }
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .el-input__icon{
  line-height:33px
}
.user{
    header{
    .title{
      font-size: 14px;
      font-weight: 700;
      color: #1b1c33;
      padding: 10px 20px;
    }
    .el-row{
      width: 100%;
      vertical-align: middle;
      border-radius: 4px;
      background: #ffffff;
      padding-top: 20px;
    }
    .cell:first-child{
      padding-left: 0;
      margin:0px 0px 20px 0px;
    }
    .cell{
      padding-left: 0;
      margin:0px 0px 20px 20px;
    }
    .cell:last-child{
       padding-left: 5%;
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
            color: #237AFC;
          }
        }
      }
    }
    .content{
      background-color: #ffffff;
      padding:20px;
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
