import request from '@/utils/request'
export function getList() {//菜品分类列表请求的方法
    return request({    
      url: '/v1/serie/list',
      method: 'post',   
    })
  }
  export function add(data) {//菜品分类增加请求的方法
    return request({    
      url: '/v1/serie/add',
      method: 'post',   
      data
    })
  }
  export function del(data) {//删除菜品分类请求的方法
    return request({    
      url: '/v1/serie/del',
      method: 'post', 
      data  
    })
  }
  export function updata(data) {//修改菜品分类请求的方法
    return request({    
      url: '/v1/serie/update',
      method: 'post', 
      data  
    })
  }