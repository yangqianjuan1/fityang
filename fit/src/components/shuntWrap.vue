<template>
    <div class="chart_shunt">
        <!-- <div class="top_w">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="总电量" name="zdl"></el-tab-pane>
                <el-tab-pane label="移动电量" name="yd"></el-tab-pane>
                <el-tab-pane label="联通电量" name="lt"></el-tab-pane>
                <el-tab-pane label="电信电量" name="dx"></el-tab-pane>
            </el-tabs>
            <div class="right">
                <el-radio-group v-model="datechange" size="small" @change="changedata">
                    <el-radio-button label="day">今日</el-radio-button>
                    <el-radio-button label="month">本月</el-radio-button>
                    <el-radio-button label="year">全年</el-radio-button>
                </el-radio-group>
                <el-date-picker
                    style="margin-left:40px;"
                    size="small"
                    v-model="timevlue"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                ></el-date-picker>
            </div>
        </div>-->
        <div class="tabwrap">
            <div class="flex">
                 <div class="separate">
                    <div class="name_ta" >&nbsp; </div>
                    <div class="contant_ta">站点总量：</div>
                </div>
                <div class="separate p35" :class="{ 'colr': isActive == 1 }" @click="totab(1)">
                    <div class="name_ta" :class="{ 'active': isActive == 1 }">总电量</div>
                    <div class="contant_ta">20000</div>
                </div>
               <div class="separate p35" :class="{ 'colr': isActive == 2 }" @click="totab(2)">
                    <div class="name_ta" :class="{ 'active': isActive == 2 }">移动电量</div>
                    <div class="contant_ta">20000</div>
                </div>
               <div class="separate p35" :class="{ 'colr': isActive == 3 }" @click="totab(3)">
                    <div class="name_ta" :class="{ 'active': isActive == 3 }">联通电量</div>
                    <div class="contant_ta">20000</div>
                </div>
               <div class="separate p35" :class="{ 'colr': isActive == 4 }" @click="totab(4)">
                    <div class="name_ta" :class="{ 'active': isActive == 4 }">电信电量</div>
                    <div class="contant_ta">20000</div>
                </div>
            </div>
        </div>
        <div class="Updown" @click="tode_details('zdxqs')">
            <div class="chart" id="long" ref="long"></div>
            <div class="chart" id="zdl" ref="zdl"></div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // timevlue: "",
            // datechange: "day",
            // activeName: "zdl"
            isActive: "1"
        };
    },
    props: {
        datas: {
            type: Object,
            required: false,
            default: {}
        }
    },
    components: {},
    created() {},
    mounted() {
        let vm = this;
        if (vm.datas.btdl) {
            vm.drawChart("long", vm.datas.btdl);
            vm.drawChartzhu("zdl", vm.datas.zdl);
        }
    },
    methods: {
        // handleClick(tab, event) {
        //     this.drawChartzhu("zdl", this.datas[tab.name]);
        // },
        totab(str){
            this.isActive = str;
        },
        drawChart(id, data) {
            let vm = this;
            const charts = this.$echarts.init(this.$refs[id]);
            charts.setOption({
                tooltip: {
                    trigger: "item",
                    formatter: `{a} <br/>{b} : {c} ({d}%)`
                },
                color: ["#8FC320", "#E67817", "#0084CF"],
                legend: {
                    bottom: 10,
                    left: "center",
                    data: ["移动", "联通", "电信"]
                },

                series: [
                    {
                        name: "占比",
                        type: "pie",
                        radius: "65%",
                        center: ["50%", "50%"],
                        data: [
                            { value: data.data[0], name: "移动" },
                            { value: data.data[1], name: "联通" },
                            { value: data.data[2], name: "电信" }
                        ]
                    }
                ]
            });
        },
        drawChartzhu(id, data) {
            let vm = this;
            const charts = this.$echarts.init(this.$refs[id]);
            charts.setOption({
                color: [data.color],
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        // 坐标轴指示器，坐标轴触发有效
                        type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: "2%",
                    right: "4%",
                    bottom: "3%",
                    top: "10%",
                    containLabel: true
                },
                xAxis: [
                    {
                        type: "category",
                        data: data.xname,
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis: {
                    axisLabel: { formatter: "{value} kw/h" },
                    type: "value"
                },
                series: [
                    {
                        name: "电量",
                        type: "bar",
                        barWidth: "30%",
                        data: data.data
                    }
                ]
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
.tabwrap {
    height: 80px;
    border-bottom: 1px solid #dcdfe6;
    padding: 0 15px;
    font-size: 16px;
    .flex {
        display: flex;
    }
    .separate {
        padding-top: 15px;
        text-align: center;
        cursor: pointer;
        .name_ta {
            margin-bottom: 8px;
            padding: 0 7px 2px 7px;
            box-sizing: border-box;
            border-bottom: 3px solid #fff;

        }
        .contant_ta {

        }
    }
    .p35 {
        padding-right: 30px;
    }
}
.active {
    border-bottom: 3px solid #3ba1ff !important;
}
.colr {
    color: #3ba1ff;
}
.Updown {
    height: 560px;
    .chart {
        width: 100%;
        height: 250px;
    }
}
#long {
    width: 50%;
    height: 300px;
    margin: 0 auto;
}

// .top_w {
//     height: 50px;
//     border-bottom: 2px solid #dcdfe6;
//     position: relative;
//     box-sizing: border-box;
//     padding-left: 8px;
//     .right {
//         position: absolute;
//         right: 30px;
//         top: 10px;
//     }
// }
.chart_shunt {
    background: #fff;
    border-radius: 10px;
    margin-bottom: 20px;
}
</style>
<style scoped>
.chart_shunt >>> .el-tabs__nav {
    height: 50px !important;
}
</style>
