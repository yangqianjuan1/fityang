<template>
	<div>
		<span>{{intervaText}}</span>
	</div>
</template>

<script>
	export default{
		data:function(){
			return {
				intervaText:'',
				intervalNum:-1,
				interval:0,
			}
		},
		props:{
			cid:'',
		},
		created(){
			this.$axios.get('api/horse/battle/getTimeComebetSetRun/?cid='+this.$props.cid).then(res => {
				var result = res.data;
				if (result.IsSuccess == true) {
					if(result.Result.dtime==0){
						sessionStorage.setItem('interval'+this.$props.cid,0);
						this.times=0;
					}else{
						this.intervalNum=result.Result.dtime;
					}
				} else {
					this.intervalNum=20;
				}
			}, error => {
					this.intervalNum=20;
			});
			//this.intervalNum=Math.ceil(Math.random()*35);
		},
		mounted(){
			if(sessionStorage.getItem('interval'+this.$props.cid)==null){
				sessionStorage.setItem('interval'+this.$props.cid,this.intervalNum);
			}
			if(sessionStorage.getItem('interval'+this.$props.cid)==0){
				this.intervaText='结算中';
				this.returnCurrState();
				return;
			}
			this.intervalNum=sessionStorage.getItem('interval'+this.$props.cid);
			this.interval = setInterval(() => {
				this.intervalNum--;
				sessionStorage.setItem('interval'+this.$props.cid,this.intervalNum);
				this.returnCurrState();
				if (this.intervalNum <= 0) {
					this.intervaText = "结算中";
					clearInterval(this.interval);
					return;
				}
				this.intervaText = this.intervalNum + 's';
			}, 1000);
		},
		methods:{
			returnCurrState:function(){
				this.$emit('returnIntervalNum',this.intervalNum);
			}
		},
	}
</script>

<style>
</style>
