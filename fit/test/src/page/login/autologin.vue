<template>
	<div class="autologin">
		<div class="logininfo">
			<p class="pinfo">登陆中，请稍后...</p>
		</div>
	</div>
</template>
<script>
	import tips from './../../components/tips/tips'
	export default {
		data() {
			return {
				errormsg: '本次授权失败',
			}
		},
		comments: {
			tips,
		},
		mounted() {
			this.redirectUrl();
		},
		methods: {
			errorRedirect: function() {
				alert(this.errormsg + ',即将跳转到注册页面');
				window.location.href = "/#/logo/register";
			},
			getQueryString: function(name) {
				var url = window.location.href;
				var theRequest = new Object()
				if (url.indexOf("?") > 0) {
					var str = url.split("?")[1];
					var strs = str.split("&");
					for (var i = 0; i < strs.length; i++) {
						var elem = strs[i].split("=");
						var paramData = elem[1];
						if (paramData.indexOf("#") > 0) {
							paramData = paramData.split("#")[0];
						}
						theRequest[elem[0]] = paramData;
					}
					return theRequest.token;
				}
			},
			redirectUrl: function() {
				if ((window.location.href.indexOf("?token") > 0) == false) {
					this.errormsg = "检测到错误的链接";
					this.errorRedirect();
					return;
				}
				var token = this.getQueryString("token");
				console.log(token);
				var xhr = null;
				if (XMLHttpRequest) {
					xhr = new XMLHttpRequest();
				} else {
					xhr = new ActiveXObject("Microsoft.XMLHTTP");
				}
				var Url = "/channel-server/user/getxlLogin.do";
				var form = new FormData();
				form.append("token", token);
				xhr.open("post", Url, true);
				xhr.send(form);
				xhr.onreadystatechange = function() {
					if (xhr.readyState == 4) {
						if (xhr.status == 200) {
							var autologininfo = eval("(" + xhr.responseText + ")");
							if (autologininfo.errorCode == '200') {
								var result = autologininfo.result;
								let data = {};
								data.Id = result.id;
								data.userName = result.username;
								data.password = null;
								data.Balance = result.balance;
								data.FreezeAmount = result.freezeamount;
								data.IsRobot = result.isrobot;
								data.InviteCount = result.invitecount;
								data.InviteRechargeCount = result.inviterechargecount;
								data.BreedTimes = result.breedtimes;
								data.FreeFeedTimes = result.freefeedtimes;
								data.FreeModifyNick = result.freemodifynick;
								data.HasRecharge = result.hasrecharge;
								data.FreeLassoCount = result.freelassocount;
								data.TransactionMemo = result.transactionmemo;
								data.WanLiPieces = result.wanlipieces;
								data.RemainHorseFood = result.remainhorsefood;
								var ajax = null;
								if (XMLHttpRequest) {
									ajax = new XMLHttpRequest();
								} else {
									ajax = new ActiveXObject("Microsoft.XMLHTTP");
								}
								ajax.open("post", "/api/happymoney/logintohm/", true);
								ajax.send(JSON.stringify(data));
								ajax.onreadystatechange = function() {
									if (ajax.readyState == 4) {
										if (ajax.status == 200) {
											var logindata = eval("(" + ajax.responseText + ")");
											if (logindata.IsSuccess) {
												console.log(logindata)
												localStorage.clear();
												localStorage.setItem("userid", result.username);
												localStorage.setItem("uid", result.id);
												//var url=logindata.Result.url.split('01.hi001001.com','localhost:8081');
												sessionStorage.isopenid = result.openid;
												window.location.href = logindata.Result.url;
											} else {
												this.errormsg = "登录信息缺失";
												this.errorRedirect();
											}
										} else {
											this.errormsg = "自动登录失败";
											this.errorRedirect();
										}
									}
								}
							} else {
								this.errormsg = "授权信息不正确";
								this.errorRedirect();
							}
						} else {
							this.errormsg = "拉取授权信息失败";
							this.errorRedirect();
						}
					}
				}
			},
		},
	}
</script>

<style>
	.autologin {
		width: 100%;
		height: 100%;
		background-color: #666;
	}

	.logininfo {
		text-align: center;
		width: 6rem;
		height: 2rem;
		background-color: white;
		position: fixed;
		left: 50%;
		top: 50%;
		margin-left: -3rem;
		margin-top: -1rem;
		border-radius: 50%;
	}

	.pinfo {
		font-size: 10px;
		color: orange;
		margin-top: 0.6rem;
		border: 0.1p solid red;
	}
</style>
