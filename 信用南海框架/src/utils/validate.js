import * as CryptoJS from 'crypto-js'
/**
 * 邮箱
 * @param {*} s
 */
export function isEmail(s) {
  return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
}

/**
 * 手机号码
 * @param {*} s
 */
export function isMobile(s) {
  return /^1[0-9]{10}$/.test(s)
}
/**
 * 正数、保留两位小数
 * @param {*} s
 */
export function isTangle(s) {
  return /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/.test(Number(s))
}

/**
 * 电话号码
 * @param {*} s
 */
export function isPhone(s) {
  return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s)
}

/**
 * URL地址
 * @param {*} s
 */
export function isURL(s) {
  return /^http[s]?:\/\/.*/.test(s)
}
export function isLink(s) {
  return /^((https|http){0,1}(:\/\/){0,1})www\.(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/.test(s)
}

export function isvalidUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/* 合法uri */
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母 */
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母 */
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母 */
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/* 验证pad还是pc */
export const vaildatePc = function() {
  const userAgentInfo = navigator.userAgent
  const Agents = ['Android', 'iPhone',
    'SymbianOS', 'Windows Phone',
    'iPad', 'iPod'
  ]
  let flag = true
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false
      break
    }
  }
  return flag
}

/**
 * validate email
 * @param email
 * @returns {boolean}
 */
export function validateEmail(email) {
  const re = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

/**
 * validate email
 * @param email
 * @returns {boolean}
 */
export function validEmail(rule, value, callback) {
  if (typeof value === 'undefined' || value === null || value === '') {
    callback(new Error('电子邮箱不能为空!'))
  } else if (!validateEmail(value)) {
    callback(new Error('电子邮箱格式不正确'))
  } else {
    callback()
  }
}

/**
 * validate phone
 * @param phone
 * @returns {boolean}
 */
export function validPhone(rule, value, callback) {
  const reg = /^1[3456789]\d{9}$/
  if (typeof value === 'undefined' || value === null || value === '') {
    callback(new Error('手机号码不能为空!'))
  } else if (!reg.test(value)) {
    callback(new Error('手机号码格式不正确!'))
  } else {
    callback()
  }
}

/**
 * 身份证校验
 * @param ID
 * @returns {boolean}
 */
export function id18(ID) {
  const city = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江 ',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北 ',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏 ',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外'
  }
  const birthday = ID.substr(6, 4) + '/' + Number(ID.substr(10, 2)) + '/' + Number(ID.substr(12, 2))
  const d = new Date(birthday)
  const newBirthday = d.getFullYear() + '/' + Number(d.getMonth() + 1) + '/' + Number(d.getDate())
  const currentTime = new Date().getTime()
  const time = d.getTime()
  const arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
  const arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
  let sum = 0
  if (!/^\d{17}(\d|x)$/i.test(ID)) return false // '非法身份证';
  if (city[ID.substr(0, 2)] === undefined) return false // "非法地区";
  if (time >= currentTime || birthday !== newBirthday) return false // '非法生日';
  for (let i = 0; i < 17; i++) {
    sum += ID.substr(i, 1) * arrInt[i]
  }
  let residue = arrCh[sum % 11]
  if (residue !== ID.substr(17, 1)) return false // '非法身份证哦';
  return true
}

/**
 * 判断手机号码是否正确
 */
export function isvalidatemobile(phone) {
  const list = []
  let result = true
  let msg = ''
  var isPhone = /^0\d{2,3}-?\d{7,8}$/
  // 增加134 减少|1349[0-9]{7}，增加181,增加145，增加17[678]
  if (!validataNull(phone)) {
    if (phone.length === 11) {
      if (isPhone.test(phone)) {
        msg = '手机号码格式不正确'
      } else {
        result = false
      }
    } else {
      msg = '手机号码长度不为11位'
    }
  } else {
    msg = '手机号码不能为空'
  }
  list.push(result)
  list.push(msg)
  return list
}

/**
 * 判断姓名是否正确
 */
export function validatename(name) {
  var regName = /^[\u4e00-\u9fa5]{2,4}$/
  if (!regName.test(name)) return false
  return true
}

/**
 * 判断是否为整数
 */
export function validatenum(num, type) {
  let regName = /[^\d.]/g
  if (type === 1) {
    if (!regName.test(num)) return false
  } else if (type === 2) {
    regName = /[^\d]/g
    if (!regName.test(num)) return false
  }
  return true
}

/**
 * 判断是否为小数
 */
export function validatenumord(num, type) {
  let regName = /[^\d.]/g
  if (type === 1) {
    if (!regName.test(num)) return false
  } else if (type === 2) {
    regName = /[^\d.]/g
    if (!regName.test(num)) return false
  }
  return true
}

/**
 * 判断是否为空
 */
export function validataNull(val) {
  if (typeof val === 'boolean') {
    return false
  }
  if (typeof val === 'number') {
    return false
  }
  if (val instanceof Array) {
    if (val.length === 0) return true
  } else if (val instanceof Object) {
    if (JSON.stringify(val) === '{}') return true
  } else {
    if (val === 'null' || val == null || val === 'undefined' || val === undefined || val === '') return true
    return false
  }
  return false
}

