/**
 * Created by zhengzhiyang on 2018/10/29.
 */
import comFireDlg from './comfireDialogSimple.vue'
import store from '../store'
let comFire = {};
let comFireCom = comFireDlg;
comFire.install = function (Vue, options) {
  Vue.prototype.$comFire = (props) => {
    let balanceTpl = Vue.extend(
      comFireCom
    );
    let comFireVm =    new balanceTpl({store,propsData:props});
    // comFireVm.data.current = true;
   // 2、创建实例，挂载到文档以后的地方
    document.body.appendChild(comFireVm.$mount().$el);     // 3、把创建的实例添加到body中
  }
};
export  default comFire;

