<template>
  <div class="match">
    <div class="title select">
      <!--<img src="../../assets/img/index/bg-1-horse.png"  class="icon cl">-->
      <p style="font-size: 0.5rem;color: #666666;position: relative;top: 3.5rem;" v-if="gaming">第{{stage}}比赛结束还有{{countDownTime}}</p>
      <p style="font-size: 0.5rem;color: #666666;position: relative;top: 3.5rem;" v-if="!gaming">第{{stage}}比赛投注还有{{countDownTime}}</p>
      <p class="Jackpot cl">第{{stage}}期奖池：{{TotalAmount|ETH}} ETH</p>
    </div>
    <div class="list select">
      <!--<contain>-->
        <button :class="isRecord?'unLabel':'label'" @click="join">参赛马匹</button>
        <button :class="!isRecord?'unLabel':'label'" style="margin-left: 2.5rem;" @click="Record">参赛记录</button>
        <!--<selection :values="selectValue" :selectFunc="selectFunc"></selection>-->
        <div v-if="!isRecord ">
          <button class="right" style=" background: #2d6d7b;color: #ffffff;width: auto;padding: 0 0.3125rem" @click="all">该页全部参赛</button>
          <p class="right Once">单次报名费：{{pirceOnce|ETH}}ETH</p>

          <!--参赛马匹表-->
          <table style="width:100%;height: 10.875rem;position: relative;top: 0.5rem;border-collapse:collapse;"   cellpadding="0" cellspacing="0" v-loading="myHorseLoad" >
            <colgroup>
              <col width="20%">
              <col width="60%">
              <col width="20%">
            </colgroup>
            <thead>
            <tr style="background: #F5F5F5;border: none">
              <th>马匹</th>
              <th>编号</th>
              <th>操作</th>
            </tr>
            <tr v-for="horse in horses" style="border-bottom: 1px solid  #F8F8F8">
              <td><img :src="horse.horse" class="icon-table takeCenter"></td>
              <td>#{{horse.HorseNo}}</td>
              <td><button :disabled='getState(horse)' class=" cur takeCenter" style="width: 100%" @click="once(horse)">{{getText(horse)}}</button></td>
            </tr>

            </thead>
          </table>
          <img class="cl"  style="margin-top: 1.5rem" src="../../assets/img/dialog/empty.png" v-if="horseListEmpty"/>
          <paging  :pageFunc="getHorseList" :totalPage="totalPage" ref="page" ></paging>

        </div>

        <!--参赛记录表-->
        <div  v-if="isRecord &&!isDetail" v-loading="recodeLoad">
          <table style="width:100%;height:10.875rem; border-collapse:collapse "   cellpadding="0" cellspacing="0" >
            <colgroup>
              <col width="25%">
              <col width="25%">
              <col width="25%">
              <col width="25%">
              <!--<col width="13%">-->
              <!--<col width="13%">-->
              <!--<col width="13%">-->
            </colgroup>
            <thead>
            <tr style="background: #F5F5F5;border: none">
              <th>赛期</th>
              <!--<th>冠军马匹</th>-->
              <!--<th>编号</th>-->
              <!--<th>冠军奖金</th>-->
              <th>我的投入</th>
              <th>我的奖金</th>
              <th>详情</th>
            </tr>
            <tr v-for="bet in betList" style="border-bottom: 1px solid  #F8F8F8">
              <td>第{{bet.Issue}}期</td>
              <!--<td><img v-lazy="bet.horse" class="icon-table takeCenter"></td>-->
              <!--<td >{{bet.horseNo}}</td>-->
              <!--<td>{{bet.championReward}}</td>-->
              <td>{{bet.myInvestment}}</td>
              <td>{{bet.myReward}}</td>
              <td><button style="background: #ffffff;color:#2d6d7b;border: 1px solid #2d6d7b" @click="getDetail(bet.Issue)">查看详情</button></td>
            </tr>
            </thead>
          </table>
          <img class="cl"  style="margin-top: 1.5rem" src="../../assets/img/dialog/empty.png" v-if="RecordEmpty"/>
          <filp  :pageFunc="getBet" :itemSize="filpIsFull"></filp>
        </div>


        <!--参赛记录表详情-->
        <div  v-if="isDetail" v-loading="recodeDetailLoad">
          <P style="font-size: 20px;color: #000000;">第{{betDetailList.Issue}}期获奖记录详情</P>
          <button style="float: right;margin-bottom: 0.9375rem;background: #2D6D7B;color: #ffffff" @click="back">返回</button>
          <table style="width:100%;height: 10.875rem;top: 1.5625rem; border-collapse:collapse "   cellpadding="0" cellspacing="0" >
            <colgroup>
              <col width="20%">
              <col width="20%">
              <col width="20%">
              <col width="20%">
              <col width="20%">
            </colgroup>
            <thead>
            <tr style="background: #F5F5F5;border: none">
              <th>马匹</th>
              <th>编号</th>
              <th>获奖状态</th>
              <th>奖金</th>
            </tr>
            <tr v-for="betDetail in betDetailList.AccountBetHorses" style="border-bottom: 1px solid  #F8F8F8">
              <td>
                <img :src='betDetail.horse' class="icon-table takeCenter">
              </td>
              <td >#{{betDetail.HorseNo}}</td>
              <td>
                <p style="border-bottom: 1px solid  #F8F8F8">{{betDetail.Ranking}}</p>
                <p >{{betDetail.TotalRanking}}</p>
              </td>
              <td>
                <p style="border-bottom: 1px solid  #F8F8F8">{{betDetail.GroupReward}}</p>
                <p >{{betDetail.Reward}}</p>
              </td>
            </tr>
            </thead>
          </table>
          <paging  :pageFunc="detail" :totalPage="totalPageDetail" ref="page3"></paging>
        </div>
      <!--</contain>-->
    </div>
    <foot></foot>

    <!--全部参赛dialog-->
    <my-dialog :dialogOpen="allCheckInfo.allCheck">
      <div class="Check takeCenter">
        <p class="takeCenter">共<span>{{allCheckInfo.num}}</span>匹马参加赛马比赛，需支付<span>{{allCheckInfo.price|ETH}}</span>ETH！</p>
        <button @click="allCheckSure" class="checkSure">确认</button>
        <button @click="allCheckCancle" class="checkCancle">取消</button>
      </div>
    </my-dialog>

    <!--单匹参赛dialog-->
    <my-dialog :dialogOpen="onceCheckInfo.onceCheck">
      <div class="Check takeCenter">
        <p class="takeCenter"><span>#{{onceCheckInfo.id}}</span>参加比赛，需支付<span>{{onceCheckInfo.price|ETH}}</span>ETH！</p>
        <button @click="onceCheckSure" class="checkSure">确认</button>
        <button @click="onceCheckCancle"  class="checkCancle">取消</button></div>
    </my-dialog>

  </div>
