<template>
  <div>
    <el-dialog v-if="setVisible" width="70%" class="min-width" title="公式设置" :visible.sync="setVisible" :before-close="cancel" append-to-body :close-on-click-modal="false">
      <div class="content-tab">
        <div
          v-for="(item,index) in tabList"
          :key="index"
          class="tab"
          :class="{'select-color' : index === defaultValue}"
          @click="changeTab(index)"
        >{{ item.name }}
        </div>
      </div>
      <div class="content">
        <p class="text">默认为全【不公示】，如果选择【公示】则需要选择那些信息项能公示</p>
        <div class="box">
          <div class="left">
            <div class="table-title">
              <div v-for="(item,index) in tableTitle" :key="index" class="head-line" :class="{'table-line' : index === 0}">{{ item.name }}</div>
            </div>
            <template v-for="(item,index) in setList[0].list">
              <div v-if="index%2 !== 1" :key="index" class="table-title">
                <div class="table-data" :aa="item.disabled" :bb="disabled">{{ item.columnName }}</div>
                <div class="table-radio"><el-radio v-model="item[item.params]" :disabled="disabled || item.disabled" :label="item.val[0]"><span /></el-radio></div>
                <div class="table-radio"><el-radio v-model="item[item.params]" :disabled="disabled || item.disabled" :label="item.val[1]"><span /></el-radio></div>
              </div>
            </template>
          </div>
          <div class="left right">
            <div class="table-title">
              <div v-for="(item,index) in tableTitle" :key="index" class="head-line" :class="{'table-line' : index === 0}">{{ item.name }}</div>
            </div>
            <template v-for="(item,index) in setList[0].list">
              <div v-if="index%2 !== 0" :key="index" class="table-title">
                <div class="table-data">{{ item.columnName }}</div>
                <div class="table-radio"><el-radio v-model="item[item.params]" :disabled="disabled || item.disabled" :label="item.val[0]"><span /></el-radio></div>
                <div class="table-radio"><el-radio v-model="item[item.params]" :disabled="disabled || item.disabled" :label="item.val[1]"><span /></el-radio></div>
              </div>
            </template>
          </div>
        </div>
      </div>
      <div slot="footer">
        <el-button type="success" @click="handleSubmit">确定</el-button>
        <el-button type="info" plain @click="cancel">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { deleteTableName, tableNameInfo, tableNameSave, tableNameUpdate } from '@/api/common'
