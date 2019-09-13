<template> 
	<div class="dialog" v-if="showMask">
		<div class="dialog-container" :style="{'max-width':$store.state.maxWidth}">
			<div class="pay_seat"></div>
			<div class="dialog-title">
				<img class="pay_back" @click="back_pay" :src="is_open_back_img" />
				{{title}}
				<img class="pay_close" @click="closeBtn" src="../assets/img/pay/pay_close.png" />
			</div>
			<div class="content" v-show="pay_amount_default">
				<table>
					<tr class="tr1">
						<td>
							<span class="pay_icon">$</span>
							<input :value="pay_amount" name="amount" placeholder="金额为整数" readOnly />
						</td>
					</tr>
					<tr class="tr2">
						<td>
							<div class="auto_amount_button_position" v-for="item in pay_amounts">
								<div class="auto_amount_button" :class="{ischeck:item.checked}" name="btn" @click="input_pay_amount(item.id)">
									{{item.text}}
								</div>
							</div>
						</td>
					</tr>
					<tr class="tr3">
						<td>
							<span class="pay_icon">自定义金额</span>
							<input name="auto_amount" v-model.number="auto_amount" placeholder="最小额度20"/>
						</td>
					</tr>
				</table>
			</div>
			<div class="dialog-paytype" v-show="pay_amount_ok">
				<div class="pay_type_content">
					<div class="pay_amount_info">支付金额<br/>${{pay_amount}}</div>
					<div class="pay_amount_content">
							<div class="payByBank"></div>
							<div class="paypal_buttons">
								<paypal @payResult="pay_result"></paypal>
							</div>
							<div class="payByBank"></div>
							<div class="pay_tips">
								温馨提示:<br/><p>选择&nbsp;银联&nbsp;或&nbsp;VISA&nbsp;或&nbsp;Mastercard&nbsp;</p><p>或&nbsp;AMEX可享受免登陆支付服务.</p>
							</div>
					</div>
				</div>
			</div>
			<div class="btns" v-show="pay_amount_default">
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
		components: {
			paypal:resolve=>require(['./paypal'],resolve),
		},
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
				is_open_back_img:require("../assets/img/pay/pay_back_1.png"),
				pay_amounts_index:200,
				pay_amounts:[],
				ispaypal: false,
				showMask: false,
				pay_amount: '',
				auto_amount:'',
				last_pay_amount: '',
				isCross: 0,
				pay_amount_default: true,
				pay_amount_ok: false,
			}
		},
		methods: {
			clearLastInfo() {
				this.pay_amount_default = true;
				this.pay_amount_ok = false;
				this.isCross = 0;
				if(this.pay_amounts_index!=200){
					this.pay_amounts[this.pay_amounts_index].checked=false;
				}
				this.pay_amounts_index=200;
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
					}
					this.pay_input_info();
					return;
				}
				if(!(parseInt(this.pay_amount)>=20)){
					this.isCross=4;
					this.pay_input_info();
					return;
				}
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
					sessionStorage.payAmountValue=this.pay_amount;
				} else {
					this.isCross = 1;
				}
				if (this.showMask == false) {
					this.isCross = 0;
				}
				this.pay_input_info();
			},
			pay_input_info() {
				var i = parseInt(this.isCross);
				switch (i) {
					case 0:{
							return;
						}
					case 1:{
							this.$tips('填入的值不正确');
							return;
						}
					case 2:{
							return;
						}
					case 3:{
							this.$tips('请填写充值金额');
							return;
						}
					case 4:{
							this.$tips('充值金额需大于20');
							return;
						}
					default:
						{
							this.$tips('无效参数');
							return;
						}
				}
			},
			pay_result(obj){
				var result=obj[0];
				if(result){
					 this.$tips('支付成功');
				}else{
					 this.$tips('支付失败');
				}
				this.closeBtn();
				this.upload_pay_record();
			},
			upload_pay_record(){
				var url="/testaddbalance/?Id="+localStorage.getItem("uid")+"&amount="+sessionStorage.finalmoney;
				this.$axios.get(url).then(res=>{
				  let result = res.data;
				 if(result.IsSuccess){
				     this.$tips('充值到账');
					 this.$emit('payResult');
				   }else{
				     this.$get_error('tips',result.Code,result.Message);
				   }
				 },error=>{
				   this.$get_error('network');
				 })
			},
			input_pay_amount(obj){
				var index=parseInt(obj)-1;
				if(this.pay_amounts_index!=200){
					this.pay_amounts[this.pay_amounts_index].checked=false;
				}
				this.pay_amount=this.pay_amounts[index].value;
				this.pay_amounts[index].checked=true;
				this.verify_pay_amount();
				this.pay_amounts_index=index;
			},
		},
		mounted() {
			this.showMask = this.value;
			this.clearLastInfo();
			this.pay_amounts=[{
				id:1,
				text:'20',
				value:20,
				checked:false,
			},{
				id:2,
				text:'50',
				value:50,
				checked:false,
			},{
				id:3,
				text:'150',
				value:150,
				checked:false,
			},{
				id:4,
				text:'300',
				value:300,
				checked:false,
			}];
		},
		watch: {
			value(newVal, oldVal) {
				this.showMask = newVal;
			},
			showMask(val) {
				this.$emit('input', val);
			},
			auto_amount(newVal, oldVal) {
				this.pay_amount=this.auto_amount;
				this.verify_pay_amount();
				if(this.pay_amounts_index!=200){
					this.pay_amounts[this.pay_amounts_index].checked=false;
					this.pay_amounts_index=200;
				}
			},
			pay_amount_ok:function(val){
				if(this.pay_amount_ok){
					this.is_open_back_img=require("../assets/img/pay/pay_back.png");
				}else{
					this.is_open_back_img=require("../assets/img/pay/pay_back_1.png");
				}
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
		width: 84%;
		height: 70Vh;
		border-radius: 10px;
		background-image: url(../assets/img/index/erweimadi.png);
		background-size: 100% 100%;
		-moz-background-size:100% 100%;
		position: relative;
		left: 50%;
		top: 20%;
		margin-left: -42%;
	}
	.pay_seat{
		width:100%;
		height:4%;
	}
	.dialog-title {
		width: 92%;
		height: 10%;
		font-size: 0.8rem;
		position: relative;
		left:50%;
		margin-left:-46%;
		color: black;
		text-align: center;
		padding-top: 10px;
	}
	.content,
	.dialog-paytype {
		width: 100%;
	}
	.content{
		height: 62%;
	}
	.dialog-paytype{
		height: 85%;
	}

	.btns {
		width: 100%;
		height: 12%;
	}
	
	.pay_tips{
		width: 90%;
		height: 30%;
		padding-left:10%;
		color:white;
		font-size: 0.5rem;
		text-align: center;
	}
	
	.confirm-btn {
		color: white;
		width: 50%;
		height: 70%;
		position: relative;
		left: 50%;
		margin-left: -25%;
		background: none;
		border: 0;
		text-align: center;
		font-size: 0.5rem;
		padding-top: 1.5%;
		background-size: 100% 100%;
		-webkit-background-size: 100% 100%;
		background-image: url("../assets/img/dialog/btn-yellow.png");
	}

	table {
		width: 90%;
		height: 100%;
		position: relative;
		left:50%;
		margin-left:-45%;
	}
	.tr1,.tr3{
		text-align: center;
		height:20%;
	}
	.tr2{
		height:50%;
		border:0.1px solid red;
	}
	table tr td {
		/*border:0.1px solid red;*/
	}

	input[name=amount],input[name=auto_amount]{
		height: 52%;
		background:none;
		border:1px solid black;
		border-radius:1rem;
		font-size: 0.6rem;
	}
	input[name=amount]::-webkit-input-placeholder {
		color: #aab2bd;
        font-size: 0.6rem;
     }
	input[name=auto_amount]::-webkit-input-placeholder {
		color: #aab2bd;
	    font-size: 0.5rem;
	 }
	 input[name=amount]{
		width: 60%;
		text-align: center;
	 }
	 input[name=auto_amount]{
		 width:40%;
		 padding-left:0.1rem;
	 }
	.auto_amount_button_position{
		width:50%;
		height:50%;
		border:0;
		float:left;
	}
	.auto_amount_button{
		width:70%;
		height:60%;
		position: relative;
		left:50%;
		top:50%;
		margin-left:-35%;
		margin-top:-15%;
		background-image: url(../assets/img/dialog/btn-violet.png);
		background-size: 100% 100%;
		-webkit-background-size: 100% 100%;
		border:0;
		padding-top:10%;
		text-align: center;
		color:white;
		font-size: 0.5rem;
	}
	.ischeck{
		background-image: url(../assets/img/dialog/btn-disabled.png);
	}
	
	.pay_icon {
		font-size: 0.5rem;
		color: black;
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
		width: 80%;
		height: 30%;
		position: relative;
		top:5%;
		left:50%;
		margin-left:-40%;
		font-size:0.8rem;
		color: darkorange;
		text-align: center;
		padding-top:7.5%;
		background-size: 100% 100%;
		-webkit-background-size: 100% 100%;
		background-image: url(../assets/img/transactin/dlg-bg-sm.png); 
	}
	
	.pay_amount_content {
		width: 100%;
		height: 70%;
		padding-top: 2%;
	}
	.payByBank{
		width:100%;
		height:10%;
	}
	.paypal_buttons {
		width: 90%;
		height:30%;
		position: relative;
		left: 50%;
		margin-left: -45%;
	}
</style>
