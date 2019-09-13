<template>
	<div class="dialog" v-show="showMask">
		<div class="dialog-container" :style="{'max-width':$store.state.maxWidth}">
			<div class="top_seat"></div>
			<div class="dialog-title">
				<img class="pay_back" @click="back_pay" src="../assets/img/pay/pay_back.png" />
				{{title}}
				<img class="pay_close" @click="closeBtn" src="../assets/img/pay/pay_close.png" />
			</div>
			<div class="content" v-if="pay_amount_default">
				<table>
					<tr>
						<td colspan="2" style="text-align: center;">&nbsp;<span class="pay_icon">￥</span><input v-model.number="pay_amount" name="amount" placeholder="金额为整数" /></td>
					</tr>
					<tr>
						<td rowspan="8">
							<div class="pay_gift_package toright" v-for="item in left_pay_gift_package_info" @click="giftPackage_input_amount(item.amount)">
								<p>{{item.name}}</p>
								<p>{{item.info}}</p>
							</div>
						</td>
						<td rowspan="8">
							<div class="pay_gift_package toleft" v-for="item in right_pay_gift_package_info" @click="giftPackage_input_amount(item.amount)">
								<p>{{item.name}}</p>
								<p>{{item.info}}</p>
							</div>
						</td>
					</tr>
				</table>
			</div>
			<div class="dialog-paytype" v-if="pay_amount_ok">
				<div class="pay_type_content">
					<div class="pay_amount_info">￥{{pay_amount}}</div>
					<div class="pay_amount_content">
						<div class="pay_type_all" v-for="item in pay_img_types" @click="submit_pay_type(item.id)" :class="{ischeck:item.checked}">
							<img class="pay_type_img" :src="item.src" />
							{{item.name}}
						</div>
					</div>
				</div>
			</div>
			<div class="btns">
				<div v-if="type == 'danger'" class="danger-btn" @click="dangerBtn">
					{{dangerText}}
				</div>
				<div v-if="type == 'confirm'" class="confirm-btn" @click="confirmBtn">
					{{confirmText}}
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		props: {
			value: {},
			// 类型包括 defalut 默认， danger 危险， confirm 确认，
			type: {
				type: String,
				default: 'default'
			},
			title: {
				type: String,
				default: ''
			},
			cancelText: {
				type: String,
				default: '取消'
			},
			dangerText: {
				type: String,
				default: '删除'
			},
			confirmText: {
				type: String,
				default: '下一步'
			},
		},
		data: function() {
			return {
				ispaypal: false,
				showMask: false,
				left_pay_gift_package_info: [],
				right_pay_gift_package_info: [],
				pay_img_types: [],
				pay_amount: '',
				last_pay_amount: '',
				isCross: 0,
				pay_amount_default: true,
				pay_amount_ok: false,
				last_pay_type_checked: 100,
			}
		},
		methods: {
			clearLastInfo() {
				this.pay_amount_default = true;
				this.pay_amount_ok = false;
				this.confirmText = "下一步";
				this.isCross = 0;
				this.pay_img_types = [];
				this.last_pay_type_checked = 100;
			},
			closeMask() {
				this.showMask = false;
				this.clearLastInfo();
			},
			closeBtn() {
				this.$emit('cancel');
				this.closeMask();
				this.pay_input_info();
				this.pay_amount = '';
			},
			dangerBtn() {
				this.$emit('danger');
				this.closeMask();
			},
			confirmBtn() {
				this.$emit('confirm');
				var i = parseInt(this.isCross);
				if (i != 2) {
					if (this.pay_amount == "" || this.pay_amount == null) {
						this.isCross = 3;
						this.pay_input_info();
					}
					return;
				}
				if (this.confirmText == "确认支付") {
					if (this.last_pay_type_checked == 100) {
						this.$tips("请先选择支付方式");
						return;
					}
					console.log("支付方式:" + this.last_pay_type_checked + "\t\t拉起支付中...");
					return;
				}
				this.pay_type_img_info();
				this.confirmText = "确认支付";
				this.pay_amount_default = false;
				this.pay_amount_ok = true;
			},
			back_pay() {
				if (this.pay_amount_default == true) {
					return;
				}
				this.clearLastInfo();
				this.verify_pay_amount();
			},
			verify_pay_amount() {
				var reg = /^[1-9]\d*$/;
				if (this.pay_amount == "" || this.pay_amount == null) {
					this.isCross = 0;
					this.pay_input_info();
					return;
				}
				if (reg.test(this.pay_amount) == true) {
					this.isCross = 2;
				} else {
					this.isCross = 1;
				}
				if (this.showMask == false) {
					this.isCross = 0;
				}
				this.pay_input_info();
			},
			giftPackage() {
				var pageInfos = [{
					gid: 1,
					name: '礼包一',
					info: '首充礼包',
					amount: 10,
				}, {
					gid: 2,
					name: '礼包二',
					info: '新手礼包',
					amount: 30,
				}, {
					gid: 3,
					name: '礼包三',
					info: '节日礼包',
					amount: 50,
				}, {
					gid: 4,
					name: '礼包四',
					info: '成就礼包',
					amount: 100,
				}];
				var left_infos = [];
				var right_infos = [];
				for (const i in pageInfos) {
					if (pageInfos[i].gid % 2 == 0) {
						right_infos.push(pageInfos[i])
					} else {
						left_infos.push(pageInfos[i]);
					}
				}
				this.left_pay_gift_package_info = left_infos;
				this.right_pay_gift_package_info = right_infos;
			},
			pay_input_info() {
				var i = parseInt(this.isCross);
				switch (i) {
					case 0:
						{
							return;
						}
					case 1:
						{
							this.$tips('填入的值不正确');
							return;
						}
					case 2:
						{
							/*this.$tips('点击下一步选择支付方式');*/
							return;
						}
					case 3:
						{
							this.$tips('请填写充值金额');
							return;
						}
					default:
						{
							this.$tips('无效参数');
							return;
						}
				}
			},
			giftPackage_input_amount(obj) {
				if (obj != null) {
					this.pay_amount = parseInt(obj);
				} else {
					this.$tips("礼包已被抢完");
				}
			},
			pay_type_img_info() {
				var data = [{
					id: 1,
					name: "paypal",
					src: require('../assets/img/pay/pay_type.png'),
					checked: false,
				}, {
					id: 2,
					name: "支付宝",
					src: require('../assets/img/pay/pay_type.png'),
					checked: false,
				}, {
					id: 3,
					name: "微信",
					src: require('../assets/img/pay/pay_type.png'),
					checked: false,
				}, {
					id: 4,
					name: "信用卡",
					src: require('../assets/img/pay/pay_type.png'),
					checked: false,
				}];
				this.pay_img_types = data;
			},
			submit_pay_type(obj) {
				if (this.last_pay_type_checked != 100) {
					this.pay_img_types[this.last_pay_type_checked].checked = false;
				}
				var index = parseInt(obj) - 1;
				this.last_pay_type_checked = index;
				this.pay_img_types[index].checked = true;
			}
		},
		mounted() {
			this.showMask = this.value;
			this.giftPackage();
			this.clearLastInfo();
		},
		watch: {
			value(newVal, oldVal) {
				this.showMask = newVal;
			},
			showMask(val) {
				this.$emit('input', val);
			},
			pay_amount(newVal, oldVal) {
				this.verify_pay_amount();
			},
		}
	}
