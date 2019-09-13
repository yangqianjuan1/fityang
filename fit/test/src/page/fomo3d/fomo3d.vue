<template>
	
  <div class="fomo3d">
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
    <div class="top">
      <div class="htitle" flex="cross:center main:right">
        <img src="../../assets/img/activity/release-rule.png" class="right" @click="open">
      </div>
      <transition name="countDown">
      <div class= "time cl" v-if="countDown">
        <p >距离开奖：{{time}}</p>
      <p>累积奖池：{{info.Funds}}FMVP</p>
      </div>
      </transition>
    </div>
    <div>
      <div class="title" flex="main:center box:mean" :class="getCur" >
        <div  v-for="(item,index) in listTitle"   @click="chooseTab(item,index)"></div>
      </div>
      <div class="content"  :style="{'max-width':$store.state.maxWidth}">
        <fomo3d-list @choose="getChoose"  :info="info" v-if="$route.name==='fomo3dList'"></fomo3d-list>
        <fomo3d-record @detail="details"  v-if="$route.name==='fomo3dRecord'" ref="record"></fomo3d-record>
				<fomo3d-history @detail="details"  v-if="$route.name==='fomo3dHistory'" ref="history"></fomo3d-history>
      </div>
    </div>
    <rule v-model="rule" class="rule">
      <p style="font-size: 0.4267rem;text-align: center">欢乐四选一规则</p>
      <p>1、每轮游戏初始为5分钟，每当有玩家选择购买其中一只动物，则游戏剩余时间计时器增加30秒，最高不超过15分钟；</p>
      <p>2、游戏初始购买价格为<span>{{$store.state.keyPrice}} FMVP</span>，每次购买都会上涨0.008%，所有玩家共享涨幅。例如：初次购买“狗”队为1FMVP，那么继续购买“牛”队花费为1.00008FMVP；</p>
	  <p>3、每一轮游戏结束，其总奖金池的<span>10%</span>将留作下轮游戏的“底池”奖金。且“底池”奖金将由四种动物平分；</p>
      <p>4、游戏倒计时为0时该轮游戏结束，判定最后买入者所在队伍获胜，分成比例如下：</p>
        <red-table :titleList="titleList" ></red-table>
       <div v-for="item in assignmentList" flex="main:center box:mean cross:center" style="text-align: center;">
        <p style="border-right: #D5D7DB dashed  0.1px;">{{item.name}}</p>
        <p style="border-right: #D5D7DB dashed  0.1px;">{{item.key}}</p>
        <p style="border-right: #D5D7DB dashed  0.1px;">{{item.keyOwner}}</p>
      	<p style="border-center: 0.1rem;font-size:2px;"><span>{{item.topfive}}</span></p>
      	<p style="border-center: 0.1rem;font-size:2px;"><span>{{item.topfive}}</span></p>
      </div>
      <div class="under-line"style="margin-bottom: 0.05rem"></div>
	  <p>5、若本轮游戏无人参与，该轮总奖金池的<span>99%</span>作下轮游戏的“底池”奖金。</p>
      <p>6、玩家每购买一次动物，都会有<span>0.1%</span>的几率获得空投的机会，空投金额为当前所投组奖金池的<span>1%</span>；</p>
      
      <p>7、四组奖金池共享倒计时；</p>
	  <p>8、近期战况只显示近期有效局；</p>
	  <p>9、每轮游戏结束后将会有5分钟左右的结算时间。</p>
    </rule>
    <comfire-dialog v-model="buy"  :sure="comBuy">
      <p class="keyTitle">购买动物({{getName}})</p>
      <div flex="box:mean" class="keyInput">
        <input placeholder="请输入购买数量" v-model="key"/>
        <p >@{{info.KeyPrice}}FMVP</p>
      </div>
      <p style="width: 90%;margin:  0 auto">需要{{getTotalPrice}}FMVP</p>
    </comfire-dialog>
    <comfire-dialog v-model="airDrop" :type="1" :sure="closeAirDrop">
      <p class="keyTitle">空投奖励</p>
      <p v-if="!airDropAmount" class="airDrop">很遗憾，本次购买未获得空投奖励</p>
      <p v-if="airDropAmount" class="airDrop">获得空投奖励<span>{{airDropAmount}}</span>FMVP</p>
    </comfire-dialog>
    <comfire-dialog v-model="bingo" :type="1" :sure="closeBingo">
      <!--<div class="ct">-->
        <p class="keyTitle">中奖啦！</p>
      <p  class="bingoWord" v-if="rewardResult.LastKeyRewardAmount">恭喜您获得最终奖励<span class="special-color" >{{rewardResult.LastKeyRewardAmount}}</span>FMVP!</p>
      <p class="bingoWord" v-if="rewardResult.TeamRewardAmount">恭喜您获得团队分红<span class="special-color" >{{rewardResult.TeamRewardAmount}}</span>FMVP!</p>
      <!--</div>-->
    </comfire-dialog>
  </div>
