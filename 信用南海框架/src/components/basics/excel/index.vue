<template>
  <div class="check">
    <div v-for="(itemList,keys) in excelList" :key="keys" class="baseInfo" :class="{'border' : itemList.headTitle}">
      <div class="baseInfoContent" :class="{'margin': itemList.headTitle}">
        <div class="title">{{ itemList.headTitle }}</div>
        <div class="baseInDetail">
          <div v-for="(item,key) in itemList.list" :key="key" class="baseInDetailItem">
            <div v-for="i in item" :key="i.name" class="baseInDetailItemDetail">
              <div class="left">{{ i.name }}</div>
              <div v-if="i.isLable" class="right" v-html="detailInfoData[i.prop]" />
              <!-- type=== 为图片时候显示图片 -->
              <div v-else-if="i.type==='img'" class="right align"><img v-show="detailInfoData[i.prop]!=null" class="image" :src="detailInfoData[i.prop]" alt=""></div>
              <div v-else-if="i.type==='column'" class="right ">
                <span v-for="ite in detailInfoData[i.prop]" :key="ite.path">{{ ite[i.columnName] }}、</span>
              </div>
              <div v-else-if="i.type==='file'" class="right align file">
                <div v-for="ite in detailInfoData[i.prop]" :key="ite.id" class="fileItem" @click="downloadFile(ite,item)">{{ ite.fileName }}</div>
              </div>
              <!-- <div v-else-if="itemList.subObject && Object.keys(detailInfoData).length !== 0" class="right align">{{ i.hasValue? i.hasValue[detailInfoData[itemList.subObject][i.prop]] : i.IshasValue? i.IshasValue.boolean[Number(detailInfoData[itemList.subObject][i.prop])] :detailInfoData[itemList.subObject][i.prop] }}</div> -->
              <div v-else class="right align">{{ i.hasValue? i.hasValue[detailInfoData[i.prop]] : i.IshasValue? i.IshasValue.boolean[Number(detailInfoData[i.prop])] :detailInfoData[i.prop] }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    excelList: { // Excel表头数据
      type: Array,
      default: () => []
    },
    detailInfoData: { // Excel具体数据对象
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {}
  },
  created() {},
  methods: {
    // 文件下载
    downloadFile(ite, item) {
      this.$emit('download', ite, item)
    }
  }
}
</script>

<style lang='scss' scoped>
.check{
  min-width: 900px;
}
.baseInfo {
  background: #ffffff;
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
  .border{
    border: 1px solid #e7e9f0;
  }
  .margin{
    padding: 20px;
  }
  .baseInfoContent {
    .title {
      font-size: 15px;
      font-weight: 700;
      margin-bottom: 15px;
    }
    .baseInDetail {
      border-left: 1px solid #e5e5e5;
      border-top: 1px solid #e5e5e5;

      .baseInDetailItem {
        display: flex;
        .baseInDetailItemDetail {
          display: flex;
          flex: 1;
          font-size: 14px;
          .left {
            width: 200px;
            padding: 10px 10px 10px 0;
            text-align: right;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            background: #f6f7fc;
            border-right: 1px solid #e5e5e5;
            border-bottom: 1px solid #e5e5e5;
            color: #666666;
          }
          .right {
            flex: 1;
            padding: 10px 20px;
            border-right: 1px solid #e5e5e5;
            border-bottom: 1px solid #e5e5e5;
            ::v-deep img{
              max-width: 600px;
            }
          }
            .align{
              display: flex;
              align-content: center;
              align-items: center;
            }
          .file{
            position: relative;
            transform: translateY(-50%);
            top: 50%;
            display: unset;
            :hover{
              color: #598aFF;
            }
            .fileItem{
              cursor: pointer;
              margin-bottom: 5px;
            }
          }
        }
      }
    }
  }
  .image{
    max-width: 100px !important;
    // height: 50px;
  }
}
</style>
