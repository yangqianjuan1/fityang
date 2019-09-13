<template>
	<div class="sessionStyle">
		<div class="sessionUnitil" @click="getSession"><span class="seesionFontSize">第</span>{{$store.getters.getSessionNo}}<span class="seesionFontSize">场</span></div>
		<transition name="sessionAni">
			<div class="sessionListData" v-if="sessionDataNotNull">
				<div class="sessionItem" v-for="(item,key) in sessionData" :key="key" @click="checkedSessionNo(item)"><span class="seesionFontSize">第</span>{{item.Session}}<span class="seesionFontSize">场</span></div>
			</div>
		</transition>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				sessionData: [],
				sessionDataNotNull: false,
			}
		},
		mounted() {
			this.sessionData = [];
		},
		methods: {
			getSession: function() {
				
				if(this.$store.getters.getIsRaced==false){
					this.$tips('请等待比赛动画结束');
					return;
				}
				
				if (this.sessionDataNotNull) {
					this.sessionDataNotNull = false;
				} else {
					this.sessionDataNotNull = true;
					this.$axios.get('/api/battle/compete/betlist/?size=30&offset=0').then(res => {
						var result = res.data;
						if (result.IsSuccess == true) {
							if (result.Result.Data.length > 0) {
								this.sessionData = result.Result.Data;
							} else {
								this.$tips("暂无可用场次");
							}
						} else {
							this.$tips("请手动刷新页面");
						}
					}, error => {
						this.$tips("请求异常");
					});
				}
			},
			checkedSessionNo:function(item){
				this.$store.commit('set_is_raced',0);
				this.$store.commit('set_session_no',item.Session);
				this.$store.commit('set_session_id',item.Id);
				this.sessionDataNotNull = false;
				this.$emit('changedBet');
			},
		}
	}
</script>

<style scoped>
	.sessionStyle {
		width: 100%;
		height: 100%;
	}

	.sessionUnitil {
		width: 90%;
		height: 50%;
		position: relative;
		left: 5%;
		top: 5%;
		background-color: wheat;
		border-radius: 0.1rem;
		text-align: center;
		font-size: 0.5rem;
		z-index: 2200;
		padding-top:8%;
	}

	.sessionListData {
		width: 100%;
		height: 40vh;
		position: relative;
		left:5%;
		margin-top: 2vh;
		z-index: 2300;
		overflow: auto;
	}
	
	.sessionListData::-webkit-scrollbar {
		width:0;
		background: none;
	}

	.sessionItem {
		width: 90%;
		height: 13%;
		margin-top:5%;
		/*background-image: url('../../assets/img/dialog/btn-blue.png');
		background-size: 100% 100%;
		-moz-background-size: 100% 100%;*/
		background-color: whitesmoke;
		border-radius: 0.1rem;
		text-align: center;
		font-size: 0.5rem;
		padding-top:8%;
	}
	
	.seesionFontSize{
		font-size: 0.35rem;
	}
	

	.sessionAni-enter,
	.sessionAni-leave-to {
		transform: translateY(-100%);
	}

	.sessionAni-enter-to,
	.sessionAni-leave {}

	.sessionAni-enter-action,
	.sessionAni-leave-active {
		transition: transform 0.5s ease;
	}
</style>
