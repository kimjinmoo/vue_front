import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/main/home'
import signUp from '@/components/member/signUp'
import signIn from '@/components/member/signIn'

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
    },
    {
      path : '/signIn',
      name : 'signIn',
      component : signIn
    }
  ]
});
export default router
