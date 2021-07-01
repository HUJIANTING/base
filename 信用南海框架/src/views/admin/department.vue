<template>
  <div class="wrapper">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="left">
          <div class="lable">部门管理</div>
          <div class="tree">
            <el-tree
              ref="tree"
              class="filter-tree"
              :indent="15"
              :data="deptTree"
              :props="defaultProps"
              :filter-node-method="filterNode"
              @node-click="getNodeData"
            />
          </div>
        </div>
      </el-col>

      <el-col :span="18">
        <div class="right">
          <el-row class="header-top" justify="center">
            <el-col :span="18">
              <el-form ref="searchFrom" class="search" :model="searchFrom" :rules="rules" :inline="true">
                <el-form-item label="部门名称：" prop="name" label-width="85px">
                  <el-input v-model="searchFrom.name" clearable placeholder="请输入部门名称" :maxlength="50" />
                </el-form-item>
                <el-form-item label="启停状态：" prop="status" label-width="100px">
                  <el-select v-model="searchFrom.status" placeholder="请选择启停状态">
                    <el-option
                      v-for="item in statuOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="6">
              <el-button type="success" class="seachBtn" @click="getList()">查 询</el-button>
              <el-button class="seachBtn" @click="dataDelete('searchFrom')">清 空</el-button>
            </el-col>
          </el-row>

          <el-row class="content-top">
            <div class="subcontent">
              <div class="subtitle">数据列表</div>
              <div class="bynGroup">
                <el-button v-allow="'sys_menu_add'" class="addbuttom" type="add" icon="el-icon-plus" @click="handleAdd()">添加</el-button>
              </div>
            </div>

            <div class="content">
              <tableItem :table-head="tableTopHead" :table-list="tableList" :btn-list="btnList" :is-check-box="false" :is-index="false" @handleButton="handleButton" />
              <pageNUm :page-no="searchFrom.pageNo" :page-size="searchFrom.pageSize" :total-count="totalCount" @currentPage="handleCurrentChange" @pageSizes="handleSizeChange" />
            </div>
          </el-row>
        </div>
      </el-col>
    </el-row>

    <addDepartment v-if="addVisible" :title-content="titleContent" :add-visible.sync="addVisible" />
  </div>
</template>

<script>
import tableItem from '@/components/basics/table'
import pageNUm from '@/components/basics/pageNum'
import addDepartment from './components/addDepartment'
import { getDepartmentTree, getDepartmentList, delDepartment } from '@/api/user'

