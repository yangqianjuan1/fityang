<template>
  <div >
    <scroll
    bottom="2.6">
      <div :style="setScrollMinHeight()">

        <img src="../../assets/img/activity/top1.png" style="width: 100%">
        <contain style="text-align: center">

          <div class="content">
            <div class="info cl">家族邀请</div>
            <!--<div class="people">邀请人数：{{data.InviteCount}}</div>-->

              <p>1、一代神马限时抢购，售价：{{inviteShengMa.oncePrice}}GXS（原价 {{inviteShengMa.originalPrice}}GXS），限量1999匹；</p>
              <p>2、骏马特价：1.99GXS（原价29GXS）；</p>
              <p>3、活动结束后将恢复原价，数量有限快来抢购。</p>
            <button class="time cl">倒计时：{{time}}</button>
          </div>
          <div flex="main:center cross:center">
            <img src="../../assets/img/activity/shengma.png" style="width: 3.5rem">
            <div class="sell">
              <p>售价：{{inviteShengMa.oncePrice}}GXS</p>
              <p>原价：{{inviteShengMa.originalPrice}}GXS</p>
              <p>剩余量：{{inviteShengMa.number}}匹</p>
            </div>
          </div>
          <button class="buy font-huangdi">立即抢购</button>
          <div flex="main:center cross:center">
            <div class="sell" style="margin-left: 0;margin-right: 0.5rem">
              <p>售价：{{inviteShengMa.oncePrice}}GXS</p>
              <p>原价：{{inviteShengMa.originalPrice}}GXS</p>
              <p>剩余量：{{inviteShengMa.number}}匹</p>
            </div>
            <img src="../../assets/img/activity/junma.png" style="width: 3.5rem">

          </div>
          <button class="buy font-huangdi">立即抢购</button>
          <!--<div class="content">-->
            <!--<div class="info cl">邀请方式</div>-->
            <!--<p class="text" style="margin-top: 0.5rem;text-align: center">点击将其复制到剪贴板发给你的朋友</p>-->
            <!--<div style="text-align: center">-->
              <!--<p style="text-align: center;color: #2d6d7b;" class="text"  >{{data.InviteUrl}} </p>-->
              <!--<copy :copyText="data.InviteUrl" class="copyBtn" ></copy>-->
            <!--</div>-->
          <!--</div>-->
        </contain>
      </div>
    </scroll>
    <!--<div style="text-align: center" >-->
      <!--<button style="cursor: pointer" @click="buy" class="btn cl" >-->
        <!--<span style="color: #ffffff;border-right: 2px solid #14a69e">1000GXS</span>-->
        <!--<span style="font-size: 14px;color: #ffffff" @click="buy">立即购买</span>-->
      <!--</button>-->
    <!--</div>-->
    <my-dialog :dialogOpen="newHorse">
      <div  class="born takeCenter" flex=" dir:top main:center cross:center">
        <horse-info :Info="newHorseInfo" id="bronResult" style="width: 4rem;height: 6rem" :type="3"></horse-info>
        <button class="sure" @click="sure">确认领取</button>
      </div>
    </my-dialog>
    <comfire-dialog v-model="buyDialog" :sure="onceCheckSure">
      <p class="takeCenter" style="width: 100%;text-align: center;padding: 0 0.2rem;color: #ffffff;font-size: 0.44rem">购买万利马<span style="display: inline-block;color: #F7FF1F">#</span>，确认支付<span style="display: inline-block;;color: #F7FF1F"></span>GXS！</p>
    </comfire-dialog>
    <!--<login-register-find v-model="dialogOpen"></login-register-find>-->
  </div>
</template>