export default {
  components: {},
  props: {
    titleContent: {
      type: Object,
      default() {
        return {}
      }
    },
    setVisible: {
      type: Boolean,
      default() {
        return false
      }
    },
    setList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      defaultValue: 0,
      tabList: [
        { id: 0, name: '不公示' },
        { id: 1, name: '公示' }
      ],
      tableTitle: [
        { name: '信息项' },
        { name: '不公示' },
        { name: '公示' }
      ],
      disabled: true,
      configMap: {},
      submitData: {},
      useAddOrEdit: true // 判断是调用新增还是修改 true 新增
    }
  },
  created() {
    this.defaultSet()
  },
  methods: {
    cancel() {
      this.disabled = true
      this.defaultSet()
      this.$emit('update:setVisible', false)
    },
    changeTab(value) {
      if (value === 0) {
        this.$customComfirm({
          type: 'warn',
          tips: '点击不公示按钮，将会清除原有数据！'
        }).then(() => {
          this.defaultValue = value
          this.disabled = true
          this.deleteTableName() // 删除公式设置
          this.defaultSet() // 默认全部不公示
        }).catch(() => {
          this.$message({
            message: '取消删除'
          })
          return false
        })
      } else {
        this.defaultValue = value
        this.disabled = false
        this.tableNameInfo()
      }
    },
    // 默认不公示
    defaultSet() {
      if (this.disabled) {
        this.setList[0].list.forEach((item, index) => {
          item[item.params] = '0'
        })
      }
    },
    // 提交
    handleSubmit() {
      let dataList = this.setList[0].list
      dataList.forEach((item, index) => {
        this.configMap[item.params] = item[item.params]
      })
      this.submitData.nonpublicityTableName = this.setList[0].nonpublicityTableName
      this.submitData.configMap = this.configMap
      if (this.useAddOrEdit) { // 新增接口
        this.tableNameSave()
      } else {
        this.tableNameUpdate() // 修改接口
      }
    },
    // 删除公式设置
    deleteTableName() {
      const params = { tableName: this.setList[0].nonpublicityTableName }
      deleteTableName(params).then((res) => {
        this.$Notice({
          type: 'success',
          message: '数据清除成功！'
        })
      })
    },
    // 查询公社设置
    tableNameInfo() {
      const params = { nonpublicityTableName: this.setList[0].nonpublicityTableName }
      tableNameInfo(params).then((res) => {
        if (res.msg === '0') {
          this.useAddOrEdit = true
        } else {
          this.useAddOrEdit = false
          let dataList = this.setList[0].list
          let backData = Object.keys(res.data)
          dataList.forEach((item, index) => {
            backData.forEach((backItem, backIndex) => {
              if (item.params === backItem) {
                item[item.params] = res.data[item.params]
              }
            })
          })
        }
      })
    },
    // 新增公式设置
    tableNameSave() {
      tableNameSave(this.submitData).then((res) => {
        this.$Notice({
          type: 'success',
          message: '设置成功！'
        })
        this.cancel()
      })
    },
    // 修改公式设置
    tableNameUpdate() {
      tableNameUpdate(this.submitData).then((res) => {
        this.$Notice({
          type: 'success',
          message: '修改设置成功！'
        })
        this.cancel()
      })
    }
  }
}
</script>

<style lang='scss' scoped>
::v-deep .el-dialog__body{
  padding: 20px 30px;
  background: #F6F7F9;
}
::v-deep .el-dialog__footer{
  text-align: center;
  border-top:1px solid #E7E9F0;
}
.content-tab{
  display: flex;
  .tab{
    padding: 10px 30px;
    height: 40px;
    background: #fff;
    border-radius: 4px;
    font-size: 15px;
    color: #667588;
    margin-right: 20px;
    font-weight: 400;
    cursor: pointer;
  }
  .select-color{
    background: #598aff;
    color: #fff;
  }
}
.content{
  background-color: #fff;
  padding: 20px 25px;
  border: 1px solid #e7e9f0;
  margin-top: 20px;
  .text{
    margin: 0px;
    font-size: 12px;
    font-weight: 400;
    color: #adb1c4;
    letter-spacing: 1px;
  }
  .box{
    display: flex;
    align-items: flex-start;
    .right{
      margin-left: 20px;
    }
  }
  .left{
    margin-top: 20px;
    max-width: 49%;
    border: 1px solid #e7e9f1;
    display: inline-block;
    .table-title{
      display: flex;
      border-bottom: 1px solid #e7e9f1;
    }
    .table-title:nth-child(odd){
      background-color: #f6f7fc;
    }
    .head-line{
      width: 130px;
      background: #dae8fe;
      font-size: 14px;
      font-weight: 700;
      color: #3a4450;
      padding: 10px 0px;
      text-align: center;
    }
    .table-line{
      text-align: center;
      min-width: 240px;
      padding: 10px 0px;
    }
    .table-radio{
      width: 130px;
      font-size: 14px;
      font-weight: 700;
      color: #3a4450;
      padding: 10px 0px;
      text-align: center;
      border-right: 1px solid #e7e9f1;
    }
    .table-data{
      text-align: center;
      min-width: 240px;
      padding: 10px 0px;
      border-right: 1px solid #e7e9f1;
    }
    .table-radio:last-child{
      border-right: none;
    }
    .table-title:last-child{
      border-bottom: none;
    }
  }

}

</style>
