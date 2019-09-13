<template>
	<div class="betUnitil" :style="{'max-width':$store.state.maxWidth}">
		<div class="fixedTop" v-show="phoneOrPc"></div>
		<transition name="betPanelAni">
			<div class="fixedContent" v-show="isShow">
				<div class="content_race_nums">
					<div class="race_num_header" :style="{fontSize:currFontSize}">
						选择赛道
					</div>
					<div class="race_num_body">
						<div class="num_item" v-for="item in 9" :key="item" @click="checked_num(item)" :class="{checked_num_item:checked==item}">
							<img :src="require('../../assets/img/race/num/shuzi'+item+'.png')" class="num_item_img" />
						</div>
					</div>
				</div>
				<div class="content_amount_nums">
					<div class="amount_num_header" :style="{fontSize:currFontSize}">
						竞猜份数
					</div>
					<div class="amount_num_body">
						<div :style="{fontSize:currFontSize}" class="amount_item" v-for="(item,key) in amountList" :key="key" @click="checked_amount(item)"
						 :class="{checked_num_item:checkedAmount==item.val}">{{item.val}}</div>
						<div class="inputs" flex="main:justify">
							<input placeholder="自定义金额需要大于等于20" v-model="checkedAmount" />
						</div>
						<div class="amount_foot">
							<div class="foot_reset">
								<button class="amount_item_reset" :style="{fontSize:currFontSize}" @click="resetChecked">重置</button>
							</div>
							<div class="foot_submit">
								<button class="amount_item_submit" :style="{fontSize:currFontSize}" @click="submitChecked">提交</button>
							</div>
						</div>
					</div>
				</div>
				<div class="fixedContentBtn" v-show="isShow" @click="closeBet"></div>
			</div>
		</transition>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				isShow: false,
				phoneOrPc: true,
				amountList: [{
					id: 1,
					val: 50,
				}, {
					id: 2,
					val: 100,
				}, {
					id: 3,
					val: 200,
				}, {
					id: 4,
					val: 300,
				}],
				currFontSize: '0.8rem',
				checked: 0,
				checkedAmount: 0,
			}
		},
		created() {
			let docH = Math.max(document.documentElement.clientHeight, document.body.clientHeight);
			if (this.$store.getters.getDeviceType=='mobile') {
				this.phoneOrPc = false;
			}else{
				this.phoneOrPc = true;
			}
			if (docH > 600 && docH < 782) {
				this.currFontSize = '0.6rem';
			}
		},
		mounted() {
			setTimeout(() => {
				this.isShow = true;
			}, 100);
		},
		methods: {
			closeBet: function() {
				this.isShow = false;
				this.$emit("closeSure");
			},
			checked_num: function(item) {
				this.checked = item;
			},
			checked_amount: function(item) {
				this.checkedAmount = item.val;
			},
			resetChecked:function(){
				this.checked=0;
				this.checkedAmount=0;
			},
			submitChecked:function(){
				if(this.checked&&this.checkedAmount){
					
					let test=/^\d{3,}|2[1-9]|[3-9]\d$/;
					if(test.test(this.checkedAmount)==false){
						this.$tips('金额数值不合理');
						return;
					}
					let amounts=[0,0,0,0,0,0,0,0,0];
						amounts[this.checked-1]=this.checkedAmount;
					let data = {
						betId: this.$store.getters.getSessionId,
						count: amounts,
					};
					this.$axios.post('/api/battle/compete/bet/', data).then(
						res => {
							let result = res.data;
							if (result.IsSuccess) {
								this.$tips('竞猜成功！');
							} else {
								this.$get_error('tips', result.Code, result.Message);
							}
						}, error => {
							this.$get_error('reload');
						}
					).then(()=>{
						this.resetChecked();
					});
				}else{
					this.$tips("竞猜信息不完整，请检查");
				}
			},
		},
	}
</script>

