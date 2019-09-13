<template>
  <div>
    <div class="content"></div>
    <scroll
    top="0">
      <div flex="main:center cross:center dir:top" :style="{'min-height':height}">
        <img src="../../assets/img/index/index-1.png" style="width:5.28rem ">
        <img src="../../assets/img/index/index-2.png" >
        <img src="../../assets/img/index/index-3.png"  style="width:7.92rem ">
        <button class="btn cl btn-yellow " @click="begin">马上开始</button>
      </div>
    </scroll>
    <div class="beginners" v-if="beginnersGuide" >

   <div class=" ct" style="text-align: center">
     <img src="../../assets/img/Beginners_guide/title.png"style="width: 4rem;margin-bottom: 1rem">
     <img src="../../assets/img/activity/release-left.png" class="ct next" style="left: 0.5rem" @click="previous"/>
     <img src="../../assets/img/activity/release-right.png" class="ct next" style="right: 0.5rem" @click="next"/>
     <div class="beginnersWarp ">
       <ul class="beginnersGuide ">
        <li><img src="../../assets/img/Beginners_guide/1-first.png"></li>
        <li><img src="../../assets/img/Beginners_guide/2-first.png"></li>
        <li><img src="../../assets/img/Beginners_guide/3-first.png"></li>
        <li><img src="../../assets/img/Beginners_guide/4-first.png"></li>
        <li><img src="../../assets/img/Beginners_guide/5-first.png"></li>
        <!--<li><img src="../../assets/img/Beginners_guide/6-first.png"></li>-->
        <!-- <li><img src="../../assets/img/Beginners_guide/7-first.png"></li> -->
      </ul></div>
    <button class="btn-yellow" style="padding: 0.2rem 0.5rem;margin-top: 0.5rem;font-size: 0.4rem" @click="beginnersGuide= false">进入游戏</button>
   </div>
    </div>
    <comfire-dialog v-model="login" :type="1" :sure="close">
      <p class="takeCenter">今日登录，获得<span class="special-color">2张</span>捕虎卷!</p>
    </comfire-dialog>
  </div>
</template>

<script>
  import htitle from "../../components/title";
  import IndexFirst from "../../components/index/indexFirst";
  import Contain from "../../components/contain";
  import foot from "../../components/footer";
  import MyDialog from "../../components/dialog";
  import SendCode from "../../components/sendCode";
  import Scroll from "../../components/scroll/scroll";
  import BScroll from 'better-scroll';
  import ComfireDialog from "../../components/comfireDialog";
  export default{
    components: {
      ComfireDialog,
      Scroll,
      SendCode,
      MyDialog,
      foot,
      Contain,
      IndexFirst,
      htitle},
    name: "index",
    data(){
      return {
        mapChat:'',
        map:'',
        height:'',
        beginnersGuide:false,
        BeginnersScroll:null,
        BeginnersPageIndex:0,
        login:false
      }
    },
    mounted(){
      this.setScrollMinHeight();
      this.getBasic();

    },
    methods:{
      close:function () {
        this.login = false;
      },
      getBasic:function () {
        this.$axios.get('/api/getsystemconfiguration/').then(
          res=>{
            let result = res.data;
            if(result.IsSuccess){
              if(result.Result.DailySend){
                this.login = true;//每日奖励
              }
              this.beginnersGuide =result.Result.IsNew;
              if(result.Result.IsNew){
                this.$nextTick(()=>{
                  this.showBeginnersGuide();
                })
                this.setNewAccount();
              }

            }else{
              // this.$tips('获取系统配置失败，请重新尝试')
            }
          },error=>{
            // this.$tips('获取登录信息失败，请先登录')
          }
        );
      },
        setNewAccount:function () {
          this.$axios.get('/api/setaccountnotnew/').then(
            res=>{
              let result = res.data;
              if(result.IsSuccess){
              }else{
//                this.$get_error('tips',result.Code,result.Message);
              }
            },error=>{
//              this.$get_error('reload');
            }
          );
        },
      setScrollMinHeight:function () {
        let rem = parseFloat(document.documentElement.style.fontSize.split('px')[0]);

        if(document.getElementById('warp'))
        {
          this.height=(document.getElementById('warp').offsetHeight-1-rem*1.5)+'px' ;
        }
      },
      begin:function () {
        this.$router.push('/Fomo3D')
      },
      showBeginnersGuide:function () {
        this.BeginnersScroll = new BScroll('.beginnersWarp',{
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap: {
            loop: this.loop,
            threshold: 0.3,
            speed: 400
          },
          click: true
        })
      },
      previous:function () {
          if(!this.BeginnersScroll )return;
        this.BeginnersScroll.prev()
      },
      next:function () {
        if(!this.BeginnersScroll )return;
        this.BeginnersScroll.next()
      }
    },
    watch:{
    }
  }
</script>

<style scoped>

  .content{
    background-image: url("../../assets/img/index/index.png");
    background-size: 100% 100%;
    position: fixed;
    top:0;
    bottom: 0;
  }
    img{
      width: 100%;
    }
  .btn{
    position: absolute;
    bottom:5%;
    padding: 0.2rem 0.8rem;
    text-align: center;
    border-radius: 10px;

  }
  .beginners{
    width: 10rem;
    height: 100vh;
    background-image:url("../../assets/img/index/index.png");
    background-size:100% 100% ;
    z-index: 100;
    position: relative;
    background-repeat: no-repeat;
  }
  .beginnersGuide{
    width: 70rem;

  }
  .beginnersWarp{
    overflow: hidden;
    position: relative;
    width: 10rem;
  }
  .beginnersGuide li{
    width: 10rem;
    float: left;
    text-align: center;
    padding: 0 ;
    margin: 0;

  }
  .beginnersGuide img{
    width: 6rem;
  }
  .next{
    width: 1rem;
    z-index: 200;
  }
</style>
