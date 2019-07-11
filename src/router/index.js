import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import store from '@/store'
import iView from 'iview'
import {canTurnTo, setTitle} from '@/libs/util'
import config from '@/config'

Vue.use(Router)
const router = new Router({
  routes,
  mode: 'history'
})
const LOGIN_PAGE_NAME = 'login'

const turnTo = (to, access, next) => {
  if (canTurnTo(to.name, access, routes)) next() // 有权限，可访问
  else next({replace: true, name: 'home'}) // 无权限，重定向到401页面
}

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  const { homeName } = config;
  const isLogin = store.getters.hasGetInfo;
  if (!isLogin) {
    if (to.name !== LOGIN_PAGE_NAME) {
      // 可能是因为刷新的原因导致的数据vuex数据丢失
      store.dispatch('loadUserInfo').then(() => {
        turnTo(to, store.getters.access || [], next)
      }).catch(() => {
        next({ name: LOGIN_PAGE_NAME });
      })
    } else if (to.name === LOGIN_PAGE_NAME) {
      // 未登陆且目标页面是登录页
      next() // 跳转
    }
  } else {
    if (to.name === LOGIN_PAGE_NAME) {
      // 已登录且目标页面是登录页
      next({
        name: homeName // 跳转到homeName页
      })
    } else {
      // 已登录 进行前端权限认证
      turnTo(to, store.getters.access || [], next)
    }
  }
})

router.afterEach(to => {
  setTitle(to, router.app)
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router