</template>

<script>
  import Tab from "../../components/tab";
  import Rule from "../../components/tips/rule";
  import Scroll from "../../components/scroll/scroll";
  import OneCancelDialog from "../../components/tips/oneCancelDialog";
  import Fomo3dList from "./fomo3dList";
  import Fomo3dRecord from "./fomo3dRecord";
	import fomo3dHistory from "./fomo3dHistory";
  import MyDialog from "../../components/dialog";
  import common from '../../components/common'
  import ComfireDialog from "../../components/comfireDialog";
  import RedTable from "../../components/red-table";
  
  import htitle from "../../components/title";
  import IndexFirst from "../../components/index/indexFirst";
  import Contain from "../../components/contain";
  import foot from "../../components/footer";
 
  import SendCode from "../../components/sendCode";
  
  import BScroll from 'better-scroll';
 
  export default{
    components: {
		
		
		SendCode,
		
		foot,
		Contain,
		IndexFirst,
		htitle,
		
		
      RedTable,
      Fomo3dRecord,
      Fomo3dList,
	  fomo3dHistory,
      ComfireDialog,
      MyDialog,
      OneCancelDialog,
      Scroll,
      Rule,
      Tab},
    name: "fomo3d",
    data(){
      return {
		  mapChat:'',
		  map:'',
		  height:'',
		  beginnersGuide:false,
		  BeginnersScroll:null,
		  BeginnersPageIndex:0,
		  login:false,
		  
		  
        rule:false,
        listTitle:[
          {routeName:'fomo3dList'},
          {routeName:'fomo3dRecord'},
		  {routeName:'fomo3dHistory'},
        ],
         titleList:['队伍','最终买入者','同组买入者','前5%买入者','下轮奖池'],
        assignmentList:[
            {name:'鱼',key:'25%',keyOwner:'50%',topfive:'10%',topfive:'10%'},
            {name:'狗',key:'38%',keyOwner:'37%',topfive:'10%',topfive:'10%'},
            {name:'马',key:'73%',keyOwner:'2%',topfive:'10%',topfive:'10%'},
            {name:'牛',key:'5%',keyOwner:'70%',topfive:'10%',topfive:'10%'},
            ],
        buy:false,
        time:"00:00:00",
        countDownDate:0,
        Interval:0,
        infoInterval:null,
        timeType:-1,//倒计时类型 false比赛时间 true报名时间
        waitTime:4,//报名时间
        comTime:1,//比赛时间
        chooseDlg:false,
        key:1,
        info:{
        },
        chooseInfo:{},
        airDrop:false,
        airDropAmount:0,
        countDown:true,//倒计时
        bingo:false,
        rewardResult:{}

      }
    },

    destroyed(){
      if(this.Interval){
        clearInterval(this.Interval )
      }
      if(this.infoInterval){
        clearInterval(this.infoInterval )
      }
    },
    mounted(){
      this.getInfo();
       this.infoInterval =setInterval(()=>{
         this.getInfo();
       },2000);
	   this.getBasic();


    },
    computed:{
      getName:function () {
        if(this.chooseInfo.Name){
            switch (this.chooseInfo.Name){
              case 'Dog':return "狗";
              case 'Horse':return "马";
              case 'Fish':return "鱼";
              case 'Cattle':return "牛";
            }
        }
      },
      getFund:function () {
        return this.info.Funds||this.info.GameId
      },
      getTotalPrice:function () {
        return this.key *this.info.KeyPrice;
      },
      setPullUpLoad:function () {
        return {
          threshold:-30,
        }
      },
      getCur:function () {
        if(this.$route.name==="fomo3dList"){
          return "fomo3dNva_0"
        }else if(this.$route.name==="fomo3dRecord"){
          return "fomo3dNva_1"
        }
		else if(this.$route.name==="fomo3dHistory"){
			return "fomo3dNva_2"
		}
      },

//      getTimeText:function () {
//        return this.timeType?'距离比赛开始':'距离下一场开始';
//      }
    },
    methods:{
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
		},
		
		
		
		
      closeBingo:function () {
        this.bingo = false
      },
      open:function () {
        this.rule = true;
      },
      getChoose(val){
          this.chooseInfo = val;
          this.getInfo();
        this.buy = true;
      },
      chooseTab:function (item,index) {
        this.isCur = index;
        if(this.isCur===0){
            this.getInfo();
        }
        this.$router.replace({name:item.routeName});
      },
      getInfo:function () {
        this.$axios.get('/api/fomo3d/querygameinfo/').then(
          res => {
            let result = res.data;
            if (result.IsSuccess) {
              this.info = result.Result.Data;
              if(result.Result.rewardResult.LastKeyRewardAmount>0 ||result.Result.rewardResult.TeamRewardAmount>0){
                this.rewardResult = result.Result.rewardResult;
                this.bingo = true
              }

            } else {
             this.$get_error('tips',result.Code,result.Message);
            }
          }, error => {
           this.$get_error('network');
          }
        );
      },
      comBuy:function () {
          this.buy = false;
        this.$axios.get('/api/fomo3d/buykey/?teamId='+this.chooseInfo.TeamId+'&keyCount='+this.key).then(
          res => {
            let result = res.data;
            if (result.IsSuccess) {
              this.airDropAmount = result.Result.rewardAmount;
              this.info = result.Result.gameInfo;
              this.airDrop = true;
			  
            } else {
              this.$get_error('tips',result.Code,result.Message);
            }
          }, error => {
            this.$get_error('network');
          }
        );
      },
      closeAirDrop:function () {
        this.airDrop  =false;
      },
      dayBetween :function (sysTime,endTime){
        let sysString = sysTime.replace(/-/g, "/");
        let endString = endTime.replace(/-/g, "/");
        let system = new Date(sysString);
        let end = new Date(endString);
        this.countDownDate = end.getTime() - system.getTime();
        if(this.Interval ){
          clearInterval(this.Interval );
        }
        this.countLoop();
        setTimeout(()=>{
          this.countDown  =true;
        },200);
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

        this.time =h+':'+m+':'+s;

      },
    },
    watch:{
      getFund(val){
          this.countDown = false;
        this.dayBetween(this.info.SysTime,this.info.EndTime);
      },
      time(val){
        if(val==='00:00:00'){
          if(this.Interval ){
            clearInterval(this.Interval );
            setTimeout(()=>{
              this.getInfo();
              if(this.$refs.record){
                this.$refs.record.getRecordList();
              }
            },3000)
          }
//          this.timeType = !this.timeType;
//          if(this.timeType){
//            this.countDownDate = this.waitTime*60000;
//          }else{
//            this.countDownDate = this.comTime*60000;
//          }

//          this.Interval = setInterval(this.countLoop,1000);
        }
      }
    }
  }
