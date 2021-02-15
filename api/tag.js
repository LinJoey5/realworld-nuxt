/*
 * @Author: your name
 * @Date: 2021-02-13 13:49:55
 * @LastEditTime: 2021-02-13 13:50:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \realworld-nuxtjs\api\tag.js
 */
import { request } from '@/plugins/request'

// 获取文章标签列表
export const getTags = () => {
  return request({
    method: 'GET',
    url: '/api/tags',
  })
}