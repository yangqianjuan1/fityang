<template>
  <div style="position: relative">
    <div class="spineTiger" :class="getBg(Info)">
      <tiger-img :Style="Info.Style" style="top: -0.5rem;"></tiger-img>
      <div class="cl " style="width: 100%;bottom: -0.1rem ">
      </div>
    </div>
  </div>
</template>

<script>
  import TigerImg from "../tigerImg";
  //  import common from '../components/common'
  export default{
    components: {TigerImg},
    name: "spineTiger",
    props: {
      reflash:{
        type:Function,
      },
      type:{
        default:1,
        //1 交易 2 拍卖 3 我的老虎 4捕虎
      },
      Info:{
        tiger:'',
      }
    },
    created(){
      if(!this.Info)return;
      this.setImgError(this.Info.tiger);
    },

    data(){
      return {
        countDownDate:0,
        countDownTime:'00:00:00',
        Interval:0,
        sell:false,
        news:true,
        tiger:"",
        isFlags:false,
        tigerHeight:0
      }
    },
    destroyed(){
      this.$Lazyload.$off('error');
      if(this.Interval )
        clearInterval(this.Interval )
    },

    methods:{
      setImgError:function(val){
        let FinUrl =  this.getQueryString(val);
        let self= this;
        if(FinUrl){
          this.tiger = FinUrl;
          this.$Lazyload.$once('error', function ({ el, src }) {
            setTimeout(function () {
              self.tiger = FinUrl+"?t="+Math.random();
            },10000)
          })
        }
      },
      getQueryString: function (url) {//改url
        if(url){
          return  url;
        }else{
          return null
        }
      },

      getBg:function (Info) {
        switch (this.getType(Info)){
          case '创世虎':return 'bgGold';
          case '神虎':return 'bgSilver';
          case '猛虎':return 'bgCopper';
        }

      },
      getType:function (info) {
        if(info.IsGenesis){
          return '创世虎'
        }else if(info.IsStud){
          return '神虎'
        }else{
          return '猛虎'
        }
      },//虎种类

    },
  }
</script>

<style scoped>
  .detail{
    font-size: 0.25rem;
    white-space:nowrap;
    text-align: left;
  }
  .bgGold{
    background-image: url("../../assets/img/dialog/jing.png");
  }
  .bgSilver{
    background-image: url("../../assets/img/dialog/ying.png");
  }
  .bgCopper{
    background-image: url("../../assets/img/dialog/tong.png");
  }
  .medal{
    position: absolute;
    top: 3%;
    right:5%;
    width: 20%;
    z-index: 10;
  }
  .flags{
    position: absolute;
    width: 30%;
    right:5%;
    top: 8%;
    z-index: 10;
  }
  .spineTiger {

    background-size: 90% auto;
    background-repeat: no-repeat;
    background-position: bottom;
    display: inline-block;
    position: relative;
    width:100%;
    /*height: 4rem;*/
    /*border-radius: 0.3125rem;*/
    /*-webkit-border-radius: 0.3125rem;*/
    /*-moz-border-radius: 0.3125rem;*/
  }

  .price{
    display: block;
    font-size: 0.226rem;
    /*width:2.5rem;*/
    color: #ffffff;
    white-space:nowrap;
    /*max-width: 4rem;*/
    text-align: center;
    /*padding: 0.2rem 0.3rem;*/
    margin:  0 auto;
    height: 1rem;
    line-height: 0.95rem;
    background-image: url("../../assets/img/transactin/dilan.png");
    background-size: 70% 100%;
    background-position: center;
  }

</style>
