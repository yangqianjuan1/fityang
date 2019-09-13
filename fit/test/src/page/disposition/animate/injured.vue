<template>
	<div class="injured_style baodianAni">
	</div>
</template>

<script>
	export default{
		
	}
</script>

<style lang="less" scoped>
	.injured_style{
		width:100%;
		height:100%;
		background-size: 100% 100%;
	}
	
	.baodianAni{
		animation: injuredAni 0.2s 1;
		 -moz-animation: injuredAni 0.2s 1;
		 -webkit-animation: injuredAni 0.2s 1;
	}
	
	
	@keyframes injuredAni{
		0%{
			background-image: url('../../../../static/img/fight/baodian/baodian004.png');
		}
		20%{
			background-image: url('../../../../static/img/fight/baodian/baodian003.png');
		}
		40%{
			background-image: url('../../../../static/img/fight/baodian/baodian002.png');
		}
		60%{
			background-image: url('../../../../static/img/fight/baodian/baodian001.png');
		}
		80%{
			background-image: url('../../../../static/img/fight/baodian/baodian000.png');
		}
		100%{
			background-image: none;
		}
	}
	@-moz-keyframes injuredAni{
		0%{
			background-image: url('../../../../static/img/fight/baodian/baodian004.png');
		}
		20%{
			background-image: url('../../../../static/img/fight/baodian/baodian003.png');
		}
		40%{
			background-image: url('../../../../static/img/fight/baodian/baodian002.png');
		}
		60%{
			background-image: url('../../../../static/img/fight/baodian/baodian001.png');
		}
		80%{
			background-image: url('../../../../static/img/fight/baodian/baodian000.png');
		}
		100%{
			background-image: none;
		}
	}
	@-webkit-keyframes injuredAni{
		0%{
			background-image: url('../../../../static/img/fight/baodian/baodian004.png');
		}
		20%{
			background-image: url('../../../../static/img/fight/baodian/baodian003.png');
		}
		40%{
			background-image: url('../../../../static/img/fight/baodian/baodian002.png');
		}
		60%{
			background-image: url('../../../../static/img/fight/baodian/baodian001.png');
		}
		80%{
			background-image: url('../../../../static/img/fight/baodian/baodian000.png');
		}
		100%{
			background-image: none;
		}
	}
</style>
