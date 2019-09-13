<template>
  <div class="bg">
  <scroll >
  <div >
    <div style="position: relative;text-align: center" >
      <img src="../../assets/img/family/bg.png" style="width: 85%;display: block;margin: 1.2rem auto 0.8rem">
      <div class="invite">
        <p>盟主ID：<span style="color:#A9331B " class="noPreventDefaultException">{{InviteCode}}</span></p>
        <p>快来建立联盟关系吧</p>
      </div>
    </div>
    <div class="info">
      <p style="font-size: 0.37rem;text-align: center;margin: 0.2rem 0">如何建立联盟关系</p>
      <p style="font-size: 0.33rem">1、进入驯兽师，点击“我的—加入联盟”</p>
      <p style="font-size: 0.33rem;margin-top: 0.2rem">2、输入所要加入的盟主ID，并购买一只神虎，该神虎将会成为其堂主。</p>
    </div>
    <copy class="btn-violet copy" :copyText="InviteCode">复制ID</copy>
  </div>
  </scroll>
  <!--<div class="foot-tips" v-if="tips">截屏发给好友</div>-->
  </div>
</template>

<script>
    import Scroll from "../../components/scroll/scroll";
    import Copy from "../../components/copy";
    export default {
        name: "invite-family",
      components: {
        Copy,
        Scroll},
      data(){
          return{
            InviteCode:"",
            tips:true
          }
      },
      created(){
          this.getInfo();
      },
      mounted(){
//        setTimeout(()=>{
//          this.tips = false;
//        },3000)
      },
      methods:{
        getInfo:function () {
          this.$axios.get("/api/user/getinviteinfo/?type=2&horseId="+this.$route.query.k).then(
            res=>{
              let result = res.data;
              if(result.IsSuccess)
              {
                this.InviteCode = result.Result.InviteCode;
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
  .bg{
    background-image: url("../../assets/img/family/family-bg.png");
    background-size: 100% 100%;
    height: 100vh;
  }
  .invite{
    color: #464646;
    font-size: 0.4rem;
    width: 60%;
    background: #ffffff;
    border:1px solid #84734A;
    border-radius: 0.1rem;
    margin:  0 auto;
    position: relative;
  }
  .invite::before{
    content: '';
    background: url("../../assets/img/family/tips.png") no-repeat ;
    background-size: 100% 100%;
    position: absolute;
    left: -1.5rem ;
    top:0.2rem;
    width: 2.293rem;
    height: 1.373rem;
  }
  .invite p{
    height: 0.667rem;
    line-height: 0.667rem;
    font-size:0.36rem ;
    font-weight: 600;
  }
  .invite p:first-child{
    width: 90%;
    border-bottom: 2px solid #84734A;
    margin: 0 auto;
  }
  .info{;
    width: 80%;
    padding: 0.5rem 0.5rem 0.2rem;
    font-size: 0.33rem;
    color: #502111;
    margin:  0 auto;
    text-align: left;
  }
  .info p:first-child{
    font-weight: 600;
  }
  .foot-tips{
    position: fixed;
    bottom: 0;
    background: #000000;
    opacity: 0.6;
    font-size: 0.37rem;
    color: #ffffff;
    width: 100%;
    margin: 0 auto;
    padding:  0.3rem 0;
    text-align: center;
  }
  .copy{
    padding: 0.2rem 0.5rem;
    display: block;
    margin:  0.2rem auto;
  }
</style>
