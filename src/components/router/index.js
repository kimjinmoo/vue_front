import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/main/home'
import signUp from '@/components/member/signUp'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name : 'home',
      component: home
    },
    {
      path : '/signUp',
      name : 'signUp',
      component : signUp
    }
  ]
});
export default router
