<template>
    <div class="page">
        <layouts>
            <template #time>
                <times :time="time"/>
            </template>
            <template #left>
                <el-radio-group v-model="radio" size="small" style="margin-bottom:10px">
                    <el-radio-button label="图表"></el-radio-button>
                    <el-radio-button label="列表"></el-radio-button>
                </el-radio-group>
                <div v-show="radio == '图表'">
                    <div class="area">
                        <titlebox :title=" '电流' "/>
                        <div class="chart" id="current" ref="current"></div>
                    </div>
                    <div class="area marg">
                        <titlebox :title=" '电量' "/>
                        <div class="chart" id="electricity" ref="electricity"></div>
                    </div>
                    <div class="area">
                        <div class="no_num" @click="tode_details('gjs')">
                            电流为0A的站点数：
                            <span>{{numInfo}}</span> 个
                        </div>
                    </div>
                </div>
                <div class="hand" @click="tode_details('zdxqs')" v-show="radio == '列表'">
                    <el-table
                        :data="tableData"
                        style="width: 100%;margin-top:10px;"
                        border
                        :header-cell-style="{background:'#E4EAEC',color:'#000',fontSize:'12px'}"
                    >
                        <el-table-column prop="name" label align="center"></el-table-column>
                        <el-table-column prop="dday" label="电量（每天）" align="center">
                            <template slot-scope="scope">{{scope.row.dday+' kw-h'}}</template>
                        </el-table-column>
                        <el-table-column prop="lday" label=" 电流（每小时）" align="center">
                            <template slot-scope="scope">{{scope.row.lday+' A'}}</template>
                        </el-table-column>
                    </el-table>
                </div>
            </template>
            <template #right>
                <tablemap
                    :showType="'fl'"
                    :one="'map'"
                    :mapUrl="mapUrl"
                    :isQx="true"
                    :usemap="useMap"
                    @getinfo="getinfo"
                />
            </template>
        </layouts>
    </div>
</template>

<script>
import times from "../../../components/tableTime";
import layouts from "../../../components/layouts";
import tablemap from "../../../components/table_map";
import titlebox from "../../../components/title";
import table from "../../../mixins/table";

export default {
    data() {
        return {
            radio: "图表",
            numInfo: 0,
            mapUrl: "index_map",
            useMap: true,
            time: "",
            tableData: [],
            energy_station: {},
            prolong_station: {},
            currentData: {},
            electricityData: {},
            xdata: ["总量", "移动", "联通", "电信"]
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
        this.getChartInfo();
    },
    mounted() {
        // this.drawChart("current");
    },
    methods: {
        getinfo(provinceId, cityId, prefectureId) {
            let vm = this;
            vm.getTime();
        },
        fix3(arr) {
            let a = [];
            for (let i = 0; i < arr.length; i++) {
                a.push((arr[i] - 0).toFixed(2));
            }
            return a;
        },
        getChartInfo() {
            let vm = this;
            let info = {
                provinceId: vm.userInfo.provinceId
            };
            vm.Api.index_qx(info).then(res => {
                vm.currentData = {
                    name: res.result.xsjs,
                    title: "电流",
                    data: [
                        {
                            name: "总量",
                            type: "line",
                            stack: "总量",
                            data: vm.fix3(res.result.zpjdl),
                            smooth: true
                        },
                        {
                            name: "移动",
                            type: "line",
                            data: vm.fix3(res.result.yddls),
                            smooth: true
                        },
                        {
                            name: "联通",
                            type: "line",
                            data: vm.fix3(res.result.ltdls),
                            smooth: true
                        },
                        {
                            name: "电信",
                            type: "line",
                            data: vm.fix3(res.result.dxdls),
                            smooth: true
                        }
                    ]
                };
                vm.electricityData = {
                    name: res.result.xsjs,
                    title: "电量",
                    data: [
                        {
                            name: "总量",
                            type: "line",
                            stack: "总量",
                            data: vm.fix3(res.result.zpjdliang)
                        },
                        {
                            name: "移动",
                            type: "line",
                            data: vm.fix3(res.result.yddliangs)
                        },
                        {
                            name: "联通",
                            type: "line",
                            data: vm.fix3(res.result.ltdliangs)
                        },
                        {
                            name: "电信",
                            type: "line",
                            data: vm.fix3(res.result.dxdliangs)
                        }
                    ]
                };
                vm.tableData = [
                    {
                        name: "总量",
                        dday:
                            res.result.dliangTotal,
                        lday: res.result.zpjdl[res.result.zpjdl.length - 1]
                    },
                    {
                        name: "移动",
                        dday:
                            res.result.yddliangsTotal,
                        lday: res.result.yddls[res.result.yddls.length - 1]
                    },
                    {
                        name: "联通",
                        dday:
                            res.result.ltdliangsTotal,
                        lday: res.result.ltdls[res.result.ltdls.length - 1]
                    },
                    {
                        name: "电信",
                        dday:
                            res.result.dxdliangsTotal,
                        lday: res.result.dxdls[res.result.dxdls.length - 1]
                    }
                ];
                vm.drawChart("current", vm.currentData);
                vm.drawChart("electricity", vm.electricityData);
            });
            vm.Api.dl0sl().then(res => {
                vm.numInfo = res.result;
            });
        },
        //图表
        drawChart(id, data) {
            let vm = this;
            const charts = this.$echarts.init(this.$refs[id]);
            charts.setOption({
                tooltip: {
                    trigger: "axis"
                },
                legend: {
                    data: vm.xdata
                },
                grid: [
                    {
                        left: "5%",
                        right: "5%",
                        bottom: "1%",
                        top: "20%",
                        containLabel: true
                    }
                ],

                xAxis: {
                    type: "category",
                    boundaryGap: false,
                    axisLine: {
                        lineStyle: {
                            width: 1
                        }
                    },
                    data: data.name
                },
                yAxis: {
                    axisLabel:
                        id == "electricity"
                            ? { formatter: "{value} kw/h" }
                            : { formatter: "{value} A" },
                    type: "value"
                },
                series: data.data
            });
        },
        tode_details(str) {
            this.$router.push({
                path: "shunt/fl_details",
                query: {
                    dataInfo: str
                }
            });
        }
    }
};
</script>

<style scoped lang='scss'>
.no_num {
    width: 100%;
    height: 60px;
    background-color: #fff;
    margin-top: 10px;
    line-height: 60px;
    text-indent: 20px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #657580;
    cursor: pointer;
    span {
        font-family: PingFangSC-Regular;
        font-size: 20px;
        color: #0070c9;
        line-height: 20px;
    }
}
.hand {
    cursor: pointer;
}
.page {
    padding-top: 0.7%;
    // width: 1280px;
    min-height: 700px;
}
.area {
    background: #fff;
    margin-bottom: 20px;
}
.chart {
    width: 100%;
    height: 260px;
}
</style>

<style lang="scss" scoped>
</style>
