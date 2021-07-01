<template>
  <div class="operaJournal">
    <header class="">
      <div class="title">筛选条件</div>
      <el-form ref="searchFrom" class="search" :model="searchFrom" label-width="83px">
        <el-row class="el-row sreach-row" justify="center">
          <el-col :span="4.5" class="cell">
            <el-form-item label="日志类别：" prop="roleName">
              <el-select v-model="searchFrom.type" placeholder="请选择日志类别">
                <el-option
                  v-for="item in typeOpt"
                  :key="item.label"
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
      </div>
      <div class="content">
        <tableItem :table-head="tableHead" :is-check-box="false" :table-list="tableList" :btn-list="btnList" @handleButton="handleButton" />
      </div>
    </main>
    <footer class="footer">
      <pageNUm :page-no="searchFrom.current" :page-size="searchFrom.size" :total-count="totalCount" @currentPage="handleCurrentChange" @pageSizes="handleSizeChange" />
    </footer>
    <checkOperaJournal :title-content="titleContent" :add-visible.sync="addVisible" />
  </div>
</template>
<script>
import tableItem from '../../components/basics/table'
import pageNUm from '../../components/basics/pageNum'
import checkOperaJournal from './components/checkOperaJournal'
import { operaJournalList, operaJournaltype, getDeleteLog } from '../../api/user'
export default {
  components: {
    tableItem,
    pageNUm,
    checkOperaJournal
  },
  data() {
    return {
      searchFrom: {
        type: null,
        current: 1,
        size: 10
      },
      tableHead: [ // 表头数据
        { columnName: '标题', params: 'title' },
        { columnName: '客户端', params: 'serviceId' },
        { columnName: '操作人', params: 'createBy' },
        { columnName: '操作地址', params: 'remoteAddr' },
        { columnName: '类别', params: 'type' },
        { columnName: '操作时间', params: 'createTime' }
      ],
      tableList: [], // 表内容
      btnList: [ // 按钮数据
        { btnName: '查看', EngBtnName: 'edit', hasBtn: 'sys_log_check' },
        { btnName: '删除', EngBtnName: 'delete', hasBtn: 'sys_log_del' }
      ],
      totalCount: 0,
      typeOpt: [],
      titleContent: {
        title: '查看日志',
        titleEngName: 'check'
      },
      addVisible: false // 弹窗
    }
  },
  mounted() {
    this.getUserList()
  },
  methods: {
    // 获取用户数据
    getUserList() {
      this.typeOpt = [{
        value: null,
        label: '全部'
      }]
      operaJournaltype().then((res) => {
        this.typeOpt.push(...res.data)
      }
      )
      operaJournalList(this.searchFrom).then((res) => {
        this.tableList = res.data.records
        this.tableList.forEach(item => {
          if (item.type === '0') {
            item.type = '正常'
          } else {
            item.type = '异常'
          }
        })
        this.totalCount = res.data.total
      })
    },
    // 点击搜索
    dataSearch() {
      this.searchFrom.current = 1
      this.getUserList()
    },
    // 点击清空
    dataDelete() {
      this.searchFrom = {
        type: null,
        current: 1,
        size: 10
      }
    },
    // 按钮点击事件
    handleButton(payload) {
      if (payload.EngBtnName === 'edit') {
        this.addVisible = true
        this.titleContent = { title: '查看日志', content: payload.row }
      } else if (payload.EngBtnName === 'delete') {
        this.getDeleteLog(payload.row.id)
      }
    },
    // 删除日志
    getDeleteLog(payload) {
      this.$customComfirm({
        title: '删除日志',
        type: 'warn',
        message: '是否删除日志'
      })
        .then(() => {
          getDeleteLog(payload).then(res => {
            if (res.code === 1) {
              this.$message({
                message: '删除日志成功',
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
    // 页码点击
    handleCurrentChange(payload) {
      this.searchFrom.current = payload
      this.getUserList()
    },
    // 页面条数
    handleSizeChange(payload) {
      this.searchFrom.size = payload
      this.getUserList()
    }
  }
}
</script>
<style lang="scss" scoped>
.operaJournal{
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
            color: #FFB230;
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
