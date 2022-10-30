import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    shopname:''
  
  }
}

const state = getDefaultState()//定义储存用户数据的变量

const mutations = {//定义修改仓库数据的方法
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_SHOPNAME:(state, name) => {
    state.shopname = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {//实施修改仓库的数据的方法
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo//解构拿到的用户名和密码信息
    //返回一个promise对象
    return new Promise((resolve, reject) => {
      //此处的login方法是调用api中的login方法，用来携带参数发送请求获取数据的,参数中trim（）用户名去掉空格
      login({ account: username.trim(), pw: password }).then(response => {
        console.log(response)
        const { data } = response//解构拿到data
        commit('SET_TOKEN', data.token)//调用本页面中mutations的SET_TOKEN,来保存返回回来的token值,放入仓库中
        setToken(data.token)//调用'@/utils/auth'中setToken()方法保存数据在cookie中
        resolve()//返回成功的状态
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      //state.token
      getInfo().then(response => {//获取用户信息的请求方法，调用api中的请求方法
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        console.log(data)
        //const { name, avatar } = data
        const { account,shopname} = data//解构出account和shopname的值

        commit('SET_NAME', account)//修改用户名字
        commit('SET_SHOPNAME', shopname)//修改logo提示
        //commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  /*logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },*/
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {     
        removeToken() //点击退出，移除token must remove  token  first
        resetRouter()//重置路由
        commit('RESET_STATE')
        resolve()//退出后成功的状态
      })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

