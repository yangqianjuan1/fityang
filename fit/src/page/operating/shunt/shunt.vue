<template>
    <div class="page">
        <times :show="false" />
        <div class="wrap_form">
            <el-form
                :inline="true"
                :model="form"
                class="demo-form-inline"
                size="small"
                label-width="80px"
                label-position="right"
            >
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="省：">
                            <el-select v-model="form.provinceId" placeholder>
                                <el-option
                                    v-for="(item,index) in shenlist"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="市：">
                            <el-select v-model="form.cityId" placeholder @change="qu">
                                <el-option
                                    v-for="(item,index) in cityList"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="区：">
                            <el-select v-model="form.prefectureId" placeholder>
                                <el-option
                                    v-for="(item,index) in prefectureIdList"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="查询类型:">
                            <el-radio-group v-model="form.radio">
                                <el-radio-button label="date">日</el-radio-button>
                                <el-radio-button label="month">月</el-radio-button>
                                <el-radio-button label="year">年</el-radio-button>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="时间：">
                            <el-col :span="11">
                                <el-date-picker
                                    :type="form.radio"
                                    placeholder="选择日期"
                                    v-model="form.date1"
                                    style="width: 100%;"
                                ></el-date-picker>
                            </el-col>
                            <el-col class="line" :span="2">至</el-col>
                            <el-col :span="11">
                               <el-date-picker
                                    :type="form.radio"
                                    placeholder="选择日期"
                                    v-model="form.date1"
                                    style="width: 100%;"
                                ></el-date-picker>
                            </el-col>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">确定</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>

        <div v-loading="loading">
            <shuntWrap v-if="chartlist" :datas="chartlist" @changedata="getChartInfo" />
        </div>
    </div>
</template>

<script>
import times from "../../../components/tableTime";
import table from "../../../mixins/table";
import shuntWrap from "../../../components/shuntWrap";
export default {
    data() {
        return {
            time: "",
            loading: false,
            form: {
                provinceId: 17,
                cityId: "",
                prefectureId: "",
                radio:'date'
            },
            chartlist: null,
            shenlist: [
                {
                    name: "河南",
                    id: 17
                }
            ],
            cityList: [],
            prefectureIdList: []
        };
    },
    mixins: [table],
    components: {
        times,
        shuntWrap
    },
    created() {
        this.getChartInfo();
        let vm = this;
        vm.shi(17);
    },
    mounted() {},
    methods: {
        onSubmit() {
            this.getChartInfo();
        },

        fix3(arr) {
            let a = [];
            for (let i = 0; i < arr.length; i++) {
                a.push((arr[i] - 0).toFixed(2));
            }
            return a;
        },
        getChartInfo(str) {
            let vm = this;
            let info = {
                provinceId: vm.form.provinceId || vm.userInfo.provinceId,
                cityId: vm.form.cityId || vm.userInfo.cityId,
                prefectureId: vm.form.prefectureId || vm.userInfo.prefectureId,
                mode: str || "day"
            };
            vm.loading = true;
            vm.Api.index_qx(info).then(res => {
                vm.loading = false;
                let dataArr = {
                    btdl: {
                        name: "饼图总量",
                        // xname: res.result.xsjs,
                        data: [
                            res.result.dliangTotal.toFixed(2),
                            res.result.ltdliangsTotal.toFixed(2),
                            res.result.dxdliangsTotal.toFixed(2)
                        ]
                        // unit: "kw-h"
                    },
                    zdl: {
                        name: "移动电量",
                        xname: res.result.xsjs,
                        data: vm.fix3(res.result.zpjdliang),
                        unit: "kw-h",
                        color: "#3BA1FF"
                    },
                    yd: {
                        name: "移动电量",
                        xname: res.result.xsjs,
                        data: vm.fix3(res.result.yddliangs),
                        unit: "kw-h",
                        color: "#8FC320"
                    },
                    lt: {
                        name: "联通电量",
                        xname: res.result.xsjs,
                        data: vm.fix3(res.result.ltdliangs),
                        unit: "kw-h",
                        color: "#E67817"
                    },
                    dx: {
                        name: "电信电量",
                        xname: res.result.xsjs,
                        data: vm.fix3(res.result.dxdliangs),
                        unit: "kw-h",
                        color: "#0084CF"
                    }
                };
                vm.chartlist = dataArr;
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
            });
        },
        shi(id) {
            let vm = this;
            vm.tableApi.shi(id || vm.userInfo.provinceId).then(res => {
                let data = res.result;
                if (vm.userInfo.mapRange == 1) {
                    vm.cityList = data;
                } else if (vm.userInfo.mapRange == 2) {
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].id == vm.userInfo.cityId) {
                            vm.cityList.push(data[i]);
                            vm.form.cityId = data[i].id;
                        }
                    }
                } else if (vm.userInfo.mapRange == 3) {
                }
            });
        },
        qu(id) {
            let vm = this;
            vm.form.prefectureId = "";
            vm.tableApi.qx(id).then(res => {
                vm.prefectureIdList = res.result;
            });
        }
    }
};
</script>

<style scoped lang='scss'>
.line{
    padding: 0 5px;
    text-align: center;
}
.wrap_form {
    background: #fff;
    margin-bottom: 20px;
    border-radius: 5px;
    padding: 10px 9px;
    box-sizing: border-box;
}
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
    min-height: 700px;
    width: 1280px;
    margin: 0 auto;
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
