<template>
	<div class="zhulu_autoBg">
		
		<zhulu-bg :move="bg_move" :reset="bg_reset"></zhulu-bg>
		
		<bet-unitil v-if="isBet" @closeSure="closeSure"></bet-unitil>
		 
		<div class="zhulu" :style="{'max-width':$store.state.maxWidth}">
			<div class="zhulu_header">
				<div class="amountPool">
					<div class="poolData" @click="invite">
						邀请好友
					</div>
				</div>
				<div class="sessionList">
					<session-unitil @changedBet="changedBet"></session-unitil>
				</div>
				<div class="sessionTime">
					<div class="timeState" :style="{fontSize:currFontSize}"><span style="fontSize:0.6rem;" v-html="IntervalText"></span></div>
				</div>
				<div class="openBetBtn" v-show="$store.getters.getIsRaced" @click.stop="isBetFun">&nbsp;</div>
			</div>
			<div class="zhulu_body">
				<div class="zhulu_tigerNum" :style="{height:currHeight+'vh'}">
					<div class="zhulu_tiger_item" v-for="(item,key) in tigerList" :key="key" :style="{top:'-'+item.id*1.2+'%'}" 
					 @click="mouseOut()">
						<div class="deer_info" :id="'deerMove'+item.id"></div>
						<div class="race_num" :style="{fontSize:currFontSize}" :id="'raceNumMove'+item.id" ><em>{{item.id}}</em></div>
						<div class="tiger_info" :style="{top:currTop}" :id="'tigerMove'+item.id" @touchstart.prevent="touchin($event,item)" @mousemove="mouseOver($event,item)">
							<tiger-info :Style="item.tigerInfo.Style"></tiger-info>
						</div>
					</div>
				</div>
			</div>
			
		</div>
		
		<zhulu-dialog :showDialog="zhuluDialogFlag">
			<div v-html="zhuluBeginGameTime"></div>
		</zhulu-dialog>
		
		  <comfire-dialog :sure="goBack" v-model="raceOver" sureText="确认">
		  <p class="title">恭喜{{winnerNo}}号<br/>赛道的老虎取得胜利</p>
		  <p class="text">比赛结束，是否返回入场页面?</p>
		</comfire-dialog>
		
		<websocket-info :isInvite="ShowInvite" @sendOk="sendOk"></websocket-info>
		
		<transition  name="detailAni">
			<zhu-lu-tiger-detail v-if="tigerDetailDialog" :positionInfo="detailPosition" ></zhu-lu-tiger-detail>
		</transition>
	</div>
</template>

