import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import router from './components/router/index'
import icons from 'glyphicons'

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(icons);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
