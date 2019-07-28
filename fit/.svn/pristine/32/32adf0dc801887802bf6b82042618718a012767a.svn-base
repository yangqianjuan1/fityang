<template>
    <div class="page">
        <layouts>
            <template #time>
                <times :time="time" />
            </template>
            <template #left>
                <div class="area">
                    <div class="news-title">
                        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                            <el-tab-pane label="储能" name="energy_station_jk" v-loading="loading">
                                <div class="tag">
                                    <p class="tag-title">蓄电池放电8小时以上站点数量(个)</p>
                                    <p class="tag-num">
                                        <span
                                            id="topDisChargeCount1"
                                        >{{energy_station.topDisChargeCount||0}}</span>
                                        <span
                                            style="font-size: 14px;display: inline-block;margin-left: 5px;"
                                        >个</span>
                                    </p>
                                </div>
                                <div class="tag">
                                    <p class="tag-title">蓄电池放电不足4小时站点数量(个)</p>
                                    <p class="tag-num">
                                        <span
                                            id="topDisChargeCount1"
                                        >{{energy_station.lowDisChargeCount||0}}</span>
                                        <span
                                            style="font-size: 14px;display: inline-block;margin-left: 5px;"
                                        >个</span>
                                    </p>
                                </div>
                                <div class="tag">
                                    <p class="tag-title">蓄电池管理设备/DTU系统告警数量(个)</p>
                                    <p class="tag-num">
                                        <span
                                            id="topDisChargeCount1"
                                        >{{energy_station.dtuSysWarnCount||0}}</span>
                                        <span
                                            style="font-size: 14px;display: inline-block;margin-left: 5px;"
                                        >个</span>
                                    </p>
                                </div>
                                <div class="tag">
                                    <p class="tag-title">蓄电池放电4~8小时站点数量(个)</p>
                                    <p class="tag-num">
                                        <span
                                            id="topDisChargeCount1"
                                        >{{energy_station.normalDisChargeCount||0}}</span>
                                        <span
                                            style="font-size: 14px;display: inline-block;margin-left: 5px;"
                                        >个</span>
                                    </p>
                                </div>
                                <div class="tag">
                                    <p class="tag-title">平均放电时长变动>20%站点数量(个)</p>
                                    <p class="tag-num">
                                        <span
                                            id="topDisChargeCount1"
                                        >{{energy_station.averageDisChargeWaveCount||0}}</span>
                                        <span
                                            style="font-size: 14px;display: inline-block;margin-left: 5px;"
                                        >个</span>
                                    </p>
                                </div>
                                <div class="tag">
                                    <p class="tag-title">蓄电池管理设备/DTU离线告警数量(个)</p>
                                    <p class="tag-num">
                                        <span
                                            id="topDisChargeCount1"
                                        >{{energy_station.dtuOfflineCount||0}}</span>
                                        <span
                                            style="font-size: 14px;display: inline-block;margin-left: 5px;"
                                        >个</span>
                                    </p>
                                </div>
                                <div class="tag">
                                    <p class="tag-title">蓄电池电压告警数量(个)</p>
                                    <p class="tag-num">
                                        <span
                                            id="topDisChargeCount1"
                                        >{{energy_station.voltageWarnCount||0}}</span>
                                        <span
                                            style="font-size: 14px;display: inline-block;margin-left: 5px;"
                                        >个</span>
                                    </p>
                                </div>
                                <div class="tag">
                                    <p class="tag-title">蓄电池温度告警数量(个)</p>
                                    <p class="tag-num">
                                        <span
                                            id="topDisChargeCount1"
                                        >{{energy_station.tempWarnCount||0}}</span>
                                        <span
                                            style="font-size: 14px;display: inline-block;margin-left: 5px;"
                                        >个</span>
                                    </p>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="延寿" name="prolong_station_jk" v-loading="loading">
                                <div class="tag">
                                    <p class="tag-title">蓄电池放电3小时以上站点数量(个)</p>
                                    <p class="tag-num">
                                        <span
                                            id="topDisChargeCount1"
                                        >{{prolong_station.topDisChargeCount||0}}</span>
                                        <span
                                            style="font-size: 14px;display: inline-block;margin-left: 5px;"
                                        >个</span>
                                    </p>
                                </div>
                                <div class="tag">
                                    <p class="tag-title">蓄电池放电不足1小时站点数量(个)</p>
                                    <p class="tag-num">
                                        <span
                                            id="topDisChargeCount1"
                                        >{{prolong_station.lowDisChargeCount||0}}</span>
                                        <span
                                            style="font-size: 14px;display: inline-block;margin-left: 5px;"
                                        >个</span>
                                    </p>
                                </div>
                                <div class="tag">
                                    <p class="tag-title">蓄电池管理设备/DTU离线告警数量(个)</p>
                                    <p class="tag-num">
                                        <span
                                            id="topDisChargeCount1"
                                        >{{prolong_station.dtuOfflineCount||0}}</span>
                                        <span
                                            style="font-size: 14px;display: inline-block;margin-left: 5px;"
                                        >个</span>
                                    </p>
                                </div>

                                <div class="tag">
                                    <p class="tag-title">蓄电池放电1~3小时站点数量(个)</p>
                                    <p class="tag-num">
                                        <span
                                            id="topDisChargeCount1"
                                        >{{prolong_station.normalDisChargeCount||0}}</span>
                                        <span
                                            style="font-size: 14px;display: inline-block;margin-left: 5px;"
                                        >个</span>
                                    </p>
                                </div>

                                <div class="tag">
                                    <p class="tag-title">蓄电池管理设备/DTU系统告警数量(个)</p>
                                    <p class="tag-num">
                                        <span
                                            id="topDisChargeCount1"
                                        >{{prolong_station.dtuSysWarnCount||0}}</span>
                                        <span
                                            style="font-size: 14px;display: inline-block;margin-left: 5px;"
                                        >个</span>
                                    </p>
                                </div>
                                <div class="tag">
                                    <p class="tag-title">蓄电池电压告警数量(个)</p>
                                    <p class="tag-num">
                                        <span
                                            id="topDisChargeCount1"
                                        >{{prolong_station.voltageWarnCount||0}}</span>
                                        <span
                                            style="font-size: 14px;display: inline-block;margin-left: 5px;"
                                        >个</span>
                                    </p>
                                </div>
                                <div class="tag">
                                    <p class="tag-title">蓄电池温度告警数量(个)</p>
                                    <p class="tag-num">
                                        <span
                                            id="topDisChargeCount1"
                                        >{{prolong_station.tempWarnCount||0}}</span>
                                        <span
                                            style="font-size: 14px;display: inline-block;margin-left: 5px;"
                                        >个</span>
                                    </p>
                                </div>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </div>
            </template>
            <template #right>
                <tablemap
                    :showType="'jk'"
                    :mapUrl="mapUrl"
                    ref="mapChange"
                    @getinfo="getinfo"
                    :tableUrl="tableUrl"
                />
            </template>
        </layouts>
    </div>
