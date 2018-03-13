<template>
  <div id="app">
    <mainNav title="Hello World - IU" msg="menu"/>
    <headMenu/>
  </div>
</template>
<!-- Custom styles for this template -->
<link href="assets/css/common.css" rel="stylesheet"/>
<!-- Custom scripts for this template -->
<script src="./assets/js/new-age.min.js"></script>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import mainNav from './components/main/mainNav.vue'
import headMenu from './components/main/headMenu.vue'

export default {
  name: 'app',
  components : {
    mainNav,
    headMenu
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
