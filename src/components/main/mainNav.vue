<template>
  <nav class="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
    <div class="container">
      <a class="navbar-brand js-scroll-trigger" href="#page-top">{{title}}</a>
      <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
              data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false"
              aria-label="Toggle navigation">MENU
        <i class="fa fa-bars"></i>
      </button>
      <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav ml-auto">
          <form id="loginForm">
            <div id="login_btn_view" v-show="!isLogin">
              <button type="button" class="btn btn-outline-info my-2 my-sm-0" data-toggle="modal" data-target="#commonLoginPopup">로그인</button>
            </div>
            <div id="login_user_view" v-show="isLogin">
              <span id="login_text" class="align-middle text-white">{{userId}}</span>
              <button type="button" class="btn btn-outline-info my-2 my-sm-0" @click="logOut">로그아웃</button>
            </div>
          </form>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
  export default {
    name: 'mainNav',
    props: {
      msg: String,
      title: String
    }
  }
</script>
