<template>
    <div class="page">
        <div class="wrap">
            <div class="hand">
                <div class="bqimg"></div>
                <div class="tit-wrap">
                    <h3 v-if="name !=''">
                        备电名称：{{name}}
                        &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        {{times}}
                    </h3>
                    <h3 v-else>暂无数据</h3>
                </div>
            </div>

            <div class="area">
                <div class="table_wrap">
                    <el-table :data="tableData_d" style="width: 100%" border>
                        <el-table-column prop="upsAddress" label="USP/逆变器位置"></el-table-column>
                        <el-table-column prop="brand" label="品牌"></el-table-column>
                        <el-table-column prop="standard" label="规格(（输入电压V/输出电压V）)"></el-table-column>
                        <el-table-column prop="modelsBattery" label="型号"></el-table-column>
                        <el-table-column prop="power" label="功率(W/KW)"></el-table-column>
                        <el-table-column prop="time" label="安装时间"></el-table-column>
                        <el-table-column prop="longitude" label="经度"></el-table-column>
                        <el-table-column prop="latitude" label="纬度"></el-table-column>
                        <el-table-column prop="upsStatus" label="状态">
                        </el-table-column>
                    </el-table>
                    <el-table
                        v-if="tableData.length"
                        :data="tableData"
                        style="width: 100%"
                        :row-key="row_key"
                        :expand-row-keys="expand"
                        @expand-change="expandSelect"
                        border
                    >
                        <el-table-column type="expand">
                            <template slot-scope="props">
                                <el-col :span="19">
                                    <echartsZ :data="props.row">
                                        <template #data1>
                                            <titles
                                                :name="titleName[0]"
                                                :times="props.row.updateTime"
                                            />
                                        </template>
                                        <template #data2>
                                            <titles
                                                :name="titleName[1]"
                                                :times="props.row.updateTime"
                                            />
                                        </template>
                                        <!-- <template #data3>
                                            <titles :name="titleName[2]" :times="props.row.updateTime"/>
                                        </template>-->
                                    </echartsZ>
                                </el-col>
                                <el-col :span="4" style="margin-left:10px;">
                                    <div class="btnwrap">
                                        <div class="title">
                                            <i class="el-icon-s-order"></i>
                                            <span>操作</span>
                                        </div>
                                        <el-button
                                            class="btnmar"
                                            @click="open('0')"
                                            type="primary"
                                        >电池详情</el-button>
                                        <el-button
                                            class="btnmar"
                                            type="primary"
                                            @click="open('1')"
                                        >图片详情</el-button>
                                        <el-button
                                            class="btnmar"
                                            type="primary"
                                            @click="open('2')"
                                        >负责人</el-button>
                                    </div>
                                </el-col>
                            </template>
                        </el-table-column>
                        <el-table-column prop="getPosition" label="电池包位置"></el-table-column>
                        <el-table-column prop="environmentalTemp" label="环境温度"></el-table-column>
                        <el-table-column prop="powerTemp" label="功率温度"></el-table-column>
                        <el-table-column prop="batteryElectric" label="电池电流"></el-table-column>
                        <el-table-column prop="batteryVoltageTotal" label="电池总压数据"></el-table-column>
                        <el-table-column prop="bdsc" label="备电时长（H）"></el-table-column>
                        <el-table-column prop="alerm" label="状态">
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
        <el-dialog title :visible.sync="dialogVisible" width="70%" :before-close="handleClose">
            <div class="ove">
                <el-table
                    v-loading="loading"
                    :data="tableData1"
                    style="width: 100%"
                    v-if="showTable == 0"
                >
                    <el-table-column prop="batNum" label="电池号"></el-table-column>
                    <el-table-column prop="factoryValue" label="容量"></el-table-column>
                    <el-table-column prop="factoryTime" label="生产日期"></el-table-column>
                    <el-table-column prop="factoryName" label="厂商"></el-table-column>
                    <el-table-column prop="batType" label="型号"></el-table-column>
                    <el-table-column prop="setupTime" label="安装日期"></el-table-column>
                    <el-table-column prop="checkRl" label="核容容量"></el-table-column>
                    <el-table-column prop="realTime" label="核容日期"></el-table-column>
                    <el-table-column prop="groupLife" label="预计电池组剩余寿命"></el-table-column>
                </el-table>
                <el-table
                    v-loading="loading"
                    :data="tableData2"
                    style="width: 100%"
                    v-if="showTable == 1"
                >
                    <el-table-column label="图片" align="center">
                        <template slot-scope="scope">
                            <img :src="scope.row.fileName" alt />
                        </template>
                    </el-table-column>
                </el-table>
                <el-table
                    v-loading="loading"
                    :data="tableData3"
                    style="width: 100%"
                    v-if="showTable == 2"
                >
                    <el-table-column prop="cworkerName" label="安装负责人名字"></el-table-column>
                    <el-table-column prop="cworkerPhone" label="安装负责人电话"></el-table-column>
                    <el-table-column prop="cworkerEmail" label="安装负责人邮箱"></el-table-column>
                    <el-table-column prop="cworkerWx" label="安装负责人微信"></el-table-column>
                    <el-table-column prop="cmanageName" label="站点负责人名字"></el-table-column>
                    <el-table-column prop="cmanagePhone" label="站点负责人电话"></el-table-column>
                    <el-table-column prop="cmanageEmail" label="站点负责人邮箱"></el-table-column>
                    <el-table-column prop="cmanageWx" label="站点负责人微信"></el-table-column>
                    <el-table-column prop="cmaintainName" label="维护负责人名字"></el-table-column>
                    <el-table-column prop="cmaintainPhone" label="维护负责人电话"></el-table-column>
                    <el-table-column prop="cmaintainEmail" label="维护负责人邮箱"></el-table-column>
                    <el-table-column prop="cmaintainWx" label="维护负责人微信"></el-table-column>
                </el-table>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import echartsZ from "./ech";
