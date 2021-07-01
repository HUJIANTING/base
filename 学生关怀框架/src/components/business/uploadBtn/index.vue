<template>
  <div class="wrapper">
    <el-upload
      ref="upload"
      class="upload-demo"
      action=""
      :limit="1"
      :file-list="fileList"
      :show-file-list="showFileList"
      :http-request="handleSuccess"
      :before-upload="beforeUpload"
    >
      <el-button size="small" type="info" class="uploadBtn" :style="styleObject" icon="el-icon-document-add" :loading="loading">{{ uploadBtnName }}</el-button>
    </el-upload>

    <el-dialog :title="batchSNum ? '批量查询' :'数据上报'" class="append_body" :visible.sync="dialogVisible" width="30%" append-to-body :close-on-click-modal="false">
      <div class="topStatus">
        <i class="el-icon-success" />
        <div class="tip">{{ batchSNum? '上传成功':"上报成功" }}</div>
      </div>

      <div class="middle">
        <div class="item">
          <div class="label">上传状态：</div>
          <div class="des green">成功</div>
        </div>
        <template v-if="batchSNum">
          <div class="item">
            <div class="label">有效查询：</div>
            <div class="des green">{{ uploadData.passCount||0 }}条</div>
          </div>
          <div class="item">
            <div class="label">无效查询：</div>
            <div class="des red">{{ uploadData.errorCount ||0 }}条</div>
          </div>
        </template>
        <template v-if="!batchSNum">
          <div class="item">
            <div class="label">新增数据：</div>
            <div class="des green">{{ uploadData.passCount||0 }}条</div>
          </div>
          <div class="item">
            <div class="label">更新数据：</div>
            <div class="des green">{{ uploadData.updateCount ||0 }}条</div>
          </div>
          <div class="item">
            <div class="label">失败数据：</div>
            <div class="des red">{{ uploadData.errorCount ||0 }}条</div>
          </div>
        </template>
      </div>

      <div v-if="uploadData.errorCount>0" class="bottom">上传错误报告(含错误记录):  <span @click="getErrFile">点击下载</span></div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="close">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { exportFunction } from '@/components/const/config'
import { errorDataDown } from '@/api/common'
export default {
  components: {},
  props: {
    getRequestName: { // 文件上传请求接口
      type: Function,
      default: () => { }
    },
    showFileList: { // 是否显示上传成功的数据列表
      type: Boolean,
      default: false
    },
    uploadBtnName: { // 上传按钮名称
      type: String,
      default: '数据上传'
    },
    styleObject: { // 上传按钮样式
      type: Object,
      default: () => { }
    },
    addParams: { // 除文件参数之外的参数
      type: Object,
      default: () => { }
    },
    dataRow: { // 列表点击的参数
      type: Object,
      default: () => { }
    },
    batchSNum: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      fileList: [],
      newFile: new FormData(),
      uploadData: {},
      dialogVisible: false // 错误文件下载提示弹窗
    }
  },
  methods: {
    // 关闭下载弹窗
    close() {
      this.dialogVisible = false
      this.$emit('uploadSuccess', this.uploadData)
      this.$emit('emptyParams', true)
    },

    // 附件上传之前类型大小判断
    beforeUpload(file) {
      // 列表赋值
      if (this.dataRow && Object.keys(this.dataRow).length !== 0) {
        this.addParams.batchName = this.dataRow.batchName
        this.addParams.batchQueryId = this.dataRow.id
      }
      if (this.addParams && this.addParams.batchName === '') {
        this.$emit('emptyParams', false)
        return false
      }
      const typeFile = ['xlsx', 'xls', 'xlsm']
      let fileName = file.name
      let filedot = fileName.lastIndexOf('.')
      let fileNameLen = fileName.length
      const filetype = fileName.substring(filedot + 1, fileNameLen)
      const isLegal = typeFile.includes(filetype)
      const isLt2M = file.size / 1024 / 1024 < 10
      if (!isLegal) {
        this.$message.error('上传附件excel格式!')
        return false
      }
      if (!isLt2M) {
        this.$message.error('上传附件大小不能超过 10MB!')
        return false
      }
      this.newFile.append('file', file)
    },

    // 上传成功
    handleSuccess() {
      this.loading = true

      if (this.addParams && this.addParams.batchName !== '') {
        this.newFile.append('batchName', this.addParams.batchName)
        this.newFile.append('addOrUpdate', this.addParams.addOrUpdate)
        this.newFile.append('batchQueryId', this.addParams.batchQueryId)
      }

      this.getRequestName(this.newFile).then(res => {
        this.uploadData = { ...res.data }
        this.fileList = [] // 数据重置
        this.newFile = new FormData() // 数据重置

        if (res.code === 1) {
          this.dialogVisible = true
        } else {
          this.$message.error(res.msg)
        }

        this.loading = false
      })
    },

    // 下载错误文件
    getErrFile() {
      let errorUploadDatas = this.uploadData.errorUploadDataList
      errorDataDown(errorUploadDatas).then((res) => {
        exportFunction(res, '错误数据模板.xlsx')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper{
  ::v-deep .el-dialog__body{
    padding: 20px 30px;
    background: #fff;
  }
  ::v-deep.el-dialog__footer{
    padding: 20px 30px;
    background: #fff;
  }
  .uploadBtn{
    padding: 10px 13px;
    font-size: 14px;
  }
  .topStatus{
    text-align: center;
    .el-icon-success{
      color:#31C279;
      font-size: 50px;
    }
    .tip{
      font-size: 16px;
      font-weight: 700;
      color: #3a4450;
    }
  }

  .middle{
    display: flex;
    flex-wrap: wrap;
    padding:20px;
    margin:20px 0 10px;
    background: #f6f7f9;
    .item{
      width: 50%;
      line-height: 30px;
      display: flex;
      .label{
        flex:3;
        text-align: right;
      }
      .des{
        flex:2;
      }
    }
    .red{
      color:red;
    }
    .green{
      color:#31C279;
    }
  }

  .bottom{
    font-size: 15px;
    color: #667588;
    text-align: center;
    span{
      color:#598AFF;
      cursor: pointer;
    }
  }

  .dialog-footer{
    text-align: center;
    ::v-deep .el-button{
        padding: 8px 20px;
        font-size: 14px;
    }
  }

}
</style>
