<template>
  <div id="regionCont">
    <el-cascader
      id="regionCom"
      ref="region"
      :lazy="true"
      :value="region"
      size="small"
      :disabled="disabled"
      filterable
      :options="regionList"
      :props="{
        checkStrictly: true,
        value: 'regionname',
        label: 'regionname',
        expandTrigger: 'hover',
      }"
      clearable
      @change="regioChange"
    />
  </div>
</template>

<script>
// import { getRegionList, getFilterRegionList } from 'api/policyBase'
export default {
  name: 'SelectRegion',
  model: {
    prop: 'region',
    event: 'change'
  },
  props: {
    region: {
      type: Array,
      default: () => {
        return []
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    fromData: {
      type: String,
      default: () => {
        return 'all'
      }
    }
  },
  data() {
    return {
      regionList: []
    }
  },
  mounted() {
    if (this.fromData === 'filter') {
      this.getFilterRegionList()
    } else {
      this.getData()
    }
  },
  methods: {
    regioChange(value) {
      this.$refs.region.dropDownVisible = false
      this.$emit('change', value)
    },
    // 获取数据
    getData() {
      this.loading = true
      // getRegionList().then((res) => {
      //   this.regionList = res.data
      // })
    },
    getFilterRegionList() {
      // getFilterRegionList().then((res) => {
      //   this.regionList = res.data
      // })
    }
  }
}
</script>

<style lang="scss" scoped>
#regionCom{
  width: 100%;
}
 .el-cascader-panel .el-radio {
  width: 100%;
  height: 100%;
  z-index: 10;
  position: absolute;
  top: 10px;
  right: 10px;
}
 .el-cascader-panel .el-radio__input {
  visibility: hidden;
}
.el-cascader-panel .el-cascader-node__postfix {
  top: 10px;
}
.el-cascader-menu__wrap{
  height: 330px;
}
</style>
