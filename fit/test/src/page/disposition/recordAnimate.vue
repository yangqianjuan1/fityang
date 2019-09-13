<template>
	<MyDialog :dialogOpen="Ani">
		<div class="ani" v-if="Ani">
			<div class="ani_body">
				<div class="body_info">

					<div class="topTiger_body">
						<div class="topTiger_position">
							<div class="bloodInfo">
								<blood-info v-if="Ani" :singleLeft="mySingleHurt" @gameOver="gameOver" :AnotherOver="enemyOver" @lessBlood="lessBlood"></blood-info>
							</div>
							<div class="tigerName">
								<center>{{enemyTiger.enemyName}}</center>
							</div>		<!--,pkAniToBottom:type==4-->
							<div class="tigerInfo" :class="{shakeRightAni:type==2,pkAniToBottom:type==4}">
								<tiger-info :Infos="enemyTiger" @NoInfos="NoInfos"></tiger-info>
							</div>
						</div>
					</div>
					<div class="bottomTiger_body">
						<div class="bottomTiger_position">
							<div class="tigerInfo" :class="{shakeLeftAni:type==1,pkAniToTop:type==3}">
								<tiger-info :Infos="myTiger" @NoInfos="NoInfos"></tiger-info>
							</div>
							<div class="tigerName">
								<center>{{myTiger.nickName}}</center>
							</div>
							<div class="bloodInfo bottom_blood_Info">
								<blood-info :singleLeft="enemySingleHurt" @gameOver="gameOver" :AnotherOver="myOver" @lessBlood="lessBlood"></blood-info>
							</div>
						</div>
					</div>
				</div>
				<fighting-ani :type="type"></fighting-ani>
				<div class="body_loading" :class="{loadingStyle:loadingShow}">
					<div class="textCenter" v-show="loadingShow==false">loading...</div>
					<div class="pkBeginAndEnd">
						<transition name="start">
						<img class="startImg" src="../../../static/data/battle_star.png" v-show="pkBegin" />
						</transition>
						<transition name="end">
						<img class="endImg" :src="'../../../static/data/battle_'+resultImg+'.png'" v-show="pkEnd" />
						</transition>
					</div>
				</div>
				
			</div>
			<div class="ani_foot">
				<div class="foot_button">
					<div class="button_position" @click="closeAni">跳过动画</div>
				</div>
			</div>
		</div>
	</MyDialog>
</template>

<script>
	import MyDialog from "../../components/dialog";
	import BloodInfo from './recordBlood.vue';
	import TigerInfo from "../../components/tigerBg";
	import '../../../static/pkStyle.css'
	import FightingAni from './FightingAni.vue'
	export default {
		data() {
			return {
				resultImg:'lose',//结果
				loadingShow: false,
				pkBegin:false,//开始动画
				pkEnd:false,//结束动画
				enemyTiger: {}, //对手信息
				enemySingleHurt: {}, //对手单次伤害
				enemyOver: false, //对手结束
				myTiger: {},
				mySingleHurt: {},
				myOver: false,
				IsWinner: false,
				//对手攻击动画
				type: 0, // 刀光 1:攻击对方  2:对方攻击 
				enemyAniNum: 0, //对方 上次出招标记
				myAniNum: 0, //我的 上次出招标记
			}
		},
		props: {
			Ani: {
				type: Boolean,
				default: false,
			},
			bothInfo: {},
		},
		components: {
			MyDialog,
			BloodInfo,
			TigerInfo,
			FightingAni,
		},
		methods: {
			NoInfos:function(){
				this.closeAni();
				this.$tips("数据未准备好，请稍后重试");
			},
			reset: function() {
				this.loadingShow = false;
				this.enemyTiger = {};
				this.enemySingleHurt = {};
				this.enemyOver = false;
				this.myTiger = {};
				this.mySingleHurt = {};
				this.myOver = false;
				this.IsWinner = false;
				this.pkBegin=false;
				this.pkEnd=false;
			},
			closeAni: function() {
				this.reset();
				this.$emit('closeAni');
			},
			gameOver: function() {
				if (this.IsWinner) {
					this.myOver = true;
				} else {
					this.enemyOver = true;
					setTimeout(()=>{
						this.pkEnd=true;
					},800);
				}
				
			},
			lessBlood: function(val) {
				if (val == 1) { //对方
					if (this.enemyAniNum == 2) {
						this.type = 4;
					} else {
						this.type = 2;
					}
					this.enemyAniNum = this.type;
				} else { //己方
					if (this.myAniNum == 1) {
						this.type = 3;
					} else {
						this.type = 1;
					}
					this.myAniNum = this.type;
				}
			},
		},
		watch: {
			Ani: function(val) {
				if (this.$props.Ani) {
					setTimeout(() => {
						this.loadingShow = true;
					}, 2000);
					setTimeout(()=>{
						this.pkBegin=true;
					},3000);
					setTimeout(()=>{
						this.pkBegin=false;
					},4000);
				}
			},
			bothInfo: function(val) {
				//对手
				this.enemyTiger.enemyName = this.$props.bothInfo.opponentNick;
				this.enemyTiger.tigerInfo = this.$props.bothInfo.Data[0].Fragments[0].enemyHorseImg;
				this.enemySingleHurt.id = 1; //身份标识
				//玩家
				this.myTiger.nickName = this.$props.bothInfo.accountNick;
				this.myTiger.tigerInfo = this.$props.bothInfo.Data[0].Fragments[0].myHorseImg;
				this.mySingleHurt.id = 0;
				//胜负信息及单词伤害计数
				this.IsWinner = this.$props.bothInfo.Data[0].Fragments[0].isWin;
				this.enemySingleHurt.once = true;
				this.mySingleHurt.once = false;
				
				//单词血量减少值
				let e_gongji=this.enemyTiger.tigerInfo.CombatPower*0.5;//攻击力
				let gongji=this.myTiger.tigerInfo.CombatPower*0.5;
				
				let e_jianshang=0.9-((this.enemyTiger.tigerInfo.Agile)*0.015625);//减伤
				let jianshang=0.9-((this.myTiger.tigerInfo.Agile)*0.015625);
				
				let e_xue=5*(this.enemyTiger.tigerInfo.Endurance)+1.5*(this.enemyTiger.tigerInfo.life);//血量
				let xue=5*(this.myTiger.tigerInfo.Endurance)+1.5*(this.myTiger.tigerInfo.life);
				
				this.enemySingleHurt.life=e_xue;
				this.mySingleHurt.life=xue;
				
				this.enemySingleHurt.hurt = gongji-e_jianshang;//单次扣血
				this.mySingleHurt.hurt =  e_gongji-jianshang;
				
				console.log("我方血量:\t"+xue+"\t扣血:\t"+this.mySingleHurt.hurt);
				console.log("对方血量:\t"+e_xue+"\t扣血:\t"+this.enemySingleHurt.hurt);
			},
		},
	}
