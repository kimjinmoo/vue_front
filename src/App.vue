<template>
  <div id="app">
    <b-navbar toggleable="md" type="light" variant="white" class="container">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-navbar-brand href="/">Hello World - IU</b-navbar-brand>
        <b-collapse is-nav id="nav_collapse" right>
          <b-navbar-nav>
            <b-nav-item target="_blank" :href="menu.url" v-for="menu in menuLists" v-bind:key="menu.id">{{menu.name}}</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
        <auth></auth>
    </b-navbar>
    <router-view></router-view>
    <footer>
      <div class="container">
        <ul class="list-inline">
          <li class="list-inline-item">
            Since 2018 IU
          </li>
        </ul>
      </div>
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
import home from './components/main/home'
import auth from './Auth'
import axios from 'axios'

export default {
  name: 'app',
  components : {
    home, auth
  },
  data() {
    return {
      menuLists : []
    }
  },
  created() {
    axios.get("/fake/headMenu.json")
    .then((response) => {
      this.menuLists = response.data.menuLists;
    })
    .catch((err)=>{
      console.log("err");
    })
  },
  methods : {

  }
}
</script>