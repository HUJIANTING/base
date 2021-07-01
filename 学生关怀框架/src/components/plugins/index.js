import Vue from 'vue'
import Notice from 'plugins/notice'
import confirm from 'plugins/confirm'
// let $echarts = require('./echarts.min')
// Vue.prototype.$echarts = $echarts
import echarts from 'echarts' // 引入echarts
Vue.prototype.$echarts = echarts
Vue.use(Notice)
Vue.use(confirm)
