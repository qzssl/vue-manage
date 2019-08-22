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

//种类列表
export function  foodCategory(){
  const url = `${config.baseUrl}/shopping/v2/restaurant/category`
  return axios.get(url).then(res=>{
    return Promise.resolve(res.data)
  })
}

//店铺列表
export function getShopList(latitude,longitude,offset,limit){
  const url = `${config.baseUrl}/shopping/restaurants?latitude=${latitude}&longitude=${longitude}&offset=${offset}&limit=${limit}`
  return axios.get(url).then(res=>{
    return Promise.resolve(res.data)
  })
}

//获取店铺数量
export const shopCount = () => {
  const url = `${config.baseUrl}/shopping/restaurants/count`
  return axios.get(url).then(res=>{
    return Promise.resolve(res.data)
  })
}

//更新店铺信息
export const updateShop = (data) => {
  const url = `${config.baseUrl}/shopping/updateshop`
  return axios.post(url,{
    data
  }).then(res=>{
    return Promise.resolve(res.data)
  })
}

//删除店铺
export const deleteShop = (id) => {
  const url = `${config.baseUrl}/shopping/restaurant/${id}`
  return axios.delete(url).then(res=>{
    return Promise.resolve(res.data)
  })
}

//获取定位城市
export const cityGuess = () => {
  const url = `${config.baseUrl}/v1/cities?type=guess`
  return axios.get(url).then(res=>{
    return Promise.resolve(res.data)
  })
}

//获取搜索地址

export function searchplace(cityid,value){
  const url = `${config.baseUrl}/v1/pois?type=search&city_id=${cityid}&keyword=${value}`
  return axios.get(url).then(res=>{
    return Promise.resolve(res.data)
  })
}