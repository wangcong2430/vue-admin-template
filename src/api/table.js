import request from '@/utils/request'

/*export function getList(params) {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}*/
export function getList() {//台桌列表请求的方法
  return request({    
    url: '/v1/table/list',
    method: 'post',   
  })
}
export function del(data) {//删除台桌请求的方法
  return request({    
    url: '/v1/table/del',
    method: 'post', 
    data  
  })
}
export function updata(data) {//修改台桌请求的方法
  return request({    
    url: '/v1/table/update',
    method: 'post', 
    data  
  })
}
export function add(data) {//增加台桌请求的方法
  return request({    
    url: '/v1/table/add',
    method: 'post', 
    data  
  })
}
