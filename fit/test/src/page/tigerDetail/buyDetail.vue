<template>
  <div class="detail">
    <div class="content"  :style="{'max-width':$store.state.maxWidth}"></div>
    <scroll
      ref="scroll"
      :pullUpLoad="setPullUpLoad"
      :pullUpLoadFuc="pullUpLoadFuc"
      pullUpLoadFucParam="UpLoad"
      bottom="2.6">
      <div   :style="setScrollMinHeight()">
        <my-details :detail="detail"></my-details>
        <div >
          <div class="Info">
            <div  style="height: 100%" flex="dir:top main:center">
              <p  flex="cross:center"><span class="ssr">{{detail.RareLevel|rare}}</span><span style="display: inline-block;height: 0.5rem">(战斗力：{{detail.CombatPower}})</span></p>
              <p style="font-size: 0.42677rem;line-height: 0.7rem">{{getType(detail)}}#{{detail.HorseNo}}</p>
              <p  class="num-abc-warp">{{detail.HorseKey}}</p>
            </div>
            <p ><span style="display: inline-block;margin-right: 0.3rem">堂主：{{detail.SonCount}}</span><span style="display: inline-block">弟子：{{detail.GrandsonCount}}</span></p>
            <!--<p style="font-size:18px">性tigerDetailtail.Disposition}}</p>-->
            <p flex="main:justify"><span>体重：{{detail.Weight}}kg</span><span v-if="!detail.IsGenesis">生育值：{{detail.BreedLimit}}</span></p>
          </div>
        </div>
       <div style="position: relative;top: -0.4rem;">
         <ul flex="main:center cross:center box:mean" :class="getCur" style="background-size: 60% 100%;" class=" label">
          <li class="title" :class="type===0?'miaobian-hong white':'miaobian-bai'" @click="feed"></li>
          <li class="title" :class="type===1?'miaobian-hong white':'miaobian-bai'" @click="profit"></li>
          <li class="title" :class="type===2?'miaobian-hong white':'miaobian-bai'" @click="from"></li>
        </ul>
        <record  :Records="Records" :type="type" :empty="FeedEmpty"></record>
       </div>
      </div>
    </scroll>
      <button style="position: fixed; bottom: 2.6rem;" @click="buy" class="btn btn-yellow cl" v-if="!getAuction">
        <p style="color: #ffffff;">{{detail.HorsePrice}}FMVP 立即购买</p>
      </button>
    <comfire-dialog v-model="buyDialog" :sure="onceCheckSure">
      <p style="font-size: 0.5rem;text-align: center">确认支付</p>
      <p  style="margin-top: 0.3rem;text-align: center;">购买{{getType(detail)}}<span style="display: inline-block;" class="special-color">#{{detail.HorseNo}}</span>，确认支付<span style="display: inline-block;" class="special-color">{{detail.HorsePrice}}</span>FMVP！</p>
    </comfire-dialog>
  </div>
</template>

