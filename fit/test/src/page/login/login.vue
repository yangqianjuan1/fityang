<template>
	<div>
		<img src="../../assets/img/index/index-1.png" class="cl" style="height: 2.36rem;position: relative;bottom: -1.2rem;z-index: 5;">
		<div class="logo-content " flex="dir:top main:center cross:center">
			<!--<div flex="mian:left cross:center" class="input">-->
			<!--<img src="../../assets/img/dialog/email.png">-->
			<input placeholder="请输入手机号码或邮箱" v-model="login.phone" />
			<!--</div>-->
			<!--<div flex="mian:left cross:center" class="input">-->
			<!--<img src="../../assets/img/dialog/secret.png">-->
			<input placeholder="请输入6-16位数字加字母密码" v-model="login.password" type="password" />
			<!--</div>-->

			<p id="login" style="width: 100%"></p>
			<!--<p class="error miaobian-hong">{{login.error}}</p>-->
			<!--<div  >-->
			<!--<div id="TencentCaptcha"></div>-->
			<p class="loginChange" flex="main:justify">
				<span style="margin-right: 0.5rem;color: #3d38fb;" class="miaobian" @click="toRegister">立即注册</span>
				<span style="margin-left: 0.5rem ;color: #3d38fb;" class="miaobian" @click="openFindSecret()">忘记密码</span>
			</p>
			<button class="btn-yellow" @click="logIn">登录</button>
			<!--</div>-->
		</div>

	</div>
</template>
<script>
	import gt from '../../assets/js/gt'
	import Money from "./money";
	export default {
		components: {
			Money
		},
		name: "login",
		data() {
			return {
				login: {
					phone: '',
					password: '',
					error: '',
				},
			}
		},
		methods: {
			callback: function(res) {
				if (res.ret === 2) return;
				let data = {
					userName: this.login.phone,
					password: this.login.password,
					randstr: res.randstr,
					ticketm: res.ticket
				};
				this.$axios.post('/api/user/login/', data)
					.then(res => {
						let result = res.data;
						if (result.IsSuccess) {
							this.logIn.error = "";
							this.$store.commit('SET_LOGIN', true);
							if (result.Result.k) {
								window.location.href = this.$store.state.shareAddress + result.Result.k;
							} else {
								this.$router.push('/Fomo3D');
							}
						} else {
							this.geetest = null;
							this.login.error = result.Message;
							if (this.captchaObj) {
								this.captchaObj.reset();
							}
						}
					}, error => {
						this.login.error = '系统错误，请稍后重试';
					})
			},
			setMinHeight: function() {
				return 'min-height:' + window.screen.height + 'px'
			},
			phoneFill: function(phone) { //s格式验证	
				if (!phone) {
					this.$tips('请输入手机号码');
					return "101";
				}
				if (phone.indexOf("@") > 0) {
					let emailType = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
					if (!emailType.test(phone)) {
						this.$tips('请输入有效邮箱');
						return "102";
					} else {
						return null;
					}
				}
				let phoneType = /^1\d{10}$/;
				if (!phoneType.test(phone)) {
					this.$tips('请输入11位有效手机号码');
					return "103";
				}
				return null;
			},
			secretFill: function(password) {
				let str = password;
				if (str === "") {
					this.$tips('请输入密码');
					return '201';
				}
				if (str.length < 8 || str.length > 16) {
					this.$tips('密码必须大于8位小于16位');
					return '202';
				}
				let reg = new RegExp(/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/);
				if (reg.test(str)) {
					return null;
				} else {
					this.$tips('密码必须必须包含数字和字母');
					return '203';
				}
			},
			logIn: function() {
				if(this.phoneFill(this.login.phone)!=null){
					return;
				}
				if(this.secretFill(this.login.password)!=null){
					return;
				}
				var form = new FormData();
				form.append("loginName", this.login.phone);
				form.append("loginPwd", $.md5(this.login.password));
				this.$axios.post('/channel-server/user/login.do', form)
					.then(res => {
						let obj = res.data;
						let result = obj.result;
						if (obj.errorCode == '200') {
							let data = {Id:result.id};

							this.$axios.post('/api/happymoney/logintohm/', data)
								.then(res => {
									let logindata = res.data;
									if (logindata.IsSuccess) {
										localStorage.clear();
										localStorage.setItem('accesstoken', logindata.Result.accesstoken);
										localStorage.setItem("userid", this.login.phone);
										localStorage.setItem("uid", result.id);
										var url = logindata.Result.url.split('01.games88.org', 'localhost:8080');
										//var url = logindata.Result.url.split('192.168.1.116', 'localhost:8080');
										window.location.href = url;
									} else {
										this.$get_error("tips", logindata.errorCode, logindata.errorMessage);
									}
								}, error => {
									this.$get_error("reload");
								});
						} else {
							this.$get_error("tips", obj.errorCode, obj.errorMessage);
						}
					}, error => {
						this.$get_error("reload");
					});
			},
			loginSuccess: function() {

			},
			toRegister: function() {
				this.$router.replace({
					name: 'register'
				});
			},
			openFindSecret: function() {
				this.$router.replace({
					name: 'findSecret'
				})

			}
		},

	}
</script>

<style scoped>
	.logo-content {
		text-align: center;
		width: 80%;
		padding: 1.4rem 0.5rem 2rem;
		position: relative;
		background-image: url("../../assets/img/index/erweimadi.png");
		background-size: 100% 100%;
		margin: 0 auto;
	}

	input {
		text-indent: 0.2rem;
		background: #ffffff;
		width: 80%;
		height: 0.8rem;
		border: 1px solid #7B613B;
		border-radius: 0.15625rem;
		-webkit-border-radius: 0.15625rem;
		-moz-border-radius: 0.15625rem;
		margin: 0.225rem auto;
	}

	input::placeholder {
		color: #502111;
	}

	button {
		width: 50%;
		height: 0.8rem;
		color: #ffffff;
		margin-top: 0.3rem;
		text-align: center;
		font-size: 0.4rem;
		border-radius: 0.2rem;
	}

	.loginChange {
		width: 80%;
		cursor: pointer;
		height: 0.4375rem;

		text-align: center;
		color: #fe662e;
	}

	.loginChange span {
		font-size: 0.24rem;
	}
</style>
