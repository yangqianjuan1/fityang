<template>
  <div class="tigerList">

    <div flex="main:justify box:mean"  class="total">
      <p>猛虎：{{tigerTotal.SteedTotal}}</p>
      <p>神虎：{{tigerTotal.StudTotal}}</p>
      <p>创世虎：{{tigerTotal.GenesisTotal}}</p>
    </div>
    <div >
      <div style="margin: 0.3rem 0" >
        <div style="padding: 0 0.5rem;margin-bottom: 0.2rem" flex="main:justify cross:center ">
       <div @click="sort('feed')"><sort name="喂养" :up="feedSort"   ></sort></div>
       <div @click="sort('union')"><sort name="联盟" :up="unionSort"   ></sort></div>
       <div @click="sort('comBet')"><sort name="战斗力" :up="comBetSort"   ></sort></div>
       <div @click="sort('breed')"><sort name="生育值" :up="breedSort"   ></sort></div>
        </div>
       <div style="padding: 0 0.5rem" flex="main:justify"> <selection :values="selectValue" :selectFunc="selectFunc" ref="select"></selection>
        <!--<span style="position: relative"> <input class="ui-select" style="padding-right: 30px;color:#9F9F9F;font-size: 14px " placeholder="搜索" v-model="searchValue"/><i class="search ct" @click="search()"></i></span>-->
        <!--<div class="ui-select"><input  style="padding-right: 0.9375rem;color:#9F9F9F; " placeholder="搜索ID" v-model="searchValue"/><i class="search ct" @click="search()"></i></div>-->
        <div class="ui-select" flex="main:justify cross:center">
          <input  style="height:0.7rem;line-height:0.7rem;text-indent:0.325rem;width:70%;color:#9F9F9F;" type="number"  class="noStroke" placeholder="搜索ID" v-model.number="searchValue"/>
          <img src="../../assets/img/transactin/search.png" class="search ct" @click="search()">
        </div>
       </div>
      </div>
      <contain style="position: relative;text-align: center;padding: 0"  >
        <!--<ul  v-if="!empty" :style="getPadding()">-->
        <ul  v-if="!empty" style="text-align: left">
          <!--<li v-for="(info,index)tigersrses"  class="tiger" :style="index%2!==0?'margin-left:0.3rem':''"  >-->
          <li v-for="(info,index) in tigers"  class="tiger"   >
            <div @click="myDetail(info)">
              <tiger-info :Info="info" class="tigerIcon" :type="3" ></tiger-info>
            </div>
            <!--<button class="feed right miaobian-green"  v-if="getCanFeedTtigerDetailtail.FeedTimes)">喂养({{(getCanFeedTtigerDetailtail.FeedTimes))}})</button>-->
            <button class="feed btn-violet btn-disabled" :disabled="getCanFeedTime(info.FeedTimes)===0?'disabled':undefined" @click="beFeed(info,index)" >喂养<span v-if="getCanFeedTime(info.FeedTimes)">({{getCanFeedTime(info.FeedTimes)}})</span></button>
          </li>
        </ul>
        <img  style="width: 2rem;padding: 1rem 0" src="../../assets/img/dialog/empty.png" v-if="empty"/>
        <paging :totalPage="totalPage" :pageFunc="listFuc"  ref="pages" ></paging>
      </contain>

    </div>
    <foot></foot>

  </div>
</template>

