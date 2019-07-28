
import * as types from "@/store/types";
import { mapState, mapActions, mapMutations } from "vuex";
export default {

    data() {
        return {
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    mounted() {
    },
    created() {
        
    },
    mounted() {
    },
    methods: {
        ...mapMutations({
            setUserInfo: types.global.mutations.SET_USER_INFO
        }),
        getTime() {
            let vm = this;
            var myDate = new Date();
            let year = myDate.getFullYear();
            let month = myDate.getMonth() - 0 + 1;
            month = month >= 10 ? month : '0' + month;
            let data = myDate.getDate() >= 10 ? myDate.getDate() : '0' + myDate.getDate()
            let hour = myDate.getHours() >= 10 ? myDate.getHours() : '0' + myDate.getHours();
            let min = myDate.getMinutes() >= 10 ? myDate.getMinutes() : '0' + myDate.getMinutes();
            let sec = myDate.getSeconds() >= 10 ? myDate.getSeconds() : '0' + myDate.getSeconds();
            vm.time = year + '-' + month + '-' + data + ' ' + hour + ':' + min + ':' + sec
            console.log(vm.time)
        }

    }
}
