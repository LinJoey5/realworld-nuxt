/*
 * @Author: your name
 * @Date: 2021-02-10 15:37:14
 * @LastEditTime: 2021-02-10 15:38:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \realworld-nuxtjs\middleware\authenticated.js
 */
// 验证是否登录的中间件
export default function ({ store, redirect }) {
  if(!store.state.user){
    return redirect('/login')
  }
}