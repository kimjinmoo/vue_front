import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/main/home'
import SignUp from '@/components/member/signUp'
import SignIn from '@/components/member/signIn'

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name : 'Home',
      component: Home
    },
    {
      path : '/signUp',
      name : 'SignUp',
      component : SignUp
    },
    {
      path : '/signIn',
      name : 'SignIn',
      component : SignIn
    }
  ]
});
