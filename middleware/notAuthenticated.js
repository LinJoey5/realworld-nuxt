/*
 * @Author: your name
 * @Date: 2021-02-10 15:56:22
 * @LastEditTime: 2021-02-10 15:56:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \realworld-nuxtjs\middleware\notAuthenticated.js
 */
export default function ({ store, redirect }) {
  if(store.state.user){
    return redirect('/')
  }
}