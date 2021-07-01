import axios from 'axios'
import { Message } from 'element-ui'
import router from '@/router/index'
import { getStore } from '../utils/store'
import store from '@/store'
// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api的base_url
  timeout: 100000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  // Do something before request is sent
  let token = getStore({ name: 'token' })
  if (token) {
    config.headers['Authorization'] = 'Bearer' + token // token
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  res => {
    if (res.code && res.code === 0) {
      Message({
        message: res.data.msg,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(res.data)
    }
    if (res.data && res.data.code === 0) {
      if (res.data.msg !== '' && res.data.msg !== null) {
        return res.data
      }
      Message({
        message: res.data.msg,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(res.data)
    }
    if (res.data.code === 401) {
      Message({
        message: res.data.message,
        type: 'error',
        duration: 5 * 1000
      })
      router.push({ path: '/login' })
    }
    return res.data
  },
  error => {
    Message.closeAll()
    if (error.response.status === 401) {
      Message({
        message: error.response.data.msg,
        type: 'error',
        duration: 5 * 1000
      })
      store.dispatch('LogOut').then(() => {
        router.push({ path: '/login' })
      })
      return Promise.reject(new Error(error))
    }
    Message({
      message: error.response.data.msg || '网络异常，请稍后再试',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(new Error(error))
  }
)

export default service
