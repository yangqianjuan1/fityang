<template>
  <div>
    <scroll>
      <img src="../../assets/img/activity/chest-top.png" style="width: 100%;height: 4.2rem;"/>
      <div class="warp">
        <img src="../../assets/img/activity/chest.png" :class="closeClass" @click="open" ref="chest">
        <img src="../../assets/img/activity/chest-open-blur.png" :class="openClass" >
      </div>
      <p class="chance">当前开宝箱机会<span>{{time}}</span>次</p>

      <div class="content">
        <div flex="main:justify cross:center" class="title">
          <div class="border"></div>
          <p >有机会获得</p>
          <div class="border"></div>
        </div>
        <img src="../../assets/img/activity/chuangshima.png">
        <img src="../../assets/img/activity/shengma-2.png">
        <img src="../../assets/img/activity/junma-2.png">
      </div>

      <div class="content" style="text-align: left">
        <div flex="main:justify cross:center" class="title">
          <div class="border"></div>
          <p >活动说明</p>
          <div class="border"></div>
        </div>
        <p>1、2018.7.10 0点自动将融合碎片换算成开宝箱机会，每10个碎片换成一次机会，融合碎片可通过融合进化获取；</p>
        <p>2、玩家可通过宝箱开出“创世马、神马、万利碎片以及免费套马券等精美礼品”；</p>
        <p>3、本次开宝箱活动将于2018.7.15  24点结束；</p>
        <p>4、活动最终解释权归万利马所有。</p>
      </div>
    </scroll>
    <my-dialog :dialogOpen="dialog">
      <div class="dialog takeCenter">
        <p style="color: #ffffff;font-size: 0.48rem">恭喜获得</p>
        <div flex="main:center cross:center" style="padding: 0.5rem">
          <div style="width: 40%" v-if="newHorseInfo">
            <horse-info :Info="newHorseInfo" id="bronResult" style="width:100%;" :type="4" ></horse-info>
          </div>
          <div class="plus" v-if="isTwo()">+</div>
          <div class="tick" v-if="lassoCount" @click="lasso">
            <img src="../../assets/img/activity/tick.png" >
          </div>
          <div class="tick" v-if="wlPiecesCount" >
            <img src="../../assets/img/activity/suipain.png" style="width: 50% ">
            <p style="color: #ffffff;top: 0.5rem;position: relative">万利碎片X{{wlPiecesCount}}</p>
          </div>
        </div>
        <p flex="main:center " class="info"><span  v-if="newHorseInfo">{{getType(newHorseInfo)}}一匹</span><span style="width: 20%" v-if="isTwo()"></span><span v-if="lassoCount">套马卷{{lassoCount}}张</span></p>
        <button class="sure"@click="sure"></button>
      </div>
    </my-dialog>
  </div>
</template>

<script>
  import Scroll from "../../components/scroll/scroll";
  import MyDialog from "../../components/dialog";
  import HorseInfo from "../../components/tigerInfo";
  import common from '../../components/common'
  export default {
    name: "chest",
    components: {HorseInfo, MyDialog, Scroll},
    data(){
      return{
        closeClass:"chest-close  show",
        openClass:'chest-open',
        dialog:false,
        newHorseInfo:"",
        time:0,
        lassoCount:0,
        wlPiecesCount:0
      }
    },
    created(){
      this.getCount();
    },
    methods:{
      getCount:function(){//获取次数
        this.$axios.get("/api/activity/evolutionbigboxcount/").then(
          res=>{
            let result = res.data;
            if(result.IsSuccess){
              this.time = result.Result;

            }else{
              this.$get_error('tips',result.Code,result.Message);
            }
          },error=>{
            this.$get_error('network');
          }
        )
      },
      isTwo:function(){
        return  this.newHorseInfo &&this.lassoCount?true:false;
      },
      lasso:function(){
        this.$router.push('/Horses')
      },
      sure:function(){
        this.opened();
        this.dialog = false;
      },
      opening:function(){
        this.closeClass = "chest-close show shake";
      },
      opened:function(){
        this.closeClass = "chest-close  show";
        this.openClass = "chest-open";
      },
      getType:function (info) {
        if(info.IsGenesis){
          return '创世马'
        }else if(info.IsStud){
          return '神马'
        }else{
          return '骏马'
        }
      },//马种类
      openSuccessful:function(){
        this.closeClass = "chest-close show shake";
        let self= this;
        this.$refs.chest.addEventListener("webkitAnimationEnd",function () {
          setTimeout(function(){
            self.closeClass = "chest-close  shake";
            self.openClass = "chest-open show ";
            setTimeout(function () {
              self.dialog = true;
            },500)
          },200)
        },false)
      },
      openFail:function(){
        this.closeClass = "chest-close show";
      },
      open:function () {//点击宝箱
        if(this.closeClass  =="chest-close show shake" )return;
        if(!this.time){
          this.$tips('当前没有剩余次数');
          return
        }
        this.opening();
        this.$axios.get('/api/activity/evolutionbigbox/').then(
          res=>{
            let result = res.data;
            if(result.IsSuccess){
              this.time = result.Result.count;
              this.lassoCount = result.Result.lassoCount;
              this.wlPiecesCount = result.Result.wlPiecesCount;
              this.newHorseInfo = result.Result.horseInfo;
              if( this.newHorseInfo){
                this.newHorseInfo.horse = common.svgApi+result.Result.horseInfo.HorseKey;
              }
              this.openSuccessful()
            }else{
              this.openFail();
              this.$get_error('tips',result.Code,result.Message);
            }
          },error=>{
            this.openFail();
            this.$get_error('network');
          }
        )
      }
    }
  }