</template>

<script>
  import Foot from "../../components/footer";
  import Contain from "../../components/contain";
  import Selection from "../../components/index/select";
  import Paging from "../../components/paging";
  import MyDialog from "../../components/dialog";
  import common from '../../components/common'
  import Filp from "../../components/filp";
  export default{
    components: {
      Filp,
      MyDialog,
      Paging,
      Selection,
      Contain,
      Foot},
    name: "match",
    data(){
      return {
        filpIsFull:false,
        myHorseLoad:true,
        recodeLoad:true,
        recodeDetailLoad:true,
        pirceOnce:"",
        totalPage:0,
        totalPageDetail:0,
        countDownDate:0,
        countDownTime:'00:00',
        totalHorse:0,
        pageSize:20,
        isDetail:false,
        stage:0,//期数
        Issue:0,
        Interval:0,//倒计时定时器值
        allInterval:0,//请求定时器值
        TotalAmount:99999999.999999,//奖池
        gaming:'',//比赛投注中
        winningList:[],
//              selectValue:[
//                {value:"已参赛"},
//                {value:"未参赛"},
//
//              ],
        isRecord:false,
        horses:[],
        horseListEmpty:false,
        RecordEmpty:false ,
        betList:[],
        betDetailList:{Issue:'',detail:[]},
        allCheckInfo:{ allCheck:false,num:'',price:''},
        onceCheckInfo:{ onceCheck:false,id:'',price:"",onceKey:'',horse:''}
      }
    },
    created(){
      this.getMath();
      this.getHorseList(1);
      this.allInterval =setInterval(this.getMath,10000);
      this.pirceOnce = this.$store.state.BetAmount;
    },
    beforeRouteLeave(to,from,next){
        if(this.Interval){
          clearInterval(this.Interval)
        }
      if(this.allInterval){
        clearInterval(this.allInterval)
      }
      next();
    },
    methods:{
      getBet:function (index) {
        this.recodeLoad = true;
        let data={size:this.pageSize,offset:(index-1)*this.pageSize,};
        let size = true;
        this.$axios.post('/api/bet/list/',data).then(
          res=>{
            let result = res.data;
            if(result.IsSuccess){
              if(!result.Result) return;
              if(result.Result.length>0){
                this.RecordEmpty = false;
                if(result.Result.length <this.pageSize){
                  this.filpIsFull = false;
                }else{
                  this.filpIsFull = true;
                }
                this.betList = result.Result;
                for(let horse in this.betList ){
                  this.betList[horse].horse=this.betList[horse].Winners? common.svgApi+result.Result[horse].Winners[0].HorseId:'';
                  this.betList[horse].horseNo=this.betList[horse].Winners? '#'+result.Result[horse].Winners[0].HorseNo:'——';
                  this.betList[horse].championReward=this.betList[horse].Winners?result.Result[horse].Winners[0].Reward+'ETH':'——';
                  this.betList[horse].myInvestment=this.betList[horse].AccountBetAmount?result.Result[horse].AccountBetAmount+'ETH':'——';
                  this.betList[horse].myReward=this.betList[horse].AccountRewardAmount?result.Result[horse].AccountRewardAmount+'ETH':'——';
                }

              }else{
                this.filpIsFull = false;
                this.RecordEmpty = true;
              }
//              size = this.pageSize>result.Result.length?false:true;
//              this.totalPage=Math.ceil(result.Result.Total/this.pageSize);
              this.recodeLoad = false;
            }else{

              size = false;
              this.$get_error('tips',result.Code,result.Message);
              this.recodeLoad = false;
            }
          },error=>{
            size = false;
            this.$get_error('reload');
            this.recodeLoad = false;
          }
        );
        return size;
      },//获取参赛记录list
      getHorseList:function (index) {
        this.myHorseLoad = true;
        let data={pageSize:this.pageSize,pageIndex:index,};
        this.$axios.post('/api/horse/list/',data).then(
          res=>{
            let result = res.data;
            if(result.IsSuccess){
              if(!result.Result.Data) return;
              if(result.Result.Data.length>0){
                this.horseListEmpty = false;
                this.horses= result.Result.Data;
                for(let horse in this.horses ){
                  this.horses[horse].horse= common.svgApi+result.Result.Data[horse].HorseKey;
                }
              }else{
                this.horseListEmpty = true;
              }
              this.totalHorse = result.Result.total;
              this.totalPage=Math.ceil(result.Result.total/this.pageSize);
              this.myHorseLoad = false;
            }else{
              this.$get_error('tips',result.Code,result.Message);
              this.myHorseLoad = false;
            }
          },error=>{
            this.$get_error('reload');
            this.myHorseLoad = false;
          }
        );
      },//获取参赛马匹list
      dayBetween :function (beginTime,endTime){
        let begin = new Date(beginTime);
        let end = new Date(endTime);
        this.countDownDate = end.getTime() - begin.getTime();
        let self = this;
        this.Interval = setInterval(this.countLoop,1000)
      },//倒计时
      countLoop:function () {
        if(this.countDownDate<=0) return;
        this.countDownDate = this.countDownDate-1000;
        let countDown = new Date( this.countDownDate);
        let m =  countDown.getMinutes();
        if(m<10)
        {
          m = '0'+m;
        }
        let s =  countDown.getSeconds();
        if(s<10)
        {
          s = '0'+s;
        }
        this.countDownTime =  m+':'+s;
      },
      join:function () {
        this.isRecord = false;
        this.isDetail = false;
        this.getHorseList(1);
        if(this.$refs.page){
          this.$refs.page.reSetPage();
        }
      },//参赛马匹页
      Record:function () {
        this.isRecord = true;
        this.isDetail = false;
        if(this.$refs.page2){
          this.$refs.page2.reSetPage();
        }
        this.getBet(1);
      },//参赛记录页
      getMath:function () {
        this.$axios.get('/api/getbetpool/').then(
          res=>{
            let result = res.data;
            if(result.IsSuccess){
              let BetBeginTime = new Date(result.Result.BetBeginTime.replace(/-/g,'/')).getTime();
              let BetEndTime = new Date(result.Result.BetEndTime.replace(/-/g,'/')).getTime();
              let SysTime = new Date(result.Result.SysTime.replace(/-/g,'/')).getTime();
              this.stage = result.Result.Issue;
              this.TotalAmount = result.Result.TotalAmount;
              if(result.Result.AccountBetHorses){
                this.winningList = result.Result.AccountBetHorses
              }else{
                this.winningList =[]
              }
              if( SysTime >= BetBeginTime )
              {
                if(SysTime <=BetEndTime){
                  if(this.Interval)
                  {
                    clearInterval(this.Interval);
                  }
                  this.gaming = true;
                  this.dayBetween(SysTime,BetEndTime)
                }
              }else {
                if(this.Interval)
                {
                  clearInterval(this.Interval);
                }
                this.gaming = false;
                this.dayBetween(SysTime,BetBeginTime)

              }
            }else{
              this.$get_error('tips',result.Code,result.Message);
            }

          },error=>{
            clearInterval(this.allInterval);
            this.$get_error('reload');

          }
        )
      },//比赛实况实情
      getText:function (horse) {
        if(!this.winningList) return;
        for(let index in this.winningList){
          if(this.winningList[index].HorseId ===horse.HorseKey){
            return '已报名';
          }
        }
        return '报名参赛';
      },
      getState:function (horse) {
        if(!this.winningList) return;
        for(let index in this.winningList){
          if(this.winningList[index].HorseId ===horse.HorseKey) {
            return 'disable';
          }
        }
        return undefined;
      },
      all:function () {
        this.allCheckInfo.allCheck = true;
        this.allCheckInfo.num= this.getAllNum();
        this.allCheckInfo.price =  this.allCheckInfo.num *this.pirceOnce;

      },//全部参赛
      getAllNum:function () {
        let num  = this.horses.length;
        if(!this.winningList) return;
        for(let index in this.winningList){
          for(let horseIndex in this.horses){
            if(this.winningList[index].HorseId ===this.horses[horseIndex].HorseKey)
            {
              num--
            }
          }
        }
        return num;
      },//统计当前页全部参赛数量
      once:function (horse) {
        this.onceCheckInfo.onceCheck = true;
        this.onceCheckInfo.id=horse.HorseNo;
        this.onceCheckInfo.horse = horse;
        this.onceCheckInfo.onceKey=horse.HorseKey;
        this.onceCheckInfo.price = this.pirceOnce;
      },//单匹参赛
      allCheckSure:function () {
        let horseKeyArr = [];
        for(let horse of this.horses){
          horseKeyArr.push(horse.HorseKey);
        }
        let data={issue:this.stage,horseKeys:horseKeyArr};
        this.$axios.post('/api/bet/multi/',data).then(
          res=>{
            let result = res.data;
            if(result.IsSuccess){
              this.$message({
                type:'success',
                message:'报名成功'
              });
              this.allCheckInfo.allCheck = false;
              this.$alert('共'+result.Result.count+'匹马成功参加比赛', '批量参加结果', {
                confirmButtonText: '确定',
              });
              this.getMath();
            }else{
              this.$get_error('tips',result.Code,result.Message);
              this.allCheckInfo.allCheck = false;
            }
          },error=>{
            this.$get_error('network');
            this.allCheckInfo.allCheck = false;
          }
        )
      },//全部参赛确认框确认
      allCheckCancle:function () {
        this.allCheckInfo.allCheck = false;
      },
      onceCheckSure:function () {
        let data={issue:this.stage,horseKey:this.onceCheckInfo.onceKey};
        this.$axios.post('/api/bet/',data).then(
          res=>{
            let result = res.data;
            if(result.IsSuccess){
              this.$message({
                type:'success',
                message:'报名成功'
              });
              this.getMath();
              this.onceCheckInfo.onceCheck = false;
            }else{
              this.$get_error('tips',result.Code,result.Message);
              this.onceCheckInfo.onceCheck = false;
            }
          },error=>{
            this.$get_error('network');
            this.onceCheckInfo.onceCheck = false;
          }
        )
      },//单匹参赛确认框确认
      onceCheckCancle:function () {
        this.onceCheckInfo.onceCheck = false;
      },
      getDetail:function (Issue) {
        this.Issue = Issue;
        if(this.$refs.page3){
          this.$refs.page3.reSetPage();
        }
        this.detail(1);

      },//参赛记录详情页
      detail:function (index) {
        this.recodeDetailLoad = true;
        let data={size:this.pageSize,offset:(index-1)*this.pageSize,issue:this.Issue};
        this.$axios.post('/api/bet/issue/',data).then(
          res=>{
            let result = res.data;
            if(result.IsSuccess){
              this.isDetail = true;

              if(!result.Result) return;
              this.betDetailList = result.Result;
              if(result.Result.AccountBetHorses.length>0){
                this.betDetailList.detail = result.Result.AccountBetHorses;
                for(let horse in this.betDetailList.AccountBetHorses ){
                  let GroupReward = result.Result.AccountBetHorses[horse].GroupReward?result.Result.AccountBetHorses[horse].GroupReward:0;
                  this.betDetailList.detail[horse].horse= common.svgApi+result.Result.AccountBetHorses[horse].HorseId;
                  this.betDetailList.detail[horse].Ranking= result.Result.AccountBetHorses[horse].Ranking?'小组赛第'+result.Result.AccountBetHorses[horse].Ranking+'名':'——';
                  this.betDetailList.detail[horse].GroupReward= result.Result.AccountBetHorses[horse].GroupReward?result.Result.AccountBetHorses[horse].GroupReward.toFixed(6)+'ETH':"——";
                  this.betDetailList.detail[horse].TotalRanking=  result.Result.AccountBetHorses[horse].TotalRanking?'决赛第'+result.Result.AccountBetHorses[horse].TotalRanking+'名':'——';
                  this.betDetailList.detail[horse].Reward= result.Result.AccountBetHorses[horse].Reward?(result.Result.AccountBetHorses[horse].Reward-GroupReward).toFixed(6)+'ETH':'——';
                }
              }else{
              }
              this.totalPageDetail=Math.ceil(result.Result.Total/this.pageSize);
              this.recodeDetailLoad = false;
            }else{
              this.$get_error('tips',result.Code,result.Message);
              this.recodeDetailLoad = false;
            }
          },error=>{
            this.$get_error('reload');
            this.recodeDetailLoad = false;
          }
        );
      },
      back:function () {
        this.isDetail = false;
        if (this.$refs.page2) {
          this.$refs.page2.reSetPage();
        }
      },
    },
    watch:{
      countDownTime:function (val) {
        if(val === '00:00')
        {
          this.getMath();
          this.getHorseList(1);
        }
      }
    }
  }
