<template>
    <div class="page-view borb">
        <div class="hand">
            <div class="bqimg"></div>
            <div class="tit-wrap">储能中心</div>
        </div>
        <el-tabs style="height: 200px;" v-model="activeName">
            <el-tab-pane label="拓扑图展示" name="img">
                <div class="wrap">
                    <div class="topology">
                        <div class="dianbiao red">
                            <el-tooltip placement="top">
                                <div slot="content">
                                    <label
                                        v-if="meterInfo == ''"
                                        style="top: 72px; left: -75px;"
                                    >暂无数据</label>
                                    <label
                                        v-else
                                        style="top: 62px; left: 155px;"
                                    >电源供电：{{meterInfo}} KWH</label>
                                </div>
                                <el-button></el-button>
                            </el-tooltip>
                        </div>
                        <div class="kongtiao red">
                            <el-tooltip placement="top">
                                <div slot="content">
                                    <label v-if="airInfo == ''" style="top: 72px; left: -75px;">暂无数据</label>
                                    <label v-else style="top: 62px; left: 155px;">
                                        环境温度：{{airInfo.environmentTemp}} 度
                                        <br>
                                        环境湿度：{{airInfo.humidity}} %
                                    </label>
                                </div>
                                <el-button></el-button>
                            </el-tooltip>
                        </div>
                        <div class="zlyg red">
                            <el-tooltip placement="top">
                                <div slot="content">
                                    <label
                                        v-if="hvdcInfo == ''"
                                        style="top: 72px; left: -75px;"
                                    >暂无数据</label>
                                    <label v-else style="top: 72px; left: -75px;">
                                        模组个数{{hvdcInfo.moldNum}} 个
                                        <br>
                                        模组型号：{{hvdcInfo.moldType}}
                                    </label>
                                </div>
                                <el-button></el-button>
                            </el-tooltip>
                        </div>
                        <div class="kgdy red">
                            <el-tooltip placement="top">
                                <div slot="content">
                                    <label
                                        v-if="switchPowerInfo == ''"
                                        style="top: 238px; left: 159px;"
                                    >暂无数据</label>
                                    <label v-else style="top: 238px; left: 159px;">
                                        模组型号：{{switchPowerInfo.moldType}}
                                        模组个数：{{switchPowerInfo.moldNum}}
                                        机柜型号：{{switchPowerInfo.cabinetsType}}
                                    </label>
                                </div>
                                <el-button></el-button>
                            </el-tooltip>
                        </div>
                        <div class="nygl red">
                            <el-tooltip placement="top">
                                <div slot="content">
                                    <label style="top: 183px; left: 366px;">
                                        电池充电：{{powerManageDevInfo.chargeSum}} KWH
                                        <br>
                                        电池放电：{{powerManageDevInfo.dischargeSum}} KWH
                                        <br>
                                        光伏供电：{{powerManageDevInfo.PVSum}} KWH
                                    </label>
                                </div>
                                <el-button></el-button>
                            </el-tooltip>
                        </div>
                        <div class="jz1 red"></div>
                        <div class="jz2 red"></div>
                        <div class="jz3 red"></div>
                        <div class="dc1 red" @click="dianchi(batteryGroupInfo[0])"></div>
                        <div class="dc2 red" @click="dianchi(batteryGroupInfo[1])"></div>
                        <div class="dc3 red" @click="dianchi(batteryGroupInfo[2])"></div>
                        <div class="cdz1 red">
                            <el-tooltip placement="top">
                                <div slot="content">
                                    <label
                                        v-if="chargeHubInfo == ''"
                                        style="top: 197px; left: 501px;"
                                    >暂无数据</label>
                                    <label v-else style="top: 197px; left: 501px;">
                                        充电量：{{chargeHubInfo.epsNowcapacity}} KWH
                                        <br>
                                        充电时间：{{chargeHubInfo.time/60}} 分钟
                                    </label>
                                </div>
                                <el-button></el-button>
                            </el-tooltip>
                        </div>
                        <div class="cdz2 red">
                            <el-tooltip placement="top">
                                <div slot="content">
                                    <label style="top: 211px; left: 578px;">暂无数据</label>
                                </div>
                                <el-button></el-button>
                            </el-tooltip>
                        </div>
                        <div class="cdz3 red">
                            <el-tooltip placement="top">
                                <div slot="content">
                                    <label style="top: 191px; left: 762px;">暂无数据</label>
                                </div>
                                <el-button></el-button>
                            </el-tooltip>
                        </div>
                        <div class="cdz4 red">
                            <el-tooltip placement="top">
                                <div slot="content">
                                    <label style="top: 229px; left: 866px;">暂无数据</label>
                                </div>
                                <el-button></el-button>
                            </el-tooltip>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="表格显示" name="table">
                <div class="tablewrap">
                    <div class="p_module_title">
                        <span>
                            <b>储能中心综合指标</b>
                        </span>
                    </div>
                    <div class="p_module_content">
                        <div class="p_module_title">
                            <span style="font-size:14px;">
                                <b>1、常规参数</b>
                            </span>
                        </div>
                        <table
                            class="p_module_table tableoen"
                            border="1"
                            cellpadding="1"
                            cellspacing="1"
                            style="width:100%;"
                        >
                            <tbody>
                                <tr>
                                    <td style="width:33%;">时间</td>
                                    <td
                                        style="width:33%;"
                                        class="center"
                                        align="center"
                                    >{{table_info.time}}</td>
                                </tr>
                                <tr>
                                    <td style="width:33%;">环境温度</td>
                                    <td
                                        style="width:33%;"
                                        class="center"
                                        align="center"
                                    >{{table_info.epsTemperature}}度</td>
                                </tr>
                                <tr>
                                    <td style="width:33%;">环境湿度</td>
                                    <td
                                        style="width:33%;"
                                        class="center"
                                        align="center"
                                    >{{table_info.epsHumidity}}%</td>
                                </tr>
                                <tr>
                                    <td style="width:33%;">存储能量(KWH)（当日/本月/总累积）</td>
                                    <td
                                        style="width:33%;"
                                        class="center"
                                        align="center"
                                        id="main"
                                    >{{table_info.ccnlDay}} / {{table_info.ccnlMonth}} / {{table_info.ccnlTotal}}</td>
                                </tr>
                                <tr>
                                    <td style="width:33%;">释放能量(KWH)（当日/本月/总累积）</td>
                                    <td
                                        style="width:33%;"
                                        class="center"
                                        align="center"
                                        id="battery"
                                    >{{table_info.sfnlDay}} / {{table_info.sfnlMonth}} / {{table_info.sfnlTotal}}</td>
                                </tr>
                                <tr>
                                    <td style="width:33%;">光伏充电量(KWH)（当日/本月/总累积）</td>
                                    <td
                                        style="width:33%;"
                                        class="center"
                                        align="center"
                                        id="gf"
                                    >{{table_info.gfnlDay}} / {{table_info.gfnlMonth }} / {{table_info.gfnlTotal}}</td>
                                </tr>
                                <tr>
                                    <td style="width:33%;">日均节费(元)</td>
                                    <td
                                        style="width:33%;"
                                        class="center"
                                        align="center"
                                        id="gf"
                                    >{{table_info.dailyAverageFee||'暂无数据'}}</td>
                                </tr>
                                <tr>
                                    <td style="width:33%;">累计节费(元)</td>
                                    <td
                                        style="width:33%;"
                                        class="center"
                                        align="center"
                                        id="gf"
                                    >{{table_info.totalAverageFee||'暂无数据'}}</td>
                                </tr>
                                <tr>
                                    <td style="width:33%;">入网时间</td>
                                    <td
                                        style="width:33%;"
                                        class="center"
                                        align="center"
                                        id="gf"
                                    >{{table_info.setTime||'暂无数据'}}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div id="three_chart" ref="three_chart"></div>
                        <div class="p_module_title">
                            <span style="font-size:14px;">
                                <b>2、设备指标</b>
                            </span>
                        </div>
                        <table
                            class="p_module_table"
                            border="1"
                            cellpadding="1"
                            cellspacing="1"
                            style="width:100%;"
                        >
                            <tbody>
                                <tr>
                                    <td style="width:15%;" align="center">设备类型</td>
                                    <td style="width:15%;" align="center">型号</td>
                                    <td style="width:20%;" align="center">规格</td>
                                    <td style="width:10%;" align="center">功率</td>
                                </tr>
                                <tr>
                                    <td>开关电源</td>
                                    <td>DZY48/50HI</td>
                                    <td>50A*12pcs</td>
                                    <td class="center" align="center"></td>
                                </tr>
                                <tr>
                                    <td>光伏</td>
                                    <td></td>
                                    <td></td>
                                    <td>10KW</td>
                                </tr>
                                <tr>
                                    <td>动力柜</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>电池组1</td>
                                    <td>NJL6118BEV</td>
                                    <td>51.2V/800AH/磷酸铁锂</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>电池组2</td>
                                    <td>NJL6118BEV</td>
                                    <td>51.2V/800AH/磷酸铁锂</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>电池组3</td>
                                    <td>NJL6118BEV</td>
                                    <td>51.2V/800AH/磷酸铁锂</td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="p_module_title">
                            <span style="font-size:14px;">
                                <b>3、蓄电池指标</b>
                            </span>
                        </div>
                        <table
                            class="p_module_table"
                            border="1"
                            cellpadding="0"
                            cellspacing="0"
                            style="width:100%;"
                        >
                            <tbody>
                                <tr>
                                    <td style="width:15%;" align="center">设备名称</td>
                                    <td style="width:15%;" align="center">型号</td>
                                    <td style="width:20%;" align="center">规格</td>
                                    <td style="width:10%;" align="center">功率</td>
                                    <td style="width:20%;" align="center"></td>
                                </tr>

                                <tr v-for="(item,index) in table_info.children" :key="index">
                                    <td>{{item.panelName}}</td>
                                    <td>NJL6118BEV</td>
                                    <td>51.2V/800AH/磷酸铁锂</td>
                                    <td></td>
                                    <td>
                                        <a
                                            class="hend"
                                            style="color:#023DB5"
                                            @click="gotharf(item)"
                                        >{{item.id}}-{{item.panelName}}</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="p_module_title">
                            <span style="font-size:14px;">
                                <b>4、计量</b>
                            </span>
                        </div>
                        <table
                            class="p_module_table"
                            border="1"
                            cellpadding="0"
                            cellspacing="0"
                            style="width:100%;"
                        >
                            <tbody>
                                <tr>
                                    <td style="width:20%;" align="center">谷时充电</td>
                                    <td style="width:20%;" align="center">峰时放电</td>
                                    <td style="width:20%;" align="center">光伏</td>
                                    <td style="width:20%;" align="center">计量点4</td>
                                    <td style="width:20%;" align="center">计量点5</td>
                                </tr>
                                <tr>
                                    <td align="center"></td>
                                    <td align="center"></td>
                                    <td align="center"></td>
                                    <td align="center"></td>
                                    <td align="center"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeName: "table",
            tableData: [],
            urlList: [
                "airInfo",
                "meterInfo",
                "hvdcInfo",
                "switchPowerInfo",
                "powerManageDevInfo",
                "chargeHubInfo",
                "batteryGroupInfo",
                "table_info"
            ],
            airInfo: "",
            meterInfo: "",
            hvdcInfo: "",
            switchPowerInfo: "",
            powerManageDevInfo: "",
            chargeHubInfo: "",
            batteryGroupInfo: "",
            table_info: "",
            labelOption : {
                rotate: 90,
                align: 'left',
                verticalAlign: 'middle',
                position: 'insideBottom',
                distance: 15,
            },
            chartData: {
                name: ["当日", "本月", "总累积"],
                data: [
                    {
                        name: "存储能量(KWH)",
                        type: "bar",
                        barGap: 0,
                        // label: labelOption,
                        data: [0, 0, 0]
                    },
                    {
                        name: "释放能量(KWH)",
                        type: "bar",
                        // label: labelOption,
                        data: [0, 0, 0]
                    },
                    {
                        name: "光伏充电量(KWH)",
                        type: "bar",
                        // label: labelOption,
                        data: [0, 0, 0]
                    }
                ]
            }
        };
    },
    components: {},
    created() {
        this.Info();
    },
    mounted() {
        this.drawChart('three_chart',this.chartData)
    },
    methods: {
        Info() {
            let vm = this;
            let data = {
                panelId: this.$route.query.panelId
            };
            for (let i = 0; i < vm.urlList.length; i++) {
                vm.Api[vm.urlList[i]](data).then(res => {
                    if (res.code == 200) {
                        if(vm.urlList[i] == 'table_info'){
                            vm[vm.urlList[i]] = res.result;
                            vm.chartData.data[0].data = [vm.table_info.ccnlDay,vm.table_info.ccnlMonth,vm.table_info.ccnlTotal]
                            vm.chartData.data[1].data = [vm.table_info.sfnlDay,vm.table_info.sfnlMonth,vm.table_info.sfnlTotal]
                            vm.chartData.data[2].data = [vm.table_info.gfnlDay,vm.table_info.gfnlMonth,vm.table_info.gfnlTotal]
                             vm.drawChart('three_chart',vm.chartData)
                        }else{
                            vm[vm.urlList[i]] = res.result;
                        }
                    }
                });
            }
        },
        dianchi(id) {
            window.open(
                `http://www.baoxingtech.com:2037/escape/siteDetail.html?&panelId=${id}`
            );
        },
        gotharf(item) {
            window.open(
                `http://www.baoxingtech.com:2037/escape/siteDetail.html?panelId=${
                    item.id
                }&projectName=&panelName=${item.panelName}&type=22`
            );
        },
        //图表加载
        drawChart(id,data) {
            let vm = this;
            var labelOption = {
                normal: {
                    rotate: 60,
                    align: 'left',
                    verticalAlign: 'top',
                    position: 'top',
                    distance: 15,
                    show: true,
                    // formatter: '{c}  {name|{a}}',
                    fontSize: 12,
                    yAxisIndex: 1,
                  
                    rich: {
                        name: {
                            textBorderColor: '#fff'
                        }
                    },
                    
                }
            };
            for (let i = 0; i < data.data.length; i++) {
                data.data[i].label = labelOption;
                
            }
            const charts = this.$echarts.init(this.$refs[id]);
            charts.setOption({
                color: ["#003366", "#006699", "#4cabce"],
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "shadow"
                    }
                },
                legend: {
                    data: ["存储能量(KWH)", "释放能量(KWH)", "光伏充电量(KWH)"]
                },
                calculable: true,
                xAxis: [
                    {
                        type: "category",
                        axisTick: { show: false },
                        data: data.name
                    }
                ],
                yAxis: [
                    {
                        type: "value"
                    }
                ],
                series: data.data
                
            });
            window.addEventListener("resize", function() {
                charts.resize();
                
            });
        }
    }
};
</script>