</script>

<style scoped>
  .warp{
    width: 100%;
    height: 5rem;
    position: relative;
  }
  .dialog{
    text-align: center;
    background-image: url("../../assets/img/activity/diabg.png");
    background-size: 100% 100%;
    width: 80%;
    padding: 0.5rem 0;
    background-repeat: no-repeat;
  }
  .chest-close,.chest-open{
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
  }
  .show{
    z-index: 10;
    opacity: 1;
  }
  .shake{
    -webkit-animation:shake 1.2s linear;
  }
  .shakeing{
    -webkit-animation:shakeing 1.2s infinite;
  }
  .chest-close:active{-webkit-transform:scale(1.05);-webkit-transition:all .3s;}
  @-webkit-keyframes shakeing {
    0% {
      -webkit-transform: scale(1.1) rotate(8deg);
      -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 8deg);

    }

    6%{
      -webkit-transform: scale(1.1) rotate(-8deg);
      -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -8deg);
    }

    18%, 30%,42%{
      -webkit-transform: scale(1.1) rotate(8deg);
      -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 8deg);

    }

    12%,24%, 36%,48%{
      -webkit-transform: scale(1.1) rotate(-8deg);
      -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -8deg);

    }
    54%{
      -webkit-transform: scale(1.1) rotate(8deg);
      -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 8deg);
    }

    60%{
      -webkit-transform: scale(1.1) rotate(-8deg);
      -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -8deg);
    }
    80% {
      -webkit-transform: scale(1.1) rotate(8deg);
      -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 8deg);
    }
    90% {
      -webkit-transform: scale(1.1) rotate(-8deg);
      -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -8deg);
    }
    100% {
      -webkit-transform: scale(1.1) rotate(8deg);
      -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 8deg);
    }

  }
  @-webkit-keyframes shake {
    0% {
      -webkit-transform: scale(1.1) rotate(8deg);
      -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 8deg);

    }

    6%{
      -webkit-transform: scale(1.1) rotate(-8deg);
      -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -8deg);
    }

    18%, 30%,42%{
      -webkit-transform: scale(1.1) rotate(8deg);
      -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 8deg);

    }

    12%,24%, 36%,48%{
      -webkit-transform: scale(1.1) rotate(-8deg);
      -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -8deg);

    }
    54%{
      -webkit-transform: scale(1.1) rotate(8deg);
      -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 8deg);
    }

    60%{
      -webkit-transform: scale(1.1) rotate(-8deg);
      -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -8deg);
    }




    80% {
      -webkit-transform: scale(1.1) rotate(8deg);
      -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 8deg);
    }
    90% {
      -webkit-transform: scale(1);
      -webkit-transform: scale3d(1, 1, 1);
    }
    100% {
      -webkit-transform: scale(1);
      -webkit-transform: scale3d(1, 1, 1);
    }

  }
  .chance{
    color: #074D5B;
    font-size: 0.4rem;
    margin-top: 0.5rem;
    text-align: center;
  }
  .chance span{
    color: #E50011;
  }
  .content{
    margin-top: 1rem;
    padding: 0 0.5rem;
    text-align: center;
  }
  .content>img{
    width: 30%;
    height: 3.4rem;
  }
  .content p{
    font-size: 0.36rem;
    color: #074D5B;
  }
  .border{
    width: 35%;
    height: 1px;
    background-image: linear-gradient(to right, #074D5B 0%, #074D5B 50%, transparent 50%);
    background-size: 8px 1px;
    background-repeat: repeat-x;
  }
  .title{

    color: #074D5B;
    text-align: center;
    position: relative;
    margin-bottom: 0.5rem;
  }
  .title p{
    font-size: 0.4rem;
    font-weight: 600;
  }
  .tick{
    display: inline-block;
    text-align: center;
    width: 40%;
  }
  .tick img{
    width: 100%;
  }
  .info{
    padding: 0 0.5rem;
    text-align: center;
  }
  .info span{
    color: #ffffff;
    display: inline-block;
    width: 40%;
    text-align: center;
  }
  .sure{
    background-image: url("../../assets/img/activity/sure.png");
    background-size: 100% 100%;
    width: 2rem;
    height: 1rem;
    border-radius: 0.3rem;
    position: relative;
    top: 1rem;
  }
  .plus{
    color: #ffffff;
    font-weight: 700;
    font-size: 0.5rem;
    line-height:1rem;
    height: 1rem;
    width:20%
  }
</style>
