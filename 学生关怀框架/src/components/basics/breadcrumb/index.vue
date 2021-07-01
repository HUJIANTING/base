<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item,key) in menus" :key="item.path+key" :to="{ path: item.path }">{{ item.name }}</el-breadcrumb-item>
      <!-- <el-breadcrumb-item v-for="(item,key) in menus" v-show="!item.path" :key="key+item.name">{{ item.name }}</el-breadcrumb-item> -->
    </el-breadcrumb>

    <div v-if="backParams" class="return" @click="back">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-page_i_back" />
      </svg>
      <span>返回</span>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    menus: {
      type: Array,
      default() {
        return []
      }
    },
    backParams: { // 返回的地址及携带的参数
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {

    }
  },
  mounted() {

  },

  methods: {
    back() {
      if (this.backParams) {
        this.$router.push(this.backParams) // 返回到指定的页面
      } else {
        this.$router.go(-1) // 返回上一层
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// ::v-deep .el-breadcrumb {
//   margin: 0 0 20px;
// }
::v-deep .el-breadcrumb__inner {
  color: #888888;
  font-size: 14px;
  font-weight: 400;
  font-family: Microsoft YaHei, Microsoft YaHei-Regular;
}
::v-deep .el-breadcrumb__item:last-child{
  .el-breadcrumb__inner {
  color: #333333 !important;
  font-size: 14px;
  font-weight: 400;
  font-family: Microsoft YaHei, Microsoft YaHei-Regular;
}

}

.breadcrumb {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center !important;
  cursor: pointer;
  height: 50px;
  background: #ffffff;
  padding: 0 20px;
  box-sizing: border-box;
  .return {
    svg {
      width: 15px;
      height: 12px;
    }
    span {
      color: #1a6aae;
      margin-left: 6px;
    }
  }
}
</style>
