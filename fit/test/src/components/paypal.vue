<template>
	<div>
		<div id="paypal-button-container"></div>
	</div>
</template>

<script>
	import Base64 from '../../static/base64.min.js'
	import payconfig from '../../static/paypalConfig.js'
	export default {
		data(){
			return {
				timer:null,
				payTimer:null,
			}
		},
		components: {
			Base64,
			payconfig,
		},
		methods: {
			payResult:function(obj){
				if(obj==200){
					this.$emit("payResult",[true]);
				}else{
					this.$emit("payResult",[false]);
				}
			},
			first: function() {
				const s = document.createElement('script');
				s.type = 'text/javascript';
				s.src =
					'https://www.paypal.com/sdk/js?client-id=Ad7QQ8D0_0-o_eyTVWWgFrGlJO8lnD_jsNiJPl-dJR8Us_Z_nO4_7Rwpmr-YS5fQ2dERhU9QT8zILlSm';
				document.body.appendChild(s);
				var initNum=1500;
				this.timer=setInterval(()=>{
					paypal.Buttons({
						createOrder: function(data, actions) {
							var data='0.01';
							if(sessionStorage.payAmountValue!=null){
								data=sessionStorage.payAmountValue;
							}
							return actions.order.create({
								purchase_units: [{
									amount: {
										value: data
									}
								}]
							});
						},
						onApprove: function(data, actions) {
							return actions.order.capture().then(function(details) {
								if (details.status == "COMPLETED") {
									if (details.purchase_units[0].amount.value != '' || details.purchase_units[0].amount.value != null) {
										sessionStorage.finalmoney = details.purchase_units[0].amount.value;
									} else {
										initNum=1501;
										console.log("异常支付1");
										return 'fail';
									}
									initNum=200;
									console.log("支付成功:");
									return "success"
								} else {
									initNum=1502;
									console.log("异常支付2");
									return "fail";
								}
							});
						}
					}).render('#paypal-button-container');
					clearInterval(this.timer);
				}, 500);
				this.payTimer=setInterval(()=>{
					if(initNum!=1500){
						clearInterval(this.payTimer);
						this.payResult(initNum);
						sessionStorage.payAmountValu='0.01';
						initNum=1500;
						return;
					}
				},1000);
				
			},
		},
		mounted() {
			this.first();
		},
	}
</script>
<style>
	.pay_result_info {
		/*display:none;*/
	}
</style>
