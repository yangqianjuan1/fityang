<template>
  <div class="bg">
    <scroll>
      <div >
        <img src="../../assets/img/family/bg.png" style="width: 85%;display: block;margin: 1.2rem auto 0.8rem">
        <input class="invite" placeholder="请输入盟主ID" v-model="familyId">
        <div class="info">
          <p style="font-size: 0.37rem;text-align: center;margin: 0.2rem 0">什么是联盟邀请</p>
          <p style="font-size: 0.33rem">1、输入你所要加入的盟主ID，并购买一只“神虎“，该神虎将会成为其堂主；</p>
          <p style="font-size: 0.33rem;margin-top: 0.2rem">2、各老虎发展联盟关系可获取额外的联盟奖励。</p>
        </div>
        <button   class="btn2 btn-violet"  @click="buy">
          <span >{{$store.state.inviteBuyPrice}}FMVP</span>
          <span >立即购买</span>
        </button>
      </div>
    </scroll>
    <my-dialog :dialogOpen="newTiger">
      <div  class="born takeCenter" flex=" dir:top main:center cross:center">
        <tiger-info :Info="newTigerInfo" id="bronResult" style="width: 5rem;" :type="4"></tiger-info>
        <button class="sure btn-yellow" @click="sure">确认领取</button>
      </div>
    </my-dialog>
  </div>
</template>

<script>
  import Scroll from "../../components/scroll/scroll";
  import MyDialog from "../../components/dialog";
  import common from '../../components/common'
  import TigerInfo from "../../components/tigerInfo";
  export default {
    name: "joinFamily",
    components: {
      TigerInfo,
      MyDialog, Scroll},
    data(){
      return{
        newTiger:false,
        newTigerInfo:null,
        familyId:null,
      }
    },
    methods:{
      buy:function () {
        if(!this.familyId) {
          this.$tips('请输入盟主ID');
          return;
        }
        this.$axios.get('/api/user/buyhorsebyinvite/?k='+this.familyId).then(
          res=>{
            let result = res.data;
            if(result.IsSuccess){
              this.newTigerInfo = result.Result.horseInfo;
              this.newTigerInfo.horse = common.svgApi+this.newTigerInfo.HorseKey;
              this.newTiger = true;
            }else{
              this.$get_error('tips',result.Code,result.Message);
            }
          },error=>{
            this.$get_error('network');
          }
        )
      },
      sure:function () {
        this.newTiger = false;
        this.$router.replace({path:'/user',query:{type:0}});
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
  .btn2{
    padding: 0.3rem 1rem;
    margin: 0 auto;
    display: block;
    cursor: pointer;
    border-radius: 0.2rem;
  }
  .invite{
    color: #464646;
    text-indent: 1em;
    border-radius: 0.1rem;
    border: 1px solid #917C4E;
    font-size: 0.2667rem;
    line-height: 0.85rem;
    width: 60%;
    height: 0.85rem;
    margin: 0 auto;
    display: block;
  }
  .invite::placeholder{
    color:#999999 ;
    font-size: 0.2667rem;
  }
  .sure{
    margin-top: 0.2rem;
    padding: 0.2rem 0.5rem;
    z-index: 10;
  }
</style>
