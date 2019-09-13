<template>
	<div class="htitle" :style="{'max-width':$store.state.maxWidth}">
		<comfire-dialog v-model="login123" :type="1" :sure="close">
		<p class="takeCenter">今日登录，获得<span class="special-color">2张</span>捕虎卷!</p>
		<!--<a href="weixin://dl/business/?ticket=%09https%3a%2f%2fopenpay-zc.st.meituan.com%2fauth%3fredirect_uri%3dhttps%253A%252F%252Fopenpay-zc.st.meituan.com%252Fdemo%26bizId%3d30003%26mchId%3d93947791 " >微信再次跳转</a>
		<a href="alipays://platformapi/startapp?appId=20000067&url=%09https%3a%2f%2fopenpay-zc.st.meituan.com%2fauth%3fredirect_uri%3dhttps%253A%252F%252Fopenpay-zc.st.meituan.com%252Fdemo%26bizId%3d30003%26mchId%3d93947791">点击此处拉起支付宝进行授权 </a> -->
		</comfire-dialog>
		<ul class="right" style="margin-right: 0.3rem">
			<!--未登录-->
			<li v-for="(item,index) in right" v-if="!isLogin" @click="goRouter(item,index+4)" :style="{'background-image':'url('+item.img+')'}"></li>
			<!--已登录-->
			<li v-for="(item,index) in hadLogin" v-if="isLogin"  :class="{isposition:isback(item.name)}" :style="{'background-image':'url('+item.img+')'}" @click="goRouter(item,index+4)">
			</li>
		</ul>
		<Beginner v-model="isopen" @beginnerClose="closeInfo"></Beginner>
	</div>

</template>

<script>
	import Contain from "./contain";
	import MyDialog from "./dialog";
	import SendCode from "./sendCode";
	import ComfireDialog from "./comfireDialog";
	import Beginner from "./beginner";
	export default {
		components: {
			SendCode,
			MyDialog,
			Contain,
			ComfireDialog,
			Beginner,
		},
		name: "htitle",
		props: {
			background: {
				type: String,
				default: '#fff',
			}
		},
		created() {
			this.isLogin = this.$store.state.isLogin;
			this.getBasic();
		},
		data() {
			return {
				isopen:false,
				login:false,
				isLogin: false, //是否登录
				hadHash: false, //是否绑定钱包
				iscur: -1,
				isHover: false,
				dialogOpen: "",

				right: [{
						router: '/help',
						name: '帮助',
						img: require('../assets/img/index/bangzhu.png')
					},
					{
						router: '',
						name: '登录',
						img: null//require('../assets/img/index/denglu.png')
					},
					{
						router: '',
						name: '注册',
						img: null//require('../assets/img/index/zhuce.png')
					},

				],
				hadLogin: [{
						router: '/help',
						name: '帮助',
						img: require('../assets/img/index/bangzhu.png')
					},
					{
						router: '/ranking',
						name: '排行榜',
						img: require('../assets/img/index/paihangbang.png')
					},
					{
						router: '',
						name: '空位1',
						img: null
					},
					{
						router: '',
						name: '空位2',
						img: null
					},
					{
						router: '',
						name: '空位3',
						img: null
					},
					{
						router: '',
						name: '退出',
						img: require('../../psd/img/4-2.png')
					},
				],
			}
		},
		methods: {
			closeInfo:function(){
				this.$tips("可在我的-帮助-教程 重复查看");
			},
			close:function () {
			  this.login = false;
			},
			getBasic:function () {
			  this.$axios.get('/api/getsystemconfiguration/').then(
			    res=>{
			      let result = res.data;
			      if(result.IsSuccess){
			        if(result.Result.DailySend){
			          this.login = true;//每日奖励
			        }
			        this.beginnersGuide =result.Result.IsNew;
			        if(result.Result.IsNew){
			          this.$nextTick(()=>{
			            this.showBeginnersGuide();
			          })
			          this.setNewAccount();
			        }
			
			      }else{
			        // this.$tips('获取系统配置失败，请重新尝试')
			      }
			    },error=>{
			      // this.$tips('获取登录信息失败，请先登录')
			    }
			  );
			},
			isback:function(name){
				if(name=='退出'){
					return true;
				}
				  return false;
			},
			logout: function() {
				let isOk = confirm("确认退出登录");
				if (isOk == false) {
					return;
				}
				this.$axios.get("/api/user/loginout/").then(
					res => {
						let result = res.data;
						if (result.IsSuccess) {
							localStorage.clear();
							sessionStorage.clear();
							this.$store.commit('SET_LOGIN', false);
							this.$router.push('/login');
						} else {
							this.$get_error('tips', result.Code, result.Message);
						}
					},
					error => {
						this.$get_error("network");
					}
				)
			}, //退出登陆
			clickID: function() {
				this.iscur = 6;
			},
			goRouter: function(item, index) {
				if (item.name === '退出') {
					this.logout();
				} else if (item.name === '登录') {
					this.$router.push({
						name: 'login'
					})
				} else if (item.name === '注册') {
					this.$router.push({
						name: 'register'
					})
				} else {
					this.$router.push(item.router)
				}
			},
			goIndex: function() {
				this.iscur = -1;
				this.$router.push('/')
			},
			enter: function(item) {
				if (item.name === '我的账户') {
					this.isHover = true
				}
			},
			leave: function(item) {
				if (item.name === '我的账户') {
					this.isHover = false
				}
			},
			modifyPassword: function() {
				this.dialogOpen = 'openFindSecret';
			},
		},
		computed: {
			getLoginState: function() {
				return this.$store.state.isLogin;
			}
		},
		watch: {
			iscur: function(val) {
				sessionStorage.setItem('iscur', val.toString());
			},
			$route(val) {
				switch (val.name) {
					case 'transaction':
						this.iscur = 0;
						break;
					case 'Horses':
						this.iscur = 1;
						break;
					case 'match':
						this.iscur = 2;
						break;
					case 'invite':
						this.iscur = 3;
						break;
					case 'help':
						this.iscur = 4;
						break;
					case 'user':
						this.iscur = 5;
						break;
				}
			},
			getLoginState(val) {
				this.isLogin = val;
			}
		}
	}
