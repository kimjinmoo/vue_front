<template>
  <div class="container">
    <loading
        :show="show"
        :label="label">
    </loading>
    <b-form>
      <b-form-group id="emailGroup"
                    label="ID :"
                    label-for="email">
        <b-form-input id="email"
                      type="email"
                      v-model="form.email"
                      required
                      placeholder="ID를 입력하세요.">
        </b-form-input>
      </b-form-group>
      <b-form-group id="passwdGroup"
                    label="비밀번호 :"
                    label-for="passwd">
        <b-form-input id="passwd"
                      type="password"
                      v-model="form.password"
                      required
                      placeholder="비밀번호를 입력해주세요">
        </b-form-input>
      </b-form-group>
      <div style="text-align: right">
        <b-button-group >
          <b-button variant="primary" v-on:click="signIn">로그인</b-button>
          <b-button variant="primary" to="/signUp">회원가입</b-button>
        </b-button-group>
      </div>
    </b-form>
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
      signIn() {
        firebase.auth().signInWithEmailAndPassword(this.form.email, this.form.password).then(
            () => {
              this.$router.replace('/');
            }, (err) => {
              alert(err.message)
            }
        )
      }
    }
  }
</script>