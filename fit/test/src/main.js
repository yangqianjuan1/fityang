
import Vue from 'vue'
//import App from './App'
import router from './router'
import store from './store/'
import axios from "axios";
import error from './components/getError'
import VueLazyload from 'vue-lazyload'
import VueClipboard from 'vue-clipboard2'
import tips from './components/tips/tips'
import noBalance from './components/noBalance/noBalance.js'
import comFire from './components/comFire.js'
/*import spine from './components/spine/spine.js'
import huntingSpine from './components/spine/huntingSpine.js'*/
import './components/tips/tips.css'
import Vuex from 'vuex'

Vue.use(VueClipboard);
Vue.use(tips);
Vue.use(noBalance);
Vue.use(comFire);
/*Vue.use(spine);
Vue.use(huntingSpine);*/
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.use(error);

Vue.use(VueLazyload,{
  error:require('./assets/img/dialog/lazy-loading.png'),
  loading:require('./assets/img/dialog/lazy-loading.png'),
  silent:true,
});

// 修改API时需要同时修改components/common.js 的svg api
// Vue.prototype.$axios.defaults.baseURL = 'http://192.168.2.214:8888';//api
// Vue.prototype.$axios.defaults.baseURL = 'http://192.168.2.28:9100';//api/
// Vue.prototype.$axios.defaults.baseURL = 'http://192.168.2.172';//api/
// Vue.prototype.$axios.defaults.baseURL = 'http://192.168.2.188:19999';//api/
// Vue.prototype.$axios.defaults.baseURL = 'http://testwanlima.zhongliangji.com';//api
// Vue.prototype.$axios.defaults.baseURL = 'https://59.111.89.37';//api
Vue.prototype.$axios.defaults.baseURL = '';//api/
Vue.prototype.$axios.defaults.timeout = 10000;//ajax超时
Vue.prototype.$axios.interceptors.request.use(config => {    // 这里的config包含每次请求的内容
  // 判断localStorage中是否存在api_token
  // if (localStorage.getItem('accesstoken')) {
    //  存在将api_token写入 request header
    config.headers.localStorageAccesstoken = `${localStorage.getItem('accesstoken')}`;
    // config.headers.sessionAccesstoken = `${sessionStorage.getItem('accesstoken')}`;
  // }
  return config;
}, err => {
  return Promise.reject(err);
});
Vue.filter('coin',function (val) {
  if(val === "" || val ==null){
    return "";
  }
  if(!isNaN(val)){
    return val.toFixed(5);
  }else{
    return '';
  }
});
Vue.filter('rare',function (val) {
  switch (val){
    case 16:return "B";
    case 32:return "A";
    case 64:return "S";
    case 128:return "SR";
    case 256:return "SSR";
  }
});
Vue.filter('Time',function (val) {
  if(val === "" || val ==null){
    return "";
  }
  return val.slice(5,16);
});

new Vue({
  el: '#app',
  router,
  store,
  components: {'App':()=>import('./App')},
  template: '<App/>'
});

