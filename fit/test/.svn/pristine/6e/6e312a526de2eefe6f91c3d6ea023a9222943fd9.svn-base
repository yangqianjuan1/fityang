/**
 * Created by zhengzhiyang on 2018/10/29.
 */
import balanceCom from './noBalance.vue'
import router from '../../router'
import store from '../../store'
let noBalance = {};
let balanceCom2 = balanceCom;
noBalance.install = function (Vue, options) {
  Vue.prototype.$noBalance = (text,time,position) => {

    let balanceTpl = Vue.extend(
      balanceCom2
    );
    let balance = new balanceTpl({store,router}).$mount().$el;  // 2、创建实例，挂载到文档以后的地方
    document.body.appendChild(balance);     // 3、把创建的实例添加到body中
  }
};
export  default noBalance;

