<template>
	<div class="tigerBg" :class="getBg(Info)">
		<tiger-img :Style="Info.Style" style="top: -0.3rem;"></tiger-img>
	</div>
</template>

<script>
	import TigerImg from "./tigerImg";
	export default {
		props: {
			Infos: {},
		},
		components:{
			TigerImg
		},
		data:function() {
			return {
				Info: {},
			}
		},
		created() {
			this.Info = this.$props.Infos.tigerInfo;
		},
		methods: {
			getBg: function(Info) {
				switch (this.getType(Info)) {
					case '创世虎':
						return 'bgGold';
					case '神虎':
						return 'bgSilver';
					case '猛虎':
						return 'bgCopper';
				}
			},
			getType: function(info) {
				if(info==null){
					this.$emit('NoInfos');
					return '';
				}
				
				if (info.IsGenesis) {
					return '创世虎'
				} else if (info.IsStud) {
					return '神虎'
				} else {
					return '猛虎'
				}
			},
		},
	}
</script>

<style scoped>
	.bgGold {
		background-image: url("../assets/img/dialog/jing.png");
	}

	.bgSilver {
		background-image: url("../assets/img/dialog/ying.png");
	}

	.bgCopper {
		background-image: url("../assets/img/dialog/tong.png");
	}

	.tigerBg {
		width: 100%;
		height: 100%;
		background-size: 100% 100%;
		-moz-background-size: 100% 100%;
		-webkit-background-size: 100% 100%;
		background-repeat: no-repeat;
	}
</style>
