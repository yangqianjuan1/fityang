<template>
	<div class="recharge">
		<div>
			<div>
				<div style="width: 100%;margin: 0 auto;position: relative;">
					<div class="inputs" flex="main:justify">
						<button @click="makeSure" class="btn-violet">充值</button>
					</div>
					<p style="font-size: 0.4375rem;color: #f07765;text-align: center;text-indent: 0;height: 20px;line-height: 20px"
					 class="miaobian-lan"></p>
				</div>
				<!--<div style="text-align: center"> <button class="qus"><a href="https://www.wenjuan.com/s/rMB7Rz/">提交充值问题工单</a></button></div>-->
			</div>
			<p style="font-size: 16px;margin: 0 auto;width: 100%;line-height: 0.9375rem;padding-left: 0.625rem" v-if="!empty"
			 class="miaobian-lan usual">充值记录</p>
			<div flex="main:center" v-if="!empty">
				<!--<img src="../../assets/img/user/list-before.png" style="height: 1rem">-->
				<ul v-if="!empty" style="width: 100%;padding: 0 0.5rem">
					<li class="bg-center" flex="main:center cross:center box:mean">

						<p class="miaobian-hong">时间</p>
						<p class="miaobian-hong">充值数量</p>
						<!--<th>充值地址</th>-->
						<!--<p class="miaobian-hong">状态</p>-->
					</li>
					<li v-for="charge in recharge" class="usual">
						<div flex="main:center cross:center box:mean">
							<p class="miaobian-lan">{{charge.CreateTime}}</p>
							<p class="miaobian-lan">{{charge.Amount}}</p>
						</div>
						<div class="under-line"></div>
					</li>
				</ul>
			</div>
		</div>
		<foot></foot> 
	</div>
</template>

<script>
	import Foot from "../../components/footer";
	import Contain from "../../components/contain";
	import MakeSureDialog from "../../components/makeSureDialog";
	import Paging from "../../components/paging";
	import LoginRegisterFind from "../../components/loginRegisterFind";
	import Copy from "../../components/copy";
	import MyDialog from "../../components/dialog";
	export default {
		components: {
			Copy,
			LoginRegisterFind,
			Paging,
			MakeSureDialog,
			Contain,
			MyDialog,
			Foot,
		},
		name: "recharge",
		props: {
			listFuc: {},
			empty: true,
			recharge: [],
			infoFuc: {},
			account: {
				default: {
					TransMemo: "",
					WalletAccount: ""
				}
			},
		},
		data() {
			return {
				totalPage: 0,
				pageSize: 10,
				empty: true,
				from: '',
				num: '',
				isPhone: 0,
				codeError: '',
				WithDrawalsConfig: {
					WithDrawalsDlg: false, //提现Dlg
					config: {
						amount: '',
						ethHash: '',
						vCode: '',
					}
				},
			}
		},
		mounted() {
			this.listFuc();
			this.setMaxWidth();
			if (sessionStorage.isopenid == null) {
				sessionStorage.isopenid = 0;
			}
		},
		methods: {
			makeSure: function() {
				this.$emit("userOpenMask");
			},
			uaVersions: function() {
				let u = navigator.userAgent,
					app = navigator.appVersion;
				return { //移动终端浏览器版本信息
					trident: u.indexOf("Trident") > -1, //IE内核
					presto: u.indexOf("Presto") > -1, //opera内核
					webKit: u.indexOf("AppleWebKit") > -1, //苹果、谷歌内核
					gecko: u.indexOf("Gecko") > -1 && u.indexOf("KHTML") == -1, //火狐内核
					mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
					ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
					android: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1, //android终端或者uc浏览器
					iPhone: u.indexOf("iPhone") > -1, //是否为iPhone或者QQHD浏览器
					iPad: u.indexOf("iPad") > -1, //是否iPad
					webApp: u.indexOf("Safari") == -1 //是否web应该程序，没有头部与底部
				};
			},
			setMaxWidth: function() {
				let UA = this.uaVersions();
				if (UA.mobile && !UA.iPad) { //手机端
					this.isPhone = 1;
				} else {

				}
			},
			getType: function(type) {
				switch (type) {
					case 1:
						return '等待充值到账';
					case 8:
						return '充值成功'
				}
			}
		}
	}
</script>

<style scoped>
	.recharge {
		padding: 0.5rem;
	}

	.select {
		position: relative;
		background: #ffffff;
		padding: 1.25rem 0.5rem;
		box-shadow: 0 0 3.125rem #F4F4F8;
		-webkit-box-shadow: 0 0 3.125rem #F4F4F8;
		-moz-box-shadow: 0 0 3.125rem #F4F4F8;
	}

	.qus {
		/*margin-top: 1rem;*/
		background-image: url("../../assets/img/index/anniu.png");
		background-size: 100% 100%;
		padding: 0.3rem 0.3rem;
		height: 100%;
		line-height: 100%;
		text-align: center;
		border-radius: 0.2rem;

	}

	.inputs {
		height: 0.853rem;
		line-height: 0.853rem;
		margin-top: 0.3rem;
	}

	.qus a {
		color: #D07416;
	}

	button {
		cursor: pointer;
	}

	.text {
		color: #502111;
		font-size: 0.34rem;
		font-weight: 600;
	}

	input::-webkit-input-placeholder {
		font-size: 0.2667rem;
		color: #999999;
	}

	.bg-center {
		height: 0.62rem;
		line-height: 0.62rem;
		padding: 0;
		width: 100%;
		background: #D3AA6D;
		border-radius: 0.31rem;
	}

	.bg-center p {
		color: #4F2111;
		font-size: 0.37rem;
		font-weight: 600;
	}

	.Tips {
		width: 100%;
		padding: 0.625rem;
		background-image: url("../../assets/img/index/bg-3.png");
		background-size: 100% 100%;
		margin: 0.5rem auto;
		font-size: 0.4rem;
		color: #ffffff;
		line-height: 0.625rem;
		-webkit-border-radius: 0.3125rem;
		border-radius: 0.3125rem;
		-moz-border-radius: 0.3125rem;
	}

	.inputs input {
		height: 0.85rem;
		min-width: 70%;
		-webkit-border-radius: 0.15625rem;
		border-radius: 0.15625rem;
		-moz-border-radius: 0.15625rem;
		border: 1px solid #837361;
		text-indent: 0.3125rem;
	}

	.inputs button {
		padding: 0 0.8rem;
		height: 0.85rem;
		font-size: 0.2667rem;
	}

	li {
		text-align: center;
		/*height: 0.91rem;*/
		padding: 0;
		margin: 0;
		/*line-height: 0.91rem;*/
		min-width: 2.8rem;
		/*border-radius: 0.2rem;*/
	}

	li p {
		text-align: center;
		padding: 0.3rem 0;
		word-WRAP: break-word;
		/*border-top: 0.03125rem solid #E5E5E5;*/
	}

	tr {
		text-align: left;
	}

	.copyBtn {
		width: 2.5rem;
		height: 1rem;
	}
</style>
