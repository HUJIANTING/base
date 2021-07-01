<template>
  <div class="dashboard-container">
    <div class="box">
      <!-- 教育分布情况 -->
      <div class="education-spread">
        <content-head>
          <div slot="left">教育分布情况</div>
          <div slot="main">
            <div class="spread-box">
              <div v-for="(item,index) in educationSpreadList" :key="index" class="spread-item">
                <div class="text-box">
                  <div class="left" :style="{background: item.bgcolor}">
                    <i class="icon el-icon-user" />
                  </div>
                  <div class="right">{{ item.text }}</div>
                </div>
                <div class="num-box">
                  <div class="left">{{ item.num }}</div>
                  <div class="right">{{ item.unit }}</div>
                </div>
              </div>
            </div>
          </div>
        </content-head>
      </div>

      <!-- 学生关怀指数 -->
      <div class="box-middle">
        <content-head>
          <div slot="left">学生关怀指数</div>
          <div slot="main">
            <div class="abnormal-box">
              <div class="abnormal-left">
                <table-head>
                  <div slot="left">学生异常事件预警</div>
                  <div slot="right">
                    查看更多<i class="el-icon-arrow-right" />
                  </div>
                  <div slot="main">
                    <tableItem
                      :table-head="tableHeadAE"
                      :is-check-box="false"
                      :is-index="false"
                      :table-list="tableListAE"
                      :btn-list="btnList"
                      @handleButton="handleButtonAE"
                    />
                  </div>
                </table-head>
              </div>
              <div class="abnormal-right">
                <table-head>
                  <div slot="left">异常学生精准服务</div>
                  <div slot="right">
                    查看更多<i class="el-icon-arrow-right" />
                  </div>
                  <div slot="main">
                    <tableItem
                      :table-head="tableHeadPS"
                      :is-check-box="false"
                      :is-index="false"
                      :table-list="tableListPS"
                      :btn-list="btnList"
                      @handleButton="handleButtonPS"
                    />
                  </div>
                </table-head>
              </div>
            </div>
          </div>
        </content-head>
      </div>

      <!-- 学生关怀指数——镇街分布情况 -->
      <div class="box-bottom">
        <content-head>
          <div slot="left">学生关怀指数——镇街分布情况</div>
          <div slot="main">
            <div class="townsStreets-box">
              <div class="townsStreets-left">
                <div class="unit">单位：人次</div>
                <div id="townsStreetsEcharts" style="width: 100%;height:400px;" />
              </div>
              <div class="townsStreets-right">
                <tableItem
                  :table-head="tableHeadTS"
                  :is-check-box="false"
                  :is-index="false"
                  :table-list="tableListTS"
                />
              </div>
            </div>
          </div>
        </content-head>
      </div>

    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts' // 注意此处echarts高版本中需要使用此方式才可引入，否则会报错init udefined
