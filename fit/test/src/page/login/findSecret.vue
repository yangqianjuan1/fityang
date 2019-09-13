<template>
	<div>
		<img src="../../assets/img/index/index-1.png" class="cl" style="height: 2.36rem;position: relative;bottom: -1.2rem;z-index: 5;">
		<div class="logo-content" flex="dir:top main:center cross:center">
			<!--<div class="input" flex="main:left cross:center">-->
			<!--<img src="../../assets/img/dialog/email.png">-->
			<input placeholder="请输入手机号码或邮箱" v-model="findSecret.email" />
			<!--</div>-->

			<div flex="main:justify cross:center" style="width: 80%">
				<!--<div class="input" flex="main:left cross:center">-->
				<!--<img src="../../assets/img/dialog/yanzhengma.png">-->
				<input placeholder="请输入验证码" style="width: 60%;text-indent: 0.2rem" v-model="findSecret.code" />
				<!--</div>-->

				<send-code class="code btn-blue" :userName="findSecret.email" isPhone="" :type="2" @error="getSecretCodeError"></send-code>
			</div>
			<!--<div class="input" flex="main:left cross:center" style="margin-bottom: unset">-->
			<!--<img src="../../assets/img/dialog/secret.png">-->
			<input placeholder="8-16位数字与字母" type="password" v-model="findSecret.password" />
			<!--</div>-->
			<button class="btn  btn-yellow" @click="ForgetSecret">修改密码</button>
			<p style="cursor: pointer;" @click="$router.replace('/login')">记得密码，<span class="special-color" style="color: #3d38fb;">马上登录</span></p>
		</div>

	</div>
</template>

<script>
	import SendCode from "../../components/sendCode";

	export default {
		components: {
			SendCode
		},
		name: "find-secret",
		data() {
			return {
				findSecret: {
					email: '',
					password: '',
					code: '',
					error: '',
					geetest: ''
				},
				type: {
					Register: 1.,
					ForgetPassword: 2.,
					Withdraw: 3.,
				},
			}
		},
		methods: {
			phoneFill: function(phone) { //手机--邮箱格式验证
				let error = null;
				if (phone.indexOf("@") > 0) {
					let emailType = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
					if (!emailType.test(phone)) {
						error = '请输入有效邮箱';
						return error;
					} else {
						return null;
					}
				}

				if (!phone) {
					error = '请输入手机号码';
					return error;
				}

				let phoneType = /^1\d{10}$/;
				if (!phoneType.test(phone)) {
					error = '请输入11位有效手机号码';
					return error;
				}
				return null
			},
			secretFill: function(password) {
				let str = password;
				if (str === "") {
					return '请输入密码';
				}
				if (str.length < 8 || str.length > 16) {
					return '密码必须大于8位小于16位';
				}
				let reg = new RegExp(/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/);
				if (reg.test(str)) {
					return null;
				} else {
					return '密码必须必须包含数字和字母';
				}
			},
			getSecretCodeError: function(val) {
				this.findSecret.error = val;
			},
			openLoginDialog: function() {
				this.$router.replace({
					name: 'login'
				});
			},
			ForgetSecret: function() {
				if (!this.findSecret.email) {
					this.$tips('用戶名不能为空');
					return;
				}
				if (this.phoneFill(this.findSecret.email) != null) {
					this.$tips('请输入格式正确的用户名');
					return;
				}
				if (!this.findSecret.code) {
					this.$tips('验证码不能为空');
					return;
				}
				if (this.findSecret.error = this.secretFill(this.findSecret.password)) {
					return this.$tips(this.findSecret.error);
				}

				let form = new FormData;
				form.append("loginName", this.findSecret.email);
				form.append("newLoginPwd", $.md5(this.findSecret.password));
				form.append("vCode", this.findSecret.code);
				this.$axios.post('/channel-server/user/modifyLoginpwd.do', form)
					.then(res => {
						let result = res.data;
						if (result.errorCode == '200') {
							this.findSecret.error = "";
							this.$tips('修改成功，请登录');
							this.$router.replace({
								name: 'login'
							});
						} else {
							this.$get_error("tips", result.errorCode, result.errorMessage);
						}
					}, error => {
						this.$get_error("reload");
					})
			},
		}
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
		cursor: pointer;
		width: 90%;
		height: 0.8rem;
		line-height: 0.8rem;
		text-align: center;
	}

	.btn {
		font-size: 0.4rem;
		width: 50%;
		margin: 0.3rem 0;
	}

	.code {
		width: 40%;
		height: 0.8rem;
		border-radius: 0.3rem;
		margin-left: 0.1rem
	}

	.error {
		color: #ffffff;
		-webkit-text-stroke: 0 #ffffff;
		height: 20px;
		text-align: left;
		width: 100%;
		line-height: 20px;
		font-size: 14px;
	}

	.loginChange {
		margin-top: 30px;
		width: 100%;
		height: 0.4375rem;
		font-size: 0.4375rem;
		color: #ffffff;
		text-align: center;
	}

	.loginChange span {
		display: inline-block;
		height: 0.4375rem;
		font-size: 0.4375rem;
		color: #FFF619;
		/*border-bottom: 1px solid #FFF719;*/
		/*box-shadow: 0 2px 0 #5a6b74;*/
	}
</style>
