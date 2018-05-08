<template>
  <div id="app">
    <loading
        :show="isLoading"
        :label="label">
    </loading>
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
            <template slot="button-content">
              <span v-if="!isLogin">계정관리</span>
              <span v-else>{{u.email}}</span>
            </template>
            <b-nav-item v-if="!isLogin" to="/signIn">로그인</b-nav-item>
            <b-nav-item v-if="!isLogin">도움말</b-nav-item>
            <b-nav-item v-if="isLogin">계정관리</b-nav-item>
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
  import loading from 'vue-full-loading'
  import axios from 'axios'
  import firebase from 'firebase'
  import homeFooter from '@/components/main/footer'

  export default {
    name: 'app',
    components : {
      loading,
      homeFooter
    },
    directives : {
      scroll : {
        inserted : function(el, binding) {
          console.log("el : " + el);
          console.log("binding : " + binding);
          let f = function(evt) {
            if(binding.value(evt, el)) {
              window.removeEventListener('scroll', f)
            }
          }
          window.addEventListener('scroll', f);
        }
      }
    },
    data() {
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
      '$route' (to, from) {
        console.log(">>>>>>>>>>>" +to+from);
      }
    },
    methods: {
      scrollHandler() {
        if(window.scrollY > 80) {
          this.isMenuHide = true;
        } else {
          this.isMenuHide = false;
        }
        console.log(this.isMenuHide);
      },
      showLoading(is) {
        this.isLoading = is;
      },
      loginProc(user) {
        //loding end
        this.show = false;
        if(user) {
          this.u = user;
          this.isLogin = true;
        } else {
          this.isLogin = false;
        }
      },
      signOut() {
        firebase.auth().signOut().then(()=>{
          this.isLogin = false;
        });

      }
    },
    created() {
      // get Menu
      axios.get("/fake/headMenu.json")
      .then((response) => {
        this.menuLists = response.data.menuLists;
      })
      .catch(() => {
        // console.log("err");
      })
      // Firebase Auth
      firebase.auth().onAuthStateChanged(this.loginProc);
    }
  }
</script>
