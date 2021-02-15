import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _3264deda = () => interopDefault(import('..\\pages\\layout' /* webpackChunkName: "" */))
const _3c40048f = () => interopDefault(import('..\\pages\\home' /* webpackChunkName: "" */))
const _4bf8d5b9 = () => interopDefault(import('..\\pages\\login' /* webpackChunkName: "" */))
const _0a411bf9 = () => interopDefault(import('..\\pages\\profile' /* webpackChunkName: "" */))
const _61bb185a = () => interopDefault(import('..\\pages\\settings' /* webpackChunkName: "" */))
const _2696051d = () => interopDefault(import('..\\pages\\editor' /* webpackChunkName: "" */))
const _1de94174 = () => interopDefault(import('..\\pages\\article' /* webpackChunkName: "" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _3264deda,
    children: [{
      path: "",
      component: _3c40048f,
      name: "home"
    }, {
      path: "/login",
      component: _4bf8d5b9,
      name: "login"
    }, {
      path: "/register",
      component: _4bf8d5b9,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _0a411bf9,
      name: "profile"
    }, {
      path: "/settings",
      component: _61bb185a,
      name: "settings"
    }, {
      path: "/editor",
      component: _2696051d,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _1de94174,
      name: "articleIndex"
    }]
  }],

  fallback: false
}

function decodeObj(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = decode(obj[key])
    }
  }
}

export function createRouter () {
  const router = new Router(routerOptions)

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    const r = resolve(to, current, append)
    if (r && r.resolved && r.resolved.query) {
      decodeObj(r.resolved.query)
    }
    return r
  }

  return router
}
