<template>
	<div>
		<span>{{timeText}}</span>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				timeText: '',
				interval: null,
				times:10,
			}
		},
		props: {
			index: '',
			indexNum:0,
			isRaced:'',//是否有比赛记录，有就是重复比赛，需要重新赋值
		},
		created(){
			this.$axios.get('api/horse/battle/getTimeComebetSetRun/?cid=' +this.index).then(res => {
				var result = res.data;
				if (result.IsSuccess == true) {
					if(result.Result.dtime==0){
						sessionStorage.setItem('time'+this.$props.index,0);
						this.times=0;
					}else{
						this.times=result.Result.dtime;
					}
				} else {
					this.times=20;
				}
			}, error => {
					this.times=20;
			});
			//this.times=Math.ceil(Math.random()*35);
		},
		mounted() {
			if(sessionStorage.getItem('time'+this.$props.index)==null){
				sessionStorage.setItem('time'+this.$props.index,this.times);
			}
			if(this.isRaced==''){
				sessionStorage.setItem('time'+this.$props.index,this.times);
			}
			if(sessionStorage.getItem('time'+this.$props.index)==0){
				this.timeText='分配中';
				this.changeRunaway();
				return;
			}
			this.times=sessionStorage.getItem('time'+this.$props.index);
			this.interval = setInterval(() => {
				this.times--;
				sessionStorage.setItem('time'+this.$props.index,this.times);
				if (this.times <= 0) {
					this.timeText = "分配中";
					clearInterval(this.interval);
					this.changeRunaway();
					return;
				}
				this.timeText = this.times + 's';
			}, 1000);
	},
	methods: {
		changeRunaway:function(){
			this.$emit('listDataRefresh',this.$props.indexNum);
		},
	},
	}
</script>

<style>
</style>
