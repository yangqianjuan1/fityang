<template>
	<div class="zhuLuTigerDetail" :style="{top:autoTop+'px'}">
		<center>赛道:{{positionInfo.item.id}}</center>
		<center>老虎:{{positionInfo.item.tigerInfo.HorseNo}}</center>
		<center>等级:{{positionInfo.item.tigerInfo.GradeLevel}}</center>
		<center>战斗力:{{positionInfo.item.tigerInfo.CombatPower}}</center>
		<center>生命力:{{positionInfo.item.tigerInfo.life}}</center>
		<center>敏捷:{{positionInfo.item.tigerInfo.Agile}}</center>
		<center>耐力:{{positionInfo.item.tigerInfo.Endurance}}</center>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				autoTop:0,
			}
		},
		props: {
			positionInfo:{},//位置信息
		},
		mounted(){
			clearTimeout(this.autoTimeOut);
			if(this.$props.positionInfo.item.id>5){
				this.autoTop=this.$props.positionInfo.top-100;
			}else{
				this.autoTop=this.$props.positionInfo.top;
			}
		},
		methods: {
			
		},
	}
</script>

<style scoped>
	.zhuLuTigerDetail{
		width:80px;
		height:155px;
		background-color: wheat;
		border-radius: 0.1rem;
		position: absolute;
		z-index: 2501;
		left:50%;
		margin-left:-40px;
		background-image: url("../../assets/img/competition/guideBg.png");
		background-size:100% 100%;
		-webkit-background-size:100% 100%;
		-moz-background-size:100% 100%;
		color:black;
	}
	center{
		margin-top:5px;
	}
	
</style>
