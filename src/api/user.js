import request from '@/utils/request'

export function login(data) {//登录账户请求的方法
  return request({
    //url: '/vue-admin-template/user/login',
    url: '/v1/user/login',
    method: 'post',
    data:data
  })
}

export function apply(data) {//申请注册账户请求的方法
  return request({
    //url: '/vue-admin-template/user/login',
    url: '/v1/user/apply',
    method: 'post',
    data
  })
}
export function code(data) {//获取验证码请求的方法
  return request({
    //url: '/vue-admin-template/user/login',
    url: '/v1/code',
    method: 'post',
    data
  })
}

export function getInfo(data) {
  return request({
    //url: '/vue-admin-template/user/info',
    url: '/v1/user/status',    
    //method: 'get',
    method: 'post',
    //params: { token }
  })
}

export function set(data) {//系统设置请求的方法
  return request({
    //url: '/vue-admin-template/user/login',
    url: '/v1/user/setting',
    method: 'post',
    data
  })
}

/*export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}*/



