/**
 * Created by zhengzhiyang on 2018/12/3.
 */
import spineDlg from './spine.vue'
import store from '../../store'
let spine = {};
let spineCom = spineDlg;
spine.install = function (Vue, options) {
  Vue.prototype.$spine = (props) => {
    let balanceTpl = Vue.extend(
      spineCom
    );
    let spineVm =    new balanceTpl({store,propsData:props});
    // comFireVm.data.current = true;
    // 2、创建实例，挂载到文档以后的地方
    document.body.appendChild(spineVm.$mount().$el);     // 3、把创建的实例添加到body中
  }
};
export  default spine;
