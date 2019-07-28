// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/assets/style/reset.css'
// import '@/assets/style/index.scss' // global css
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false;

import 'element-ui/lib/theme-chalk/display.css';
// import 'swiper/dist/css/swiper.css'; //swiper css


import Api from "@/api/Api.js";
Vue.use(Api);

// import BMap from 'BMap'

import ElementUI from 'element-ui'
Vue.use(ElementUI)

import base from './base'
Vue.use(base);
import 'element-ui/lib/theme-chalk/index.css'
import store from "./store/index";
import './assets/style/quill.bubble.css'
import './assets/style/quill.core.css'
import './assets/style/quill.snow.css'

import echarts from 'echarts'

Vue.use(echarts)
Vue.prototype.$echarts = echarts


import ValidationRules from "@/plugins/validation-rules";

Vue.use(ValidationRules);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    // BMap,
    components: { App },
    template: '<App/>'
})