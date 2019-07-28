<template>
    <!-- 对内 -->
    <div class="if_wrap">
        <!-- <iframe src="http://henan.towercom.vip/tower_manage_bms/a/sso/login?username=baoxing_hn&password=123456&sso=1" frameborder="0"></iframe> -->

        <div id="boxMap" v-loading="loading"></div>






    </div>
</template>

<script>
// import table from "../mixins/table";

export default {
    data() {
        return {
            list: []
        };
    },
    components: {},
    created() {},
    mounted() {
        // this.setMap();
    },
    methods: {
        /**
         * 初始化地图
         */
        setMap(data) {
            let map = new BMap.Map("boxMap");

            let vm = this;
            if (vm.userInfo.mapRange == 1) {
                map.centerAndZoom(new BMap.Point(113.557234, 33.902115), 8);
            } else if (vm.userInfo.mapRange == 2) {
                map.centerAndZoom(new BMap.Point(113.557234, 33.902115), 8);
            } else if (vm.userInfo.mapRange == 3) {
                map.centerAndZoom(new BMap.Point(113.557234, 33.902115), 8);
            }

            map.setCurrentCity("郑州");
            vm.map = map;
            var overView = new BMap.OverviewMapControl();
            map.setMinZoom(3); //最小zoom缩放级别
            map.setMaxZoom(14); //最大zoom缩放级别
            map.enableScrollWheelZoom();
            map.addControl(overView); //添加默认缩略地图控件
        }
    }
};
</script>

<style scoped lang='scss'>
.if_wrap {
    width: 100%;
    height: 1000px;
    iframe {
        height: 100%;
        width: 100%;
    }
}

#boxMap {
    height: 100%;
    width: 100%;
}
</style>
