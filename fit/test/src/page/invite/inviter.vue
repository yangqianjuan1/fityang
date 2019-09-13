<template>
  <div class="Horse">
    <scroll
      bottom="0">
      <div   flex="main:center cross:center dir:top"  >
        <img src="../../assets/img/index/biaoti.png" style="width: 3.5rem;margin-top: 0.5rem;margin-bottom: 0.5rem  ">
        <p style="color:#074D5B;font-size: 0.373rem ">首创区块链竞猜养成游戏</p>
        <div class="content">
          <p style="margin-top: 0.5rem">我的邀请码</p>
          <p style="font-weight: 700;font-size: 1.28rem;margin: 0.3rem 0">{{code}}</p>
          <p>"{{name}}" 邀请你加入万利马</p>
          <p style="margin-bottom: 1.5rem">这是你从未体验过的区块链游戏</p>
          <div id="code" flex="dir:top main:center cross:center" ></div>
          <p style="margin-top: 0.3rem">扫描二维码进入下载界面</p>
          <p>加入万利马获取奖励</p>
        </div>
      </div>
    </scroll>
    <div class="foot-tips" v-if="tips">截屏发给好友</div>
  </div>
</template>

<script>
  import VueQrcode from '@xkeshi/vue-qrcode'
  import Scroll from "../../components/scroll/scroll";
  export default {
    name: "inviter",
    components: {Scroll, VueQrcode},
    data(){
      return{
        url:"",
        height:"",
        code:"",
        name:'',
        tips:true,
      }
    },
    mounted(){
      setTimeout(()=>{
        this.tips = false;
      },3000)

      this.getInfo();

    },
    methods:{
      setQrcode:function(url){
      new QRCode(document.getElementById("code"), {
          text: url,
          width: 100,
          height: 100,
          colorDark : "#000000",
          colorLight : "#ffffff",
        });
      },
      getInfo:function () {
        this.$axios.get("/api/user/getinviteinfo/?type=1&horseId="+this.$route.query.k).then(
          res=>{
            let result = res.data;
            if(result.IsSuccess)
            {
                this.code = result.Result.InviteCode;
                this.name = result.Result.NickName ;
                this.setQrcode(result.Result.InviteUrl);
            }else{
              this.$get_error('tips',result.Code,result.Message);
            }
          },error=>{
            this.$get_error('reload');

          }
        )
      }
    }
  }
</script>

<style scoped>
  .Horse{
    text-align: center;
    background-image: url("../../assets/img/invite/bg-1.png");
    background-size: 100% 100% ;
    width: 100%;
    height: 100vh;
  }
  .content{
    color: #074D5B;
    text-align: center;
    background-image: url("../../assets/img/invite/bg-2.png");
    background-size: 100% 100% ;
    width: 90%;
    padding: 1rem 0;
  }
  #code{
    text-align: center;
    margin-top: 1rem;
    height: 100px;
  }
  .content p{
    font-weight: 600;
    font-size:0.373rem ;
  }
  .content p:nth-child(3){
    line-height: 0.7rem;
  }
.foot-tips{
  position: fixed;
  bottom: 0;
  background: #000000;
  opacity: 0.6;
  font-size: 0.37rem;
  color: #ffffff;
  width: 100%;
  padding:  0.3rem 0;
  text-align: center;
}
</style>
