/*
 * @Author: your name
 * @Date: 2021-02-09 16:18:46
 * @LastEditTime: 2021-02-10 13:14:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \realworld-nuxtjs\store\index.js
 */
const cookieParser = process.server ? require('cookieparser') : undefined

// 在服务端渲染期间运行的都是同一个实例
// 为了防止数据冲突, 务必要把 state 定义成函数, 返回数据对象
export const state = () => {
  return {
    user: null
  }
}

export const mutations = {
  setUser(state, data) {
    state.user = data
  }
}

export const actions = {
  // nuxt 中一个特殊的 action 方法
  // 该action 会在服务端渲染期间自动调用. 仅在服务端运行
  // 作用: 初始化容器数据, 传递数据给客户端使用
  nuxtServerInit({ commit }, { req }) {
    let user = null

    if (req.headers.cookie) {
      // 使用 cookieParser 把 cookie 字符串转换为 JS 对象
      const parsed = cookieParser.parse(req.headers.cookie)
      try {
        user = JSON.parse(parsed.user)
        
      } catch (err) {
        // No valid cookie found
        console.log(err)
      }
    }
    commit('setUser', user)
  }


}