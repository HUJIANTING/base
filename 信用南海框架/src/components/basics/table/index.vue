<template>
  <div>
    <el-row>
      <el-col :span="24" class="left-box">
        <el-table ref="staffTable" :key="isCheckBox" v-loading="loading" border :data="tableList" row-key="id" @keydown.native.prevent @selection-change="handleChange" @select="selectChange">
          <el-table-column v-if="isCheckBox" type="selection" align="center" :selectable="(row)=>row[isSelect] !== selectValue" :reserve-selection="true" width="40" />
          <el-table-column v-if="isIndex" prop="num" label="序号" align="center" width="50">
            <template slot-scope="scope">
              <div>{{ scope.$index+1 }}</div>
            </template>
          </el-table-column>
          <!-- 内容 -->
          <el-table-column v-for="(item,index) in tableHead" :key="index" align="center" :label="item.columnName" :width="item.width ? item.width : lableWidth">
            <template slot-scope="scope">
              <!-- 参数为数组 -->
              <div v-if="!!item.itemArry">
                <el-tag v-for="(ite,inde) in scope.row[item.params]" :key="inde" class="roleTag">{{ ite[item.tagName] }}</el-tag>
              </div>
              <!-- 参数显示非文本 -->
              <div v-else-if="item.avatar"><img class="avatar" :src="scope.row[item.params]? scope.row[item.params]:require('../../../../static/upload/defaultAvatar.png')" alt=""></div>
              <!-- 参数为多个参数拼接【'province', 'city', 'district'】 -->
              <div v-else-if="item.paramsType === 'array'">
                <span v-for="(inItem, inIndex) in item.params" :key="inIndex">{{ scope.row[inItem] }}</span>
              </div>
              <div
                v-else
                :class="{
                  titleClick: item.hoverTap,
                  successColor:scope.row[item.params] === item.success,
                  fialColor:scope.row[item.params] ===item.fail}"
                @click="item.hoverTap && tapHoverMatch(scope.row)"
              >
                <!-- 参数显示对应数字显示中文 如 0：否 1：是 -->
                <span v-if="item.isHasVaue">{{ item.isHasVaue[scope.row[item.params]] }}</span>
                <!-- 参数显示需要对某个字段进行判断显示 如：0：金赋科技 非0：显示原数据 -->
                <span v-else-if="item.handValue === scope.row[item.params]">{{ item.handText }}</span>
                <!-- 参数显示正常情况 参数有下划线 颜色区分 以及有下划线的按钮是否可以点击-->
                <span v-else>{{ scope.row[item.params] }}</span>
              </div>
            </template>
          </el-table-column>
          <!-- 按钮 -->
          <el-table-column v-if="btnList.length !== 0" label="操作" align="center" :width="lastItemWidth" :fixed="fixed">
            <template slot-scope="scope">
              <div v-for="(btnItem, btnIndex) in btnList" :key="btnIndex" class="button" :class="{buttonLeftAlgin:buttonLeftAlgin}">
                <img
                  v-if="scope.row[btnItem.status] === btnItem.matchStatus
                    || haveStatus(scope.row[btnItem.status],btnItem.matchStatus)"
                  :src="btnImg[btnItem.EngBtnName]"
                  :class="[`${btnItem.EngBtnName}`,btnList.length !== 0]"
                >
                <!-- matchStatus 判断该按钮是否需要隐藏 hasBtn按钮的权限 EngBtnName 按钮样式 -->
                <div v-if="btnItem.hasBtn === 'batch_upload'">
                  <!-- <uploadBtn :get-request-name="btnItem.getRequestName" :upload-btn-name="btnItem.btnName" :style-object="btnItem.styleObject" :add-params="btnItem.addParams" :data-row="scope.row" :batch-s-num="true" /> -->
                </div>
                <el-button
                  v-else-if="scope.row[btnItem.status] === btnItem.matchStatus
                    || haveStatus(scope.row[btnItem.status],btnItem.matchStatus)"
                  v-allow="btnItem.hasBtn"
                  type="text"
                  size="small"
                  @click="handleButton(scope.row, btnItem.EngBtnName)"
                >{{ btnItem.btnName }}
                </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>