import { setInterval } from "timers";
import titles from "./title";

import * as types from "@/store/types";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
    data() {
        return {
            tableData: [],
            name: "",
            times: "",
            tableData1: [],
            tableData2: [],
            tableData3: [],
            tableData_d: [],
            expand: [0],
            titleName: ["实时-温度", "实时-电压"],
            dialogVisible: false,
            showTable: 0,
            panelId: "",
            loading: false,
            ztai:{
                '1':'正常',
                '2':'预警'
            }
        };
    },
    components: {
        echartsZ,
        titles
    },
    created() {
        this.panelId = this.$route.query.panelId;
        this.getTable();
    },
    mounted() {
        let vm = this;
        setInterval(function() {
            vm.getTable();
        }, 5000);
    },
    methods: {
        getTable() {
            let vm = this;
            let info = {
                panelId: vm.panelId
            };
            vm.Api.panel_detail_bd(info).then(res => {
                let data = res.result.bdDetailVoList;
                vm.tableData_d = [res.result];
                for (let i = 0; i < data.length; i++) {
                    data[i].ids = i;
                }

                vm.tableData = data;
                vm.name = data[0].panelName;
                vm.times = data[0].updateTime;
            });
        },
        row_key(row) {
            return row.ids;
        },
        expandSelect(row, expandedRows) {
            // console.log(row, expandedRows)
            let vm = this;
            let arr = [];
            // console.log(row,expandedRows)
            for (let i = 0; i < expandedRows.length; i++) {
                arr.push(expandedRows[i].ids);
            }
            vm.expand = arr;
            console.log(vm.expand);
        },
        open(str) {
            let vm = this;
            vm.loading = true;
            let info = { panelId: vm.panelId };
            if (str == "0") {
                vm.Api.queryBattery(info).then(res => {
                    vm.loading = false;
                    vm.tableData1 = res.result;
                });
            }
            if (str == "1") {
                vm.Api.queryAppFile(info).then(res => {
                    vm.loading = false;
                    vm.tableData2 = res.result;
                });
            }
            if (str == "2") {
                vm.Api.queryContacts(info).then(res => {
                    vm.loading = false;
                    vm.tableData3 = res.result;
                });
            }
            vm.showTable = str;
            vm.dialogVisible = true;
        },
        handleClose(done) {
            done();
        }
    }
};
</script>

<style scoped lang='scss'>
.ove {
    max-height: 500px;
    overflow-y: scroll;
}
.btnmar {
    margin-top: 10px;
    margin-left: 0;
}
.btnwrap {
    padding-top: 10px;
}
.title {
    position: relative;
    padding: 0 20px;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    font-weight: bolder;
    background: #dedede;
    .time {
        font-size: 14px;
    }
}
.page {
    height: 100%;
    width: 100%;
    background: #fff;
}
.area {
    background: #e1ebf2;
    padding: 10px;
}
.table_wrap {
}
.wrap {
    width: 95%;
    margin: 5px auto 0 auto;
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