<style scoped>
	.betUnitil {
		position: fixed;
		height: 100vh;
		top:0;
		z-index:2200;
	}

	.fixedTop {
		width: 300px;
		height: 100vh;
		background-color: white;
		z-index: 2301;
		position: fixed;
		left: 50%;
		margin-left: -450px;
	}

	.fixedContent {
		width: 88%;
		height: 80%;
		position: relative;
		top: 10%;
		background-color: #FFA500;
		border-bottom-right-radius: 1rem;
		border-top-right-radius: 1rem;
	}

	.content_race_nums,
	.content_amount_nums {
		width: 100%;
		height: 50%;
	}

	.race_num_header,
	.amount_num_header {
		width: 50%;
		height: 13%;
		background-color: wheat;
		text-align: center;
		position: relative;
		left: 25%;
		top: -4%;
		border-radius: 0.5rem;
	}

	/*赛道*/
	.race_num_body,
	.amount_num_body {
		width: 100%;
		height: 85%;
		position: relative;
		top: -4%;
	}

	.num_item {
		width: 28%;
		height: 28%;
		float: left;
		margin-left: 3.5%;
		margin-top: 3.5%;
		border-radius: 0.5rem;
		border: 0.15rem solid white;
		background-color: wheat;
	}

	.num_item_img {
		width: 70%;
		height: 70%;
		position: relative;
		top: 15%;
		left: 15%;
	}

	/*竞猜*/
	.amount_item {
		width: 45%;
		height: 20%;
		background-color: #409eff;
		float: left;
		margin-left: 3%;
		margin-top: 5%;
		border-radius: 0.5rem;
		border: 0.15rem solid white;
		text-align: center;
	}

	.amount_foot {
		width: 100%;
		height: 25%;
		position: relative;
		top: 8%;
	}

	/*按钮*/
	.foot_reset,
	.foot_submit {
		width: 45%;
		height: 100%;
		float: left;
		position: relative;
		left: 4.8%;
	}

	.amount_item_reset,
	.amount_item_submit {
		width: 90%;
		height: 90%;
		position: relative;
		top: 5%;
		left: 5%;
		background: none;
		background-size: 100% 100%;
		-moz-background-size: 100% 100%;
	}

	.amount_item_reset {
		background-image: url('../../assets/img/dialog/btn-disabled.png');
	}

	.amount_item_submit {
		background-image: url('../../assets/img/dialog/btn-blue.png');
		color: white;
	}
	
	/*按钮选中后的状态*/
	.checked_num_item {
		border: 0.15rem solid black;
		background-color: #666;
	}

	/*关闭弹窗的按钮*/
	.fixedContentBtn {
		position: relative;
		left: 100%;
		top: -70%;
		z-index: 2400;

		width: 12%;
		height: 20vh;
		background-size: 100% 100%;
		-moz-background-size: 100% 100%;
		background-image: url('../../assets/img/race/bet_back.png');
		/*border-top-right-radius: 1rem;
		border-bottom-right-radius: 1rem;
		background-color: wheat;*/
	}

	/*inputs*/
	.inputs {
		width: 90%;
		height: 16%;
		position: relative;
		left: 50%;
		top: 5%;
		margin-left: -45%;
	}

	.inputs input {
		height: 100%;
		min-width: 100%;
		-webkit-border-radius: 0.15625rem;
		border-radius: 0.15625rem;
		-moz-border-radius: 0.15625rem;
		border: 1px solid #837361;
		text-indent: 0.3125rem;
	}

	input::-webkit-input-placeholder {
		font-size: 0.5rem;
		color: #999999;
	}

	.inputs button {
		padding: 0 0.8rem;
		height: 0.85rem;
		font-size: 0.2667rem;
	}

	/*animate*/
	.betPanelAni-enter,
	.betPanelAni-leave-to {
		transform: translateX(-100%);
	}

	.betPanelAni-enter-to,
	.betPanelAni-leavev {}

	.betPanelAni-enter-active,
	.betPanelAni-leave-active {
		transition: transform 0.5s ease;
	}
</style>