</script>

<style scoped>
  .match {
    margin: 0 auto;
    /*width: 90%;*/
  }
  .icon-table{
    width: 1rem;
    height: 1rem;
    -webkit-border-radius:50%;
    -moz-border-radius:50%;
    border-radius:50%;
  }
  .title{
    height: 7.8125rem;
    background-image:url('../../assets/img/index/bg-1.png');
    background-repeat: no-repeat;
    -webkit-background-size:100% 100%;
    background-size:100% 100%;
    position: relative;
    padding: 0 3%;
  }
  .icon{
    position: absolute;
    top:1rem;
    /*width: 20%;*/
    height: 2rem;
    right: 3%;
  }
  p{
    text-align: center;
  }
  .Jackpot{
    width:80%;
    background: #2D6D7B;
    font-size: 0.5625rem;
    color: #ffffff;
    display: inline-block;
    padding: 0.1875rem 0.9375rem;
    bottom: 1.25rem;
    -webkit-border-radius:0.15625rem;
    -moz-border-radius:0.15625rem;
    border-radius:0.15625rem;
  }
  .list{
    margin-top: 1.75rem;
    background: #ffffff;
    min-height: 10rem;
    position: relative;
    padding: 0.5rem;
  }
  button{
    padding: 0 0.3125rem;
    height: 1.125rem;
    cursor:pointer ;
    -webkit-border-radius:0.15625rem;
    -moz-border-radius:0.15625rem;
    border-radius:0.15625rem;
  }
  .label{
    background:#ffffff ;
    color:#2d6d7b ;
    width:2.5rem;
    height: 1.125rem;
    top:-1.125rem;
    position: absolute;
    cursor: pointer;
    -webkit-border-radius:0.15625rem 0.15625rem 0 0;
    -moz-border-radius:0.15625rem 0.15625rem 0 0;
    border-radius:0.15625rem 0.15625rem 0 0;
  }
  .unLabel{
    width:2.5rem;
    top:-1.125rem;
    position: absolute;
    background: #2d6d7b;
    color:#ffffff;
    border: none;
    -webkit-border-radius:0.15625rem 0.15625rem 0 0;
    -moz-border-radius:0.15625rem 0.15625rem 0 0;
    border-radius:0.15625rem 0.15625rem 0 0;
  }
  .cur{
    background: #ffffff;
    color: #2d6d7b;
    border: 1px solid #2d6d7b;
  }
  .cur[disabled]{
    background: #F9F9FD;
    color: #D6D6D6;
    border: none;
  }
  .Once{
    height: 1.125rem;
    line-height: 1.125rem;
    font-size: 0.5rem;
    color:#2d6d7b ;
    padding: 0 0.625rem;
  }
  th,td{
    text-align: center;
  }
  th{
    height: 0.125rem;
    color: #7F7F7F;
    font-size:14px;
    line-height: 1.375rem;
  }
  td{
    /*height: 2.34375rem;*/
    /*line-height: 2.34375rem;*/
    word-WRAP: break-word;
    padding: 0.5rem 0;
    position: relative;
  }
  td p{
    height: 50%;
    /*line-height: 50%;*/
    /*padding: 0.2rem 0.2rem;*/
  }
  .Check{
    position: relative;
    width:80%;
    height: 7.5rem;
    background: #ffffff;
    -webkit-border-radius:0.3125rem;
    -moz-border-radius:0.3125rem;
    border-radius:0.3125rem;
    padding: 1.25rem;
  }
  .Check button{
    width: 2.5rem;
  }
  .Check span{
    color: #FF0000;
  }
  .checkSure{
    background: #2D6D7B;
    color: #ffffff;
    position: absolute;
    right: 1.25rem;
    bottom: 1.25rem
  }
  .checkCancle{
    background: #ffffff;
    color: #2D6D7B;
    border: 1px solid #2D6D7B;
    position: absolute;
    right: 4.375rem;
    bottom: 1.25rem
  }

</style>