<script>
  import Contain from "../../components/contain";
  import Foot from "../../components/footer";
  import Copy from "../../components/copy";
  import LoginRegisterFind from "../../components/loginRegisterFind";
  import Scroll from "../../components/scroll/scroll";
  import MyDialog from "../../components/dialog";
  import HorseInfo from "../../components/tigerInfo";
  import ComfireDialog from "../../components/comfireDialog";
  export default{
    components: {
      ComfireDialog,
      HorseInfo,
      MyDialog,
      Scroll,
      LoginRegisterFind,
      Copy,
      Foot,
      Contain},
    name: "invite",
    data(){
      return {
        dialogOpen:'',
        data:{
          InviteCount:'00',
          LassoHorseCount:'000',
          InviteUrl:"https://segmentfault.com/p/1210000006974060"
        },
        newHorse:false,
        buyDialog:false,
        newHorseInfo:'',
        inviteShengMa:{
          oncePrice:19,
          originalPrice:199,
          number:1999
        },
        inviteJunMa:{
          oncePrice:19,
          originalPrice:199,
          number:1999
        },
        time:'10天10时10分10秒'
      }
    },
    created(){
      this.getInvite();
    },
    methods:{
      setScrollMinHeight:function () {
        if(document.getElementById('warp'))
        {
          return 'min-height:'+(document.getElementById('warp').offsetHeight+1)+'px'
        }
      },
      buy:function () {
        this.buyDialog = true;
      },
      sure:function () {

      },
      onceCheckSure:function () {

      },
      getInvite:function () {
        this.$axios.post('/api/user/invitefriendpage/').then(
          res=>{
            let result = res.data;
            if(result.IsSuccess){
              this.data = result.Result;

            }else{
              this.$get_error('tips',result.Code,result.Message);
            }
          },
          error=>{
            this.$get_error('reload');
          }
        )
      }
    }
  }
</script>

<style scoped>
  .invite {
    position: relative;
  }
  .title{

    font-size: 16px;
    text-align: center;
    margin: 0.3rem 0;
  }
  .info{
    color: #ffffff;
    display: inline-block;
    padding: 0  1rem;
    background-image: url("../../assets/img/activity/title.png");
    background-size: 100% 100% ;
    font-size: 0.5rem;
    height: 0.9rem;
    line-height: 0.9rem;
    position: absolute;
    top: -18px;
  }
  .content p{
    font-size: 0.4rem;
    color: #074D5B;
  }
  .content{
    position: relative;
    text-align: left;
    border-radius: 10px;
    border: 5px solid #ffffff ;
    background-color:rgba(0,0,0,0.2);
    padding: 1rem 0.5rem;
    margin: 0.5rem 0;
  }

  .btn{
    background-image: url("../../assets/img/transactin/goumaianniu.png");
    background-size: 100% 100%;
    position: fixed;
    bottom: 1.6rem;
    padding: 0.3rem 0;
    margin: 0.5rem auto;
    display: block;

  }
  .sure{
    margin-top: 0.2rem;
    padding: 0.3rem 0.5rem;
    color:#ffffff;
    background-image: url("../../assets/img/index/anniu.png");
    background-size: 100% 100%;
    border-radius: 0.2rem;
  }
  .btn span{
    display: inline;
    padding: 0.1rem 0.2rem;
  }
  .people{
    text-align: center;
    line-height: 26px;
    margin-bottom: 0.5rem;
    color: #FFF850;
    width: 100%;
    height: 30px;
    background-image: url("../../assets/img/invite/yaoqingdi.png");
    background-size: 100% 100% ;
  }
  .invite-btn{
    margin-top: 2rem;
  }
  .invite-btn span{
    color: #2D6D7B;
    font-size: 0.5rem;
    display: inline-block;
    height: 100%;
  }
  .invite-btn button{
    width: 4rem;
    height: 1rem;
    margin-top: 0.5rem;
    -webkit-border-radius:0.71875rem;
    -moz-border-radius:0.71875rem;
    border-radius:0.71875rem;
    background:#2D6D7B ;
    color: #ffffff;
    font-size: 0.625rem;
    right:0.625rem ;

  }

  .time{
    position: absolute;
    bottom: -0.4rem;
    background-image: url("../../assets/img/activity/time.png");
    background-size: 100% 100% ;
    height: 0.8rem ;
    font-size: 0.3rem;
    color: #ffffff;
    border-radius: 0.2rem;
    padding: 0 0.3rem;
    white-space:nowrap;
    line-height: 0.8rem;
  }
  .sell p{
    font-size: 0.5rem;
    line-height: 1rem;
    margin-left: 0.5rem;
  }
  .sell p:nth-child(2){
    text-decoration:line-through
  }
  .buy{
    background-image: url("../../assets/img/dialog/huangda.png");
    background-size: 100% 100%;
    height: 1rem;
    line-height: 1rem;
    padding: 0 0.5rem;
    border-radius: 0.2rem;
    margin: 0.5rem 0;
  }
</style>
