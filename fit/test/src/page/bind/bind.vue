<template>
  <div class="bind ">
    <div class="contain" >
      <div style="position: relative;width: 100%; border-bottom: 2px solid #DFE1E5;">
      <ul class="stepTitle" flex="main:center">
        <li class="stepitem"><div class="iconWrap ct"><div class="icon" :style="{'background':step===1?'#2D6D7B':'#ffffff'}"></div><span class="takeCenter" :style="{'color':step===1?'#ffffff':'#2D6D7B'}">1</span></div><p class="stepText"  >第一步</p></li>
        <li class="stepitem"><div class="iconWrap ct"><div class="icon"  :style="{'background':step===2?'#2D6D7B':'#ffffff'}"></div><span class="takeCenter" :style="{'color':step===2?'#ffffff':'#2D6D7B'}">2</span></div><p class="stepText" >第二步</p></li>
        <li  class="stepitem"><div class="iconWrap ct"><div class="icon"  :style="{'background':step===3?'#2D6D7B':'#ffffff'}"></div><span class="takeCenter" :style="{'color':step===3?'#ffffff':'#2D6D7B'}">3</span></div><p class="stepText" >第三步</p></li>

      </ul>
      </div>
      <div class="bindContain ">
        <!--第一步-->
        <div class="step " v-if="step===1">
          <p style="padding: 0.5rem 0;color: #666666;font-size: 18px;">您的账户尚未绑定以太钱包，请先进行绑定，若您没有以太账户，则需要先创建
            可参考<span class="teach" @click="course">“以太币钱包注册登录以及绑定教程”</span></p>
          <button class="one" @click="hadId">已有以太账户</button>
          <button class="two"  @click="createdId">前往创建以太账户</button>
        </div>

        <!--第二步（已有账号）-->
      <div class="step " v-if="step===2">
        <p style="padding: 0.5rem 0;color: #666666;font-size: 18px">绑定您的以太钱包地址，绑定成功后你就可以快速的完成充值、提现等操作</p>
        <!--<input placeholder="请输入邮箱地址"  class="email" readonly/>-->
        <input placeholder="在此黏贴你的以太钱包地址"  class="email" v-model.trim="ethHash"/>
        <p class="error cl">{{error}}</p>
        <button class="one" @click="bind">绑定钱包</button>
      </div>

        <!--第三步-->
        <div class="step" v-if="step===3">
          <p style="padding-top: 0.5rem;color: #666666;font-size: 18px">账户绑定成功！</p>
          <p style="line-height: 1rem;margin: 0 auto;color: #666666;font-size: 18px">你可以从“我的账户—充值”选择相应的以太币进行充值充值前请确保安装了“以太钱包”</p>
          <router-link :to="{path:'/user',query:{type:2}}" tag="button" class="one">充值</router-link>
          <router-link to="/transaction"tag="button" class="two">回到首页</router-link>
        </div>
    </div>
    </div>

    <foot></foot>
    <!--<login-register-find v-model="dialogOpen"></login-register-find>-->
  </div>
</template>

<script>
  import Contain from "../../components/contain";
  import Foot from "../../components/footer";
  import LoginRegisterFind from "../../components/loginRegisterFind";
  export default{
    components: {
      LoginRegisterFind,
      Foot,
      Contain},
    name: "bind",
    data(){
      return {
        dialogOpen:'',
        step: 1,
        error:'',
        ethHash:'',
      }
    },
    methods:{
      hadId:function () {
        this.step = 2;
      },
      createdId:function () {
        window.open('http://www.myetherwallet.com ');
      },
      bind:function () {
          if(!this.ethHash){
              this.error = '请输入以太钱包地址';
              return
          }
        let data={ethHash:this.ethHash};
        this.$axios.post('/api/user/binddethaccount/',data).then(
          res=>{
            let result = res.data;
            if(result.IsSuccess){
              this.step = 3;
              }else{
               this.$get_error('tips',result.Code,result.Message);
                this.error = result.Message;
              }
          },error=>{
            this.$get_error('network');
          }
        );

      },
      course:function () {
          this.$router.push('/course')
      }
    }
  }
</script>

<style scoped>
  .bind {
    margin: 0 auto;
    padding: 0 0.2rem;
  }
  .contain{
    position: relative;
    background: #ffffff;
    width: 100%;
    -webkit-border-radius:0.625rem;
    -moz-border-radius:0.625rem;
    border-radius:0.625rem;
    padding: 1rem 0.5rem;
    /*height: 10rem;*/
  }
  .step{
    text-align: center;
  }
  .stepTitle{
    width: 100%;
    text-align: center;
  }
  .stepitem{
    position: relative;
    /*overflow: hidden;
     */

    padding-left: 0.5rem;
    float: left;
    /*height: 2rem;*/
    margin: 0 auto;
    width: 30%;
  }
  input{
    padding: 0 0.5rem ;
    width: 90%;
    height: 1.4375rem;
    border-radius: 0.15625rem;
    -webkit-border-radius: 0.15625rem;
    -moz-border-radius: 0.15625rem;
    text-indent: 1.5625rem;
    border: 1px solid #CDCFD1;
    margin-bottom: 0.625rem;
    background-repeat:no-repeat ;
    background-position:0.46875rem center ;
  }
  .email{
    background-image: url('../../assets/img/dialog/email.png');
  }
  .email[readonly]{
    /*background: #F5F5F5;
     */
  }
  .icon{
    border: 1px solid #2D6D7B;
    position:relative;
    width: 0.78125rem;
    height: 0.78125rem;
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    transform: rotate(45deg);
    /*background: #2D6D7B;
     */
    -webkit-border-radius:0.15625rem;
    -moz-border-radius:0.15625rem;
    border-radius:0.15625rem;
  }
  .iconWrap{
    width: 0.78125rem;
    height: 0.78125rem;
  }
  .stepTitle span{
    font-size: 0.5625rem;
    color: #ffffff;
  }
  .stepText{
    line-height: 2.125rem;
    text-align: right;
  }
  p{
    text-align: center;
  }
  button{
    display: block;
    width: 90%;
    height: 1.4375rem;
    font-size: 0.5rem;
    -webkit-border-radius:0.15625rem;
    -moz-border-radius:0.15625rem;
    border-radius:0.15625rem;
    margin: 0 auto;
    margin-bottom: 0.625rem;
    cursor: pointer;
  }
  .one{
    background: #2D6D7B;
    color: #ffffff;
    margin-top: 0.625rem;
  }
  .two{
    background: #ffffff;
    color: #2D6D7B;
    border: 1px solid #2D6D7B;
  }
  .teach{
    color: #2D6D7B;
    font-weight: 600;
    text-decoration: underline;
    text-underline-position:under;
    cursor: pointer;
  }
  .error{
    width: 80%;
    font-size: 0.4375rem;
    color: red;
    text-align: left;
    margin-bottom:0.625rem
  }

</style>
