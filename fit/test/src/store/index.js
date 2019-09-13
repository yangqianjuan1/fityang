import Vue from "vue";
import Vuex from "vuex";
import mutations from "./mutations";
import actions from "./actions";

Vue.use(Vuex);
const state = {
  LassoFee:0.5 ,//捕虎费用
  LassoFeeTen:3 ,//捕虎费用10连
  feedPrice:0.01,//喂养费用
  isLogin:true,
  onceBid:0.1,//拍卖单次增加
  pkEntryPrice:0.5,//pk猛虎报名费
  pkShenPrice:1,//pk神虎报名费
  keyPrice:1,//fomo3d key初始价格
  inviteBuyPrice:30,//联盟买虎
  keyPriceIncrease:0.008,//fomo3d key递增比率
  huntEntryPrice:1,//逐鹿报名费
  huntComPrice:10,//逐鹿竞猜单份价
  maxFeedTimes:10,//喂养次数
  namePrice:1,//修改名字价格
  maxWidth:'500px',//最大宽度
  shareAddress:'',
  authorityAddress:'',//授权地址（正式）
  FMVPBuyAddress:'http://funmvp.com/wallet/wallet.html',//FMVP购买地址（充值余额不足）
  // shareAddress:'192.168.2.22:9999',
  shareRegister: '/api/user/inviteregisterpage/',
  shareFamily: '/invite/',
  // shareAddress:'http://192.168.2.172/invite/',
  max:999999999,
  footballUrl:'',
  upLoad:-60,
  //我的老虎list 选择条件
    level:-1,//select种类
    tigerNo:'',//ID号
    weight:1,//联盟数
  Combat:1,//战斗力
  Breed:1,//生育值
  orderByFeed:1,//喂养次数 1：小到大 0：大到小
  recodeType:'-1,-1',
  tigerListScroll:0,
  transactionScroll:0,
	//群虎逐鹿
	sessionNo:'',
	sessionId:'',
	//phone/pc
	deviceType:'pc',
	//日常任务面板
	taskPanel:false,
	//逐鹿竞猜面板&场次切换面板  是否可用
	isRaced:false,
	//逐鹿邀请弹窗标识
	inviteFlag:false,
};
const getters={
	getSessionNo(state){
		return state.sessionNo;
	},
	getSessionId(state){
		return state.sessionId;
	},
	getDeviceType(state){
		return state.deviceType;
	},
	getTaskPanel(state){
		return state.taskPanel;
	},
	getIsRaced(state){
		return state.isRaced;
	},
	getInviteFlag(state){
		return state.inviteFlag;
	}
}
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
})
