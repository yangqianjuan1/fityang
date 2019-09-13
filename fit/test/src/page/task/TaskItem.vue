<template>
	<div class="taskListStyle">
		<div class="body_item" v-for="(item,index,key) in parentListData" :key="key">
			<div class="item_style1">
				<div class="textStyle" :class="itemSize(item)">{{item.Type==1?getDayTaskType(item.Work):getWeekTaskType(item.Work)}}</div>
			</div>
			<div class="item_style2">
				<div class="textStyle" :class="itemSize2(item)">{{item.Type==1?dayReWardDetail(item.Work):weekReWardDetail(item.Work)}}</div>
			</div>
			<div class="item_style3">
				<div class="textStyle font3">
					<div class="textStyle font3" v-show="item.Num>item.Min">{{minText(item)}}/{{item.Num}}</div>
					<button v-show="item.Min>=item.Num" :style="{backgroundColor: item.IsReceive?'#666':'orange'}" @click="reward(item,index)"><i>{{getReward(item)}}</i></button>
				</div>
			</div>
		</div>
		
	</div>
</template>

<script>
	export default{
		data(){
			return {
				clickeds:true,
			}
		},
		props:{
			parentListData:[],
		},
		methods:{
			reward:function(val,index){
				if(this.clickeds){
					this.clickeds=false;
				}else{
					return;
				}
				if(val.IsReceive){
					
				}else{
					let data={
						Type:val.Type,
						Work:val.Work,
					};
					this.$axios.post('/api/horse/getIsReceive/',data,false)
					.then(res=>{
						let result=res.data;
						if(result.IsSuccess){
							this.$tips("奖励已领取");
							this.$emit('getReward',index);
							this.$props.parentListData[index].IsReceive=true;
						}
					},error=>{
						console.log("Error:3秒后重新加载");
						setTimeout(()=>{
							this.reward();
						},3000);
					}).then(()=>{
						this.clickeds=true;
					});
				}
			},
			getDayTaskType: function(val) {
				switch (val) {
					case 0:
						return '每日登录';
					case 1:
						return 'pk1次';
					case 2:
						return '捕虎1次';
					case 3:
						return '喂养1次';
					case 4:
						return '逐鹿1次';
					case 5:
						return '竞猜1次';
				}
			},
			dayReWardDetail:function(val){
				switch (val) {
					case 0:
						return '捕虎卷+2';
					case 1:
						return '经验+5';
					case 2:
						return '所有老虎经验+2';
					case 3:
						return '经验+1';
					case 4:
						return '经验+10';
					case 5:
						return '捕虎卷+1';
				}
			},
			/*
			1:pk
			2:捕虎
			3:喂养
			4:逐鹿
			5:竞猜
			6:生育
			7:交易上架
			8:交易下架
			9:pk获胜
			10:逐鹿获胜
			11:竞猜获胜
			*/
			getWeekTaskType:function(item){
				switch (item) {
					case 1:
						return 'pk10次';
					case 2:
						return '---';
					case 3:
						return '喂养50次';
					case 4:
						return '逐鹿10次';
					case 5:
						return '竞猜10次';
					case 6:
						return '生育3次';
					case 7:
						return '交易(上架)1次';
					case 8:
						return '交易(购买)1次';
					case 9:
						return 'pk获胜3次';
					case 10:
						return '逐鹿获胜3次';
					case 11:
						return '竞猜获胜3次';
				}
			},
			weekReWardDetail:function(item){
				switch (item) {
					case 1:
						return '所有老虎经验+20';
					case 2:
						return '---';
					case 3:
						return '捕虎卷+3';
					case 4:
						return '所有老虎经验+15';
					case 5:
						return '所有老虎经验+30';
					case 6:
						return '所有老虎经验+10';
					case 7:
						return '所有老虎经验+5';
					case 8:
						return '所有老虎经验+15';
					case 9:
						return '所有老虎经验+15';
					case 10:
						return '所有老虎经验+15';
					case 11:
						return '所有老虎经验+15';
				}
			},
			minText:function(val){
				if(val.Min>=val.Num){
					return val.Num;
				}else{
					return val.Min;
				}
			},
			getReward:function(item){
				if(item.Work==0){
					return '已发放';
				}
				return '领取';
				
			},
			itemSize:function(item){
				let textData=String(item.Type==1?this.getDayTaskType(item.Work):this.getWeekTaskType(item.Work));
				if(textData.length>4){
					return 'font1_1';
				}else{
					return 'font1';
				}
				
			},
			itemSize2:function(item){
				let textData=String(item.Type==1?this.dayReWardDetail(item.Work):this.weekReWardDetail(item.Work));
				if(textData.length==4){
					return 'font2_2';
				}
				if(textData.length>5){
					return 'font2_1';
				}else{
					return 'font2';
				}
				
			}
		},
	}
</script>

<style lang="less" scoped>
	.taskListStyle{
		width:100%;
		height:97%;
		overflow: auto;
	}
	.body_item{
		width:90%;
		height:12%;
		border-radius: 0.5rem;
		background-color: orchid;
		position: relative;
		left:5%;
		margin-top:3%;
		
		.item_style1{
			width:40%;
		}
		.item_style2{
			width:25%;
			margin-left:3%;
		}
		.item_style3{
			width:29%;
			margin-left:3%;
		}
		
		.item_style1,.item_style2,.item_style3{
			height:100%;
			float: left;
			
			.textStyle{
				width:100%;
				height:70%;
				position: relative;
				text-align: center;
				
				button{
					width:80%;
					height:90%;
					position: relative;
					top:5%;
					border-radius: 0.1rem;
					color:white;
					i{
						font-size: 0.5rem;
					}
				}
			}
			.font1{
				top:15%;
				font-size: 18px;
			}
			.font1_1{
				height:40%;
				font-size: 13px;
				top:30%;
			}
			
			.font2{
				top:15%;
				font-size: 15px;
			}
			.font2_1{
				height:76%;
				top:12%;
				font-size: 10px;
			}
			.font2_2{
				height:50%;
				top:25%;
				font-size: 18px;
			}
			
			.font3{
				top:15%;
				font-size: 0.5rem;
			}
		}
	}
</style>
