<template>
  <div class="menu">
    <div class="left">
      <div class="lable">菜单名称</div>
      <div class="tree">
        <el-input v-model="filterText" class="filterText" placeholder="输入菜单名称" />
        <el-tree ref="tree" class="filter-tree" :data="menuList" :props="defaultProps" :filter-node-method="filterNode" @node-click="getNodeData" />
      </div>
    </div>
    <div class="right main">
      <header class="header-top">
        <el-button v-allow="'sys_menu_add'" type="danger" @click="dataSearch()"><i class="el-icon-plus icon white" />添加</el-button>
      </header>
      <div class="content-top">
        <div class="title">菜单详情</div>
        <tableItem :table-head="tableTopHead" :table-list="tableTopList" :btn-list="menuTopList" :is-check-box="false" :is-index="false" @handleButton="topButton" />
      </div><div class="content-top buttom">
        <div class="title">按钮或资源</div>
        <tableItem :table-head="tableHead" :table-list="tableList" :btn-list="btnTopList" :is-check-box="false" :is-index="false" @handleButton="handleButton" />
      </div>
    </div>
    <addMenu v-if="addVisible" :title-content="titleContent" :parent-id="parentId" :add-visible.sync="addVisible" />
  </div>
</template>

<script>
import tableItem from '../../components/basics/table'
import addMenu from './components/addmenu'
import { getAdminMeun, getMenuList, deleteMenu } from '../../api/user'

export default {
  components: {
    tableItem,
    addMenu
  },
  data() {
    return {
      menuList: [], // 菜单数据
      filterText: '', // 关键字过滤
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      tableTopHead: [ // 上部表头数据
        { columnName: '标题', params: 'name' },
        { columnName: '图标', params: 'icon' },
        { columnName: '路径编码', params: 'permission' },
        { columnName: '路径地址', params: 'path' },
        { columnName: '类型', params: 'type', isHasVaue: ['菜单', '按钮'] },
        { columnName: '排序', params: 'sort' }
      ],
      tableTopList: [], // 列表数据
      menuTopList: [ // 菜单按钮数据
        { btnName: '修改', EngBtnName: 'edit', hasBtn: 'sys_menu_edit' },
        { btnName: '删除', EngBtnName: 'delete', hasBtn: 'sys_menu_del' }
      ],
      btnTopList: [ // 按钮数据
        { btnName: '修改', EngBtnName: 'edit', hasBtn: 'sys_btn_edit' },
        { btnName: '删除', EngBtnName: 'delete', hasBtn: 'sys_btn_del' }
      ],
      tableHead: [
        { columnName: '资源名称', params: 'name' },
        { columnName: '资源类型', params: 'type', isHasVaue: ['菜单', '按钮'] },
        { columnName: '资源编码', params: 'permission' },
        { columnName: '资源地址', params: 'path' }
      ],
      tableList: [], // 列表数据
      addVisible: false, // 添加弹窗
      titleContent: { // 弹窗标题
        title: '新增菜单/按钮',
        titleEngName: 'add'
      },
      parentId: -1 // 是否点击左侧按钮默认新建根目录
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  mounted() {
    this.getAdminMeun()
  },
  methods: {
    filterNode(value, data) { // 菜单搜索
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    // 获取菜单树
    getAdminMeun() {
      getAdminMeun().then((res) => {
        this.menuList = res.data
      })
    },
    // 点击tree获取菜单详情
    getNodeData(data) {
      this.getMenuList(data.id)
      this.parentId = data.id
    },
    // 获取菜单详情
    getMenuList(id) {
      getMenuList(id).then((res) => {
        this.tableTopList = res.data.menuDetail
        this.tableList = res.data.menuButton
      })
    },
    // 添加菜单或者按钮
    dataSearch() {
      this.addVisible = true
      this.titleContent = { title: '添加按钮', titleEngName: 'add' }
    },
    // 菜单详情修改表格点击事件
    topButton(payload) {
      if (payload.EngBtnName === 'edit') {
        this.addVisible = true
        this.titleContent = { title: '修改菜单', titleEngName: 'edit', row: payload.row }
      } else if (payload.EngBtnName === 'delete') {
        this.deleteMenu(payload.row.menuId)
      }
    },
    // 按钮详情修改
    handleButton(payload) {
      if (payload.EngBtnName === 'edit') {
        this.addVisible = true
        this.titleContent = { title: '修改按钮', titleEngName: 'edit', row: payload.row }
      } else if (payload.EngBtnName === 'delete') {
        this.deleteMenu(payload.row.menuId)
      }
    },
    // 删除菜单或者按钮
    deleteMenu(menuId) {
      this.$customComfirm({
        title: '删除',
        type: 'warn',
        tips: '确定删除菜单或者按钮？'
      }).then(() => {
        deleteMenu(menuId).then((res) => {
          this.$Notice({
            type: 'success',
            message: '删除成功！'
          })
          this.getAdminMeun()
          this.getMenuList(this.parentId)
        })
      })
        .catch(() => {
          this.$message({
            message: '取消删除'
          })
        })
    }
  }

}
</script>

<style lang="scss" scoped>
.menu{
  display: flex;
  justify-content: center;
  align-content: center;
  background-color: #fafafa;
  min-height: 750px;
  .left{
    width: 250px;
    background: #ffffff;
    border: 4px;
    border: 1px solid #ebeef5;
    .lable{
      font-size: 16px;
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
      padding: 15px 0px;
      .filterText{
        padding: 15px;
      }
      ::v-deep .el-input__inner{
        height: 32px;
        line-height: 32px;
      }
      ::v-deep.el-tree-node__content{
        height: 50px;
        border-bottom: 1px solid #EBEEF4;
        padding-left: 15px !important;
      }
      ::v-deep.el-tree{
        border-top: 1px solid #EBEEF4;
      }
      ::v-deep.el-tree-node__content:hover{
        background-color: #fafafa;
        color: #237AFC;
        font-weight: 700;
      }
      ::v-deep.el-tree-node:focus>.el-tree-node__content{
        background-color: #fafafa;
        color: #237AFC;
        font-weight: 700;
        padding-left: 15px;
      }
    }
  }
  .right{
    width: 82%;
    margin-left: 20px;
    padding-right: 20px;
    .header-top{
      padding: 20px 0px;
      .white{
        color: #ffffff;
      }
    }
    .content-top{
      padding: 21px;
      background: #ffffff;
      border: 1px solid #ebeef5;
      border-radius: 4px;
      .title{
        font-size: 16px;
        font-weight: 700;
        color: #1b1c33;
        padding-bottom: 15px;
      }
    }
    .buttom{
      margin-top: 20px;
    }
  }
}
</style>
