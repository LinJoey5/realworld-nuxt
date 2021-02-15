/*
 * @Author: your name
 * @Date: 2021-02-13 15:13:02
 * @LastEditTime: 2021-02-13 15:23:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \realworld-nuxtjs\plugins\request.js
 */
import axios from 'axios'

// 创建请求对象
export const request = axios.create({
  baseURL: 'https://conduit.productionready.io'
})
// 通过插件机制获取到请求上下文对象 (query, params)
// 插件导出函数必须作为 default 成员
export default ({ store }) => {
  // 请求拦截
  // 任何请求都要经过请求拦截器
  // 我们可以在请求拦截器中做一些公共的业务处理, 例如统一设置token
  request.interceptors.request.use(function (config) {
    // Do something before request is sent
    const { user } = store.state
    if (user && user.token) {
      config.headers.Authorization = `Token ${store.state.user.token}`
    }

    // 返回请求配置对象
    return config;
  }, function (error) {
    // Do something with request error
    // 如果请求失败(此时请求还未发出)
    return Promise.reject(error);
  });
}