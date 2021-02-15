/*
 * @Author: your name
 * @Date: 2021-02-07 21:26:14
 * @LastEditTime: 2021-02-13 15:15:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \realworld-nuxtjs\utils\request.js
 */
import axios from 'axios'

const request = axios.create({
  baseURL: 'https://conduit.productionready.io'
})

// // 请求拦截
// // 任何请求都要经过请求拦截器
// // 我们可以在请求拦截器中做一些公共的业务处理, 例如统一设置token
// request.interceptors.request.use(function (config) {
//   // Do something before request is sent
//   console.log('interceptors')
//   config.headers.Authorization = 'Token '
//   // 返回请求配置对象
//   return config;
// }, function (error) {
//   // Do something with request error
//   // 如果请求失败(此时请求还未发出)
//   return Promise.reject(error);
// });
// 响应拦截

export default request