<script>
	import '../../stylesheet/zhulu.css'
	import tigerInfo from '../../components/tigerImg.vue'
	import betUnitil from './betUnitil.vue'
	import sessionUnitil from './sessionUnitil.vue'
	import zhuluDialog from './zhuluDialog.vue'
	import zhuLuTigerDetail from './zhuluTigerDetail.vue'
	import zhuluBg from './tigerBg.vue'
	import ComfireDialog from "../../components/comfireDialog";
	import WebsocketInfo from './websocket.vue'
	export default {
		data() {
			return {
				ShowInvite:false,//邀请弹出层
				tigerDetailDialog:false,//老虎属性详情面板
				detailPosition:{},//面板位置信息
				currDetailId:0,//当前显示的老虎信息编号
				Loop:0,//屏幕长按计时器
				winnerNo:0,//胜利赛道
				raceOver:false,//比赛结束
				bg_move:false,//背景滚动
				bg_reset:false,//背景重置
				deerInterval:0,//鹿跑动计时
				timeTotal:0,
				tigerList: [{
					id: 1,
					speed1:0,
					speed2:0,
					speed3:0,
					tigerInfo: {
						"Style": ["006", "055", "045", "", "063", "028", ""],
						"HorseNo": "2089",
					},
				}, {
					id: 2,
					speed1:0,
					speed2:0,
					speed3:0,
					tigerInfo: {
						"Style": ["001", "043", "025", "", "025", "074", ""],
						"HorseNo": "3473",
					},
				}, {
					id: 3,
					speed1:0,
					speed2:0,
					speed3:0,
					tigerInfo: {
						"Style": ["002", "037", "029", "", "015", "020", ""],
						"HorseNo": "3217",
					},
				}, {
					id: 4,
					speed1:0,
					speed2:0,
					speed3:0,
					tigerInfo: {
						"Style": ["006", "044", "063", "", "075", "066", ""],
						"HorseNo": "3089",
					},
				}, {
					id: 5,
					speed1:0,
					speed2:0,
					speed3:0,
					tigerInfo: {
						"Style": ["004", "065", "017", "", "042", "053", ""],
						"HorseNo": "3328",
					},
				}, {
					id: 6,
					speed1:0,
					speed2:0,
					speed3:0,
					tigerInfo: {
						"Style": ["002", "031", "028", "", "043", "067", ""],
						"HorseNo": "3285",
					},
				}, {
					id: 7,
					speed1:0,
					speed2:0,
					speed3:0,
					tigerInfo: {
						"Style": ["005", "060", "054", "", "063", "063", ""],
						"HorseNo": "3155",
					},
				}, {
					id: 8,
					speed1:0,
					speed2:0,
					speed3:0,
					tigerInfo: {
						"Style": ["005", "063", "030", "", "061", "023", ""],
						"HorseNo": "3388",
					},
				}, {
					id: 9,
					speed1:0,
					speed2:0,
					speed3:0,
					tigerInfo: {
						"Style": ["004", "065", "075", "", "006", "044", ""],
						"HorseNo": "2983",
					},
				}],
				currHeight: 71,
				currTop: '-58%',
				currFontSize: '0.8rem',
				currPoolFontSize: '1rem',
				isBet: false, //竞猜面板
				Interval: 0, //比赛倒计时
				IntervalText: '', //场次状态文本
				zhuluDialogFlag: false, //逐鹿过度弹层是否显示
				zhuluBeginGameTime: '', //开始比赛的计时文本/场次切换文本
				winnerInfo:'',//
			}
		},
		components: {
			tigerInfo,
			betUnitil,
			sessionUnitil,
			zhuluDialog,
			zhuluBg,
			ComfireDialog,
			zhuLuTigerDetail,
			WebsocketInfo,
		},
		created() {
			let docH = Math.max(document.documentElement.clientHeight, document.body.clientHeight);
			if (docH > 600 && docH < 782) {
				this.currHeight = 66;
				this.currTop = '-88%';
				this.currFontSize = '0.5rem';
				this.currPoolFontSize = '0.8rem';
			}
			this.getTigerList(); //获取本场次老虎信息
			if(sessionStorage.getItem('interval' + this.$store.getters.getSessionId)==null){
				this.getTimeInfoToHttp();//请求后端获取本场次的时间显示状态
			}else{
				this.getTimeInfo();//获取本场次的时间显示状态
			}
			//this.getTimeInfo(); //获取本场次的时间显示状态
		},
		mounted() {
			this.currDetailId=0;
			this.$store.commit('set_is_raced',0);
			let _this=this;
			window.addEventListener(
				'popstate',
				function(e){
					_this.winnerNo=0;
				},
				false,
			);
		},
		methods: {
			goBack:function(){
				this.$router.go('-1');
			},
			isBetFun: function() {
				this.isBet = true;
			},
			closeSure: function() {
				setTimeout(() => {
					this.isBet = false;
				}, 800);
			},
			changedBet: function() {
				clearInterval(this.Interval);
				this.getTigerList(); //获取本场次老虎信息
				this.resetTigerPosition();//老虎，赛道编号 复位
				if(sessionStorage.getItem('interval' + this.$store.getters.getSessionId)==null){
					this.getTimeInfoToHttp();//请求后端获取本场次的时间显示状态
				}else{
					this.getTimeInfo();//获取本场次的时间显示状态
				}
				
				this.zhuluDialogFlag = true;
				this.zhuluBeginGameTime = "Loading..."
				setTimeout(() => {
					this.zhuluDialogFlag = false;
				}, 3000);
			},
			getTigerList: function() {
				let data = {
					cid: this.$store.getters.getSessionNo,
				};
				this.$axios.post('/api/horse/getJincaiTigerList/', data).then(res => {
					var result = res.data;
					if (result.IsSuccess == true) {
						if (result.Result.length > 0) {
							for (const i in this.tigerList) {
								this.tigerList[i].tigerInfo = result.Result[i];
							}
						}
					} else {
						this.$tips("请手动刷新页面");
					}
				}, error => {
					this.$tips("请求异常");
				});
			},
			getTimeInfo: function() {
				let num = 3;
				clearInterval(this.Interval);
				this.Interval = setInterval(() => {
					let time = sessionStorage.getItem('interval' + this.$store.getters.getSessionId);
					if (time> 0) {
						this.IntervalText = '<span>距离比赛开始还有</span>' + time + '<span>秒</span>';
					} else {
						this.IntervalText = '准备中';
						if(num==3){
							this.zhuluDialogFlag = true;
							this.mouseOut();//老虎信息展示关闭;
						}
						num--;
						this.zhuluBeginGameTime = '<div style="font-size:1.2rem">' + num + '</div>';
						if(num<=0){
							this.$store.commit('set_is_raced',1);
							this.IntervalText = '比赛中';
							this.zhuluDialogFlag = false;
							clearInterval(this.Interval);
							this.beginSpeed();//老虎跑动效果
						}
					}
				}, 1000);
			},
			getTimeInfoToHttp: function() {
				clearInterval(this.Interval);//清除切换场次之前的计时器
				this.$axios.get('api/horse/battle/getTimeComebetSetRun/?cid=' + this.$store.getters.getSessionId, {}, false).then(
					res => {
						var result = res.data;
						if (result.IsSuccess == true) {
							sessionStorage.setItem('interval' + this.$store.getters.getSessionId, result.Result.dtime);
						} else {
							sessionStorage.setItem('interval' + this.$store.getters.getSessionId, 100);
						}
					}, error => {
						sessionStorage.setItem('interval' + this.$store.getters.getSessionId, 120);
					}).then(() => {

					if (sessionStorage.getItem('interval' + this.$store.getters.getSessionId) == null) {
						sessionStorage.setItem('interval' + this.$store.getters.getSessionId, 120);
					}
					
					var timer=setInterval(()=>{
						if(sessionStorage.getItem('interval' + this.$store.getters.getSessionId)==0){
							clearInterval(timer);
						}
						sessionStorage.setItem('interval' + this.$store.getters.getSessionId,parseInt(sessionStorage.getItem('interval' + this.$store.getters.getSessionId))-1);
					},1000);
					
					this.getTimeInfo();
				});
			},
			getTigerWinner:function(){
				let data = {
					cid: this.$store.getters.getSessionNo
				};
				this.$axios.post('api/horse/gethorseJincaiWin/', data).then(res => {
					var result = res.data;
					if (result.IsSuccess && result.Result.length > 0) {
						var winnerNo = result.Result[0].WinHorseNo;
						this.winnerInfo=winnerNo;
					} else {
						this.$tips("请手动刷新页面");
					}
				}, error => {
					this.$tips("请求异常");
				});
			},
			getrandom:function(Min, Max) {
				var Range = Max - Min;
				var Rand = Math.random();
				var num = Min + Math.round(Rand * Range); //四舍五入
				return num;
			},
			beginSpeed:function(){// 跑动阶段
				for (const i in this.tigerList) { 
					let tigerId=this.tigerList[i].id;
					let item=this.tigerList[i].tigerInfo;
					let n=parseInt(item.CombatPower?item.CombatPower:0)*0.5;//战斗力*0.5 n 速度
					let a=400*(1-0.25*(Math.pow(parseInt(item.Endurance?item.Endurance:0),0.35)));//a 耐力跑距离 item.Endurance的0.35次方
					let b=150*(0.25*(Math.pow(parseInt(item.Agile?item.Agile:0),0.35)));//敏捷跑距离 item的 Agile的0.35次方
					
					let length1=(800-a+b)/20-5;//赛道长度 5%鹿显示距离]
					let time1=(800-a+b)/n;//本阶段时间
					
					let length2=a/20+length1;
					let time2=a/(0.9*n);
					
					let length3=(200-b)/20+length2;
					let time3=(200-b)/(0.7*n);
					
					if((time1+time2+time3+2)>this.timeTotal){//取9组时间中最长的
						this.timeTotal=time1+time2+time3+2;
					}
					
					/*
					console.log("战斗力:\t"+item.CombatPower+"\t耐力:\t"+item.Endurance+"\t敏捷:\t"+item. Agile);
					console.log("n:\t"+n+"\ta:"+a+"\tb:"+b);
					console.log("阶段一:\t"+time1+"\n阶段二:\t"+time2+"\n阶段三:\t"+time3);
					console.log("阶段一:\t"+length1+"\n阶段二:\t"+length2+"\n阶段三:\t"+length3);
					*/
				   
					$('#raceNumMove'+tigerId).animate({left:'10%'},2000);
					$('#tigerMove'+tigerId).animate({left:'10%'},2000).animate({left:'-'+length1+'%'},time1*1000).animate({left:'-'+length2+'%'},time2*1000).animate({left:'-'+length3+'%'},time3*1000);
				}
				
				setTimeout(()=>{//等待2秒后移时间
					this.bg_move=true;
				},1900);
				setTimeout(()=>{//所有老虎跑动结束停止bg滚动
					this.bg_move=false;
					this.IntervalText='比赛已结束';
					this.$store.commit('set_is_raced',0);
					this.raceOver=true;
				},this.timeTotal*1000);
				//获取胜利者编号
				this.getWinner();
			},
			resetTigerPosition:function(){//重置
					this.bg_reset=true;
					for (const i in this.tigerList) {
					let tigerId=this.tigerList[i].id;
						$('#tigerMove'+tigerId).stop();
						$('#raceNumMove'+tigerId).animate({left:'-1%'},0);
						$('#tigerMove'+tigerId).animate({left:'2%'},0);
					}
					$("#deerMove"+this.winnerNo).animate({left:'-20%'},0);
			},
			getWinner:function(){
				let data={
					cid:this.$store.getters.getSessionNo,
				};
				this.$axios.post('/api/horse/gethorseJincaiWin/',data,false)
				.then(res=>{
					var result=res.data;
					if(result.IsSuccess&&result.Result.length>0){
						for(const i in this.tigerList){
							if(this.tigerList[i].tigerInfo.HorseNo=result.Result[0].WinHorseNo){
								this.winnerNo=parseInt(i)+1;
								return;
							}
						}
					}else{
						if(parseInt(sessionStorage.getItem('interval' + this.$store.getters.getSessionId))<=0){
							setTimeout(()=>{
								console.log("IsSuccess:false-3秒内重启");
								this.getWinner();
							},3000);
						}
					}
				},error=>{
					if(parseInt(sessionStorage.getItem('interval' + this.$store.getters.getSessionId))<=0){
						setTimeout(()=>{
							console.log("error:3秒内重启");
							this.getWinner();
						},3000);
					}
				}).then(()=>{
					let deerShow=this.timeTotal*1000-7000;
					setTimeout(()=>{//所有老虎跑动结束停止bg滚动
						$("#deerMove"+this.winnerNo).animate({left:0},deerShow);
					},7000);
				});
			},
			touchin:function(evt,item){//长按
			this.mouseOut();
			if(this.IntervalText.indexOf('距离比赛开始还有')>0){
			}else{
				return;
			}
			if(this.tigerDetailDialog==false){//重复显示
				var that=this;
				this.Loop = setTimeout(function() {
					console.log("长按");
						that.Loop = 0;
						that.tigerDetailDialog=true;
						that.currDetailId=item.id;
						
						var touch = evt.touches[0]; //获取第一个触点
						var x = Number(touch.pageX); //页面触点X坐标
						var y = Number(touch.pageY); //页面触点Y坐标
						that.detailPosition.left=x;
						that.detailPosition.top=y;
						that.detailPosition.item=item;
					}, 600);
			}
						return false;
			},
			mouseOver:function(evt,item){//鼠标悬浮事件
				if(this.IntervalText.indexOf('距离比赛开始还有')>0){
				}else{
					this.tigerDetailDialog=true;
					return;
				}
			if(item.id!=this.currDetailId){
				this.mouseOut();
				var that=this;
				this.Loop = setTimeout(function() {
						that.Loop = 0;
						that.tigerDetailDialog=true;
						that.currDetailId=item.id;
						
						let x=evt.target.getBoundingClientRect().left;
						let y=evt.target.getBoundingClientRect().top;
						that.detailPosition.left=x;
						that.detailPosition.top=y;
						that.detailPosition.item=item;
					}, 500);
			}
			},
			mouseOut:function(){
				this.currDetailId=0;
				this.tigerDetailDialog=false;
			},
			invite:function(){//显示邀请弹窗
				this.tigerDetailDialog=false;
				this.ShowInvite=true;
			},
			sendOk:function(){
				this.ShowInvite=false;
			},
		},
	}