</script>

<style scoped>
	.htitle {
		z-index: 100;
		width: 100%;
		height: 1.5rem;
		position: fixed;
		top: 0;
	}

	li {
		color: #193B49;
		/*line-height: 1.25rem;*/
		/*height: 1.25rem;*/
		cursor: Pointer;
		text-align: center;
		width: 1.42rem;
		height: 1.42rem;
		background-size: auto 100%;
		background-repeat: no-repeat;
		background-position: center;
	}

	li p {
		padding: 0.2rem 0.4rem;
	}

	.left {
		float: left;
	}

	.left li {
		font-size: 0.5rem;
		float: left;
	}
	
	.isposition{
		position: relative;
		margin-right:0.8rem;
	}
	.right {
		float: right;
	}

	.right li {
		font-size: 14px;
		float: right;
	}

	.cur {
		background: #2D6D7B;
		color: #ffffff;
	}

	.second {
		position: absolute;
		z-index: 10;
		background: #ffffff;
		padding: 0.625rem 0 0.625rem 0;
		box-shadow: 0 0 3.125rem #F4F4F8;
		-webkit-box-shadow: 0 0 3.125rem #F4F4F8;
		-moz-box-shadow: 0 0 3.125rem #F4F4F8;
		transform: translate3d(-2.03125rem, 0, 0);
		-webkit-transform: translate3d(-2.03125rem, 0, 0);
		-moz-transform: translate3d(-2.03125rem, 0, 0);
		-webkit-border-radius: 0.3125rem;
	}

	.second li {
		float: none;
		padding: 0.3125rem 1.65625rem 0.3125rem 0.9375rem;
		font-size: 0.40625rem;
		color: #666666;
		height: auto;
		line-height: normal;
		margin-top: 0;
	}

	.second:after {
		border-left: 0.3125rem solid transparent;
		border-right: 0.3125rem solid transparent;
		border-bottom: 0.3125rem solid #ffffff;
		content: "";
		position: absolute;
		width: 0;
		top: 0;
		transform: translate3d(0.625rem, -0.28125rem, 0);
		-webkit-transform: translate3d(0.625rem, -0.28125rem, 0);
		-moz-transform: translate3d(0.625rem, -0.28125rem, 0);
	}

	input {
		width: 10.8125rem;
		height: 1.4375rem;
		border-radius: 0.15625rem;
		-webkit-border-radius: 0.15625rem;
		-moz-border-radius: 0.15625rem;
		text-indent: 1.5625rem;
		border: 1px solid #CDCFD1;
		margin-top: 0.53125rem;
		background-repeat: no-repeat;
		background-position: 0.46875rem center;
	}

	.email {
		background-image: url('../assets/img/dialog/email.png');

	}

	.secret {
		background-image: url('../assets/img/dialog/secret.png');
	}

	.code {
		background-image: url('../assets/img/dialog/code.png');
	}

	button {
		cursor: pointer;
		width: 10.8125rem;
		height: 1.4375rem;
		border-radius: 0.15625rem;
		-webkit-border-radius: 0.15625rem;
		-moz-border-radius: 0.15625rem;
		background: #2D6D7B;
		color: #ffffff;
		line-height: 1.4375rem;
		text-align: center;
		font-size: 0.5rem;
		box-shadow: 0 0 0.3125rem #F4F4F8;
		-webkit-box-shadow: 0 0 0.3125rem #F4F4F8;
		-moz-box-shadow: 0 0 0.3125rem #F4F4F8;
	}

	.point {
		cursor: pointer;
	}
</style>
