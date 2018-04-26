import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/main/home'
import About from '@/components/main/about'

import SignUp from '@/components/member/signUp'
import SignIn from '@/components/member/signIn'
import PostView from '@/components/post/view'

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: "/about",
      name: 'About',
      component: About
    },
    {
      path: '/signUp',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/signIn',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/post/:id',
      name: 'PostView',
      component: PostView
    }
  ]
});
