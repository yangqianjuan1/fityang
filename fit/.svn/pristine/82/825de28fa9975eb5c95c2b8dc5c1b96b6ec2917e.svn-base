<template>
    <div class="page">
        <layouts>
            <template #time>
                <times :time="time"/>
            </template>
            <template #left>
                <div class="area">
                    <titlebox :title=" '储能管理' "/>
                    <ol class="flex">
                        <li class="tag">
                            <p class="tag-info">储能电池容量总计(KWH)</p>
                            <p class="tag-num">
                                <span class="num-get">{{energy_station.capacity||0}}</span>
                                <span>KWH</span>
                            </p>
                        </li>
                        <li class="tag">
                            <p class="tag-info">削峰填谷能力(KWH)</p>
                            <p class="tag-num">
                                <span class="num-get">{{energy_station.fdl||0}}</span>
                                <span>KWH</span>
                            </p>
                        </li>
                        <li class="tag">
                            <p class="tag-info">累计节费金额(元)</p>
                            <p class="tag-num">
                                <span class="num-get">{{energy_station.ljjfje||0}}</span>
                                <span>元</span>
                            </p>
                        </li>
                        <li class="tag">
                            <p class="tag-info">单站日均放电时长(H)</p>
                            <p class="tag-num">
                                <span class="num-get">{{energy_station.dzrjfdsc||0}}</span>
                                <span>H</span>
                            </p>
                        </li>
                    </ol>
                </div>
                <div class="area marg">
                    <titlebox :title=" '延寿管理' "/>
                    <ol class="flex">
                        <li class="tag">
                            <p class="tag-info">T0平均应急时长(H)</p>
                            <p class="tag-num">
                                <span class="num-get">{{prolong_station.t0pjyjsc||0}}</span>
                                <span>H</span>
                            </p>
                        </li>
                        <li class="tag">
                            <p class="tag-info">T1平均应急时长(H)</p>
                            <p class="tag-num">
                                <span class="num-get">{{prolong_station.t1pjyjsc||0}}</span>
                                <span>H</span>
                            </p>
                        </li>
                        <li class="tag">
                            <p class="tag-info">延寿管理提升(%)</p>
                            <p class="tag-num">
                                <span class="num-get">{{prolong_station.ysglts||0}}%</span>
                                <span>%</span>
                            </p>
                        </li>
                        <li class="tag">
                            <p class="tag-info">应急次数(次))</p>
                            <p class="tag-num">
                                <span class="num-get">{{prolong_station.yjcs||0}}</span>
                                <span>次</span>
                            </p>
                        </li>
                    </ol>
                </div>
            </template>
            <template #right>
                <tablemap :showType="'yw'" :mapUrl="mapUrl" :isQx="false" :usemap="useMap" @getinfo="getinfo" />
            </template>
        </layouts>
    </div>
</template>

<script>
import times from "../../components/tableTime";
import layouts from "../../components/layouts";
import tablemap from "../../components/table_map";
import titlebox from "../../components/title";
import table from "../../mixins/table";

export default {
    data() {
        return {
            mapUrl: "business_center",
            useMap: true,
            time: "",
            energy_station: {},
            prolong_station: {}
        };
    },
    mixins: [table],
    components: {
        times,
        layouts,
        tablemap,
        titlebox
    },
    created() {
        this.getinfo();
    },
    mounted() {},
    methods: {
        getinfo(provinceId, cityId, prefectureId) {
            let vm = this;
            let info = {
                provinceId: provinceId || vm.userInfo.provinceId,
                cityId: cityId || vm.userInfo.cityId,
                prefectureId: prefectureId || vm.userInfo.prefectureId
            };
            vm.Api.energy_station_yw(info).then(res => {
                vm.energy_station = res.result;
            });
            vm.Api.prolong_station_yw(info).then(res => {
                vm.prolong_station = res.result;
            });
            vm.getTime();
        }
    }
};
</script>

<style scoped lang='scss'>
.page {
    padding-top: 0.7%;
    // width: 1280px;
    min-height: 700px;
}
.area {
    background: #fff;
}
</style>

<style lang="scss" scoped>
.flex {
    overflow: hidden;
    li {
        float: left;
    }
}
.flex > li:nth-child(3n + 0) {
    border-right: none;
}
.tag {
    margin-top: 20px;
    margin-bottom: 14px;
    cursor: pointer;
    width: 50%;
}

.tag-info {
    margin-left: 20px;
    font-size: 14px;
    color: #6e7c87;
}
.marg {
    margin-top: 10px;
}

.tag-num {
    font-size: 24px;
    color: #6e7c87;
    margin-top: 10px;
    margin-left: 20px;
    font-size: 14px;
}
.num-get {
    font-size: 24px;
}

.tag-num span {
    display: inline-block;
    text-align: center;
    margin-left: 5px;
}
</style>
