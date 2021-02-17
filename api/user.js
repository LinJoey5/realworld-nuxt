/*
 * @Author: your name
 * @Date: 2021-02-07 22:00:57
 * @LastEditTime: 2021-02-17 17:54:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \realworld-nuxtjs\api\user.js
 */
import { request } from '@/plugins/request'

// 用户登录
export const login = data => {
  return request({
    method: 'POST',
    url: '/api/users/login',
    data
  })
}

// 用户注册
export const register = data => {
  return request({
    method: 'POST',
    url: '/api/users',
    data
  })
}
// 更新用户信息
// PUT /api/user
export const updateUser = data => {
  return request({
    method: 'PUT',
    url: '/api/users',
    data
  })
}

// 获取当前用户信息
export const getProfile= username => {
  return request({
    method: 'GET',
    url: `/api/profiles/${username}`
  })
}

// 关注用户
// /api/profiles/:username/follow
export const followUser= username => {
  return request({
    method: 'POST',
    url: `/api/profiles/${username}/follow`
  })
}
// 取关用户
// /api/profiles/:username/follow
export const unFollowUser= username => {
  return request({
    method: 'DELETE',
    url: `/api/profiles/${username}/follow`
  })
}