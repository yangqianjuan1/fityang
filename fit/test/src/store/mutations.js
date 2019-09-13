
import{
  SET_LOGIN,
  SET_LOCAL,
  SET_TIGER_LIST_WEIGHT,
  SET_TIGER_LIST_FEED,
  SET_TIGER_LIST_LEVEL,
  SET_TIGER_LIST_NO,
  SET_TIGER_RECODE_TYPE,
  SET_TIGER_LIST_SCROLL,
  SET_TRANS_LIST_SCROLL,
  SET_MAX_WIDTH,
	set_session_no,
	set_session_id,
	set_device_type,
	set_task_panel,
	set_is_raced,
	set_invite_flag,
}from './mutations-types'

export default {
  [SET_LOCAL](state,info){
    if(!info)return;
    state.BreedFee  = info.BreedFee ;
    state.LassoFee  = info.LassoFee ;
    state.BetAmount  = info.BetAmount ;
    state.SaleTigerServiceRate  = info.SaleTigerServiceRate ;
  },
  [SET_LOGIN](state,info){
    state.isLogin = info;
  },
  [SET_TIGER_LIST_WEIGHT](state,info){
    state.weight = info;
  },
  [SET_TIGER_LIST_LEVEL](state,info){
    state.level = info;
  },
  [SET_TIGER_LIST_NO](state,info){
    state.tigerNo = info;
  },
  [SET_TIGER_RECODE_TYPE](state,info){
    state.recodeType = info;
  },
  [SET_TIGER_LIST_FEED](state,info){
    state.orderByFeed = info;
  },
  [SET_TIGER_LIST_SCROLL](state,info){
    state.tigerListScroll = info;
  },
  [SET_TRANS_LIST_SCROLL](state,info){
    state.transactionScroll = info;
  },
  [SET_MAX_WIDTH](state,info){
    state.maxWidth = info;
  },
	//群虎逐鹿
	[set_session_no](state,info){
		state.sessionNo=info;
	},
	[set_session_id](state,info){
		state.sessionId=info;
	},
	[set_device_type](state,info){
		state.deviceType=info;
	},
	//日常任务面板
	[set_task_panel](state){
		if(state.taskPanel){
			state.taskPanel=false;
		}else{
			state.taskPanel=true;
		}
	},
	[set_is_raced](state,newVal){
		if(newVal==0){
			state.isRaced=true;
		}else{
			state.isRaced=false;
		}
	},
	//逐鹿邀请
	[set_invite_flag](state,newVal){
		if(newVal==0){
			state.inviteFlag=true;
		}else{
			state.inviteFlag=false;
		}
	}
}
