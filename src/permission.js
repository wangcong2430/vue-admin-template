import router from './router'//导入路由配置文件
import store from './store'//导入仓库
import { Message } from 'element-ui'//导入ele中的提示框组件
import NProgress from 'nprogress' //进度条工具 progress bar
import 'nprogress/nprogress.css' //进度条相关的样式 progress bar style
import { getToken } from '@/utils/auth' //导入2个工具类 get token from cookie
import getPageTitle from '@/utils/get-page-title'
//初始化进度条
NProgress.configure({ showSpinner: false }) // NProgress Configuration
//路由的白名单
const whiteList = ['/login'] // no redirect whitelist
//全局的前置守卫，登录验证，除白名单外，其他页面只有登录才可访问
router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()//打开进度条

  // set page title
  document.title = getPageTitle(to.meta.title)//获取路由信息配置中的title赋值给页面的title

  // determine whether the user has logged in
  const hasToken = getToken()//获取token

  if (hasToken) {//根据token状态去判断
    if (to.path === '/login') {
      //用户已登录，访问的是登录页，跳到首页
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()//结束进度条
    } else {//已登录，访问的不是登录页，获取仓库中的name
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        next()//有name，直接跳到目标页
      } else {//无name，执行以下代码
        try {
          // get user info
          await store.dispatch('user/getInfo')//触发action中user/getInfo方法

          next()
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')//重置token
          Message.error(error || 'Has Error')
          //弹出错误信息
          next(`/login?redirect=${to.path}`)//跳到登录页
          NProgress.done()//结束进度条
        }
      }
    }
  } else {//无登录的条件判断
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // 目标路由能找到白名单中的信息in the free login whitelist, go directly
      next()//直接跳到目标路由
    } else {//否则跳到登录页
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
