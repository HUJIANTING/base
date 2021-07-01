import { loginByToken, getUserInfo, getMenu, logout } from 'api/login'
import { encryption } from '@/utils/validate'
import { setStore, removeStore } from '@/utils/store'
import { Message } from 'element-ui'
const user = {
  state: {
    userInfo: {},
    menus: [] // 菜单权限
  },

  mutations: {
    SET_USER_INFO(state, payload) {
      state.userInfo = payload
    },
    SET_MENU(state, payload) {
      state.menus = payload
    }
  },

  actions: {
    // 获取用户登录token
    loginByToken({ commit }, userInfo) {
      const loginInfo = Object.assign({}, userInfo)
      loginInfo.password = encryption(loginInfo.password, 'thanks,pig4cloud', 'thanks,pig4cloud')
      return new Promise((resolve, reject) => {
        loginByToken(loginInfo).then(response => {
          setStore({ name: 'token', content: response.access_token, type: 'session' })
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户信息
    GetUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo().then((res) => {
          commit('SET_USER_INFO', res.data)
          // 获取菜单列表
          getMenu('-1').then((res) => {
            if (res.data.length !== 0) {
              commit('SET_MENU', res.data)
              resolve(res.data)
            } else {
              Message({
                message: '账户类型错误',
                type: 'error'
              })
              removeStore({ name: 'token', type: 'session' })
              reject()
            }
          })
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 登出
    LogOut({ commit }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit('SET_MENU', [])
          commit('SET_USER_INFO', {})
          removeStore({ name: 'token', type: 'session' })
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 清除session
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_MENU', [])
        commit('SET_USER_INFO', {})
        removeStore({ name: 'token', type: 'session' })
        resolve()
      })
    }
  }
}

export default user
