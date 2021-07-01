<template>
  <div>
    <div id="imgWrap">
      <img :src="imgUrl">
      <p class="title">{{ textName }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    textName: { // 暂无数据文本显示
      type: String,
      default: '暂无数据.....'
    },
    imgUrl: { // 暂无数据图片显示
      type: String,
      default: require('../../../static/table/nodata.png')
    }
  }
}
</script>

<style lang="scss" scoped>
#imgWrap {
  margin-top: 87px;
  margin-left: -50px;
  .title {
    font-size: 14px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    text-align: center;
    color: #707070;
    text-align: center;
    margin: 0 0 77px;
  }
  img {
    width: 300px;
  }
}
</style>
