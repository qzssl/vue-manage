import axios from 'axios'
import '../../../config/config'
import config from '../../../config/config';

//新增用户
export function userCount(today){
  const url = `${config.baseUrl}/statis/user/${today}/count`
  return axios.get(url).then((res)=>{
    return Promise.resolve(res.data)
  })
}
//获取用户数量
export function getUserCount(){
  const url = `${config.baseUrl}/v1/users/count`
  return axios.get(url).then((res)=>{
    return Promise.resolve(res.data)
  })
}
//获取用户列表
export function getUserList(offset,limit){
  const url = `${config.baseUrl}/v1/users/list?offset=${offset}&limit=${limit}`
  return axios.get(url).then((res)=>{
    return res.data
  })
}
//新增订单
export function orderCount(today){
  const url = `${config.baseUrl}/statis/order/${today}/count`
  return axios.get(url).then((res)=>{
    return Promise.resolve(res.data) 
  })
}
//获取订单数量
export function getOrderCount(){
  const url = `${config.baseUrl}/bos/orders/count`
  return axios.get(url).then((res)=>{
    return Promise.resolve(res.data) 
  })
}
//新增管理员
export function adminCount(today){
  const url = `${config.baseUrl}/statis/admin/${today}/count`
  return axios.get(url).then((res)=>{
    return Promise.resolve(res.data)
  })
}
//获取管理员
export function getAdminCount(){
  const url = `${config.baseUrl}/admin/count`
  return axios.get(url).then((res)=>{
    return Promise.resolve(res.data)
  })
}