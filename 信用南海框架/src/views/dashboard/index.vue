<template>
  <div class="dashboard-container">
    <div id="imgWrap">
      <p class="title">欢迎来到<span>信用南海后台管理系统</span></p>
      <img src="../../../static/login/homepage_default.png">
    </div>
  </div>
</template>

<script>

export default {
  name: 'Dashboard',
  data() {
    return {}
  }
}
</script>
<style scoped lang="scss" >
.dashboard-container {
  width: 100%;
  min-height: calc(100vh - 134px);
  background: #ffffff;
  border-radius: 4px;
  display: inline-block;
}
#imgWrap{
 text-align: center;
 padding-top: 0vh;
 color:#5D5D65;
 .title{
   opacity: 1;
  font-size: 32px;
  font-family: Microsoft YaHei, Microsoft YaHei-Bold;
  font-weight: 700;
  text-align: center;
  color: #2d323b;
  letter-spacing: 2px;
  span{
    color: #598Aff;
  }
 }
 img{
   width: 65%;
   margin-left: 7%;
 }
}
</style>
