<template>
  <div class="pageNum">
    <el-pagination
      background
      :current-page="pageNo"
      :page-sizes="selectSize"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script>
export default {
  props: {
    totalCount: { // 总条数
      type: Number,
      default: 0
    },
    pageNo: { // 页码
      type: Number,
      default: 1
    },
    pageSize: { // 条数
      type: Number,
      default: 10
    },
    selectSize: { // 可选择页面
      type: Array,
      default() {
        return [10, 20, 30, 40, 50]
      }
    }
  },
  data() {
    return {

    }
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('pageSizes', val)
    },
    handleCurrentChange(val) {
      this.$emit('currentPage', val)
    }
  }
}
</script>
