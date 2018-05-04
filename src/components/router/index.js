import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/main/home'
import About from '@/components/main/about'

import SignUp from '@/components/member/signUp'
import SignIn from '@/components/member/signIn'

import Post from "@/components/post/post"
import PostView from '@/components/post/view'

import Lab from "@/components/lap/lab"
import Movie from '@/components/lap/movie'

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
        requiresAuth: true
      }
    },
    {
      path : "/lab/movie",
      name: "Movie",
      component: Movie,
      meta: {
        requiresAuth: true
      }
    }
  ]
});
