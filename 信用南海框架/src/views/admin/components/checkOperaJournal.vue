<template>
  <div class="container">
    <el-dialog
      width="42%"
      :title="titleContent.title"
      :visible.sync="addVisible"
      :before-close="cancel"
      append-to-body
      :close-on-click-modal="false"
    >
      <div>
        <el-form ref="searchFrom" class="search" :model="data" label-width="95px">
          <el-form-item label="类型：">
            {{ data.type }}
          </el-form-item>
          <el-form-item label="标题：">
            {{ data.title }}
          </el-form-item>
          <el-form-item label="IP地址：">
            {{ data.remoteAddr }}
          </el-form-item>
          <el-form-item label="列表路径">
            {{ data.requestUri }}
          </el-form-item>
          <el-form-item label="请求时间：">
            {{ data.time }}
          </el-form-item>
          <el-form-item label="客户端：">
            {{ data.serviceId }}
          </el-form-item>
          <el-form-item label="创建人：">
            {{ data.createBy }}
          </el-form-item>
          <el-form-item label="创建时间：">
            {{ data.createTime }}
          </el-form-item>

          <el-form-item label="异常日志：">
            {{ data.exception }}
          </el-form-item>
        </el-form>
      </div>
      <div class="footer">
        <el-button type="waring" @click="cancel">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    deptoptions: {
      type: Array,
      default() {
        return []
      }
    },
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
      data: {}
    }
  },
  watch: {
    titleContent(payload) {
      this.data = payload.content
    }
  },
  methods: {
    cancel() {
      this.$emit('update:addVisible', false)
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-dialog__body {
  padding: 30px;
}
.el-select-dropdown .el-select-dropdown__item.selected{
  color:#FFB230!important
}
::v-deep .el-input__icon{
  line-height:33px
}
.el-select{
  width: 100%;
}
::v-deep .el-radio__label{
  color:black!important
}
::v-deep .el-radio__input.is-checked .el-radio__inner{
  border-color:#10CE52;
  background:#10CE52
}
.footer{
  text-align: center;
  margin-top: 10px;
  height: 32px;
    .el-button {
    width: 76px;
    height: 32px;
    line-height: 0.6;
  }
}
.search{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .el-form-item:not(:last-child){
  width: 47%;
}
}

</style>

