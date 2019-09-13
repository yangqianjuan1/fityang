<template>
  <my-dialog :dialogOpen="dialogOpen">
<router-view></router-view>
    <div  class="takeCenter register">
      <!--关闭-->
      <img src="../assets/img/dialog/close.png"  style="    position: absolute; right: 0.3125rem; top: 0.3125rem;cursor: pointer;" @click="closeDialog()">
      <div style="width: 100%;height: 2rem;" >
        <img src="../assets/img/index/bg-1.png" style="width: 100%;height: 2rem;">
      </div>

      <!--登录dialog-->
      <div style="margin-top: 0.9375rem;overflow: hidden;text-align: center" v-if="login.loginShow">
        <input placeholder="请输入邮箱地址"  class="email" v-model="login.email"/>
        <input placeholder="请输入8-16位数字加字母密码" class="secret"  v-model="login.password" type="password"/>

        <p id="login" class="cl" style="margin-top: 0.25rem;width: 90%"></p>
        <p style="font-size: 0.4375rem;color: red;margin-top:1.875rem">{{login.error}}</p>
        <button  class="point" @click="logIn" >登录</button>
        <p style="width: 90%;height: 0.625rem;margin: 0 auto "><span style="font-size: 0.4375rem;color: #7F7F7F;float: left" @click="openRegisterDialog()" class="point">立即注册</span>
          <span style="font-size: 0.4375rem;color: #7F7F7F;float: right" @click="openFindSecret()" class="point">忘记密码？</span>
        </p>
      </div>

      <!--注册dialog-->
      <div  style="margin-top: 0.9375rem;overflow: hidden;text-align: center" v-if="register.registerShow">
        <input placeholder="请输入邮箱地址"  class="email" v-model="register.email"/>
        <input placeholder="请输入验证码" class="code" style="width: 60%"  v-model="register.code"/>
        <send-code style="width: 30%" class="point" :email="register.email" :type="type.Register" @error="getRegisterCodeError"></send-code>
        <input placeholder="请输入8-16位数字加字母密码" class="secret" type="password"   v-model="register.password"/>
        <p id="login" class="cl" style="margin-top:0.25rem;width: 90%"></p>
        <p style="font-size: 0.4375rem;color: red;margin-top:1.875rem">{{register.error}}</p>
        <button  class="point" @click="Register">注册并登录</button>
        <p style="font-size: 0.4375rem;color: #CCCCCC;float: left">已有账号，<span style="color:#7F7F7F " class="point" @click="openLoginDialog()">马上登录</span></p>
      </div>

      <!--找回密码dialog-->
      <div style="margin-top: 0.9375rem;overflow: hidden;text-align: center" v-if="findSecret.SecretShow">
        <input placeholder="请输入邮箱地址"  class="email" v-model="findSecret.email"/>
        <input placeholder="请输入验证码" class="code" style="width: 60%"  v-model="findSecret.code" />
        <send-code style="width: 30%" class="point" :email="findSecret.email" :type="type.ForgetPassword" @error="getSecretCodeError"></send-code>
        <input placeholder="请输入8-16位数字加字母新密码" class="secret" type="password" v-model="findSecret.password"/>
        <p style="font-size: 0.4375rem;color: red;">{{findSecret.error}}</p>
        <button style="margin: 0.15625rem 0" class="point" @click="ForgetSecret">修改密码</button>
        <p style="font-size: 0.4375rem;color: #CCCCCC;float: left">记得密码，<span style="color: #7F7F7F" class="point" @click="openLoginDialog()">马上登录</span></p>
      </div>
    </div>
  </my-dialog>

</template>