/**
 * 生成随机len位数字
 */
export const randomLenNum = (len, date) => {
  let random = ''
  random = Math.ceil(Math.random() * 100000000000000).toString().substr(0, len || 4)
  if (date) random = random + Date.now()
  return random
}

/**
 *登录处理加密
 */
export function encryption(value, key, iv) {
  var lableWorld = CryptoJS.enc.Utf8.parse(value)
  var publiceKey = CryptoJS.enc.Latin1.parse(key)
  var lableIv = CryptoJS.enc.Latin1.parse(iv)
  let encryWorld = CryptoJS.AES.encrypt(lableWorld, publiceKey, {
    iv: lableIv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding
  })
  return encryWorld.toString()
}

/**
 *登录处理解密
 */
export function decrypt(value, key, iv) {
  var publiceKey = CryptoJS.enc.Latin1.parse(key)
  var lableIv = CryptoJS.enc.Latin1.parse(iv)
  let decryptWorld = CryptoJS.AES.decrypt(value, publiceKey, {
    iv: lableIv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding
  })
  return CryptoJS.enc.Utf8.stringify(decryptWorld).toString()
}

/**
 * 统一社会信用代码验证
 * @param value
 * @returns {*}
 */
export function societyCode(value) {
  var reg = /^[0-9A-Z]{18}$/
  if (!reg.test(value)) {
    return false
  }
  return true
}

/**
 * 护照号
 * @param value
 * @returns {*}
 */
export function isPassport(value) {
  var reg = /^([A-Z]\d{6,10}(\(\w{1}\))?)$/
  if (!reg.test(value)) {
    return false
  }
  return true
}
/**
 * 港澳居民来往内地通行证
 * @param value
 * @returns {*}
 */
export function certificateType03(value) {
  var reg = /^([A-Z]\d{6,10}(\(\w{1}\))?)$/
  if (!reg.test(value)) {
    return false
  }
  return true
}
/**
 * 台湾居民来往内地通行证
 * @param value
 * @returns {*}
 */
export function certificateType04(value) {
  var reg = /^\d{8}|^[a-zA-Z0-9]{10}|^\d{18}$/
  if (!reg.test(value)) {
    return false
  }
  return true
}

/**
 * 外国人永久居留身份证
 * @param value
 * @returns {*}
 */
export function certificateType05(value) {
  var reg = /^[A-Z]{3}\d{6}(?:0[1-9]|1[021])(?:0[1-9]|[21]\d|3[10])\d{2}$/
  if (!reg.test(value)) {
    return false
  }
  return true
}
/**
 * 证件号码校验
 * @param value
 * @returns {*}
 */
export function valiCradType(value, callback, cradType, jumpNull = false) {
  if (jumpNull) {
    callback()
    return
  }

  if (typeof cradType === 'undefined' || cradType === null || cradType === '') {
    callback(new Error('请选择证件类型!'))
  } else if (typeof value === 'undefined' || value === null || value === '') {
    callback(new Error('证件号码不能为空!'))
  } else if (cradType === '0' && !id18(value)) {
    callback(new Error('身份证号码格式错误！'))
  } else if (cradType === '1' && !isPassport(value)) {
    callback(new Error('护照证件号码格式错误!'))
  } else if (cradType === '2' && !certificateType03(value)) {
    callback(new Error('港澳居民来往内地通行证格式错误!'))
  } else if (cradType === '3' && !certificateType04(value)) {
    callback(new Error('台湾居民来往内地通行证格式错误!'))
  } else if (cradType === '4' && !certificateType05(value)) {
    callback(new Error('外国人永久居留身份证格式错误!'))
  } else {
    callback()
  }
}
/**
 * 证件号码校验
 * @param value
 * @returns {*}
 */
export function IsvaliCradType(value, callback, cradType, jumpNull = false) {
  if (jumpNull) {
    callback()
    return
  }

  if (typeof cradType === 'undefined' || cradType === null || cradType === '') {
    callback(new Error('请选择证件类型!'))
  } else if (typeof value === 'undefined' || value === null || value === '') {
    callback(new Error('证件号码不能为空!'))
  } else if (cradType === '111' && !id18(value)) {
    callback(new Error('身份证号码格式错误！'))
  } else if (cradType === '414' && !isPassport(value)) {
    callback(new Error('护照证件号码格式错误!'))
  } else if (cradType === '513' && !certificateType03(value)) {
    callback(new Error('港澳居民来往内地通行证格式错误!'))
  } else if (cradType === '511' && !certificateType04(value)) {
    callback(new Error('台湾居民来往内地通行证格式错误!'))
  } else if (cradType === '553' && !certificateType05(value)) {
    callback(new Error('外国人永久居留身份证格式错误!'))
  } else {
    callback()
  }
}

/**
 * 统一社会信用代码校验
 * @param value
 * @returns {*}
 */
export function societyCreditCode(rule, value, callback) {
  if (typeof value === 'undefined' || value === null || value === '') {
    callback(new Error('统一社会信用代码不能为空!'))
  } else if (!societyCode(value)) {
    callback(new Error('统一社会信用代码由18位大写字母 、数字组成'))
  } else {
    callback()
  }
}
