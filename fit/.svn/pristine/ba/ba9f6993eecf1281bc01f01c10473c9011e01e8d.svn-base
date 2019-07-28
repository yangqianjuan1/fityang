import router from './router'
export default {
    install(Vue, options) {
        Vue.prototype.loading = null;
        Vue.prototype.loadingOpen = function (str) {
            Vue.prototype.loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
              });
        };
        Vue.prototype.loadingClose = function () {
            if(Vue.prototype.loading){
                Vue.prototype.loading.close();
            }
           
        };
        Vue.prototype.toasts = function(str){
            if(window,location.href.indexOf('fxchart')>-1){
                return  
            }
            this.$notify.info({
                title: '消息',
                message: str,
              });
        },
        Vue.prototype.gotoRouter = function () {
                router.push({ path: '/login' });
        };
        Vue.prototype.message = function (str,fun) {
            if(window.noal){
                return
            }
            this.$alert(str, '提示', {
                confirmButtonText: '确定',
                callback: action => {
                    Vue.prototype.gotoRouter()
                },
                beforeClose: (action, instance, done) => {
                    window.noal = false
                    done(); // 就是它!
                }
              })
        };

       


    }

}
