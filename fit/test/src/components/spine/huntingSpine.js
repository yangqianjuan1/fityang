/**
 * Created by zhengzhiyang on 2018/12/4.
 */
/**
 * Created by zhengzhiyang on 2018/12/3.
 */
import huntingDlg from './huntingSpine.vue'
import store from '../../store'
let hunting = {};
let huntingCom = huntingDlg;
hunting.install = function (Vue, options) {
  Vue.prototype.$huntingSpine = (props) => {
    let balanceTpl = Vue.extend(
      huntingCom
    );
    let huntingVm =    new balanceTpl({store,propsData:props});
    // comFireVm.data.current = true;
    // 2、创建实例，挂载到文档以后的地方
    document.body.appendChild(huntingVm.$mount().$el);     // 3、把创建的实例添加到body中
  }
};
export  default hunting;