</script>

<style lang="less" scoped>
	.ani {
		width: 100%;
		height: 60%;
		position: relative;
		top: 20%;

		.ani_body {
			width: 100%;
			height: 90%;

			.body_info,
			.body_loading {
				width: 100%;
				height: 100%;
			}

			.body_info {
				background-image: url('../../../static/data/spine-bg.png');
				background-size: 100% 100%;
				-moz-background-size: 100% 100%;
				-webkit-background-size: 100% 100%;

				.topTiger_body,
				.bottomTiger_body {
					width: 100%;
					height: 50%;
				}

				.topTiger_position,
				.bottomTiger_position {
					width: 34%;
					height: 80%;
					position: relative;
					left: 33%;
					top: 8%;
				}

				.bloodInfo {
					width: 80%;
					height: 10%;
					position: relative;
					left: 10%;
					top: 2%;
				}

				.bottom_blood_Info {
					top: 0;
				}

				.tigerName {
					width: 100%;
					height: 13%;
					color: white;
				}

				.tigerInfo {
					width: 100%;
					height: 75%;
				}
			}

			.body_loading {
				position: relative;
				top: -200%;
				color: #e6a23c;
				background-color: black;
				z-inde: 10;

				.textCenter {
					width: 100%;
					height: 10%;
					position: relative;
					top: 45%;
					text-align: center;
				}
				
				.pkBeginAndEnd{
					width:100%;
					height:50%;
					position: relative;
					top:15%;
					
					.startImg{
						width:150%;
						height:100%;
						position: relative;
						left:10%;
						top:25%;
					}
					.endImg{
						width:130%;
						height:70%;
						position: relative;
						top:25%;
					}
				}
				
				
			}
		}

		.ani_foot {
			width: 100%;
			height: 10%;

			.foot_button {
				width: 30%;
				height: 80%;
				position: relative;
				top: 10%;
				left: 35%;
				background-image: url('../../assets/img/dialog/btn-yellow.png');
				background-size: 100% 100%;
				-moz-background-size: 100% 100%;
				-webkit-background-size: 100% 100%;

				.button_position {
					width: 100%;
					height: 50%;
					color: white;
					text-align: center;
					font-size: 0.4rem;
					position: relative;
					top: 25%;
				}
			}
		}

	}

	.start-enter,.end-enter{
		opacity: 0;
		transform: translateY(-50%);
	}
	.start-leave-to,.end-leave-to{
		transform: translateY(80%);
		opacity: 0;
	}
	.start-enter-to,.start-leave,.end-enter-to,.end-leave{
		opacity: 1;
	}
	.start-enter-active,.start-leave-active,.end-enter-active,.end-leave-active{
		transition: transform 0.8s ease;
	}

	.loadingStyle {
		animation: loadingAni 1s ease 1 forwards;
		-moz-animation: loadingAni 1s ease 1 forwards;
		-webkit-animation: loadingAni 1s ease 1 forwards;
	}

	@keyframes loadingAni {
		0% {
			/*opacity: 1;*/
		}

		100% {
			background:rgba(0, 0, 0, 0);
		}
	}

	@-moz-keyframes loadingAni {
		0% {
			/*opacity: 1;*/
		}

		100% {
			background:rgba(0, 0, 0, 0);
		}
	}

	@-webkit-keyframes loadingAni {
		0% {
			/*opacity: 1;*/
		}

		100% {
			background:rgba(0, 0, 0, 0);
		}
	}
</style>