export default {
  components: { tableItem, pageNUm, addDepartment },
  data() {
    return {
      defaultProps: { children: 'children', label: 'name' }, // 配置选项
      filterText: '', // 关键字过滤
      deptTree: [], // 部门树数据
      tableList: [], // 列表数据
      tableTopHead: [ // 上部表头数据
        { columnName: '部门名称', params: 'name' },
        { columnName: '所属部门', params: 'parentName' },
        { columnName: '部门简称', params: 'abbreviation' },
        { columnName: '启停状态', params: 'status', isHasVaue: ['', '启用', '停用'] }
      ],
      btnList: [ // 菜单按钮数据
        { btnName: '修改', EngBtnName: 'edit', hasBtn: 'sys_menu_edit' },
        { btnName: '删除', EngBtnName: 'delete', hasBtn: 'sys_menu_del' }
      ],
      statuOptions: [
        { value: null, label: '全部' },
        { value: '1', label: '启用' },
        { value: '2', label: '停用' }
      ],
      searchFrom: {
        pageNo: 1,
        pageSize: 10,
        name: '',
        status: null,
        deptId: null
      },
      totalCount: 0,
      rules: {},
      titleContent: {}, // 新增or修改
      addVisible: false // 添加弹窗

    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  mounted() {
    this.getTree()
    this.getList()
  },
  methods: {
    // 部门树过滤
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },

    // 重置
    dataDelete(formName) {
      this.searchFrom.deptId = null
      this.$refs[formName].resetFields()
    },

    // 点击tree获取部门列表
    getNodeData(data) {
      this.searchFrom.deptId = data.id
      this.getList()
    },

    // 获取部门树
    getTree() {
      getDepartmentTree().then((res) => {
        this.deptTree = res.data
      })
    },

    // 右侧部门列表
    getList() {
      getDepartmentList(this.searchFrom).then((res) => {
        this.tableList = res.data
        this.totalCount = res.total
      })
    },

    // 添加部门
    handleAdd() {
      this.addVisible = true
      this.titleContent = { title: '新增部门管理', titleEngName: 'add' }
    },

    // 按钮点击事件
    handleButton(payload) {
      if (payload.EngBtnName === 'edit') {
        this.addVisible = true
        this.titleContent = { title: '修改部门管理', titleEngName: 'edit', id: payload.row.deptId }
      } else if (payload.EngBtnName === 'delete') {
        this.$customComfirm({
          title: '提示',
          type: 'warn',
          message: '该部门下的所有部门都会被删除，是否确认要删除？'
        }).then(() => {
          delDepartment(payload.row.deptId).then((res) => {
            if (res.code === 1) {
              this.$Notice({
                type: 'success',
                message: '删除成功！'
              })
              this.getTree()
              this.getList()
            } else {
              this.$Notice({
                type: 'error',
                message: res.msg
              })
            }
          })
        })
      }
    },

    // 页码点击
    handleCurrentChange(payload) {
      this.searchFrom.pageNo = payload
      this.getList()
    },

    // 页面条数
    handleSizeChange(payload) {
      this.searchFrom.pageSize = payload
      this.getList()
    }
  }

}
</script>

<style lang="scss" scoped>
.wrapper {
  .left {
    height: 90vh;
    border-radius: 4px;
    overflow-y: auto;
    background-color: #fff;

    /*滚动条样式，设置滚动条宽度什么的*/
    &::-webkit-scrollbar {
      width: 0px;
    }

    .lable {
      font-size: 16px;
      font-weight: 700;
      color: #1a1a1a;
      height: 50px;
      background: #fafafa;
      border-radius: 4px 4px 0px 0px;
      text-align: center;
      line-height: 50px;
    }

    .tree {
      .filterText {
        padding: 15px;
      }
      ::v-deep .el-input__inner {
        height: 32px;
        line-height: 32px;
      }
      ::v-deep.el-tree-node__content{
        height: 50px;
        border-bottom: 1px solid #ebeef4;
        // padding-left: 15px !important;
      }
      ::v-deep.el-tree {
        border-top: 1px solid #ebeef4;
      }
      ::v-deep.el-tree-node__content:hover {
        background-color: #fafafa;
        color: #237afc;
        font-weight: 700;
      }
      ::v-deep.el-tree-node:focus > .el-tree-node__content {
        background-color: #fafafa;
        color: #237afc;
        font-weight: 700;
        padding-left: 15px;
      }
    //  ::v-deep .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
    //     color: #237afc;
    //     font-weight: 700;
    //   }
    }
  }

  .right {
    height: 90vh;
    .header-top {
      padding: 20px;
      margin-bottom: 20px;
      border-radius: 4px;
      background-color: #fff;
      .seachBtn{
        text-align: right;
        padding:8px 20px;
      }
    }

    .content-top {
      border-radius: 4px;
      .subcontent {
        padding: 16px 20px;
        font-size: 16px;
        background-color: #fafafa;
        border-radius: 4px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .subtitle {
          font-size: 14px;
          font-weight: 700;
          color: #1b1c33;
        }
        .bynGroup {
          display: flex;
          .addbuttom {
            margin-left: 18px;
            padding: 10px 13px;
          }
        }
      }
      .content {
        padding: 20px;
        border-radius: 4px;
        background-color: #fff;
        border-top: 1px solid #e7e9f1;
        ::v-deep .el-pagination{
          text-align: right;
          margin: 30px 0 10px;
        }
      }
    }
  }
}
</style>
