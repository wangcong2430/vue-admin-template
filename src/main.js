import Vue from 'vue'//导入vue类库

import 'normalize.css/normalize.css' // 导入样式初始化文件A modern alternative to CSS resets

import ElementUI from 'element-ui'//导入elementUI组件
import 'element-ui/lib/theme-chalk/index.css'//导入elementUI组件样式
import locale from 'element-ui/lib/locale/lang/en' // 导入语言包lang i18n

import '@/styles/index.scss' // 全局的css样式global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // 导入一个图标组件icon
import '@/permission' // 路由守卫管理permission control


//额外下载使用，先下npm i default-passive-events -S，再导入模块
import 'default-passive-events'//调用preventDefault函数来阻止事件的默认行为，以便浏览器根据这个信息更好地做出决策来优化页面性能

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {//mock数据
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })//使用elementUI插件
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

/* //xuhaixin x00378462对所有人说： 06:57 PM
无重复字符的最长子串
给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。
示例 1:
输入: s = "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
示例 2:

输入: s = "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
示例 3:

输入: s = "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串
 */