</template>

<script>
import times from "../../components/tableTime";
import layouts from "../../components/layouts";
import tablemap from "../../components/table_map";
import table from "../../mixins/table";

export default {
    data() {
        return {
            mapUrl: "energy_station_map",
            tableUrl: "energy_station_prefecture_panel_list",
            fuUrl: "prolong_station_prefecture_panel_list",
            time: "",
            activeName: "energy_station_jk",
            energy_station: {},
            prolong_station: {},
            loading: false
        };
    },
    mixins: [table],
    components: {
        times,
        layouts,
        tablemap
    },
    created() {
        this.energy_station_jk();
    },
    mounted() {},
    methods: {
        getinfo(provinceId, cityId, prefectureId) {
            let vm = this;
            if (vm.activeName == "energy_stationjk") {
                vm.energy_station_jk(provinceId, cityId, prefectureId);
            } else {
                vm.prolong_station_jk(provinceId, cityId, prefectureId);
            }
        },
        energy_station_jk(provinceId, cityId, prefectureId) {
            let vm = this;
            let info = {
                provinceId: provinceId || vm.userInfo.provinceId,
                cityId: cityId || vm.userInfo.cityId,
                prefectureId: prefectureId || vm.userInfo.prefectureId
            };
            vm.loading = true;
            vm.Api.energy_station_jk(info).then(res => {
                vm.loading = false;

                vm.energy_station = res.result;
            });
            vm.getTime();
        },
        prolong_station_jk(provinceId, cityId, prefectureId) {
            let vm = this;
            let info = {
                provinceId: provinceId || vm.userInfo.provinceId,
                cityId: cityId || vm.userInfo.cityId,
                prefectureId: prefectureId || vm.userInfo.prefectureId
            };
            vm.loading = true;
            vm.Api.prolong_station_jk(info).then(res => {
                vm.loading = false;
                vm.prolong_station = res.result;
            });
            vm.getTime();
        },
        handleClick() {
            let vm = this;
            let url = "";
            if (vm.activeName == "prolong_station_jk") {
                vm.prolong_station_jk();
                vm.mapUrl = "prolong_station_map";
                url = vm.fuUrl;
            } else {
                vm.energy_station_jk();
                vm.mapUrl = "energy_station_map";
                url = vm.tableUrl;
            }
            vm.$refs.mapChange.changeClick(vm.mapUrl, url);
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
.news-title {
    // height: 59px;
    width: calc(100% - 0.7% - 0.7% - 6px - 16px);
    margin-left: 0.7%;
    margin-right: 0.7%;
    // border-bottom: 1px solid #e4ebf0;
    padding: 10px;
}
.tag {
    width: 100%;
    padding-left: 20px;
    cursor: pointer;
}
.tag-title {
    font-size: 16px;
    color: #6e7c87;
    margin-top: 20px;
    margin-bottom: 10px;
}
.tag-num {
    font-size: 26px;
    color: #6e7c87;
    margin-bottom: 10px;
    margin-right: 10px;
}
</style>
