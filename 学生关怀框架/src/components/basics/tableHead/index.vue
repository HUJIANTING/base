<template>
  <div>
    <div class="subcontent">
      <div class="subcontent-left">
        <slot name="left" />
      </div>
      <div class="subcontent-right">
        <slot name="right" />
      </div>
    </div>

    <div class="subcontent-main">
      <slot name="main" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  mounted() {

  },

  methods: {

  }
}
</script>

<style lang="scss" scoped>
.subcontent {
  height: 54px;
  padding: 17px 20px;
  background: #f9fafc;
  border-radius: 4px 4px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .subcontent-left {
    font-size: 16px;
    font-weight: 700;
    color: #3a4450;
    letter-spacing: 1px;
    font-family: Microsoft YaHei, Microsoft YaHei-Bold;
  }

  .subcontent-right {
    display: flex;
    cursor: pointer;
    ::v-deep .el-button {
      padding: 8px 14px;
      background: #f9fafc;
      border: 1px solid #f9fafc;
      color: #3a4450;
      font-size: 14px;
      font-family: Microsoft YaHei, Microsoft YaHei-Regular;
      &:hover {
        color: #329aff;
        border: 1px solid #329aff;
      }
    }
  }
}

.subcontent-main {
  padding: 20px;
  background: #ffffff;
  border-top: 1px solid #e7e9f1;
  border-radius: 0 0 4px 4px;
}
</style>
