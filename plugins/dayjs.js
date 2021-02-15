/*
 * @Author: your name
 * @Date: 2021-02-13 15:28:34
 * @LastEditTime: 2021-02-13 15:33:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \realworld-nuxtjs\plugins\dayjs.js
 */
import Vue from 'vue'
import dayjs from 'dayjs'


// {{ 表达式 | 过滤器}}
Vue.filter('date', (value, format = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(value).format(format)
})