<script>
  import MyDialog from "./dialog";
  import SendCode from "./sendCode";
  import gt from '../assets/js/gt'
  import VueRecaptcha from 'vue-recaptcha';


  export default{
    components: {
      SendCode,
      MyDialog,
      VueRecaptcha},
    name: "loginRegisterFind",
    props:{
      value:{
      },
      openType:{
        type:String,
        default:''
      }
    },
    data(){
      return {
        codeText:'发送验证码',
        dialogOpen:false,

//        发送验证码类型
        type:{
          Register:1.,
          ForgetPassword :2.,
          Withdraw:3.,
        },

//        sitekey:'6LfCpEUUAAAAAM4MKjb3SNMZyCR7BD1zFk-SkG-Q',
        sitekey:'6Lf_qkUUAAAAAO2tLjsMzndJRAmy0i3E8HEegs-x',
        Verify:'',
        RecaptchaType:'',
        login:{
          loginShow:false,
          email:'',
          password:'',
          error:''
        },
        geetest:{},
        regGeetest:{},
        register:{
          registerShow:false,
          email:'',
          password:'',
          code:'',
          error:''
        },
        findSecret:{
          SecretShow:false,
          email:'',
          password:'',
          code:'',
          error:''
        },
      }
    },
    mounted(){

    },
    methods:{
      init:function (type) {
        let self = this;
        this.$axios.get('/api/user/getcaptcha/').then(
          res=>{
            let data = JSON.parse(res.data.Result);
            initGeetest(
              {
                gt:data.gt,
                challenge: data.challenge,
                offline: data.success,
                new_captcha: data.new_captcha,
                product: 'popup',
                width:'100%',
                bg_color: 'black'
              },function (captchaObj) {
                // 这里可以调用验证实例 captchaObj 的实例方法
                captchaObj.appendTo('#login');
                captchaObj.onSuccess(function () {
                    let result = captchaObj.getValidate();
                    if (type === 'login')
                    {
                      self.geetest={challenge:result.geetest_challenge,validate:result.geetest_validate,seccode:result.geetest_seccode};
                    }else{
                      self.regGeetest={challenge:result.geetest_challenge,validate:result.geetest_validate,seccode:result.geetest_seccode};
                    }

                  }
                )
              }
            )
          }
        )

      },
      logIn: function () {
//        if (this.login.error = this.emailFill(this.login.email))return;
//        if (this.login.error = this.secretFill(this.login.password)) return;
        if(!this.geetest){
          this.login.error = '请点击验证按钮';
          return
        }
        let data = {userName: this.login.email, password: this.login.password,challenge:this.geetest.challenge,validate:this.geetest.validate,seccode:this.geetest.seccode};
        this.$axios.post('/api/user/login/', data)
          .then(res => {
            let result = res.data;
            if(!result.IsSuccess)
            {
              this.login.error = result.Message;
            }else{
              this.logIn.error = "";
              this.loginSuccess();
            }
          }, error => {
            this.login.error = '系统错误，请稍后重试';
          })
      },

      //注册
      Register:function () {
        if (this.register.error = this.emailFill(this.register.email))return;
        if(!this.register.code)
        {
          this.register.error = '验证码不能为空';
          return
        }

        if (this.register.error = this.secretFill(this.register.password)) return;
        if(!this.regGeetest){
          this.register.error = '请点击验证按钮';
          return
        }
        let data = {userName:this.register.email, password:this.register.password, vCode:this.register.code,challenge:this.regGeetest.challenge,validate:this.regGeetest.validate,seccode:this.regGeetest.seccode};
        this.$axios.post('/api/user/register/', data)
          .then(res=>{
            let result = res.data;
            if(result.IsSuccess) {
              this.register.error = "";
              this.$router.push('/bind');
            }else{
              this.register.error = result.Message;
            }
          },error=>{
            this.register.error = result.Message;
          })

      },

      //忘记密码
      ForgetSecret:function () {
        if (this.findSecret.error = this.emailFill(this.findSecret.email))return;
        if(!this.findSecret.code)
        {
          this.findSecret.error = '验证码不能为空';
          return
        }
        if (this.findSecret.error = this.secretFill(this.findSecret.password)) return;
        let data = {userName:this.findSecret.email, password:this.findSecret.password, vCode:  this.findSecret.code};
        this.$axios.post('/api/user/modifypassword/', data)
          .then(res=>{
            let result = res.data;
            if(result.IsSuccess) {
              this.findSecret.error = "";
              this.$message({
                message: '修改成功，请登录',
                type: 'success'
              });
              this.openLoginDialog();
            }else{
              this.findSecret.error = result.Message;
            }
          },error=>{
            this.findSecret.error = result.Message;
          })

      },

      InitializationJson:function (json) {

        for(let p in json){//遍历json对象的每个key/value对,p为key
          json[p] = '';
        }
      },

      getRegisterCodeError:function (val) {
        this.register.error = val;
      },
      getSecretCodeError:function (val) {
        this.findSecret.error = val;
      },
      emailFill: function (email) {//邮箱格式验证
        let error = null;
        if (!email) {
          error = '请输入邮箱';
          return error;
        }
        let emailType = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        if (!emailType.test(email)) {
          error = '请输入正确的邮箱地址';
          return error;
        }
        return null
      },
      secretFill: function (password) {
        let str = password;
        if (str === "") {
          return '请输入密码';
        }
        if (str.length < 8 || str.length > 16) {
          return '密码必须大于8位小于16位';
        }
        let reg = new RegExp(/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/);
        if (reg.test(str)) {
          return null;
        } else {
          return '密码必须必须包含数字和字母';
        }
      },
      loginSuccess:function () {
        this.dialogOpen = false;
        this.isLogin = true;
        window.location.reload()
      },

      clickID: function () {
        this.iscur = 6;
      },

      //初始化弹框（不弹框）
      InitializationOPen:function () {
        this.InitializationJson(this.login);
        this.InitializationJson(this.register);
        this.InitializationJson(this.findSecret);
        this.dialogOpen = false;
        this.login.loginShow = false;
        this.register.registerShow = false;
        this.findSecret.SecretShow = false;
        this.geetest = null;
        this.regGeetest = null;
      },


      //打开注册
      openRegisterDialog:function () {
        this.InitializationJson(this.login);
        this.InitializationJson(this.register);
        this.InitializationJson(this.findSecret);
        this.dialogOpen = true;
        this.login.loginShow = false;
        this.register.registerShow = true;
        this.findSecret.SecretShow = false;
        this.regGeetest = null;
        if(document.getElementById('login')){
          while(document.getElementById('login').hasChildNodes()) //当div下还存在子节点时 循环继续
          {
            document.getElementById('login').removeChild(document.getElementById('login').firstChild);
          }
        }
        this.init('reg');
      },

      //打开登录
      openLoginDialog:function () {
        this.InitializationJson(this.login);
        this.InitializationJson(this.register);
        this.InitializationJson(this.findSecret);
        this.dialogOpen = true;
        this.login.loginShow = true;
        this.register.registerShow = false;
        this.findSecret.SecretShow = false;
        this.geetest = null;
        if(document.getElementById('login')){
          while(document.getElementById('login').hasChildNodes()) //当div下还存在子节点时 循环继续
          {
            document.getElementById('login').removeChild(document.getElementById('login').firstChild);
          }
        }
        this.init('login');


      },

      //打开忘记密码
      openFindSecret: function () {
        this.InitializationJson(this.login);
        this.InitializationJson(this.register);
        this.InitializationJson(this.findSecret);
        this.dialogOpen = true;
        this.register.registerShow = false;
        this.login.loginShow = false;
        this.findSecret.SecretShow = true;
      },
      goIndex: function () {
        this.iscur = -1;
        this.$router.push('/')
      },
      closeDialog: function () {
        this.InitializationJson(this.login);
        this.InitializationJson(this.register);
        this.InitializationJson(this.findSecret);
        this.register.registerShow = false;
        this.login.loginShow = false;
        this.findSecret.SecretShow = false;
        this.dialogOpen = false;
        this.$emit('input',"");
      },
    },
    watch:{
      value:function (val) {
        switch (val){
          case '': this.InitializationOPen();break;
          case 'login': this.openLoginDialog();break;
          case"openFindSecret": this.openFindSecret();break;
          case 'register': this.openRegisterDialog();break;
        }
      }
    }
  }
