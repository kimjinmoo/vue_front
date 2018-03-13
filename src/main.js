import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import router from './components/router/index'

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(router);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