</script>

<style scoped>
  .top{
    position: relative;
    background: url("../../assets/img/fomo3d/top.png");
    background-size: 100% 100%;
    height:4.18rem;
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
  .content{
    background-image: url("../../assets/img/user/content-bg.png");
    background-size: 100% 100%;
    position: fixed;
    top:4.7rem;
    bottom: 0;
    width: 100%;
  }

  .htitle {
    width: 100%;
    height: 1.5rem;
    position: relative;
  }
  .title{
    height: 1.76rem;
    width: 100%;
    position: relative;
    top:-0.2rem;
    background-size: 100% auto!important;
  }
  .htitle img{
    width: 1.4267rem;

    margin-right: 0.5rem;
  }
  .time{
    position: absolute;
    text-align: center;
    /*top: 1.85rem;*/
    /*width: 70%;*/
    padding: 0.2rem 0.5rem;
    border-radius: 0.2rem;
    background: rgba(0,0,0,0.7);
  }
  .time p{
    text-align: center;
    font-size: 0.37rem;
    color: #ffffff;
    white-space:nowrap;
  }
  .rule{
    line-height: 0.6rem;
  }
  .rule span{
    color: #fe662e;
  }
  .fomo3dNva_0{
    background: url("../../assets/img/fomo3d/fomo3dNva_0.png")center no-repeat ;
  }
  .fomo3dNva_1{
    background: url("../../assets/img/fomo3d/fomo3dNva_1.png") center no-repeat;
  }
	.fomo3dNva_2{
		background: url("../../assets/img/fomo3d/fomo3dNva_2.png") center no-repeat;
	}
  .keyTitle{
    text-align: center;
    font-size: 0.5rem;
    font-weight: 600;
  }
  .keyInput{
    width: 90%;
    border: 1px solid #A59B92;
border-radius: 0.1rem;
    height: 0.85rem;
  margin:  0.3rem auto 0;
  }
  .keyInput input{
    text-align: center;
    border-radius: 0.1rem 0 0 0.1rem;
    height: 100%;
  }
.keyInput p{
  background: #4F2111;
  color: #ffffff;
  border-radius:0 0.1rem 0.1rem 0 ;
  height: 100%;
  line-height: 0.85rem;
  padding: 0 0.2rem;
}
  .airDrop{
    width: 90%;
    margin:  0.3rem auto 0;
  }
  .countDown-enter-active,.countDown-leave-active {
    transition: all 0.2s linear;
  }
  .countDown-enter {
    opacity: 0;
    /*transform:translateX(-50px);*/
  }
  .countDown-leave {
    opacity: 1;
    /*transform:translateX(50px);*/
  }
  .countDown-leave-to{
    opacity: 0;
    /*transform:translateX(-50px);*/
  }
  .bingoWord{
    font-size: 0.4rem;
    margin: 0.3rem 0;
    text-align: center;
  }
  .bingoWord span{
    font-size: 0.4rem;
  }
</style>
