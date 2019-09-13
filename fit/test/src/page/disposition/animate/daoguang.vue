<template>
	<div class="daoguang_Style daoguangAni">
	</div>
</template>

<script>
	export default{
		
	}
</script>

<style scoped>
	.daoguang_Style{
		width:100%;
		height:100%;
		background-size: 100% 100%;
	}
	.daoguangAni{
		animation: attackAni 0.3s 1; 
		-moz-animation: attackAni 0.3s 1; 
		-webkit-animation: attackAni 0.3s 1; 
	}
	
	
	@keyframes attackAni{
		0%{
			background-image: url('../../../../static/img/fight/daoguang/daoguang000.png');
		}
		20%{
			background-image: url('../../../../static/img/fight/daoguang/daoguang001.png');
		}
		40%{
			background-image: url('../../../../static/img/fight/daoguang/daoguang002.png');
		}
		60%{
			background-image: url('../../../../static/img/fight/daoguang/daoguang003.png');
		}
		80%{
			background-image: url('../../../../static/img/fight/daoguang/daoguang004.png');
		}
		100%{
			background-image: none;
		}
	}
	@-moz-keyframes attackAni{
		0%{
			background-image: url('../../../../static/img/fight/daoguang/daoguang000.png');
		}
		20%{
			background-image: url('../../../../static/img/fight/daoguang/daoguang001.png');
		}
		40%{
			background-image: url('../../../../static/img/fight/daoguang/daoguang002.png');
		}
		60%{
			background-image: url('../../../../static/img/fight/daoguang/daoguang003.png');
		}
		80%{
			background-image: url('../../../../static/img/fight/daoguang/daoguang004.png');
		}
		100%{
			background-image: none;
		}
	}
	@-webkit-keyframes attackAni{
		0%{
			background-image: url('../../../../static/img/fight/daoguang/daoguang000.png');
		}
		20%{
			background-image: url('../../../../static/img/fight/daoguang/daoguang001.png');
		}
		40%{
			background-image: url('../../../../static/img/fight/daoguang/daoguang002.png');
		}
		60%{
			background-image: url('../../../../static/img/fight/daoguang/daoguang003.png');
		}
		80%{
			background-image: url('../../../../static/img/fight/daoguang/daoguang004.png');
		}
		100%{
			background-image: none;
		}
	}
</style>
