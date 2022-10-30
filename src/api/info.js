import request from '@/utils/request'
export function getInfo(data) { //获取订单详情请求的方法
  return request({
    url: '/v1/order/detail',
    method: 'post',
    data
  })
}
export function del(data) { //删除订单详情请求的方法
  return request({
    url: '/v1/order/deldisk',
    method: 'post',
    data
  })
}
export function buy(data) { //买单请求的方法
  return request({
    url: '/v1/order/buy',
    method: 'post',
    data
  })
}
