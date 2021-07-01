<template>
  <div class="user">
    <header>
      <div class="title">筛选条件</div>
      <el-form ref="searchFrom" class="search" :model="searchFrom">
        <el-row class="sreach-row" justify="center">
          <el-col :span="6" class="cell">
            <el-form-item label="姓名" label-width="40px" prop="username">
              <el-input v-model="searchFrom.wxname" placeholder="请输入姓名" :maxlength="50" />
            </el-form-item>
          </el-col>
          <el-col :span="5" class="cell">
            <el-form-item label="手机号码" label-width="70px" prop="username">
              <el-input v-model="searchFrom.phone" placeholder="请输入号码" :maxlength="50" />
            </el-form-item>
          </el-col>
          <el-col :span="6" class="cell">
            <el-form-item label="所在区域：" label-width="90px">
              <selectRegion ref="regionView" :region="region" @change="regioChange" />
            </el-form-item>
          </el-col>
          <el-col :span="5" class="cell">
            <el-form-item label="所属部门" label-width="70px" prop="deptIdList">
              <el-cascader
                v-model="searchFrom.deptIdList"
                :options="deptoptions"
                :props="props"
                clearable
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="el-row" justify="center">
          <el-col :span="6">
            <el-form-item label="状态" label-width="40px" prop="username">
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
          <el-col :span="17" class="footer-btn">
            <el-button type="success" @click="dataSearch()">查询</el-button>
            <el-button type="waring" @click="dataDelete()">清空</el-button>
          </el-col>
        </el-row>
      </el-form>
    </header>
    <main class="main">
      <div class="subcontent">
        <span class="subtitle">数据列表</span>
        <el-button v-allow="'sys_user_add'" class="addbuttom" type="info" @click="handleAddUser"><i class="el-icon-plus icon" />添加用户</el-button>
      </div>
      <div class="content">
        <tableItem :table-head="tableHead" :table-list="tableList" :is-check-box="false" :btn-list="btnList" @handleButton="handleButton" />
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
import addItem from './components/adduser'
import selectRegion from 'components/business/selectRegion/index.vue'
import { getDepartmentTree, getDeleteUser, getUserPage } from '../../api/user'

export default {
  components: {
    tableItem,
    pageNUm,
    addItem,
    selectRegion
  },
  data() {
    return {
      props: { multiple: false, checkStrictly: true }, // 配置选项
      tableHead: [ // 表头数据
        { columnName: '姓名', params: 'wxname' },
        { columnName: '昵称', params: 'nickname' },
        { columnName: '账号', params: 'username' },
        { columnName: '手机号码', params: 'phone' },
        { columnName: '角色类型', params: 'roleList', tagName: 'roleName', itemArry: true },
        { columnName: '所属部门', params: 'deptName' },
        { columnName: '状态', params: 'lockFlag' }
      ],
      tableList: [], // 表内容
      btnList: [ // 按钮数据
        { btnName: '修改', EngBtnName: 'edit', hasBtn: 'sys_user_edit' },
        { btnName: '删除', EngBtnName: 'delete', hasBtn: 'sys_user_del' }
      ],
      searchFrom: {
        systemType: 1,
        current: 1,
        size: 10,
        wxname: '',
        deptIdList: [],
        lockFlag: '',
        phone: '',
        province: '',
        city: '',
        district: ''
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
      deptoptions: [],
      region: []// 地区
    }
  },
  mounted() {
    this.getTree()
    this.getUserList()
  },
  methods: {
    // 所在地区选择
    regioChange(value) {
      this.searchFrom.province = value[0]
      this.searchFrom.city = value[1]
      this.searchFrom.district = value[2]
    },

    // 获取部门树
    getTree() {
      getDepartmentTree().then(res => {
        this.deptoptions = this.format(res.data)
      })
    },

    // 获取用户数据
    getUserList() {
      let obj = JSON.parse(JSON.stringify(this.searchFrom))

      if (Object.prototype.toString.call(obj.deptIdList) === '[object Array]') {
        obj.deptId = obj.deptIdList.pop()
      } else {
        obj.deptId = obj.deptIdList
      }

      delete obj.deptIdList

      getUserPage(obj).then((res) => {
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

    // 清洗部门树数据,主要是为了去掉最后一项子项的children字段
    format(list) {
      let arr = []
      for (let i in list) {
        let item = list[i]
        if (!item.children || item.children.length === 0) {
          let obj = {
            value: item.id,
            label: item.name
          }
          arr.push(obj)
        } else {
          let obj = {
            value: item.id,
            label: item.name,
            children: []
          }
          obj.children = this.format(item.children)
          arr.push(obj)
        }
      }
      return arr
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
      this.searchFrom.wxname = ''
      this.searchFrom.lockFlag = ''
      this.searchFrom.deptIdList = []
      this.searchFrom.phone = ''
      this.searchFrom.current = 1
      this.searchFrom.province = ''
      this.searchFrom.city = ''
      this.searchFrom.district = ''
      this.region = []
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
        background: #ffffff;
        border-radius: 4px;
        padding-left: 20px;
      }
      .sreach-row{
        padding-top: 20px;
        padding-left: 20px;
      }
      .cell:first-child{
        padding-left: 0;
        margin:0px 0px 20px 0px;
      }
      .cell{
        padding-left: 0;
        margin:0px 0px 20px 20px;
      }
      .footer-btn{
        text-align: right;
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
