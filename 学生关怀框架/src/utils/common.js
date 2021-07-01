export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function autohover(mychart, ind, time = 3000) { // echarts轮播
  var count = 0
  var timeTicket = null
  var dataLength = ind // 此处设置的是需要轮播的次数
  timeTicket && clearInterval(timeTicket)
  timeTicket = setInterval(function() {
    mychart.dispatchAction({
      type: 'downplay',
      seriesIndex: 0// serieIndex的索引值   可以触发多个
    })
    mychart.dispatchAction({
      type: 'highlight',
      seriesIndex: 0,
      dataIndex: (count) % dataLength
    })
    mychart.dispatchAction({
      type: 'showTip',
      seriesIndex: 0,
      dataIndex: (count) % dataLength
    })
    count++
  }, time)

  mychart.on('mouseover', function(params) {
    clearInterval(timeTicket)
    mychart.dispatchAction({
      type: 'downplay',
      seriesIndex: 0
    })
    mychart.dispatchAction({
      type: 'highlight',
      seriesIndex: 0,
      dataIndex: params.dataIndex
    })
    mychart.dispatchAction({
      type: 'showTip',
      seriesIndex: 0,
      dataIndex: params.dataIndex
    })
  })

  mychart.on('mouseout', function(params) {
    timeTicket && clearInterval(timeTicket)
    timeTicket = setInterval(function() {
      mychart.dispatchAction({
        type: 'downplay',
        seriesIndex: 0
      })
      mychart.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: (count) % dataLength
      })
      mychart.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex: (count) % dataLength
      })
      count++
    }, time)
  })
}

// 设置 rem 函数
export function setRem() {
  //  PC端
  // 基准大小
  let baseSize = 16
  let basePc = baseSize / 1920 // 表示1920的设计图,使用100PX的默认值
  let vW = window.innerWidth // 当前窗口的宽度
  let vH = window.innerHeight // 当前窗口的高度
  // 非正常屏幕下的尺寸换算
  let dueH = vW * 1080 / 1920
  if (vH < dueH) { // 当前屏幕高度小于应有的屏幕高度，就需要根据当前屏幕高度重新计算屏幕宽度
    vW = vH * 1920 / 1080
  }
  let rem = vW * basePc // 以默认比例值乘以当前窗口宽度,得到该宽度下的相应font-size值
  document.documentElement.style.fontSize = rem + 'px'
  return rem
}

// 转换成标准时间
export function getFormatDate(date = new Date()) {
  var year = date.getFullYear()
  var month = 	date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  var day = 	date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  var hours = 	date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  var minutes = 	date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  var seconds = 	date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  let time = 	year + 	'-' + 	month + 	'-' + 	day + 	' ' + 	hours + 	':' + 	minutes + ':' + seconds
  return time
}
