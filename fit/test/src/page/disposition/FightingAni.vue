<template>
	<div class="fightingAni">
		<div class="ani_position">
			<div class="fight_injured">
				<injured-ani v-if="type1"></injured-ani>
			</div>
			
			<div class="fight_injured bottomStyle">
				<injured-ani v-if="type2"></injured-ani>
			</div>
		</div>
		<div class="daoguang_ani">
			<div class="fight_daoguang" :class="{rotate180:type==2}">
				<daoguang-ani v-if="refresh"></daoguang-ani>
			</div>
		</div>
	</div>
</template>

<script>
	import InjuredAni from './animate/injured'
	import DaoguangAni from './animate/daoguang'
	export default{
		components:{
			InjuredAni,
			DaoguangAni,
		},
		data:function(){
			return{
				refresh:false,
				type1:false,
				type2:false,
			}
		},
		props:{
			type:0,
		},
		watch:{
			type:function(val){
				if(this.$props.type==1||this.$props.type==2){
					this.refresh=true;
				}
					setTimeout(()=>{
						if(this.$props.type==1||this.$props.type==3){
							this.type1=true;
						}
						if(this.$props.type==2||this.$props.type==4){
							this.type2=true;
						}
					},100);
					
					setTimeout(()=>{
						this.refresh=false;
						this.type1=false;
						this.type2=false;
					},900);
			},
		},
	}
</script>

<style lang="less" scoped>
	.fightingAni{
		width:100%;
		height:100%;
		position: relative;
		top:-100%;
	}
	.ani_position{
		width:100%;
		height:75%;
		position: relative;
		top:10%;
		.fight_injured{
			width:100%;
			height:45%;
		}
		.bottomStyle{
			position: relative;
			top:10%;
		}
	}
	.daoguang_ani{
		width:90%;
		height:75%;
		position: relative;
		left:5%;
		top:-65%;
		.fight_daoguang{
			/*transform: rotate(180deg);*/
			width:100%;
			height:74%;
			position: relative;
			top:13%;
		}
	}
	.rotate180{
		transform: rotate(180deg);
	}
</style>