<script>
  import Contain from "../../components/contain";
  import Paging from "../../components/paging";
  import TigerInfo from "../../components/tigerInfo";
  import Foot from "../../components/footer";
  import Selection from "../../components/index/select";
  import LoginRegisterFind from "../../components/loginRegisterFind";
  import ComfireDialog from "../../components/comfireDialog";
  import Sort from "../../components/sort";

  export default{
    components: {
      Sort,
      ComfireDialog,
      LoginRegisterFind,
      Selection,
      Foot,
      TigerInfo,
      Paging,
      Contain},
    name: "tigerList",
    props:{
      tigers:{
        type:Array,
        default:[]
      },
      tigerTotal:{
        GenesisTotal:'',
        SteedTotal:'',
        StudTotal:'',
      },
      totalPage:{

      },
      empty:{

      },
      unionSort:{
        default:true
      },
      comBetSort:{
        default:true
      },
      breedSort:{
        default:true
      },
      feedSort:{
        default:true
      },
      listFuc:{}
    },
    data(){
      return {
        dialogOpen:'',


        beautyCountType:1,//0 1
        tigerNo:'',     //搜索id
        level:-1, /// 创世马3,SSR=2,S=1,N=0
        empty:false,
        selectValue:[
          {value:"全部"},
          {value:"创世虎"},
          {value:"神虎"},
          {value:"猛虎"},
        ],
        searchValue:'',

        tigers:[]
      }
    },
    mounted(){
    this.listFuc();
    },
    destroyed(){
      this.$store.commit('SET_TIGER_LIST_NO','');
      this.$store.commit('SET_TIGER_LIST_LEVEL',-1);
    },
    methods:{
      reSetPage:function(){
        this.$refs.pages.reSetPage();
      },
      init:function(){
        if(this.$refs.select){
          this.$refs.select.init();
        }
        this.searchValue = "";
        this.$store.commit('SET_TIGER_LIST_WEIGHT',1);//家族数
        this.$store.commit('SET_TIGER_LIST_NO','');
        this.$store.commit('SET_TIGER_LIST_FEED',1);//喂养次数
        this.$store.commit('SET_TIGER_LIST_LEVEL',-1);
      },
      reSetRules:function(type){
        if(type ==="select"){
          this.searchValue = "";
          // this.$store.commit('SET_TIGER_LIST_WEIGHT',null);//家族数
          // this.$store.commit('SET_TIGER_LIST_FEED',null);//喂养次数
          this.$store.commit('SET_TIGER_LIST_NO',null);
          this.$store.commit('SET_TIGER_LIST_LEVEL',null);
        }
        if(type ==="search"){
          // if(this.$refs.select){
          //   this.$refs.select.init();
          // }
            // this.$store.commit('SET_TIGER_LIST_WEIGHT',null);//家族数
            // this.$store.commit('SET_TIGER_LIST_FEED',null);//喂养次数
          this.$store.commit('SET_TIGER_LIST_NO',null);
        }
        if(type ==="sort"){
          // if(this.$refs.select){
          //   this.$refs.select.init();
          // }
          this.searchValue = "";
          this.$store.commit('SET_TIGER_LIST_NO',null);
        }


      },
      getCanFeedTime:function (FeedTimes) {
        return  this.$store.state.maxFeedTimes-FeedTimes;
      },
      beFeed:function (info,index) {
        // this.feed.dialog = true;

        this.$emit('feed',true);
        info.index = index;
        this.$emit('feedInfo',info);

      },//喂养按钮

      getPadding:function () {
        if(document.getElementById('warp'))
        {
          let number = Math.floor(document.getElementById('warp').offsetWidth%(parseFloat(document.documentElement.style.fontSize.split('px')[0])*4.15));
          return{ 'padding':'0 '+number/2+'px'}
        }
      },
      myDetail:function (info) {
        this.$router.push({path:'/tigerDetail',query:{Key:info.HorseKey}})
      },
      sort:function (type) {
      this.$emit('sort',type);
       this.reSetRules('sort')
      },
      search:function (val) {
        this.reSetRules("search");
        this.$store.commit('SET_TIGER_LIST_NO',this.searchValue);
        this.listFuc();
      },
      getLevel:function (val) {//分类
        switch (val){
          case '全部':return  -1;
          case '创世虎':return 4;
          case '神虎':return 2;
          case '猛虎':return 1;
        }
      },
      selectFunc:function (value) {
        this.reSetRules("select");
        this.$store.commit('SET_TIGER_LIST_LEVEL',this.getLevel(value));
        this.listFuc();
      }
    },
    watch:{
      searchValue:function (val) {
        this.$store.commit('SET_TIGER_LIST_NO',val);
      }
    }
  }
</script>

<style scoped>
  .tigerList {
    margin: 0 auto;

  }
  .total p{
    text-align: center;
    font-size: 0.37rem;
    margin:  0 0.5rem;
  }
  .feed{
    height: 0.8rem;
    line-height: 0.8rem;
    width: 80%;
    margin-top: 0.2rem;
  }
  .select{
    position: relative;
    min-height: 70vh;
    padding: 1.25rem 0;
    /*min-height: 21.25rem;
     */
    box-shadow: 0 0 3.125rem #F4F4F8;
    -webkit-box-shadow: 0 0 3.125rem #F4F4F8;
    -moz-box-shadow: 0 0 3.125rem #F4F4F8;
    /*-moz-border-radius: 0.625rem;*/
    /*!* Firefox *!*/
    /*-webkit-border-radius: 0.625rem;*/
    /*!* Safari 和 Chrome *!*/
    /*border-radius: 0.625rem;*/
    /* Opera 10.5+, 以及使用了IE-CSS3的IE浏览器 */
  }
  select::-ms-expand {
    display: none;
  }
  .arrow {
    height:0.3rem;
    width: 0.2rem;
    display: inline-block;
    background-size: 100% 100% ;
  }
  .arrow-up {
    background-image: url("../../assets/img/transactin/up.png");
  }
  .arrow-down{
    background-image: url("../../assets/img/transactin/down.png");

  }
  .ui-select{
    overflow: hidden;
    width:30%;
    background-color:#ffffff;
    color: #4F2111;
    font-size: 14px;
    height: 0.6rem;
    text-align: left;
    position: relative;
    border-radius: 5px ;
    border: 1px solid #4F2111;
  }
  select{
    width:100%;
    height:1.125rem;
    line-height:1.125rem;
    opacity: 0;
    position: absolute;
    top:0;
    left:0;
  }
  input::-webkit-input-placeholder{
    font-size: 0.3rem;
    color: #4F2111;
  }
  .slot{
    position: relative;
    cursor: pointer;
    color: #ffffff;
    height:0.6rem;
    line-height: 0.6rem;
    padding:0 0.3rem;
    background: #502211;
    border-radius: 0.2rem;
  }
  .slot span{
    font-size: 0.3rem;
  }
  .search{
    cursor: pointer ;
    display: inline-block;
    height: 80%;
    position: absolute;
    right:0;
  }
  .price{
    margin: 0.5rem 0;
    text-align: center;
    width: 8.75rem;
    height: 0.71875rem;
    font-size: 0.5rem;
    color: #333333;
  }
  .tiger{
    display: inline-block;
    cursor: pointer;
    /*width: 4rem;*/
    text-align: center;
    width: 33.3%;
    padding: 0 0.25rem;
    margin-top: 0.3rem;
    /*margin-top: 0.2rem;*/
  }
  .contain:after{
    content: '';
    visibility: hidden;
    font-size: 0;
    height: 0;
    display: block;
    clear: both;
  }
</style>