<script>

  import Foot from "../../components/footer";
  import common from '../../components/common'
  import MyDialog from "../../components/dialog";
  import Record from "../../components/record";
  import Scroll from "../../components/scroll/scroll";
  import ComfireDialog from "../../components/comfireDialog";
  import MyDetails from "../../components/details";
  export default{
    components: {
      MyDetails,
      ComfireDialog,
      Scroll,
      Record,
      MyDialog,
      Foot,},
    name: "buyDetail",
    data(){
      return {
        detail:{},
        buyDialog:false,//购买弹框控制
        Records:[],
        feedOffset:0,
        familyOffset:0,
        FeedEmpty:false,
        feedRecords:[
        ],
        familyRecords:[
        ],
        type:0,//0喂养记录 1家族收益 2 来源
        clientTotal:0,
        pageSize:20,
      }
    },
    mounted(){
      let TradeKey = this.$route.query.tigerKey;
      this.getInfo(TradeKey);


    },

    computed:{
      getAuction:function () {
        return this.$route.query.type
      },
      getCur:function () {
        switch (this.type){
          case 0: return 'nav_0';
          case 1: return 'nav_1';
          case 2: return 'nav_2';
        }
      },
      setPullUpLoad:function () {
        return {
          threshold:-60,
        }
      },//上拉设置
    },
    methods:{
      getType:function (info) {
        if(info.IsGenesis){
          return '创世虎'
        }else if(info.IsStud){
          return '神虎'
        }else{
          return '猛虎'
        }
      },//虎种类
      pullUpLoadFuc:function () {
        if(this.type===0){
          this.getFeedList('UpLoad');
        }else if(this.type===1){
          this.getFamilyList('UpLoad');
        }
        this.$refs.scroll.finishiPullUp();
      },//上拉加载
      getFeedList:function (type) {
        let offset;
        if(type ==='UpLoad'){
          offset = this.feedOffset;
        }else{
          offset =0;
        }
        let data = {horseId: this.detail.HorseKey,offset:offset,size:this.pageSize};
        this.$axios.post('/api/horse/profits/', data).then(
          res => {
            let result = res.data;
            if (result.IsSuccess) {
              if(result.Result.length >0){
                this.FeedEmpty = false
                let record = result.Result;
                for(let index in record)
                {
                  record[index].Time = record[index].Time.slice(5,10);
                }

                if(type ==='UpLoad'){
                  this.Records = this.Records.concat(record);
                }else{
                  this.Records = record
                }
                this.feedOffset = this.Records.length;
              }else{
                if(type ==='UpLoad'){
                  // this.$tips('暂无更多数据')

                }else{
                  this.FeedEmpty = true
                }
              }
            } else {
              this.$get_error('tips',result.Code,result.Message);
            }
          }, error => {
            this.$get_error('network');
          }
        );
      },//喂养收益请求
      getFamilyList:function (type) {
        let offset,total;
        if(type ==='UpLoad'){
          offset = this.familyOffset;
        }else{
          offset =0;
        }
        if(type ==='UpLoad'){
          total = this.clientTotal;
        }else{
          total =0;
        }
        let data = {horseId: this.detail.HorseKey,offset:offset,size:this.pageSize,clientTotal:total};
        this.$axios.post('/api/horse/familyprofits/', data).then(
          res => {
            let result = res.data;
            if (result.IsSuccess) {
              this.clientTotal = result.Result.total;
              if(result.Result.Data.length>0){
                this.FeedEmpty = false;
                let record = result.Result.Data;
                for(let index in record)
                {
                  record[index].Time = record[index].Time.slice(5,10);
                }

                if(type ==='UpLoad'){
                  this.Records = this.Records.concat(record);
                }else{
                  this.Records = record
                }
                this.familyOffset = this.Records.length;
              }else{
                if(type ==='UpLoad'){
                  // this.$tips('暂无更多数据')
                }else{
                  this.FeedEmpty = true
                }
              }
            } else {
              this.$get_error('tips',result.Code,result.Message);
            }
          }, error => {
            this.$get_error('network');
          }
        );
      },//家族收益请求
      setScrollMinHeight:function () {
        if(document.getElementById('warp'))
        {
          return 'min-height:'+(document.getElementById('warp').offsetHeight+1)+'px'
        }
      },
      getInfo:function (horseKey) {
        this.$axios.get('/api/horse/trade/getdetail/?horseKey='+horseKey).then(
          res=>{
            let result = res.data;
            if(result.IsSuccess){

              this.detail = result.Result;
              this.detail.horse = common.svgApi+result.Result.HorseKey;
              this.getFeedList();
            }else{
              this.$get_error('tips',result.Code,result.Message);
            }
          },error=>{
            this.$get_error('reload');
          }
        )
      },//虎详情请求
      buy:function () {
        this.buyDialog = true;
      },//购买按钮弹框
      feed:function () {
        this.Records = [];
        this.type = 0;
        this.getFeedList();
      },//点击喂虎label
      profit:function () {
        this.Records = [];
        this.type = 1;
        this.getFamilyList();
      },//点击家族label
      from:function () {
        this.Records = [];
        this.FeedEmpty = false;
        this.type = 2;
        this.Records = this.detail;
      },//点击来源label
      onceCheckSure:function () {
        this.buyDialog = false;
        let data = {horseTradeKey:this.detail.HorseTradeKey};
        this.$axios.post('/api/horse/trade/buy/',data).then(
          res=>{
            let result = res.data;

            if(result.IsSuccess){
              this.$tips('购买成功');

              this.$router.push({path:'/user',query:{type:0}});
            }else{

              this.$get_error('tips',result.Code,result.Message);
            }

          },error=>{
            this.$get_error('network');
          }
        )
      },//确认购买
    }
  }
</script>

<style scoped>
  span{
    display: block;
  }
  .content{
    background-image: url("../../assets/img/transactin/detail.png");
    background-size: 100% 100%;
    position: fixed;
    top:0;
    bottom: 0;
    width: 100%;
  }
  .Info{
    position: relative;
    color: #502111;
    font-size:0.32rem ;
    padding: 0.5rem 1.5rem;
    z-index: 10;
    min-height: 5.38rem;
    background-image: url("../../assets/img/transactin/detail-di.png");
    background-size: 100% 100%;
  }
  .Info p{
    line-height: 0.5rem;
  }
  .btn{
    padding: 0.2rem 0.8rem;
    display: block;
  }
  .Check button{
    width:30%;
    height: 1.125rem;
    cursor:pointer ;
    -webkit-border-radius:0.15625rem;
    -moz-border-radius:0.15625rem;
    border-radius:0.15625rem;
  }
  .Check span{
    color: #FF0000;
  }
  .cur{
    color: #2D6D7B;
    border-bottom: 1px solid #2D6D7B;
  }
  .title{
    height: 100%;
    /*width: 33.3%;*/
  }
  .nav_0{
    background: url("../../assets/img/transactin/nav_detail_0.png") center no-repeat;
  }
  .nav_1{
    background: url("../../assets/img/transactin/nav_detail_1.png") center no-repeat;
  }
  .nav_2{
    background: url("../../assets/img/transactin/nav_detail_2.png") center no-repeat;
  }
  .ssr{
    width:1.253rem ;
    height:0.58667rem ;
    font-size:0.2933rem ;
    color: #ffffff;
    background:#03ADCB ;
    border-radius: 0.1rem;
    text-align: center;
    line-height: 0.58667rem ;
    display: inline-block;
    margin-right: 0.2rem;
  }
  .label{
    padding:0 20%;
    text-align: center;
    height: 1.5rem;
    position: relative;
  }
</style>
