import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import router from './components/router/index'
import {config} from './config/firebaseConfig'
import firebase from 'firebase'

Vue.config.productionTip = false;
Vue.use(BootstrapVue);

firebase.initializeApp(config);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