<style scoped lang='scss'>
#three_chart {
    width: 400px;
    height: 388px;
    float: left;
    margin-left: 20px;
}
.tableoen {
    width: calc(100% - 420px) !important;
    float: left;
}
.hend {
    cursor: pointer;
}
.red {
    // background: red;
}
.cdz4 {
    position: absolute;
    top: 300px;
    left: 1010px;
    height: 90px;
    width: 80px;
}
.cdz3 {
    position: absolute;
    top: 300px;
    left: 909px;
    height: 90px;
    width: 80px;
}
.cdz2 {
    position: absolute;
    top: 300px;
    left: 808px;
    height: 90px;
    width: 80px;
}
.cdz1 {
    position: absolute;
    top: 300px;
    left: 707px;
    height: 90px;
    width: 80px;
}
.dc3 {
    position: absolute;
    top: 542px;
    left: 594px;
    height: 93px;
    width: 60px;
    cursor: pointer;
}
.dc2 {
    position: absolute;
    top: 542px;
    left: 508px;
    height: 93px;
    width: 60px;
    cursor: pointer;
}
.dc1 {
    position: absolute;
    top: 542px;
    left: 421px;
    height: 93px;
    width: 60px;
    cursor: pointer;
}
.jz3 {
    position: absolute;
    top: 542px;
    left: 171px;
    height: 93px;
    width: 60px;
}
.jz2 {
    position: absolute;
    top: 542px;
    left: 95px;
    height: 93px;
    width: 60px;
}
.jz1 {
    position: absolute;
    top: 542px;
    left: 8px;
    height: 93px;
    width: 60px;
}
.nygl {
    position: absolute;
    top: 300px;
    left: 492px;
    height: 90px;
    width: 80px;
}
.kgdy {
    position: absolute;
    top: 300px;
    left: 290px;
    height: 90px;
    width: 55px;
}
.zlyg {
    position: absolute;
    top: 300px;
    left: 95px;
    height: 100px;
    width: 50px;
}
.kongtiao {
    position: absolute;
    top: 181px;
    left: 95px;
    height: 70px;
    width: 50px;
}
.dianbiao {
    position: absolute;
    top: 181px;
    left: 297px;
    height: 50px;
    width: 50px;
}
.p_module_table td {
    padding: 10px;
    line-height: 22px;
    text-align: left;
    vertical-align: top;
    border: 1px solid #d4d4d4;
    height: 22px;
}
.p_module_table {
    margin: 0 auto;
    width: 50%;
    border-collapse: collapse;
}

