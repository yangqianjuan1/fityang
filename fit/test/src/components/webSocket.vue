<template>
	<transition name="invited">
		<div class="inviteDialog" v-show="$store.getters.getInviteFlag">
			<div class="inviteText">
				<div class="InviteTextStyle">你的好友邀请你参加第{{$store.getters.getSessionNo}}场逐鹿竞猜,是否参赛?</div>
			</div>
			<div class="inviteBtn">
				<div class="ConfirmBtn" @click="confirm">
					<div class="textCenter" >确认</div>
				</div>
				<div class="CancelBtn" @click="cancel">
					<div class="textCenter">取消</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	export default{
		mounted(){
			this.initWebsocket();
		},
		methods:{
			initWebsocket(){//初始化
				const wsuri='ws://52.193.132.187:30000/'+localStorage.getItem("uid");//登录者ID
				console.log(wsuri);
				this.websock=new WebSocket(wsuri);
				
				this.websock.onopen=this.websocketOnOpen;
				this.websock.onerror=this.websocketOnError;
				this.websock.onmessage=this.websocketOnMessage;
				this.websock.onclose=this.websocketClose;
			},
			websocketOnOpen(){
				console.log("websocket已链接成功");
			},
			websocketOnError(e){
				console.log("websocket链接异常");
				setTimeout(()=>{
					this.initWebsocket();
				},3000);
			},
			websocketOnMessage(e){//数据接收
				const data=e.data;
				// no/id
				const sessions=String(data).split('/');
				this.$store.commit('set_session_no',sessions[0]);
				this.$store.commit('set_session_id',sessions[1]);
				this.$store.commit('set_invite_flag',0);
			},
			websocketSend(data){//数据发送
			/*格式--> "[type]"+type+"[touser]"+touser+"[msg]"+msg
						type:1->公开  2->私聊
						touser:消息接收方Id/Ip
						msg:发送内容
			*/
				this.websock.send(data);
			},
			confirm(){
				this.$store.commit('set_invite_flag',1);
				this.$router.push('/zhulu');
			},
			cancel(){
				this.$store.commit('set_invite_flag',1);
				this.inviteSession='';
			},
		}
	}
</script>

<style lang='less' scoped>
	.inviteDialog{
		width:300px;
		height:120px;
		border-top-left-radius: 10px;
		border-bottom-left-radius: 10px;
		background-image: url("../assets/img/competition/guideBg.png");
		background-size:100% 100%;
		-moz-background-size:100% 100%;
		-webkit-background-size:100% 100%;
		-ms-background-size:100% 100%;
		position: absolute;
		top:20vh;
		right:0;
		z-index: 2300;
		
		.inviteText{
			width:100%;
			height:60%;
			.InviteTextStyle{
				width:90%;
				height:95%;
				position: relative;
				top:5%;
				left:5%;
				font-size: 0.55rem;
				color:orange;
				text-align: center;
			}
		}
		.inviteBtn{
			width:100%;
			height:40%;
			border-top:1px solid white;
			
			.ConfirmBtn{
				width:49%;
				height:100%;
				float: left;
				overflow: hidden;
				border-right:1px solid white;
			}
			.CancelBtn{
				width:49%;
				height:100%;
				float: right;
				overflow: hidden;
			}
			.textCenter{
				font-size: 30px;
				width:60px;
				height:40px;
				position: relative;
				left:50%;
				top:50%;
				margin-left:-30px;
				margin-top:-20px;
			}
		}
		
	}
	
	.invited-enter,.invited-leave-to{
		transform: translateX(320px);
	}
	.invited-enter-to,.invited-leave{
		
	}
	.invited-enter-active,.invited-leave-active{
		transition:transform 0.5s ease;
	}
</style>
