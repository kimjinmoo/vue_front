import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/main/home'
import About from '@/components/main/about'

import SignUp from '@/components/member/signUp'
import SignIn from '@/components/member/signIn'

import Post from "@/components/post/post"
import PostView from '@/components/post/view'

import MyAccount from "@/components/member/myAccount"

import Lab from "@/components/lap/lab"
import Movie from '@/components/lap/movie'
import firebase from "firebase/index";

Vue.use(VueRouter)

const router = Vue.router = new VueRouter({
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
      path: '/post',
      name: 'Post',
      component: Post
    },
    {
      path: '/post/:id',
      name: 'PostView',
      component: PostView
    },
    {
      path: '/lab',
      name : 'Lab',
      component: Lab,
      meta: {
        requiresAuth: false
      }
    },
    {
      path : "/lab/movie",
      name: "Movie",
      component: Movie,
      meta: {
        requiresAuth: false
      }
    },
    {
      path : "/member/account",
      name : "MyAccount",
      component : MyAccount,
      meta : {
        requiresAuth : true
      }
    }
  ]
});
router.beforeEach((to,from,next) =>{
  // 권한 설정
  firebase.auth().onAuthStateChanged(()=>{
    const currentUser = firebase.auth().currentUser;
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    if (requiresAuth && !currentUser) {
      next('/signIn');
    } else if (requiresAuth && currentUser) {
      next();
    } else {
      next();
    }
  })
});
export default router