</script>

<style scoped>
  .register{
    width: 90%;
    /*height: 10rem;
     */

    padding-bottom: 1rem;
    background: #ffffff;
    /*z-index: 20;
     */
    position: relative;
    border-radius: 0.3125rem;
    -webkit-border-radius: 0.3125rem;
    -moz-border-radius: 0.3125rem;
  }
  input{
    width: 90%;
    height: 1.4375rem;
    border-radius: 0.15625rem;
    -webkit-border-radius: 0.15625rem;
    -moz-border-radius: 0.15625rem;
    text-indent: 1.5625rem;
    border: 1px solid #CDCFD1;
    margin-top: 0.53125rem;
    background-repeat:no-repeat ;
    background-position:0.46875rem center ;
  }
  .email{
    background-image: url('../assets/img/dialog/email.png');
  }
  .secret{
    background-image: url('../assets/img/dialog/secret.png');
  }
  .code{
    background-image: url('../assets/img/dialog/code.png');
  }
  button{
    cursor: pointer;
    width: 90%;
    height: 1.4375rem;
    border-radius: 0.15625rem;
    -webkit-border-radius: 0.15625rem;
    -moz-border-radius: 0.15625rem;
    background: #2D6D7B;
    color: #ffffff;
    line-height: 1.4375rem;
    text-align: center;
    font-size: 0.5rem;
    box-shadow: 0 0 0.3125rem #F4F4F8;
    -webkit-box-shadow: 0 0 0.3125rem #F4F4F8;
    -moz-box-shadow: 0 0 0.3125rem #F4F4F8;
  }
  .point{
    cursor: pointer;
  }

</style>