<script>
// import uploadBtn from '@/components/business/uploadBtn'
export default {
  components: {
    // uploadBtn
  },
  props: {
    isIndex: { // 是否需要序号
      type: Boolean,
      default: true
    },
    isCheckBox: { // 是否需要选框
      type: Boolean,
      default: true
    },
    lastItemWidth: { // 获取最后一列长度
      type: String,
      default: '200px'
    },
    tableHead: { // 表头数据
      type: Array,
      default: () => []
    },
    tableList: { // 数据列表
      type: Array,
      default: () => []
    },
    btnList: { // 按钮列表
      type: Array,
      default: () => []
    },
    loading: { // 加载中状态
      type: Boolean,
      default: false
    },
    buttonLeftAlgin: { // 最后一列按钮是否左对齐
      type: Boolean,
      default: false
    },
    lableWidth: { // 默人表格一列最低250px
      type: String,
      default: '200px'
    },
    isSelect: { // 选择框是否可选
      type: String,
      default: ''
    },
    selectValue: { // 不可选值
      type: Number,
      default: -1
    },
    fixed: {
      type: String,
      default: 'right'
    }
  },
  data() {
    return {
      btnImg: {
        check: require('../../../../static/common/list_i_view.png'), // 查看
        edit: require('../../../../static/common/list_i_change.png'), // 编辑
        delete: require('../../../../static/common/list_i_delete.png'), // 删除
        approval: require('../../../../static/common/list_i_approval.png'), // 审批
        download: require('../../../../static/common/list_i_download.png'), // 下载
        publish: require('../../../../static/common/list_i_publish.png'), // 发布
        handle: require('../../../../static/common/list_i_handle.png'), // 处理
        reply: require('../../../../static/common/list_i_reply.png'), // 回复
        permission: require('../../../../static/common/list_i_permission.png'), // 权限分配
        revocation: require('../../../../static/common/list_i_revocation.png'), // 撤销
        report: require('../../../../static/common/list_i_report.png'), // 上报
        update: require('../../../../static/common/list_i_update.png') // 更新
      }
    }
  },
  methods: {
    // 表格错位
    tableFixed() {
      this.$refs.staffTable.doLayout()
    },
    // 按钮传数组形式判断显示
    haveStatus(status, matchStatus) {
      if (typeof matchStatus === 'object' && matchStatus.indexOf(status) !== -1) {
        return true
      } else {
        return false
      }
    },
    // 按钮点击事件
    handleButton(row, EngBtnName) {
      const params = { row: row, EngBtnName: EngBtnName }
      this.$emit('handleButton', params)
    },
    // 全选事件
    handleChange(row) {
      this.$emit('selectRow', row)
    },
    // 单选事件
    selectChange(selection, row) {
      this.$emit('selectOne', row)
    },
    // 清空表单选择
    clearTable() {
      this.$refs.staffTable.clearSelection()
    },
    // 表格内部的值得点击事件
    tapHoverMatch(row) {
      this.$emit('tapHover', row)
    }

  }
}
</script>

<style lang="scss" scoped>
.roleTag {
  margin: 5px 5px 0px 5px;
}
.avatar {
  width: 70px;
  height: 70px;
  vertical-align: middle;
}
.left-box {
  border-radius: 5px;
  position: relative;
  ::v-deep .el-table th {
    background-color: #DAE8FE;
    color: #3a4450;
    font-weight: 700;
  }
  ::v-deep .el-table-column--selection .cell {
    padding: 0px 10px;
  }
  ::v-deep .el-table td {
    padding: 5px 0px;
  }
  .titleClick {
    &:hover {
      cursor: pointer;
    }
    color: #237afc;
    text-decoration: underline;
  }
  .titleLeftAlign {
    text-align: left;
  }
  .buttonLeftAlgin {
    float: left;
  }
  .successColor{
    color: #10ce52;
  }
  .fialColor{
    color: #f74a64;
  }
  ::v-deep.el-checkbox__input.is-checked .el-checkbox__inner {
    background-color: #237afc;
    border-color: #237afc;
  }
  ::v-deep .el-checkbox__inner:hover {
    border-color: #237afc;
  }
  ::v-deep.el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #237afc;
    border-color: #237afc;
  }
  .el-table .cell{
    display: flex;
  }
  .button{
    display: inline-block;
    padding: 0px 6px;
    img{
      vertical-align: middle;
      margin-right: 3px;
    }
    .edit{
      width: 15px;
    }
  }
  // ::v-deep.el-table__fixed {
  //   height: 100%!important;
  //   // position: absolute;
  // }
}
</style>
