<template>
  <div >
    <scroll>
      <div style="text-align: center">
        <img src="../../assets/img/activity/wmbt.png" style="width: 100%">
        <contain style="text-align: center">
          <div class="content">
            <div class="info cl">活动详情</div>
            <div class="people">邀请人数：{{detailList.InviteCount}}</div>
            <p>1、活动期间新用户注册就送一匹骏马（不可出售）；</p>
            <p>2、通过系统赠送的骏马邀请10位好友注册并充值，即送神马一匹（该活动每人限得一匹神马）。</p>
            <p>3、活动时间：{{detailList.StartTime}}—{{detailList.EndTime}}</p>
            <p>4、活动最终解释权归万利马所有。</p>
          </div>
        </contain>
        <button class="buy" @click="Receive">立即领取</button>
      </div>
    </scroll>
    <my-dialog :dialogOpen="newHorse">
      <div  class="born takeCenter" flex=" dir:top main:center cross:center">
        <horse-info :Info="newHorseInfo" id="bronResult" style="width: 5rem;" :type="4"></horse-info>
        <button class="sure" @click="sure">确认领取</button>
      </div>
    </my-dialog>
  </div>
</template>

<script>
  import common from '../../components/common'
  import Contain from "../../components/contain";
  import Foot from "../../components/footer";
  import Copy from "../../components/copy";
  import LoginRegisterFind from "../../components/loginRegisterFind";
  import Scroll from "../../components/scroll/scroll";
  import MyDialog from "../../components/dialog";
  import HorseInfo from "../../components/tigerInfo";
  import ComfireDialog from "../../components/comfireDialog";
  export default{
    components: {
      ComfireDialog,
      HorseInfo,
      MyDialog,
      Scroll,
      LoginRegisterFind,
      Copy,
      Foot,
      Contain},
    name: "wmbt",
    data(){
      return {
        dialogOpen:'',
        newHorse:false,
        newHorseInfo:'',
        detailList:
          {
            InviteCount:'0',
          },
      }
    },
    mounted(){
      let key = this.$route.query.key;
      this.getInfo(key);
    },
    methods:{
      getInfo:function (key) {

        this.$axios.get('/api/activity/wmbtpageinfo/?key='+key).then(res=>{
          let result= res.data;
          if(result.IsSuccess){
              this.detailList = result.Result;
          }else{
            this.$get_error('tips',result.Code,result.Message);
          }
        },error=>{
          this.$get_error('network');
        })
      },
      sure:function () {
        this.newHorse  =false;
      },
      Receive:function () {
        this.$axios.get('/api/activity/rewardgifthorse/').then(
          res=>{
            let result = res.data;
            if(result.IsSuccess){
              this.newHorseInfo  = result.Result.horse;
              this.newHorseInfo.horse= common.svgApi+result.Result.horse.HorseKey;
              this.newHorse = true;
            }else{
              this.$get_error('tips',result.Code,result.Message);
            }
          },
          error=>{
            this.$get_error('reload');
          }
        )
      }
    }
  }
</script>

<style scoped>
  .invite {
    position: relative;
  }
  .title{

    font-size: 16px;
    text-align: center;
    margin: 0.3rem 0;
  }
  .info{
    color: #ffffff;
    display: inline-block;
    padding: 0  1rem;
    background-image: url("../../assets/img/activity/title.png");
    background-size: 100% 100% ;
    font-size: 0.5rem;
    height: 0.9rem;
    line-height: 0.9rem;
    position: absolute;
    top: -18px;
  }
  .table-title{
    background-image: url("../../assets/img/user/list-mid.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  .table-title div{
    text-align: center;
    font-size: 0.4rem;
    margin: 0 1px;
    height: 1rem;
    line-height: 1rem;

  }
  .items{
    text-align: center;
    padding: 0.3rem 0.3rem;
  }
  .content p{
    font-size: 0.4rem;
    color: #074D5B;
    line-height: 0.6rem;
  }
  .content{
    position: relative;
    text-align: left;
    border-radius: 10px;
    border: 5px solid #ffffff ;
    background-color:rgba(0,0,0,0.2);
    padding: 1rem 0.5rem;
    margin: 0.5rem 0;
  }

  .btn{
    background-image: url("../../assets/img/transactin/goumaianniu.png");
    background-size: 100% 100%;
    position: fixed;
    bottom: 1.6rem;
    padding: 0.3rem 0;
    margin: 0.5rem auto;
    display: block;

  }
  .sure{
    margin-top: 0.2rem;
    padding: 0.3rem 0.5rem;
    color:#ffffff;
    background-image: url("../../assets/img/dialog/sell-cur.png");
    background-size: 100% 100%;
    border-radius: 0.2rem;
  }
  .btn span{
    display: inline;
    padding: 0.1rem 0.2rem;
  }
  .people{
    text-align: center;
    line-height: 0.75rem;
    margin-bottom: 0.5rem;
    color: #FFF850;
    width: 100%;
    height: 1rem;
    background-image: url("../../assets/img/invite/yaoqingdi.png");
    background-size: 100% 100% ;
  }
  .invite-btn{
    margin-top: 2rem;
  }
  .invite-btn span{
    color: #2D6D7B;
    font-size: 0.5rem;
    display: inline-block;
    height: 100%;
  }
  .invite-btn button{
    width: 4rem;
    height: 1rem;
    margin-top: 0.5rem;
    -webkit-border-radius:0.71875rem;
    -moz-border-radius:0.71875rem;
    border-radius:0.71875rem;
    background:#2D6D7B ;
    color: #ffffff;
    font-size: 0.625rem;
    right:0.625rem ;

  }

  .time{
    position: absolute;
    bottom: -0.4rem;
    background-image: url("../../assets/img/activity/time.png");
    background-size: 100% 100% ;
    height: 0.8rem ;
    font-size: 0.3rem;
    color: #ffffff;
    border-radius: 0.2rem;
    padding: 0 0.3rem;
    white-space:nowrap;
    line-height: 0.8rem;
  }
  .sell p{
    font-size: 0.5rem;
    line-height: 1rem;
    margin-left: 0.5rem;
  }
  .sell p:nth-child(2){
    text-decoration:line-through
  }
  .buy{
    background-image: url("../../assets/img/dialog/huangda.png");
    background-size: 100% 100%;
    height: 1rem;
    color: #D07416;
    line-height: 1rem;
    padding: 0 0.5rem;
    border-radius: 0.2rem;
    margin: 0.5rem 0;
  }
</style>
