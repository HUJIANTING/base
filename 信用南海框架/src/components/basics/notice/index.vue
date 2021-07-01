<template>
  <transition name="fade">
    <div v-if="show" id="wrap" ref="view">
      <!-- 关闭图标 -->
      <i
        v-if="noticeData.showClose"
        id="closeIcon"
        ref="view"
        class="el-icon-close"
        @click="close"
      />
      <!-- 主体内容 -->
      <div id="contont">
        <!-- 提示的图标 -->
        <img
          v-if="tipIcon[noticeData.type]"
          id="tipIcon"
          :src="tipIcon[noticeData.type]"
          :alt="noticeData.type"
        >
        <div id="wordsCont">
          <!-- 标题 -->
          <div id="title">{{ noticeData.title }}</div>
          <!-- 消息内容 -->
          <div id="message" v-html="noticeData.message" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'NoticPage',
  data() {
    return {
      viewHeight: 0,
      show: false,
      // 图标的列表
      tipIcon: {
        success: require('../../../../static/notice/tips_success_1@2x.png'),
        error: require('../../../../static/notice/tips_fail@2x.png'),
        warn: require('../../../../static/notice/popup_i_warn@2x.png'),
        none: ''
      },
      typeTitle: ['成功！', '失败！', '警告！'],
      // 配置参数，调用使用想改变配置参数，在参数options修改相应的字段，不改则为默认值
      noticeData: {
        title: '提示', // 弹窗的标题的title
        message: '成功', // 弹窗的消息内容
        type: 'none', // 弹窗的类型，显示相应的图标。success为成功，error为错误，warn为警告，none无类型则为不显示
        duration: 1500, // 多久时间关闭窗口，0为不关闭
        showClose: true // 是否显示右上角的关闭按钮
      }
    }
  },
  methods: {
    close() {
      this.show = false
    },
    // 设置关闭消息通知的时间
    setCloseTime() {
      let time = this.noticeData.duration
      if (!time) return // 如果options的duration为0，则此弹窗为用不关闭
      setTimeout(() => {
        this.show = false
      }, time)
    },
    // 获取调用函数传递的参数，去改变设定的值
    setMessage(options) {
      // 判断是否传递过来相应的字段，有，则改变值，无，则显示默认
      Object.keys(options).forEach((item) => {
        if (this.noticeData[item]) {
          this.noticeData[item] = options[item]
        }
      })
      this.show = true
    },
    // 显示消息通知组件
    showNotice(options, postion) {
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
#wrap {
  min-width: 350px;
  background: #ffffff;
  border: 1px solid #e2e4ea;
  border-radius: 4px;
  box-shadow: 0px 6px 6px 0px rgba(0, 0, 0, 0.08);
  position: fixed;
  left: 50%;
  top:15vh;
  transform: translateX(-50%);
  z-index: 9999;
  #closeIcon {
    font-size: 14px;
    color: #1b1c33;
    font-weight: 700;
    margin: 15px 15px 10px 10px;
    float: right;
    &:hover {
      cursor: pointer;
    }
  }
  #contont {
    margin: 25px 20px;
    display: flex;
    #tipIcon {
      width: 50px;
      margin-left: 5px;
    }
    #wordsCont {
      flex: 1;
      margin-left: 15px;
      #title {
        font-family: Microsoft YaHei, Microsoft YaHei-Bold;
        font-size: 14px;
        font-weight: 700;
        text-align: left;
        color: #1b1c33;
        margin-top: 5px;
      }
      #message {
        font-size: 14px;
        font-family: Microsoft YaHei, Microsoft YaHei-Regular;
        font-weight: 400;
        text-align: left;
        color: #8d8e99;
        margin-top: 3px;
      }
    }
  }
}

//组件显示过渡动画
.fade-enter-active {
  animation: bounce-in  0.5s ease;
}
.fade-enter,
.fade-leave-to {
  animation: bounce-to 0.5s ease;
}
@keyframes bounce-in {
  0% {
    top: 0;
  }
  100% {
    top: 15vh;
  }
}

@keyframes bounce-to {
  0% {
    top: 15vh;
  }
  100% {
    top: 0;
  }
}
</style>
