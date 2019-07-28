import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions';
import mutations from './mutations';
import { handleStore } from './plugin'

Vue.use(Vuex)


const state = {
    userInfo: {
    },

};

const Store = new Vuex.Store({
    state,
    actions,
    mutations,
    plugins: [
        handleStore     //在这里设置一些默认值
    ]
});


export default Store