.p_module_content {
    padding: 0 15px;
}
.p_module_title {
    width: 100%;
    line-height: 30px;
    display: block;
    font-size: 16px;
    border-bottom: 1px solid #f1f1f1;
    padding: 20px 0 15px 0;
    text-align: left;
    height: auto;
    overflow: hidden;
    margin-bottom: 10px;
    span {
        width: 50%;
        float: left;
        margin-left: 20px;
        border-left: 5px solid #407ac1;
        line-height: 30px;
        padding-left: 20px;
        display: block;
    }
}
.tablewrap {
    width: 99%;
    height: 100%;
    float: left;
    border: 1px solid #d5dee5;
    -moz-box-shadow: 0 0 10px #d9e3ea;
    -webkit-box-shadow: 0 0 10px #d9e3ea;
    box-shadow: 0 0 10px #d9e3ea;
    background: #fff;
    border-radius: 5px;
}
.wrap {
    padding: 20px 30px;
    overflow-x: scroll;
}

.topology {
    background: url("../../assets/img/tpt.png") no-repeat #fff;
    height: 700px;
    width: 1400px;
    background-size: 100%;
    position: relative;
}
.page-view {
    height: 100%;
    width: 100%;
    background: #e1ebf2;
}
.hand {
    height: 50px;
    background: #16518d;
    padding-top: 4px;
}
.bqimg {
    width: 96px;
    background: url("../../assets/img/zhejiao-left.jpg") no-repeat;
    background-size: 100%;
    height: 50px;
    float: left;
}
.tit-wrap {
    background: #fff;
    height: 50px;
    width: calc(100% - 96px);
    line-height: 50px;
    float: left;
    font-size: 14px;
    font-weight: 400;
}
</style>
<style scoped>
.page-view >>> .el-tabs {
    padding-left: 20px !important;
}

.page-view >>> .el-button {
    background: none;
    border: 0;
    height: 100%;
    width: 100%;
}
</style>
