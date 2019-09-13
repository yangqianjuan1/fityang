<!--Beginner's Guide-->
<template>
	<div v-if="showDialog">
		<my-dialog :dialogOpen="showDialog">
			<div class="beginner_img_style">
				<img class="beginner_img" :src="currentImg" />
				<div class="beginner_img_btns1">
					<button name="jumpover" @click="BeginnerClose">
						跳过教程>>
					</button>
					<button name="rule" @click="BeginnerRule" v-show="isRule">
					</button>
				</div>
				<div class="beginner_img_btns2">
					<button name="next" @click="BeginnerNext" v-show="isContinue">
						点击继续
						<img class="beginner_img_next" src="../assets/img/beginner/beginner_next.png"/>
					</button>
				</div>
				<div class="beginner_img_btns3">
					<div class="beginner_img_btns3_info1">
						<button name="animal_btn1" @click="BeginnerNext" v-show="index14"></button>
					</div>
					<div class="beginner_img_btns3_info1">
						<button name="animal_btn2" @click="BeginnerNext" v-show="index19"></button>
					</div>
					<div class="beginner_img_btns3_info2">
						<button name="animal_confirm" @click="BeginnerNext" v-show="index15_16" ></button>
					</div>
				</div>
			</div>
		</my-dialog>
	</div>
</template>
<script>
	import MyDialog from './dialog'
	export default {
		components: {
			MyDialog
		},
		props: {
			value: {},
		},
		data: function() {
			return {
				index14:false,
				index15_16:false,
				index19:false,
				isContinue:true,
				isRule:false,
				showDialog: false,
				currentImg: require('../assets/img/beginner/1.png'),
				imgIndex: 1,
			}
		},
		methods: {
			DialogClose: function() {
				this.$emit("beginnerClose")
				this.showDialog = false;
			},
			BeginnerClose: function() {
				this.DialogClose();
			},
			BeginnerNext: function() {
				if (this.imgIndex == 26) {
					this.DialogClose();
					return;
				}
				if(this.imgIndex==12){
					this.isRule=true;
				}else{
					this.isRule=false;
				}
				this.imgIndex = this.imgIndex + 1;
				console.log('当前地址下标:'+this.imgIndex);
				switch(this.imgIndex){
					case 14:{
						this.isContinue=false;
						this.index14=true;
						break;
					}
					case 15:{
						this.index14=false;
						this.index15_16=true;
						break;
					}
					case 17:{
						this.index15_16=false;
						this.isContinue=true;
						break;
					}
					case 18:{
						this.index15_16=true;
						this.isContinue=false;
						break;
					}
					case 19:{
						this.index19=true;
						this.isContinue=false;
						this.index15_16=false;
						break;
					}
					case 20:{
						this.index19=false;
						this.index15_16=true;
						break;
					}
					case 21:{
						this.index15_16=false;
						this.index19=true;
						break;
					}
					case 22:{
						this.index19=false;
						this.index15_16=true;
						break;
					}
					case 23:{
						this.index15_16=false;
						this.isContinue=true;
						break;
					}
					case 25:{
						this.index15_16=true;
						this.isContinue=false;
						break;
					}
					case 26:{
						this.index15_16=false;
						this.isContinue=true;
						break;
					}
					default:{
						break;
					}
				}
				this.currentImg = require('../assets/img/beginner/' + this.imgIndex + '.png');
			},
			BeginnerRule:function(){
				this.$tips("可在新手教程通过后查看");
			},
		},
		mounted() {
			this.showDialog = this.value;
		},


	}
</script>

<style>
	.beginner_img_style {
		width: 100%;
		height: 100%;
		/*background: rgba(0, 0, 0, 0.8)*/
	}

	.beginner_img_btns1,
	.beginner_img_btns2 {
		width: 100%;
		height: 8%;
		background: none;
		position: relative;
	}

	.beginner_img_btns1 {
		top: -100%;
		height:6%;
		text-align: left;
		padding-left: 5%;
	}

	.beginner_img_btns2 {
		top: -23%;
		text-align: right;
		padding-right: 5%;
	}
	
	.beginner_img_btns3{
		width:100%;
		height:45%;
		position: relative;
		top:-80%;
	}
	
	.beginner_img_btns3_info1,.beginner_img_btns3_info2{
		width:100%;
		height:50%;
	}
	.beginner_img_btns3_info2{
		height:15%;
		position:relative;
		top:-58%;
	}

	.beginner_img {
		width: 100%;
		height: 100%;
		border-radius: 10px;
	}

	button[name=jumpover] {
		width:30%;
		height:100%;
		background: none;
		border: 0;
		font-size: 0.5rem;
		color: white;
	}
	
	button[name=rule] {
		width:30%;
		height:100%;
		background: none;
		border: 0;
		font-size: 0.5rem;
		color: white;
		float: right;
	}

	button[name=next] {
		width: 40%;
		height: 80%;
		font-size: 0.6rem;
		float: right;
		background: none;
		color: white;
		border: 0;
	}
	
	button[name=animal_btn1],button[name=animal_btn2]{
		width:30%;
		height:100%;
		background: none;
	}
	button[name=animal_btn1]{
		margin-left:15%;
	}
	button[name=animal_btn2]{
		float:right;
		margin-right:16%;
	}
	button[name=animal_confirm]{
		background: none;
		width:50%;
		height:100%;
		margin-left:40%;
	}

	.beginner_img_next {
		width:20%;
		height:50%;
		float: right;
		margin-top:3%;
	}
</style>
