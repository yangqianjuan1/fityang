<template>
	<div class="zhulu_bg_header1" >
		<div class="zhulu_bg_header2" :class="{tiger_bg_ani:IsMove}" :style="{animationPlayState:animateState}">
			<div class="zhulu_bg_body1">
				<div class="zhulu_bg_body1_item"></div>
				<div class="zhulu_bg_body1_item"></div>
			</div>
			<div class="zhulu_bg_body2">
				<div class="zhulu_bg_body2_item"></div>
				<div class="zhulu_bg_body2_item"></div>
			</div>
		</div>
		<div class="bg_fixed_position_left" v-if="$store.getters.getDeviceType=='pc'" :style="{width:currWidth}"></div>
		<div class="bg_fixed_position_right" v-if="$store.getters.getDeviceType=='pc'" :style="{width:currWidth}"></div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				currWidth: '',
				IsMove:false,
				animateState:'running',
			}
		},
		props:{
			move:{
				type:Boolean,
				default:false,
			},
			reset:{
				type:Boolean,
				default:false,
			}
		},
		mounted() {
			var _this = this;
			window.onresize = function() { // 定义窗口大小变更通知事件
				_this.autoSize(_this);
			};
			this.$nextTick(function(){
				this.autoSize(_this);
			})
		},
		methods: {
			getWidth: function(val) {
				let data = val.toString().split('px')[0];
				return parseInt(data);
			},
			autoSize: function(_this) {
				if (_this.$store.getters.getDeviceType == 'pc') {
					let docW = Math.max(document.documentElement.clientWidth, document.body.clientWidth);
					let conW = _this.getWidth(_this.$store.state.maxWidth);
					console.log("docW:\t"+docW+"\tconW:\t"+conW);
					_this.currWidth = (docW - conW) / 2 + 'px';
					console.log("currWidth:\t"+_this.currWidth);
				}
			},
		},
		watch:{
			move:function(val){
				if(this.$props.move){
					this.IsMove=true;
					this.animateState='running';
				}else{
					this.animateState='paused';
				}
			},
			reset:function(val){
				if(this.$props.reset){
					console.log("背景重置");
					this.IsMove=false;
				}
			},
		}
	}
</script>

<style scoped>
	.zhulu_bg_header1 {
		width: 100%;
		height: 100%;
	}
	.zhulu_bg_header2{
		width: 100%;
		height: 100%;
	}

	.zhulu_bg_body1,
	.zhulu_bg_body2 {
		width: 200%;
		margin-left: -100%;
	}

	.zhulu_bg_body1::-webkit-scrollbar{
		width:0;
		height:0;
		background: none;
	}
	.zhulu_bg_body2::-webkit-scrollbar{
		width:0;
		height:0;
		background: none;
	}

	.zhulu_bg_body1 {
		height: 20%;
	}

	.zhulu_bg_body1_item {
		background-image: url(../../assets/img/race/scene_header.png);
	}

	.zhulu_bg_body2 {
		height: 80%;
	}

	.zhulu_bg_body2_item {
		background-image: url(../../assets/img/race/scene_body.png);
	}

	.zhulu_bg_body1_item,
	.zhulu_bg_body2_item {
		width: 50%;
		height: 100%;
		float: left;
		background-size: 100% 100%;
	}

	.bg_fixed_position_left,
	.bg_fixed_position_right {
		height: 100%;
		background-color: white;
		position: fixed;
		top: 0;
		z-index: 2401;
	}

	.bg_fixed_position_left {
		left: 0;
	}

	.bg_fixed_position_right {
		right: 0;
	}
</style>