</script>

<style scoped>
	.dialog {
		height: 100vh;
		z-index: 2200;
		position: relative;
		background-color: #000000;
		/*opacity: 0.4;*/
		background: rgba(0, 0, 0, 0.4)
	}

	.dialog-container {
		width: 94%;
		height: 80%;
		border-radius: 10px;
		background-image: url(../assets/img/index/erweimadi.png);
		background-size: 100% 100%;
		-moz-background-size:100% 100%;
		position: relative;
		left: 50%;
		top: 10%;
		margin-left: -47%;
	}
	.top_seat{
		width:100%;
		height:3%;
	}
	.dialog-title {
		width: 100%;
		height: 8%;
		font-size: 20px;
		color: black;
		text-align: center;
		padding-top: 10px;
	}
	
	.content,
	.dialog-paytype {
		width: 100%;
		height: 65%;
	}

	.btns {
		width: 100%;
		height: 24%;
	}

	.confirm-btn {
		color: white;
		width: 50%;
		height: 30%;
		position: relative;
		left: 50%;
		top:5%;
		margin-left: -25%;
		
		background: none;
		border: 0;
		text-align: center;
		font-size: 18px;
		padding-top: 6px;
		background-size: 100% 100%;
		-webkit-background-size: 100% 100%;
		background-image: url("../assets/img/dialog/btn-yellow.png");
	}

	table {
		width: 100%;
		height: 100%;
	}

	table tr td {
		/*border:0.1px solid red;*/
	}

	input[name=amount] {
		width: 70%;
		height: 35px;
		border: 0;
		border-radius: 10px;
		font-size: 18px;
		padding-left: 15px;
	}

	.pay_icon {
		font-size: 0.6rem;
		color: darkorange;
	}

	.pay_gift_package {
		margin-left: 5%;
		background-color: orange;
		width: 85%;
		height: 45%;
		margin-top: 5%;
		border-radius: 5px;
	}
	
	.toright{
		float: right;
	}
	.toleft{
		float: left;
	}
	
	.pay_back,
	.pay_close {
		width: 10%;
		height: 80%;
		border-radius: 10px;
		background: none;
		background-size: 100% 100%;
		-webkit-background-size: 100% 100%;
	}

	.pay_back {
		float: left;
		margin-left: 5%;
	}

	.pay_close {
		float: right;
		margin-right: 5%;
	}

	.pay_type_content {
		width: 100%;
		height: 100%;
	}

	.pay_amount_info {
		width: 100%;
		height: 20%;
		text-align: center;
		padding-top:13px;
		font-size: 20px;
		color: darkorange;
		background-image: url(../assets/img/activity/release-title.png);
		background-size:100% 100%;
		-moz-background-size:100% 100%;
	}

	.pay_amount_content {
		width: 100%;
		height: 80%;
		padding-top: 5%;
		/*background-color: aqua;*/
	}

	.pay_type_all {
		width: 80%;
		height: 20%;
		background-color: orange;
		border-radius: 10px;
		margin-top: 8px;
		position: relative;
		left: 50%;
		margin-left: -40%;
	}

	.pay_type_img {
		width: 20%;
		height: 80%;
		border: 0;
		margin-top: 2.5%;
		margin-left: 2.5%;
	}

	.ischeck {
		background-color: #FFFF00;
	}
</style>
