<template>
  <main role="main" class="container" id="regForm">
    <div class="jumbotron">
      <div class="container">
        <h1 class="display-5">환영합니다.</h1>
        <div class="form-group">
          <label for="email">email :</label>
          <input type="text" class="form-control" id="email" placeholder="email을 입력하여 주십시오." ref="email">
        </div>
        <div class="form-group">
          <label for="password">비밀번호 : </label>
          <input type="password" class="form-control" id="password" placeholder="비밀번호를 입력하여 주십시오" ref="password">
        </div>
        <div class="form-group">
          <label for="password">비밀번호 확인: </label>
          <input type="password" class="form-control" id="password_re" placeholder="비밀번호를 다시 입력하여 주십시오." ref="re_password">
        </div>
        <div class="form-group">
          <button type="button" class="btn btn-success pull-right" v-on:click="onHome">뒤로가기</button>
          <button type="button" class="btn btn-success pull-right" v-on:click="onSignUp">가입완료</button>
        </div>
      </div>
    </div>
  </main>
</template>
<script src="https://www.gstatic.com/firebasejs/4.9.0/firebase.js"></script>
<script>
  export default {
    name: 'signUp',
    onSignUp() {

    }
  }
</script>