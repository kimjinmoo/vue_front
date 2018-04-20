<template>
  <div id="app">
    <b-navbar toggleable="md" type="light" variant="white" class="container">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand href="/">Hello World - IU</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse" right>
        <b-navbar-nav v-if="isLogin">
          <b-nav-item target="_blank" :href="menu.url" v-for="menu in menuLists"
                      v-bind:key="menu.id">{{menu.name}}
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
      <b-navbar-nav class="ml-auto">
        <b-nav-form v-if="!isLogin">
          <b-button to="/signIn">로그인</b-button>
        </b-nav-form>
        <b-nav-form v-else>
          <b-nav-item size="sm" class="my-2 my-sm-0" >{{u.email}}</b-nav-item>
          <b-button v-on:click="signOut">로그아웃</b-button>
        </b-nav-form>
      </b-navbar-nav>
    </b-navbar>
    <router-view></router-view>
    <!-- Footer -->
    <footer class="py-5">
      <div class="container">
        <p class="m-0 text-center text-dark">Copyright &copy; Since 2018</p>
      </div>
      <!-- /.container -->
    </footer>
  </div>
</template>
<!-- Custom styles for this template -->
<link href="assets/css/common.css" rel="stylesheet"/>
<!-- Custom scripts for this template -->
<script src="./assets/js/new-age.min.js"></script>
<script>
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'
  import axios from 'axios'
  import firebase from 'firebase'

  export default {
    name: 'app',
    data() {
      return {
        u : {},
        isLogin : false,
        menuLists: []
      }
    },
    methods: {
      loginProc(user) {
        console.log("--> "+JSON.stringify(user))
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
      .catch((err) => {
        console.log("err");
      })
      // Firebase Auth
      firebase.auth().onAuthStateChanged(this.loginProc);
    }
  }
</script>