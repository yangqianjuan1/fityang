<template>
		 <comfire-dialog :sure="InviteInfo" v-model="isInvite" sureText="邀请">
			 <center>邀请好友</center>
			 <div class="inviteSize">输入好友昵称，邀请加入本场竞猜</div>
			<div class="inputs" flex="main:justify">
				<input placeholder="请输入你要邀请的玩家昵称" v-model="InviteNum" />
			</div>
		</comfire-dialog>
</template>

<script>
	import ComfireDialog from "../../components/comfireDialog";
	export default{
		data(){
			return{
				websock:null,
				InviteNum:'',
			}
		},
		props:{
			isInvite:{
				type:Boolean,
				default:false,
			}
		},
		components:{
			ComfireDialog,
		},
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
			websocketClose(e){
				console.log('websocket链接关闭');
			},
			confirmSendInvite(){//打开弹层
				this.isInvite=true;
				this.$emit('invate');
			},
			InviteInfo(){
				if(this.InviteNum!=''){
					let data='[type]2[touser]'+this.InviteNum+'[msg]'+this.$store.getters.getSessionNo+'/'+this.$store.getters.getSessionId;
					this.websocketSend(data);
					this.$tips('发送成功');
					this.InviteNum='';
					this.$emit('sendOk');
				}else{
					this.$tips('请填写好友昵称');
				}
			},
		},
	}
</script>

<style lang='less' scoped>
	.inputs {
		width: 90%;
		height: 1rem;
		position: relative;
		left: 10%;
		top:200%;
	}
	
	center{
		font-size: 15px;
	}
	.inviteSize{
		font-size: 10px;
		color:orange;
		width:100%;
		text-align: center;
	}
	
	.inputs input {
		height: 85%;
		min-width: 100%;
		-webkit-border-radius: 0.15625rem;
		border-radius: 0.15625rem;
		-moz-border-radius: 0.15625rem;
		border: 1px solid #837361;
		text-indent: 0.3125rem;
	}
	
	input::-webkit-input-placeholder {
		font-size: 0.2667rem;
		color: #999999;
	}
	
	.inputs button {
		padding: 0 0.8rem;
		height: 0.85rem;
		font-size: 0.2667rem;
	}
	
</style>
