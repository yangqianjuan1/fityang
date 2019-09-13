<template>
	<div class="bloodVolum">
		<div class="BloodIcon">
			<div class="BloodLength">
				<div class="BloodLeft" :style="{width:autoBlood}"></div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				autoBlood: '100%',
				Interval: 0,
			}
		},
		props: {
			singleLeft: {},
			AnotherOver: {
				type: Boolean,
				default: false,
			}
		},
		created() {
			clearInterval(this.Interval);
			let waitTime = 3000;
			if (this.$props.singleLeft.once) {

			} else {
				waitTime = 4000;
			}

			setTimeout(() => {
				this.fighting();
			}, waitTime);
		},
		methods: {
			fighting: function() {
				let life = this.$props.singleLeft.life;
				let hurt = this.$props.singleLeft.hurt;
				this.Interval = setInterval(() => {
					life = life - hurt;
					this.lessBlood();
					if (life < 0) {
						this.autoBlood = '0px';
						clearInterval(this.Interval);
						this.gameOver();
						return;
					}
					let p = (life / this.$props.singleLeft.life) * 100;
					this.autoBlood = p + '%';
				}, 2000);

			},
			gameOver: function() {
				this.$emit('gameOver');
			},
			lessBlood:function(){
				this.$emit('lessBlood',this.$props.singleLeft.id);
			},
		},
		watch: {
			AnotherOver:function(newVal,oldVal){//另一个组件实例中的老虎血量已耗尽
					if (newVal) {
						clearInterval(this.Interval);
					}
			},
		}
	}
</script>

<style lang="less" scoped>
	.bloodVolum {
		width: 100%;
		height: 100%;

		.BloodIcon {
			width: 100%;
			height: 100%;
			background-image: url('../../../static/data/HP-3.png');
			background-size: 100% 100%;
			-moz-background-size: 100% 100%;
			;
			-webkit-background-size: 100% 100%;

			.BloodLength {
				width: 88%;
				height: 60%;
				position: relative;
				top: 20%;
				left: 12%;
				float: right;
				border: 1px solid white;
				border-radius: 0.5rem;

				.BloodLeft {
					height: 95%;
					background-color: orange;
					border-radius: 0.5rem;
				}
			}
		}
	}
</style>
