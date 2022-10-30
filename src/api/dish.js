import request from '@/utils/request'
export function getList() {//菜品列表请求的方法
    return request({    
      url: '/v1/dish/list',
      method: 'post',   
    })
  }
  export function add(data) {//添加菜品请求的方法
    return request({    
      url: '/v1/dish/add',
      method: 'post',
      data   
    })
  }
  export function updata(data) {//修改菜品请求的方法
    return request({    
      url: '/v1/dish/update',
      method: 'post',
      data   
    })
  }
  export function del(data) {//删除菜品请求的方法
    return request({    
      url: '/v1/dish/del',
      method: 'post',
      data   
    })
  }