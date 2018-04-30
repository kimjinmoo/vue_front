<template>
  <div class="container-fluid">
    <div class="container text-center">
      <form class="form-signin" data-ember-action="2">
        <h2 class="form-signin-heading">로그인</h2>
        <small class="text-muted">Login via</small>
        <br><br>
        <p>
          <a class="btn btn-primary social-login-btn social-google" href="javascript:void(0);" v-on:click="signInByGoogle"><i class="fa icon-social-google"></i></a>
          &nbsp;
          <a class="btn btn-primary social-login-btn social-facebook" href="javascript:void(0);" v-on:click="signInByFaceBook"><i class="fa icon-social-facebook"></i></a>
        </p>
        <small class="text-muted">또는 일반 로그인</small>
        <br><br>
        <input id="email"  v-model="form.email" class="ember-view ember-text-field form-control login-input" placeholder="이메일주소" type="text">
        <input id="password" v-model="form.password" class="ember-view ember-text-field form-control login-input-pass" placeholder="비밀번호" type="password">

        <button class="btn btn-lg btn-primary btn-block btn-center" v-on:click="signIn" data-bindattr-3="3">로그인</button>
        <br>
        <small class="create-account text-muted">회원가입을 하지 않으셨습니까 ?<b-button id="ember363" class="ember-view btn btn-sm btn-default" to="/signUp">일반회원가입</b-button></small>
      </form>
    </div>
  </div>
</template>
<script>
  import firebase from 'firebase';
  import loading from 'vue-full-loading'
  export default {
    name: 'signIn',
    components:{
      loading
    },
     data() {
      return {
        show: true,
        label: 'Loading...',
        form : {
          email : "",
          password : ""
        }
      }
     },
    methods : {
      successLogin() {
        firebase.auth().onAuthStateChanged((u)=>{
          if(u) this.$router.replace('/');
        });
      },
      signInByFaceBook() {
        this.$parent.showLoading(true);
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider).then(()=> {
          // var token = r.credential.accessToken;
          // var user = r.user;
          this.successLogin();
        }).catch(function(error) {
          var errorCode = error.code;
          // var errorMessage = error.message;
          // var email = error.email;
          // var credential = error.credential;
          if (errorCode === 'auth/account-exists-with-different-credential') {
            alert('You have already signed up with a different auth provider for that email.');
          } else {
            console.error(error);
          }
        }).then(()=>{this.$parent.showLoading(false);});
      },
      signInByGoogle() {
        this.$parent.showLoading(true);
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(()=> {
          // var token = r.credential.accessToken;
          // var user = r.user;
          this.successLogin();
        }).catch(function(error) {
          var errorCode = error.code;
          // var errorMessage = error.message;
          // var email = error.email;
          // var credential = error.credential;
          if (errorCode === 'auth/account-exists-with-different-credential') {
            alert('You have already signed up with a different auth provider for that email.');
          } else {
            console.error(error);
          }
        }).then(()=>{this.$parent.showLoading(false);});
      },
      signIn() {
        this.$parent.showLoading(true);
        firebase.auth().signInWithEmailAndPassword(this.form.email, this.form.password).then(
            () => {
              this.successLogin();
            }, (err) => {
              alert(err.message)
            }
        ).then(()=>{this.$parent.showLoading(false);});
      }
    }
  }
</script>