<template>
  <div class="details" >
    <div class="contain" >
      <!--<p class="num miaobian-qianhang"tigerDetailtail.HorseNo}}</p>-->
      <!--<span class="rare miaobian-qianhang">体tigerDetailtail.Weight}}kg</span>-->
      <!--<img :stigerDetailtail.rare" class="rare">-->
      <!--<img v-lazy="horse" class="horse takeCenter">-->
      <tiger-img :Style="detail.Style" class="horse takeCenter" v-if="detail.Style"></tiger-img>
      <!--<p class="seconds" v-itigerDetailtail.IsGenesis">剩余选美次数：<spatigerDetailtail.RemnantProfitTimes}}</span></p></div>-->
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import TigerImg from "./tigerImg";
  export default{
    components: {TigerImg},
    name: "myDetails",
    props: {
      detail:{}
    },
    mounted(){
    },
    destroyed(){
      this.$Lazyload.$off('error');
    },
    methods:{
      getQueryString: function (url) {//改url
        if(url){
          return  url;
        }else{
          return null
        }
      }
    },
    computed:{
      horseUrl:function () {
        return this.detail.horse;
      }
    },
    watch:{
      horseUrl(val){
        let FinUrl =  this.getQueryString(val);
        if( FinUrl){
          this.horse = FinUrl;
          let self= this;
          this.$Lazyload.$once('error', function ({ el, src }) {
            setTimeout(function () {
              self.horse = FinUrl+"?t="+Math.random();
            },10000)
          })
        }
      }
    },
  }
</script>

<style scoped>
  .details {
    background-image: url("../assets/img/transactin/detail-bg.png");
    background-size: 100% 100%;
    position: relative;
    width: 100%;
  }

  .contain{
    position: relative;
    margin: 0 auto;
    width: 100%;
    height: 5.77rem;
  }
  .horse{
    width: 5rem;

    position: absolute!important;
    margin:  0 auto;
  }
  .seconds{
    bottom: 1.5625rem;
    height: 0.625rem;
    font-size: 16px;
    text-align: center;
    color: #000000;
  }
  .num{
    background-image: url("../assets/img/transactin/lightLeft.png");
    background-size: 100% 100%;
    text-align: center;
    position: absolute;
    top: 36%;
    left: 6%;
    min-width: 2rem;
    display: block;
    padding: 0.3rem 0.1rem;
    font-size:14px ;
    color: #fff;
  }
  .rare{
    text-align: center;
    background-image: url("../assets/img/transactin/lightLeft.png");
    background-size: 100% 100%;
    position: absolute;
    top:1.6875rem;
    right: 0.4375rem;

    padding: 0.3rem 0.3rem;

    font-size: 14px ;
    color: #fff;
  }

</style>
