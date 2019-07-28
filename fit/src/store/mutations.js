import * as types from './types';

export default {
    [types.global.mutations.SET_USER_INFO](state, obj) {
        state.userInfo = obj;
    },
}
