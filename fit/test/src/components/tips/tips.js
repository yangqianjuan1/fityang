
let tips = {};
let show = false,
  tipsVM=null;
tips.install = function (Vue, options) {
  Vue.prototype.$tips = (text,time,position) => {
    let toastTpl = Vue.extend({     // 1、创建构造器，定义好提示信息的模板
      template: '<div class="tips cl num-abc-warp" v-if="show">{{info}}</div>',
      data: function () {
        return {
          show:true,
          info: null,
          time:2000
        }
      },

      created(){
        this.info = text;
        if(time){
          this.time = time;
        }

      },
      mounted(){
        let self = this;
        setTimeout(function () {
          self.show = false;
        },self.time)
      }
    });
    tipsVM = new toastTpl();
    let tpl = new toastTpl().$mount().$el;  // 2、创建实例，挂载到文档以后的地方
    document.body.appendChild(tpl);     // 3、把创建的实例添加到body中
  }
};
module.exports = tips;

