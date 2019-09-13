<template>
  <div>
    <div class="tools" >
      <img class="new" src="../../assets/img/transactin/height.png" v-if="Info.IsHighest">
      <img  v-lazy="horse" class="horse">
      <p class="name cl"><span style="font-size: 0.3rem">{{Info.MaxAuctionAmount}}GXS</span></p>
      <slot></slot>
    </div>
    <div>
      <p class="price num-abc-warp miaobian-shenlan">万利碎片X{{Info.Count}}</p>
  </div>
    <div   style="padding: 0 5%" class="usual">
      <p class="detail" v-if="Info.SellerNick">出售者：{{Info.SellerNick}}</p>
      <p class="detail"  v-if="Info.MaxAuctionNick">竞价者：{{Info.MaxAuctionNick}}</p>
      <p class="detail" >剩余时间：{{countDownTime}}</p>
      <p v-if="Info.CurAuctionAccountAmount" class="miaobian-lan detail">我的竞价：{{getMyAuction}}</p>

    </div>

  </div>
</template>

<script>
  export default{
    name: "tools",
    props: {
      reflash:{
        type:Function,
      },
      type:{
        default:1,
      },
      Info:{
        horse:'',
      }
    },
    created(){
      this.setImgError(this.Info.horse);
    },
    mounted(){
      if(this.Info.ServiceNowTime &&this.Info.TradeEndTime){
        this.dayBetween(this.Info.ServiceNowTime,this.Info.TradeEndTime);
      }
    },
    data(){
      return {
        sell:false,
        news:true,
        horse:"../../../static/img/tools/Fragment.png",
        countDownDate:0,
        countDownTime:'00:00:00',
        Interval:0,
      }
    },
    destroyed(){
      this.$Lazyload.$off('error');
      if(this.Interval )
        clearInterval(this.Interval )
    },
    computed:{
      getMyAuction:function () {
        if(this.Info.CurAuctionAccountAmount ==="未出价"){
          return  this.Info.CurAuctionAccountAmount
        }else{
          return this.Info.CurAuctionAccountAmount+"GXS";
        }
      },
      horseUrl:function () {
        return this.Info.horse;
      },
      getCountDownTime:function () {
        return this.Info.ServiceNowTime;
      }
    },
    methods:{
      setImgError:function(val){
        let FinUrl =  this.getQueryString(val);
        let self= this;
//        if(FinUrl){
//          this.horse = FinUrl;
          this.$Lazyload.$once('error', function ({ el, src }) {
            setTimeout(function () {
              self.horse = self.horse+"?t="+Math.random();
            },10000)
          })
//        }
      },
      getQueryString: function (url) {//改url
        if(url){
          return  url;
        }else{
          return null
        }
      },
      getMedal:function (Info) {
        switch (this.getType(Info)){
          case '创世马':return this.medalGold;
          case '神马':return this.medalSilver;
          case '骏马':return this.medalCopper;
        }
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
      dayBetween :function (sysTime,endTime){
        let beginString = sysTime.replace(/-/g, "/");
        let endString = endTime.replace(/-/g, "/");
        let begin = new Date(beginString);
        let end = new Date(endString);
        this.countDownDate = end.getTime() - begin.getTime();

        let self = this;
        if(this.Interval ){
          clearInterval(this.Interval );
        }

        this.Interval = setInterval(this.countLoop,1000);

      },//倒计时
      countLoop:function () {
        if(this.countDownDate<=0) return;
        this.countDownDate = this.countDownDate-1000;
        let countDown = new Date( this.countDownDate);
        let d,h,m,s;
        if (this.countDownDate>=0) {
          h = Math.floor(this.countDownDate/1000/60/60);
          if(h<10)h='0'+h;
          m = Math.floor(this.countDownDate/1000/60%60);
          if(m<10)m='0'+m;
          s = Math.floor(this.countDownDate/1000%60);
          if(s<10)s='0'+s;
        }

        this.countDownTime =  h+':'+m+':'+s;
      },

    },
    watch:{
      horseUrl(val){
        if(val){
          this.setImgError(val);
        }
      },
      getCountDownTime:function (val) {
        if(val && this.Info.TradeEndTime)
        {
          this.dayBetween(val,this.Info.TradeEndTime);
        }
      },
      countDownTime:function (val) {
        if(val ==='0:0:0'){
          if(this.Interval){
            clearInterval(this.Interval )
          }
          this.reflash();
        }
      }
    }
  }
</script>

<style scoped>
  .horse{
    width: 100%;
    /*height: 100%;*/
    position: relative;

    /*top: 2rem;*/
  }
  .detail{
    font-size: 0.25rem;
    white-space:nowrap;
    text-align: left;
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
  .tools {
    padding:  0 0.2rem;
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
  .seconds{
    bottom: 0.3125rem;
    width: 3.96875rem;
    height: 0.625rem;
    padding: 0.1rem 0 ;
    font-size: 0.4375rem;
    color: #333333;
    text-align: center;
  }
  .num2{
    z-index: 10;
    position: absolute;
    top: 0;
    right:5%;
    display: block;
    height: 0.7rem;
    line-height: 0.7rem;
    /*height: 0.5rem;*/
    /*line-height: 0.5rem;*/
    /*background: #ffffff;*/
    background-image: url("../../assets/img/transactin/bianhaokuang.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    padding:0 0.3rem  ;
    transform: rotate(-10deg);
    /*border-radius:0 0.4375rem 0.4375rem 0;*/
    font-size: 0.3rem ;
    color: #ffffff;
  }
  .num{
    z-index: 10;
    position: absolute;
    top: 1rem;
    right:5%;
    display: block;
    height: 0.5rem;
    line-height: 0.5rem;
    /*height: 0.5rem;*/
    /*line-height: 0.5rem;*/
    /*background: #ffffff;*/
    /*background-image: url("../assets/img/transactin/bianhaokuang.png");*/
    background-size: 100% 100%;
    background-repeat: no-repeat;
    padding:0 0.3rem  ;
    transform: rotate(-10deg);
    /*border-radius:0 0.4375rem 0.4375rem 0;*/
    font-size: 0.3rem ;
    color: #ffffff;
  }
  .price{
    display: block;
    font-size: 0.293rem;
    /*width:2.5rem;*/
    position: relative;
    top: -0.2rem;
    color: #ffffff;
    white-space:nowrap;
    /*max-width: 4rem;*/
    text-align: center;
    padding: 0.1rem 0.4rem;
    margin:  0 auto;
    /*height: 0.466rem;*/
    background-image: url("../../assets/img/transactin/dilan.png");
    background-size: 75% 100%;
    background-position: center;
  }
  .name{
    display: block;
    word-WRAP: break-word;
    width: 80%;
    font-size: 0.3rem;
    background-image: url("../../assets/img/transactin/heidi.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    text-align: center;
    color: #ffffff;
    padding: 0.1rem 0 ;
    position: absolute;
    bottom: 0.3rem;
  }
  .new{
    width: 1.5rem;
    /*height: 1rem;*/
    position: absolute;
    bottom: 20%;
    right: 0;
    z-index: 2;
    /*background-image: url("../assets/img/user/chushouzhong.png");*/
    /*background-size: 100% 100%;*/
  }
</style>
