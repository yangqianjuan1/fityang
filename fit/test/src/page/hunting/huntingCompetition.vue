<template>
	<div class="huntingCompetition">
		<div class="inputs" flex="main:justify">
			<input placeholder="请输入你要查询的场次编号" v-model.number="num" />
			<button class="btn-violet" @click="sreachByCid">查询</button>
		</div>
		<red-table :titleList="titleList" style="margin: 0.2rem 0.5rem;">
			<scroll top="6.8" style="margin:0 auto;padding: 0 0.6rem" :pullUpLoad="setPullUpLoad" :pullUpLoadFuc="getComList"
			 pullUpLoadFucParam="UpLoad" :pullDownRefresh="setDownload" :pullDownFuc="getNewSession" pullDownFucParam="Download"
			 ref="scroll2">
				<div v-for="(item,index) in comList">
					<li flex="main:center cross:center box:mean" class="item">
						<p flex="main:center">第{{item.Session}}场</p>
						<p flex="main:center">
							<interval-until2 :cid="item.Id"></interval-until2>
						</p>
						<div><button :class="item.IsAccount==true?'btn-yellow':'btn-violet'" style="height: 0.8rem;width: 2.18rem" @click="edit(item)">选择赛道</button></div>
					</li>
					<div class="under-line"></div>
				</div>

			</scroll>

		</red-table>
		<empty :empty="comList.length===0"></empty>

	</div>
</template>

<script>
	import Selection from "../../components/index/select";
	import RedTable from "../../components/red-table";
	import MyDialog from "../../components/dialog";
	import ComfireDialog from "../../components/comfireDialog";
	import Scroll from "../../components/scroll/scroll";
	import common from '../../components/common'
	import Empty from "../../components/empty";
	import intervalUntil2 from "./intervaluntil2";
	export default {
		components: {
			Empty,
			Scroll,
			ComfireDialog,
			MyDialog,
			RedTable,
			Selection,
			intervalUntil2,
		},
		name: "huntingCompetition",
		data() {
			return {
				num: '',
				pageSize: 30,
				offset: 0,
				comList: [],
				titleList: ['场次', '状态', '操作'],
			}
		},
		mounted() {
			this.getComList();
		},
		computed: {
			setPullUpLoad: function() {
				return {
					threshold: -30,
				}
			},
			setDownload: function() {
				return {
					threshold: 30,
				}
			}
		},
		methods: {
			sreachByCid: function() {
				if (this.num == '' || this.num == null) {
					this.getComList();
					return;
				}
				let data = {
					cid: this.num
				};
				this.$axios.post('/api/horse/getCidTigerList/', data).then(res => {
					var result = res.data;
					if (result.IsSuccess == true) {
						if (result.Result.length > 0) {
							const data=[{'Id':result.Result[0].Id,'Session':result.Result[0].CompeteNo}];
							const lists={'total':0,"Data":data};
							this.comList=data;
						} else {
							this.$tips("未找到此编号的场次信息");
						}
					} else {
						this.$tips("请重试");
					}
				}, error => {
					this.$tips("查询失败，请检查网络链接是否正常");
				});
			},
			getComList: function(type) { //竞猜场次列表
				let offset;
				if (type === 'UpLoad') {
					offset = this.offset;
				} else {
					offset = 0;
					this.tigerList = [];
				}
				this.$axios.get('/api/battle/compete/betlist/?size=' + this.pageSize + '&offset=' + offset).then(
					res => {
						let result = res.data;
						if (result.IsSuccess) {
							if (!result.Result.Data) return;
							var datas=[];
							if (result.Result.Data.length > 0) {
								let list = result.Result.Data;
								if (type === 'UpLoad') {
									datas = this.comList.concat(list);
								} else {
									 datas = list;
								}
								this.comList=datas;
							} else {
								if (type === 'UpLoad') {
									// this.$tips('暂无更多提现记录');
								} else {
									this.empty = true;
								}
							}
							if (this.$refs.scroll2) {
								this.$refs.scroll2.finishiPullUp();
							}
							this.offset = this.comList.length;
						} else {
							if (this.$refs.scroll2) {
								this.$refs.scroll2.finishiPullUp();
							}
							this.$get_error('tips', result.Code, result.Message);
						}
					}, error => {
						this.$get_error('reload');
					}
				);
			},
			getNewSession: function(type) {
				if (this.$refs.scroll2) {
					this.$refs.scroll2.finishPullDown();
				}

			},
			edit: function(item) { //选择赛道
				this.$store.commit('set_session_no',item.Session);
				this.$store.commit('set_session_id',item.Id);
				this.$emit('bet');
			},
		},
		watch: {

		}
	}
</script>

<style scoped>
	.inputs {
		width: 90%;
		height: 1rem;
		position: relative;
		left: 50%;
		margin-left: -45%;
		margin-top: -0.8rem;
	}

	.inputs input {
		height: 85%;
		min-width: 70%;
		-webkit-border-radius: 0.15625rem;
		border-radius: 0.15625rem;
		-moz-border-radius: 0.15625rem;
		border: 1px solid #837361;
		text-indent: 0.3125rem;
	}

	input::-webkit-input-placeholder {
		font-size: 0.2667rem;
		color: #999999;
	}

	.inputs button {
		padding: 0 0.8rem;
		height: 0.85rem;
		font-size: 0.2667rem;
	}

	.huntingCompetition {
		padding: 1.2rem 0.5rem 0;
	}

	.Check {
		padding: 0.5rem;
		background-image: url("../../assets/img/competition/guideBg.png");
		background-size: 100% 100%;
		width: 80%;

		border-radius: 5px;
		height: 10rem;
	}

	.synthesis-title {
		text-align: center;
		margin: 0 auto;
		padding: 0.2rem;
		transform: skewX(-15deg);
		color: #000000;
		background-color: #ffffff;
		display: inline-block;
		font-size: 0.32rem;
	}

	.delete {
		height: 0.5rem;
		width: 0.5rem;
		position: absolute;
		left: 0
	}

	.synthesis-item {
		position: relative;
		padding: 0.2rem 0;
		text-align: left;
	}

	.checkCancle {
		position: absolute;
		bottom: 0.36rem;
		width: 2.5rem;
		height: 0.6933rem;
		line-height: 0.6933rem;
		cursor: pointer;
	}

	.label {
		height: 1.16rem;
		width: 100%;
		padding: 0 0.42rem;
		margin-top: 1.2rem;
	}

	.label-left {
		margin-right: 0.5rem;
		font-weight: 600;
	}

	.com {
		width: 1.92rem;
		height: 0.7333rem;
		font-size: 0.2933rem;
	}

	.item {
		text-align: center;
		font-size: 0.333rem;
		padding: 0.2rem 0;
		line-height: 1rem;
		position: relative;
	}

	.comTitle {
		text-align: center;
		font-size: 0.48rem;
	}

	.comText {
		text-align: center;
		font-size: 0.37rem;
		margin-top: 0.3rem;
	}

	.comText span {
		color: #FFF719;
	}

	/*查询按钮*/
</style>