import contentHead from '@/components/basics/contentHead/index'
import tableHead from '@/components/basics/tableHead/index'
import tableItem from '@/components/basics/table'
export default {
  name: 'Dashboard',
  components: { contentHead, tableHead, tableItem },
  data() {
    return {
      // 教育分布情况
      educationSpreadList: [
        { text: '全区学生总数', bgcolor: '#3B8ED5', num: '211,889', unit: '人' },
        { text: '在校学生', bgcolor: '#73A0FA', num: '211,889', unit: '人' },
        { text: '学前幼儿', bgcolor: '#61DDAA', num: '211,889', unit: '人' },
        { text: '新生入学', bgcolor: '#F6BD16', num: '211,889', unit: '人' },
        { text: '师资力量', bgcolor: '#FF7150', num: '211,889', unit: '人' },
        { text: '教育机构', bgcolor: '#B55EFA', num: '211,889', unit: '个' }
      ],
      // 学生异常事件预警-表头数据
      tableHeadAE: [
        { columnName: '推送日期', params: 'enterpriseName', width: '100px' },
        { columnName: '期数', params: 'unifiedSocialCreditCode', width: '100px' },
        { columnName: '名单人数', params: 'reportDate', width: '100px' },
        { columnName: '数据来源', params: 'createTime', width: '100px' }
      ],
      // 学生异常事件预警-表内容
      tableListAE: [],
      // 异常学生精准服务-表头数据
      tableHeadPS: [
        { columnName: '推送日期', params: 'enterpriseName', width: '100px' },
        { columnName: '名单人数', params: 'unifiedSocialCreditCode', width: '100px' },
        { columnName: '精准服务人数', params: 'reportDate', width: '150px' },
        { columnName: '完成率', params: 'createTime', width: '100px' },
        { columnName: '最近反馈日期', params: 'createTime', width: '150px' }
      ],
      // 异常学生精准服务-表内容
      tableListPS: [],
      // 按钮数据
      btnList: [
        { btnName: '查看', EngBtnName: 'check' }
      ],
      // 镇街分布情况-表头数据
      tableHeadTS: [
        { columnName: '区域', params: 'enterpriseName', width: '100px' },
        { columnName: '学生关怀（人次）', params: 'unifiedSocialCreditCode', width: '200px' },
        { columnName: '比例', params: 'reportDate', width: '100px' }
      ],
      // 镇街分布情况-表内容
      tableListTS: [],
      // 横坐标
      category: ['桂城街道', '狮山镇', '里水镇', '大沥镇'],
      // 纵坐标
      nodeData: [120, 200, 150, 80]
    }
  },
  mounted() {
    this.renderChart()
  },
  methods: {
    // 学生异常事件预警-操作按钮事件
    handleButtonAE(payload) {
      if (payload.EngBtnName === 'check') { // 查看
        // this.viewClick(payload.row.id)
      }
    },
    // 异常学生精准服务-操作按钮事件
    handleButtonPS(payload) {
      if (payload.EngBtnName === 'check') { // 查看
        // this.viewClick(payload.row.id)
      }
    },
    // 渲染图表
    renderChart() {
      var myChart = echarts.init(document.getElementById('townsStreetsEcharts'))
      var option = {
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '1%',
          right: '1%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          // 隐藏刻度线
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#888888',
            textStyle: {
              fontSize: 12
            }
          },
          data: this.category
        },
        yAxis: {
          type: 'value',
          // 隐藏坐标线：
          axisLine: {
            show: false
          },
          // 隐藏刻度线
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#888888',
            textStyle: {
              fontSize: 12
            }
          }
        },
        series: [
          {
            type: 'bar',
            itemStyle: {
              normal: {
                color: '#1A6AAE'
              }
            },
            data: this.nodeData
          }
        ]
      }
      myChart.setOption(option)
    }
  }
}
</script>

<style scoped lang="scss" >
.dashboard-container {
  width: 100%;
  min-height: calc(100vh - 134px);
  border-radius: 4px;
  display: inline-block;
}
.box{
.education-spread{
  background: #ffffff;
  border-radius: 2px;
  .spread-box{
    height: 80px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 10px 0;
    .spread-item{
      height: 100%;
      flex: 1;
      text-align: center;
      border-right: 1px solid #e7e9f1;
      .text-box{
         display: flex;
        justify-content: center;
        align-items: center;
        .left{
          width: 29px;
          height: 29px;
          opacity: 1;
          background: #3b8ed5;
          border-radius: 4px;
          text-align: center;
          padding: 5px;
          box-sizing: border-box;
          .icon{
            color: #fff;
            font-size: 20px;
          }
        }
        .right{
          font-size: 14px;
          font-family: Microsoft YaHei, Microsoft YaHei-Regular;
          font-weight: 400;
          text-align: left;
          color: #888888;
          margin-left: 10px;
        }
      }
       .num-box{
         display: flex;
        justify-content: center;
        align-items: center;
        .left{
          font-size: 34px;
          font-family: Roboto, Roboto-Bold Condensed;
          font-weight: Bold Condensed;
          text-align: left;
          color: #3a4450;
        }
        .right{
          font-size: 12px;
          font-family: Microsoft YaHei, Microsoft YaHei-Regular;
          font-weight: 400;
          text-align: left;
          color: #888888;
          margin-left: 10px;
          margin-top: 10px;
        }
      }
    }
    .spread-item:last-child{
      border: none;
    }
  }
}

.box-middle{
  margin-top: 20px;
  background: #ffffff;
  border-radius: 2px;
.abnormal-box{
  ::v-deep .subcontent-right{
     color: #1A6AAE;
  }
  display: flex;
  .abnormal-left{
    flex: 1;
    border: 1px solid #ebebeb;
  }
  .abnormal-right{
    flex: 1;
    margin-left: 20px;
    border: 1px solid #ebebeb;
  }
}
}

.box-bottom{
  margin-top: 20px;
  background: #ffffff;
  border-radius: 2px;
  .townsStreets-box{
    display: flex;
  .townsStreets-left{
    flex: 1.5;
    height: 400px;
    border: 1px solid #ebebeb;
    font-size: 12px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    text-align: left;
    color: #888888;
    padding: 30px;
    box-sizing: border-box;
  }
  .townsStreets-right{
    flex: 1;
    height: 400px;
    margin-left: 20px;
  }
 }
}

}
</style>
