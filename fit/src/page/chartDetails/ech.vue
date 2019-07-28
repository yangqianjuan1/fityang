<template>
    <div class="wrap_d">
        <slot name="data1"></slot>
        <div :id="id1" class="echar" :ref="id1"></div>
        <slot name="data2"></slot>
        <div :id="id2" class="echar" :ref="id2"></div>
        <!-- <slot name="data3"></slot>
        <div :id="id3" class="echar" :ref="id3"></div>-->
        <!-- <div :id="ids" class="echar" :ref=" ids"></div>
        <div style="margin-left:99px">状态：<span class="pad" v-for="(item,index) in starr" :key="index">{{getst(item) }}</span> 
        </div>
        <div :id="ids+'a1'" class="echar" :ref=" ids+'a1'"></div>-->
    </div>
</template>

<script>
export default {
    data() {
        return {
            id1: "three_chart",
            id2: "three_chart-1",
            id3: "three_chart-2",
            tempInfos: [],
            voltageInfos: [],
            nameArr_tempInfos: [],
            nameArr_voltageInfos: [],
            y1: [],
            y2: []
        };
    },
    props: {
        data: {
            type: Object,
            required: false
        }
    },
    components: {},
    created() {
        // console.log(this.data);
        // this.drawCurrent(this.id2);
    },
    mounted() {
        let vm = this;
        let nameArr_tempInfos = [];
        let nameArr_voltageInfos = [];
        let y1 = [];
        let y2 = [];
        let tempInfos = vm.data.tempInfos;
        let voltageInfos = vm.data.voltageInfos;
        for (let i = 0; i < tempInfos.length; i++) {
            nameArr_tempInfos.push(tempInfos[i].num);
            y1.push(tempInfos[i].temp);
        }
        vm.nameArr_tempInfos = nameArr_tempInfos;
        vm.y1 = y1;
        for (let y = 0; y < voltageInfos.length; y++) {
            nameArr_voltageInfos.push(voltageInfos[y].num);
            y2.push(voltageInfos[y].voltage);
        }
        vm.nameArr_voltageInfos = nameArr_voltageInfos;
        vm.y2 = y2;
        vm.drawVoltaget(vm.id1, vm.y1, vm.nameArr_tempInfos);
        vm.drawCurrent(vm.id2, vm.y2, vm.nameArr_voltageInfos);
    },
    methods: {
        drawVoltaget(id, data, name) {
            console.log(id, data, name);
            let vm = this;
            const charts = this.$echarts.init(this.$refs[id]);
            charts.setOption({
                color: ["#3BA1FF", "red", "red"],
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        // 坐标轴指示器，坐标轴触发有效
                        type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: "1%",
                    right: "1%",
                    bottom: "1%",
                    top: "20%",
                    containLabel: true
                },
                xAxis: [
                    {
                        type: "category",
                        data: name,
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis: [
                    {
                        type: "value",
                        // min: 0,
                        // max: 1600,
                        axisLabel: {
                            formatter: "{value}"
                        },
                        nameLocation: "center",
                        nameGap: 25,
                        nameRotate: 0
                    }
                ],
                series: [
                    {
                        name: "温度",
                        type: "bar",
                        barWidth: "30%",
                        data: data,
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true, //开启显示
                                    position: "top" //在上方显示
                                }
                            }
                        }
                        // markPoint: {
                        //     data: [
                        //         { type: "max", name: "最大值" },
                        //         { type: "min", name: "最小值" }
                        //     ]
                        // }
                    }
                    // {
                    //     name: "电池电压正常范围最小值",
                    //     type: "line",
                    //     data: [30, 30, 30, 30, 30, 30, 30]
                    // },
                    // {
                    //     name: "电池电压正常范围最大值",
                    //     type: "line",
                    //     data: [350, 350, 350, 350, 350, 350, 350]
                    // }
                ]
            });
        },
        drawCurrent(id, data, name) {
            let vm = this;
            const charts = this.$echarts.init(this.$refs[id]);
            charts.setOption({
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        // 坐标轴指示器，坐标轴触发有效
                        type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                color: ["#3BA1FF", "#1989fa"],
                // legend: {
                //     data: ["电压"]
                // },
                grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "3%",
                    top: "20%",
                    containLabel: true
                },
                xAxis: [
                    {
                        type: "category",
                        axisTick: { show: false },
                        data: name
                    }
                ],
                yAxis: [
                    {
                        type: "value"
                    }
                ],
                series: [
                    {
                        name: "电压",
                        type: "bar",
                        stack: "总量",
                        barWidth: "40%",
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true, //开启显示
                                    position: "top" //在上方显示
                                }
                            }
                        },
                        // label: {
                        //     normal: {
                        //         show: true
                        //     }
                        // },
                        data: data
                        // markPoint: {
                        //     data: [{ type: "max", name: "最大值" }]
                        // }
                    }
                    // {
                    //     name: "支出",
                    //     type: "bar",
                    //     stack: "总量",
                    //     barWidth: "30%",
                    //     data: [-120, -150, -101, -134, -110, -10, -110],
                    //     markPoint: {
                    //         data: [{ type: "min", name: "最小值" }],
                    //         symbolOffset: ["0", "0%"],
                    //         itemStyle: {
                    //             normal: {
                    //                 borderColor: "#fff"
                    //                 // label: {
                    //                 //     show: true,
                    //                 //     color: "#fff" //气泡中字体颜色
                    //                 // }
                    //             }
                    //         }
                    //     }
                    // }
                ]
            });
        },
        drawTemperaturet(id, data) {
            let vm = this;
            const charts = this.$echarts.init(this.$refs[id]);
            charts.setOption({
                color: ["#3BA1FF", "red", "red"],
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        // 坐标轴指示器，坐标轴触发有效
                        type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: "1%",
                    right: "1%",
                    bottom: "1%",
                    top: "20%",
                    containLabel: true
                },
                xAxis: [
                    {
                        type: "category",
                        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis: [
                    {
                        type: "value",
                        // min: 0,
                        // max: 1600,
                        axisLabel: {
                            formatter: "{value}"
                        },
                        nameLocation: "center",
                        nameGap: 25,
                        nameRotate: 0
                    }
                ],
                series: [
                    {
                        name: "直接访问",
                        type: "bar",
                        barWidth: "30%",
                        data: [10, 52, 200, 334, 390, 330, 220],
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true, //开启显示
                                    position: "top" //在上方显示
                                }
                            }
                        }
                    }
                ]
            });
        }
        //图表加载
        // drawChart(id, data) {
        //     let vm = this;
        //     const charts = this.$echarts.init(this.$refs[id]);
        //     charts.setOption({
        //         tooltip: {
        //             trigger: "axis",
        //             axisPointer: {
        //                 type: "shadow",
        //                 crossStyle: {
        //                     color: "#999"
        //                 }
        //             }
        //         },

        //         color: ["#3BA1FF", "#7ECEF4"],
        //         legend: {
        //             data: ["电压", "电池温度"]
        //             // bottom: 0
        //         },
        //         calculable: true,
        //         xAxis: [
        //             {
        //                 type: "category",
        //                 data: data.name,
        //                 axisPointer: {
        //                     type: "shadow"
        //                 }
        //             }
        //         ],
        //         yAxis: [
        //             {
        //                 type: "value",
        //                 name: "电压(V)",
        //                 // min: 0,
        //                 // max: 1600,
        //                 interval: 400,
        //                 axisLabel: {
        //                     formatter: "{value}"
        //                 },
        //                 nameLocation: "center",
        //                 nameGap: 25,
        //                 nameRotate: 0
        //             },
        //             {
        //                 type: "value",
        //                 name: "温度(°C)",
        //                 // min: 0,
        //                 // max: 60000,
        //                 // interval: 15000,
        //                 axisLabel: {
        //                     formatter: "{value}"
        //                 },
        //                 nameLocation: "center",
        //                 nameGap: 25,
        //                 nameRotate: 0
        //             }
        //         ],
        //         series: [
        //             {
        //                 name: "电压(V)",
        //                 type: "bar",
        //                 data: data.data1,
        //                 itemStyle: {
        //                     normal: {
        //                         label: {
        //                             show: true, //开启显示
        //                             position: "top", //在上方显示
        //                             textStyle: {
        //                                 //数值样式
        //                                 color: "black",
        //                                 fontSize: 16
        //                             }
        //                         }
        //                     }
        //                 },
        //                 barWidth: "30%"
        //             },
        //             {
        //                 name: "电池温度(°C)",
        //                 type: "bar",
        //                 yAxisIndex: 1,
        //                 data: data.data2,
        //                 itemStyle: {
        //                     normal: {
        //                         label: {
        //                             show: true, //开启显示
        //                             position: "top", //在上方显示
        //                             textStyle: {
        //                                 //数值样式
        //                                 color: "black",
        //                                 fontSize: 16
        //                             }
        //                         }
        //                     }
        //                 },
        //                 barWidth: "30%"
        //             }
        //         ]
        //     });

        //     // var labelOption = {
        //     //     normal: {
        //     //         align: "left",
        //     //         verticalAlign: "top",
        //     //         position: "top",
        //     //         distance: 15,
        //     //         show: true,
        //     //         // formatter: '{c}  {name|{a}}',
        //     //         fontSize: 12,
        //     //         yAxisIndex: 1,

        //     //         rich: {
        //     //             name: {
        //     //                 textBorderColor: "#fff"
        //     //             }
        //     //         }
        //     //     }
        //     // };
        //     // for (let i = 0; i < data.data.length; i++) {
        //     //     data.data[i].label = labelOption;
        //     // }

        //     // charts.setOption({
        //     //     color: ["#003366", "#006699", "#4cabce"],
        //     //     tooltip: {
        //     //         trigger: "axis",
        //     //         axisPointer: {
        //     //             type: "shadow"
        //     //         }
        //     //     },
        //     //     legend: {
        //     //         data: ["电流", "电压"]
        //     //     },
        //     //     calculable: true,
        //     //     xAxis: [
        //     //         {
        //     //             type: "category",
        //     //             axisTick: { show: false },
        //     //             data: data.name
        //     //         }
        //     //     ],
        //     //     yAxis: [
        //     //         {
        //     //             type: "value"
        //     //         }
        //     //     ],
        //     //     series: data.data
        //     // });

        //     // debugger

        //     window.addEventListener("resize", function() {
        //         charts.resize();
        //     });
        // }
    }
};
</script>

<style scoped lang='scss'>
.wrap_d {
    padding: 10px;
}
</style>
<style scoped>
.wrap >>> .el-table__expanded-cell {
    padding: 0 !important;
}
.echar {
    height: 270px;
    width: 100%;
    margin-bottom: 20px;
}
</style>


