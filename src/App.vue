<template>
  <div id="app">
    <b-navbar toggleable="md" type="light" variant="write" v-scroll="scrollHandler">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand to="/" >GrepIU</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse" right>
        <b-navbar-nav>
          <b-nav-item to="/about">About</b-nav-item>
          <b-nav-item v-if="isLogin" :to="menu.url" v-for="menu in menuLists"
                      v-bind:key="menu.id">{{menu.name}}
          </b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <template slot="button-content" v-b-popover.hover="'I am popover content!'" title="Popover Title">
              <span v-if="!isLogin">계정</span>
              <span v-else>{{u.email}}</span>
            </template>
            <b-nav-item v-if="!isLogin" to="/signIn">로그인</b-nav-item>
            <b-nav-item v-if="!isLogin">도움말</b-nav-item>
            <b-nav-item v-if="isLogin">계정수정</b-nav-item>
            <b-nav-item v-if="isLogin" v-on:click="signOut">로그아웃</b-nav-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <main role="main">
      <router-view></router-view>
    </main>
    <!-- Footer -->
    <homeFooter></homeFooter>
  </div>
</template>
<script>
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'
  import axios from 'axios'
  import firebase from 'firebase'
  import homeFooter from '@/components/main/footer'

  export default {
    name: 'app',
    components : {
      homeFooter
    },
    directives : {
      scroll : {
        inserted : function(el, binding) {
          let f = function(evt) {
            if(binding.value(evt, el)) {
              window.removeEventListener('scroll', f)
            }
          }
          window.addEventListener('scroll', f);
        }
      }
    },
    data : function() {
      return {
        u : {},
        isLogin : false,
        isMenuHide : false,
        menuLists: [],
        isLoading : false,
        label : '데이터를 읽고 있습니다.'
      }
    },
    watch : {
      // '$route' (to, from) {
      // }
    },
    methods: {
      scrollHandler : function() {
        if(window.scrollY > 80) {
          this.isMenuHide = true;
        } else {
          this.isMenuHide = false;
        }
        console.log(this.isMenuHide);
      },
      showLoading : function(is) {
        this.isLoading = is;
      },
      loginProc : function(user) {
        //this.show = false;
        if(user) {
          this.u = user;
          this.isLogin = true;
        } else {
          this.isLogin = false;
        }
      },
      signOut : function() {
        firebase.auth().signOut().then(()=>{
          this.isLogin = false;
        });
      }
    },
    beforeCreate : function() {
      // get Menu
      axios.get("/fake/headMenu.json")
      .then((response) => {
        this.menuLists = response.data.menuLists;
      })
      .catch(() => {
        // console.log("err");
      })
    },
    created : function() {
      // Firebase Auth
      firebase.auth().onAuthStateChanged(this.loginProc);
    }
  }
</script>
