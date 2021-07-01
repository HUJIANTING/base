<template>
  <div>
    <el-dialog
      :title="confirmData.title"
      :visible.sync="show"
      :width="confirmData.width"
      :before-close="handleClose"
      :append-to-body="true"
      :close-on-click-modal="false"
      center
    >
      <img
        v-if="tipIcon[confirmData.type]"
        id="tipIcon"
        :src="tipIcon[confirmData.type]"
        :alt="confirmData.type"
      >
      <div id="tips">{{ confirmData.tips }}</div>
      <div id="message" v-html="confirmData.message" />
      <span slot="footer" class="dialog-footer">
        <el-button
          v-if="confirmData.cancelShow"
          size="small"
          @click="handleClose"
        >{{ confirmData.cancelTitle }}</el-button>
        <el-button type="waring" size="small" @click="onSubmit">{{
          confirmData.submitTitle
        }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import Vue from 'vue'
export default {
  name: 'ConfirmPage',
  data() {
    return {
      // 图标的列表
      tipIcon: {
        success: require('../../../../static/notice/tips_success_1@2x.png'),
        error: require('../../../../static/notice/tips_fail@2x.png'),
        warn: require('../../../../static/notice/popup_i_warn@2x.png'),
        none: ''
      },
      // 配置参数，调用使用想改变配置参数，在参数options修改相应的字段，不改则为默认值
      confirmData: {
        width: '400px', // 弹窗的宽度
        title: '提示', // 弹窗的左上角的title
        tips: '', // 弹窗内容的标题
        cancelShow: false, // 是否显示取消按钮
        type: 'none', // 弹窗的类型，显示相应的图标。success为成功，error为错误，warn为警告，none无类型则为不显示
        duration: 0, // 多久时间关闭窗口，0为不关闭
        message: '', // 弹窗的消息内容
        submitTitle: '确 定', // 提交按钮的的title
        cancelTitle: '取 消' // 取消按钮的title
      },
      show: false, // 弹窗的显示与否
      // promise执行的状态
      promiseStatus: null
    }
  },
  methods: {
    // 弹窗的确定按钮
    onSubmit() {
      this.show = false
      this.promiseStatus.resolve(this.confirmData.submitTitle)
    },
    // 关闭弹窗
    handleClose() {
      this.show = false
      this.promiseStatus.reject(this.confirmData.cancelTitle)
      // Vue.myGlobalMethods()
    },
    // 设置关闭消息通知的时间
    setCloseTime() {
      let time = this.confirmData.duration
      if (!time) return // 如果options的duration为0，则此弹窗为用不关闭
      setTimeout(() => {
        this.show = false
      }, time)
    },
    // 获取调用函数传递的参数，去改变设定的值
    setMessage(options) {
      // 判断是否传递过来相应的字段，有，则改变值，无，则显示默认
      Object.keys(options).forEach((item) => {
        if (this.confirmData[item] !== undefined) {
          this.confirmData[item] = options[item]
        }
      })
      this.show = true
    },
    showComfirm(options, promiseStatus) {
      // 保存this.$customComfirm的promis状态
      this.promiseStatus = promiseStatus
      // 获取optios传递参数，修改相应配置
      this.setMessage(options)
      // 定时关闭弹窗
      this.$nextTick(() => {
        this.setCloseTime()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-dialog__body {
  padding: 35px 74px 20px;
}
::v-deep .el-dialog__footer {
  padding: 10px 20px 30px;
}
#tipIcon {
  display: block;
  width: 60px;
  margin: 0 auto;
}
#tips {
  margin-top: 18px;
  font-size: 15px;
  font-family: Microsoft YaHei, Microsoft YaHei-Regular;
  font-weight: 600;
  text-align: center;
  color: #1b1c33;
}
#message {
  margin-top: 10px;
  font-size: 14px;
  font-family: Microsoft YaHei, Microsoft YaHei-Regular;
  font-weight: 400;
  text-align: center;
  color: #5d5d65;
}
</style>
