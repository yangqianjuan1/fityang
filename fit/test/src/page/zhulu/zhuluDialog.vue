<template>
	<div class="zhuluDialog" v-if="showDialog">
		<div class="zhuluPosition" :style="{'max-width':$store.state.maxWidth}"></div>
		<div class="zhuluContent" :style="{'max-width':$store.state.maxWidth}">
			<div class="contents">
				<center><slot></slot></center>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		props:{
			showDialog:false,
		},
		methods: {

		},
	}
</script>

<style scoped>
	.zhuluDialog {
		z-index: 2400;
	}

	.zhuluPosition {
		margin: 0 auto;
		position: fixed;
		/*left:0;*/
		top: 0;
		width: 100%;
		height: 100vh;
		z-index: 2300;
		background-color: #000000;
		opacity: 0.4;
	}
	.zhuluContent {
		width: 100%;
		margin: 0 auto;
		height: 100vh;
		top: 0;
		position: fixed;
		z-index: 2301;
	}
	.contents{
		width:80%;
		height:10%;
		position: relative;
		left:10%;
		top:45%;
		color:#e6a23c;
	}
</style>
