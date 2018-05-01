import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import router from './components/router/index'
import {config} from './config/firebaseConfig'
import firebase from 'firebase'
import VueGeolocation from 'vue-browser-geolocation';
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(VueGeolocation);
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCdlJJ5RuA6jrq-VzexA-8ryqOJVqTJJ-Y',
    libraries: 'places,drawing,visualization'
  }
})
router.beforeEach((to,from,next) =>{
  // 권한 설정
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !currentUser) {
    next('/signIn');
  } else if (requiresAuth && currentUser) {
    next();
  } else {
    next();
  }
})
firebase.initializeApp(config);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