</script>

<style lang="less" scoped>
	//比赛结果提示
	.title{
		width:100%;
		height:80%;
		text-align: center;
		font-size: 0.6rem;
	}
	.text{
		width:100%;
		height:20%;
		text-align: center;
		font-size: 0.2rem;
	}
	
	//-----主页布局属性
	.zhulu {
		height: 100vh;
		overflow: auto;
		overflow-x: hidden;
		overflow-y: hidden;
		position: relative;
		top:-100%;
	}

	.zhulu_autoBg {
		width: 100%;
		height: 100vh;
	}

	.zhulu_header{
		width: 100%;
		height: 20%;
	}

	.zhulu_body {
		width: 100%;
		height: 80%;
	}
	
	.zhulu_tigerNum {
		width: 100%;
	}

	.zhulu_tiger_item {
		width: 100%;
		height: 12%;
		position: relative;
	}

	.tiger_info {
		width: 30%;
		height: 100%;
		float: right;
		position: relative;
	}
	.deer_info{
		width:20%;
		height:90%;
		float: left;
		background-image: url('../../assets/img/race/deer.png');
		background-size: 100% 100%;
		-moz-background-size: 100% 100%;
		position: relative;
		left:-20%;
	}

	.race_num {
		width: 10%;
		height: 50%;
		float: right;
		position: relative;
		top: 45%;
		color: white;
		text-align: left;
	}

	.openBetBtn {
		width: 12%;
		height: 20vh;
		background-size: 100% 100%;
		-moz-background-size: 100% 100%;
		background-image: url('../../assets/img/race/bet_open.png');
		position: relative;
		top: 200%;
		z-index: 2100;
	}

	.amountPool {
		width: 70%;
		height: 50%;
		float: left;
	}

	.poolData {
		width: 50%;
		height: 50%;
		float: right;
		position: relative;
		top:3px;
		border: 1px solid orange;
		border-radius: 10px;
		background-color: navajowhite;
		font-size: 17px;
		text-align: center;
	}

	.sessionList {
		width: 30%;
		height: 50%;
		float: right;
	}

	.sessionTime {
		width: 100%;
		height: 50%;
		float: left;
	}

	.timeState {
		width: 50%;
		height: 60%;
		position: relative;
		top: 10%;
		left: 28%;
		background: none;
		border-radius: 0.5rem;
		color: white;
		text-align: center;
	}
	
	
	.detailAni-enter,.detailAni-leave-to{
		opacity: 0;
	}
	.detailAni-enter-to,.detailAni-leave{
		opacity: 1;
	}
	.detailAni-enter-active,.detailAni-leave-active{
		transition:all 0.1s ease;
	}
</style>
