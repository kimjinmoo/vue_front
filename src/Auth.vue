<template>
  <div id="loginForm">
    <b-navbar-nav class="ml-auto">
      <b-nav-form v-if="!isLogin">
        <b-nav-item size="sm" class="my-2 my-sm-0" to="/signIn">로그인</b-nav-item>
        <b-nav-item size="sm" class="my-2 my-sm-0" to="/signUp">회원가입</b-nav-item>
      </b-nav-form>
      <b-nav-form v-else>
        No
      </b-nav-form>
    </b-navbar-nav>
  </div>
</template>
<script>
  import firebase from 'firebase';

  let config = {
    apiKey: "AIzaSyA1JpLGZFHdoyFXv_vlG9eczpmvH_Lw2SU",
    authDomain: "formidable-rune-846.firebaseapp.com",
    databaseURL: "https://formidable-rune-846.firebaseio.com",
    projectId: "formidable-rune-846",
    storageBucket: "formidable-rune-846.appspot.com",
    messagingSenderId: "490240998468"
  };
  firebase.initializeApp(config);
  firebase.auth().onAuthStateChanged(function (user) {
    if(user){
      console.log(JSON.stringify(user));
    }
  });
  export default {
    name: 'auth',
    data() {
      return {
        isLogin : false
      }
    },
    methods: {
    }
  }
</script>