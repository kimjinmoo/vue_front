import 'babel-polyfill'
import 'core-js/es6/symbol';
import 'core-js/es6/object';
import 'core-js/es6/function';
import 'core-js/es6/parse-int';
import 'core-js/es6/parse-float';
import 'core-js/es6/number';
import 'core-js/es6/math';
import 'core-js/es6/string';
import 'core-js/es6/date';
import 'core-js/es6/array';
import 'core-js/es6/regexp';
import 'core-js/es6/map';
import 'core-js/es6/set';
import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import router from './components/router/index'
import {config} from './config/firebaseConfig'
import firebase from 'firebase'
import VueGeolocation from 'vue-browser-geolocation';
import * as VueGoogleMaps from 'vue2-google-maps'
import VueCarousel from 'vue-carousel';

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(VueCarousel);
Vue.use(VueGeolocation);
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCdlJJ5RuA6jrq-VzexA-8ryqOJVqTJJ-Y',
    libraries: 'places,drawing,visualization'
  }
});
firebase.initializeApp(config);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
