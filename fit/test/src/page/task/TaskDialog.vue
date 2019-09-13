<template>
	<task-dialog :dialogOpen="$store.getters.getTaskPanel">
		<transition name="taskAni">
			<div class="taskPanel" v-show="taskShow">
				<div class="taskPanel_back"><!-- @click="closeTaskPanel" -->
					<div class="buttonStyle1" @click="closeTaskPanel"></div>
				</div>
				<div class="taskPanel_header">
					<div class="header_day" :class="{currChecked:btnType==0}" @click="btnType=0">
						每日任务
					</div>
					<div class="header_week" :class="{currChecked:btnType==1}" @click="btnType=1">
						每周任务
					</div>
				</div>
				<div class="taskPanel_body">
					<task-panel-data @getReward="getReward" :parentListData="taskList" v-if="datasRefresh"></task-panel-data>
					
					<div class="loadingStyle" v-show="loadingShow">
						加载中，请稍后...
					</div>
					
				</div>
			</div>
		</transition>
	</task-dialog>
</template>

<script>
	import TaskDialog from '../../components/dialog.vue'
	import TaskPanelData from './TaskItem.vue'
	export default {
		data() {
			return {
				loadingShow:true,//加载提示
				taskShow: false,
				btnType:0,//当前任务面板
				dayTask: [], //日常任务
				weekTask: [], //每周任务
				taskList: [], //当前任务
				datasRefresh:false,//是否开始数据加载
			}
		},
		components: {
			TaskDialog,
			TaskPanelData,
		},
		mounted() {
			if(this.taskList.length>0){
				this.loadingShow=false;
			}else{
				this.loadingShow=true;
			}
			
			setTimeout(() => {
				this.taskShow = true;
				this.getTaskList();
			}, 10);
		},
		methods: {
			getReward:function(index){
				this.taskList[index].IsReceive=true;
				if(this.taskList==this.dayTask){
					this.dayTask[index].IsReceive=true;
				}else{
					this.weekTask[index].IsReceive=true;
				}
			},
			closeTaskPanel: function() {
				this.taskShow = false;
				this.datasRefresh=false;
				setTimeout(() => {
					this.$store.commit('set_task_panel');
				}, 600);
			},
			getTaskList: function() {
				this.$axios.post('/api/horse/getTaskList/',false)
					.then(res => {
						let result = res.data;
						if (result.IsSuccess) {
							let dayList=[{Work: 0, Num: 1, Min: 1, Type: 1,IsReceive:true}];
							let weekList=[];
							for(const i in result.Result){
								if (result.Result[i].Type == 1) { //每日
									dayList.push(result.Result[i])
								} else { //每周
									weekList.push(result.Result[i]);
								}
							}
							this.dayTask=dayList;
							this.weekTask=weekList;
						} else {
							if(result.Code=='E0006'){
								this.$tips("登录信息已过期");
									sessionStorage.clear();
									localStorage.clear();
									this.$store.commit('SET_LOGIN', false);
									this.closeTaskPanel();
									this.$router.push('/login');
									return;
							}
							
							setTimeout(() => {
								console.log("IsSuccess-false:3秒后重新加载");
								this.getTaskList();
							}, 3000);
						}
					}, error => {
						setTimeout(() => {
							console.log("error:3秒后重新加载");
							this.getTaskList();
						}, 3000);
					}).then(()=>{
						this.taskList=this.dayTask;
						this.datasRefresh=true;
					});
			},
		},
		watch:{
			btnType:function(){
				if(this.btnType==0){
					this.taskList=this.dayTask;
				}else{
					this.taskList=this.weekTask;
				}
			},
			taskList:function(val){
				if(this.taskList.length>0){
					this.loadingShow=false;
				}else{
					this.loadingShow=true;
				}
			},
		}
	}
</script>

<style lang="less" scoped>
	.taskPanel {
		width: 90%;
		height: 80%;
		position: relative;
		left: 5%;
		top: 8%;
		background-color: gold;
		border-radius: 1rem;

		.taskPanel_back {
			width: 100%;
			height: 8%;
			padding-right: 5%;
			.buttonStyle1{
				width:13%;
				height:70%;
				position: relative;
				left:85%;
				top:15%;
				border-radius: 1rem;
				background-image: url('../../assets/img/pay/pay_close.png');
				background-size:100% 100%;
				-moz-background-size:100% 100%;
				-webkit-background-size:100% 100%;
			}
			
		}

		.taskPanel_header {
			width: 100%;
			height: 8%;

			.header_day,
			.header_week {
				width: 38%;
				height: 100%;
				float: left;
				margin-left: 8%;
				border-radius: 0.5rem;
				text-align: center;
				font-size: 0.7rem;
				padding-top: 1%;
			}

			.header_day {
				background-color: #409eff;
			}

			.header_week {
				background-color: orange;
			}
			
			.currChecked{
				background-color: #666;
				color:white;
			}

		}

		.taskPanel_body {
			width: 100%;
			height: 84%;
		}
		
		.loadingStyle{
			width:100%;
			height:10%;
			text-align: center;
			font-size: 0.5rem;
			margin-top:40%;
		}
		
	}

	.taskAni-enter {
		transform: translate3d(0, -100%, 0);
	}

	.taskAni-leave-to {
		transform: translate3d(0, 150%, 0);
	}

	.taskAni-enter-to,
	.taskAni-leave {}

	.taskAni-enter-active,
	.taskAni-leave-active {
		transition: transform 0.5s ease;
	}
</style>
