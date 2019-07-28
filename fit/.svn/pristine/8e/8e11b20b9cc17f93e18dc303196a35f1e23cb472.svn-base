<template>
    <div class="page">
        <div class="module_top">
            <el-row class="Part1">
                <div class="swiper_wrap flot bor4">
                    <el-carousel height="348px">
                        <div v-if="imgList.length > 0">
                            <el-carousel-item v-for="item in imgList" :key="item">
                                <img
                                    class="lasimg"
                                    @click="tourl(item.skipUrl)"
                                    :src="item.url"
                                    alt
                                />
                            </el-carousel-item>
                        </div>
                        <div v-else>
                            <el-carousel-item v-for="item in 4" :key="item">
                                <img
                                    class="lasimg"
                                    @click="tourl(item)"
                                    src="../../assets/img/carousel-1.png"
                                    alt
                                />
                            </el-carousel-item>
                        </div>
                    </el-carousel>
                </div>
                <div class="new_wrap flot bor4">
                    <el-row>
                        <div class="news-left-block"></div>
                        <div class="news-title">
                            <p>签约快讯</p>
                            <a href="#" @click="toAll">
                                查看全部
                                <i class="el-icon-arrow-right"></i>
                            </a>
                        </div>
                    </el-row>
                    <div>
                        <ul class="news-content">
                            <li
                                v-for="(item,index) in alertsList"
                                :key="index"
                                @click="gotoDetails(item.id)"
                            >
                                <p class="news-info">{{item.title}}</p>
                                <p class="news-date">
                                    {{item.releaseTime}}
                                    <!-- <span
                                    class="placed"
                                    style="display: inline-block;margin-left: 10px;"
                                    >置顶</span>-->
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="login_wrap flot bor4 box_s">
                    <div class="is_logged">
                        <el-row>
                            <div class="news-left-block"></div>
                            <div class="news-title">
                                <p>工作台</p>
                                <!-- <a href="#" @click="logout">
                                    退出登录
                                    <i class="el-icon-arrow-right"></i>
                                </a>-->
                            </div>
                        </el-row>
                        <div class="juz">
                            <el-row style="padding-left:5%;padding-right:5%;">
                                <el-col :span="12">
                                    <div class="module bg_orange">6</div>
                                    <div class="describe">代办事项</div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="module bg_blue">6</div>
                                    <div class="describe">已办事项</div>
                                </el-col>
                            </el-row>
                            <el-row style="padding-left:5%;padding-right:5%;">
                                <el-col :span="12">
                                    <div class="module bg_green">6</div>
                                    <div class="describe">需求申请</div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="module bg_red">6</div>
                                    <div class="describe">更新中</div>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </div>
            </el-row>
        </div>
        <six />
        <titslot :title="'能源经营业务数据展示'" />
        <div class="module_buss">
            <div class="electricity_wrap box_s flot bor4">
                <div class="mg20">
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="备电点" name="bd"></el-tab-pane>
                        <el-tab-pane label="发电点" name="fd"></el-tab-pane>
                        <el-tab-pane label="换电点" name="hd"></el-tab-pane>
                        <el-tab-pane label="售电点" name="sd"></el-tab-pane>
                    </el-tabs>
                </div>
                <div class="energy-content">
                    <el-row>
                        <el-col :span="8">
                            <p class="energy-content-title">数量</p>
                            <p class="energy-content-number">
                                <span class="big-info" id="number">{{typeData.total||0}}</span>
                                <span>个</span>
                            </p>
                        </el-col>
                        <el-col :span="8">
                            <p class="energy-content-title">收入</p>
                            <p class="energy-content-number">
                                <span class="big-info" id="number">{{typeData.income||0}}</span>
                                <span>万</span>
                            </p>
                        </el-col>
                        <el-col :span="8">
                            <p class="energy-content-title">容量</p>
                            <p class="energy-content-number">
                                <span class="big-info" id="number">{{typeData.capacity||0}}</span>
                                <span>MWH</span>
                            </p>
                        </el-col>
                    </el-row>
                </div>
                <div class="mar-lef">
                    <div class="progress_wrap flot">
                        <div class="mg35">
                            <p class="progress-money">合同金额</p>
                            <div class="pro_wid">
                                <el-progress
                                    :percentage="percentage(typeData.contractAmount||0,typeData.refundAmount||0,typeData.accountAmount||0)"
                                    :format="format"
                                ></el-progress>
                            </div>
                        </div>
                        <div class="mg24">
                            <p class="progress-money">回款金额</p>
                            <div class="pro_wid">
                                <el-progress
                                    :percentage="percentage(typeData.refundAmount||0,typeData.contractAmount||0,typeData.accountAmount||0)"
                                    :format="format"
                                ></el-progress>
                            </div>
                        </div>
                        <div class="mg24">
                            <p class="progress-money">出账金额</p>
                            <div class="pro_wid">
                                <el-progress
                                    :percentage="percentage(typeData.accountAmount||0,typeData.refundAmount||0,typeData.contractAmount||0)"
                                    :format="format"
                                ></el-progress>
                            </div>
                        </div>
                    </div>
                    <div class="chart_wrap flot">
                        <div class="tubiao" :id="ids" :ref="ids"></div>
                    </div>
                </div>
            </div>
            <div class="energy_wrap box_s flot bor4">
                <div class="title">
                    <div class="energy-site"></div>
                    <div class="energy-site-title">
                        <p>储能站</p>
                        <div class="clearfix"></div>
                    </div>
                </div>
                <div class="energy-content">
                    <div class="energy-center">
                        <el-row>
                            <el-col :span="12">
                                <p class="energy-content-title">数量</p>
                                <p class="energy-content-number">
                                    {{energyStorage.total}}
                                    <span>个</span>
                                </p>
                            </el-col>
                            <el-col :span="12">
                                <p class="energy-content-title">容量</p>
                                <p class="energy-content-number">
                                    {{energyStorage.capacity}}
                                    <span>MWH</span>
                                </p>
                            </el-col>
                        </el-row>
                        <el-row class="top2rem">
                            <el-col :span="12">
                                <p class="energy-content-title">峰值放电时长</p>
                                <p class="energy-content-number">
                                    {{energyStorage.peakDischargeDuration}}
                                    <span>H</span>
                                </p>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="progress_wrap flot">
                        <div class="mg35">
                            <p class="progress-money">充电量</p>
                            <p class="progress-num" id="energyCDL">
                                {{energyStorage.cdl}}
                                <span>MWH</span>
                            </p>
                            <div class="pro_wid">
                                <el-progress
                                    :percentage="percentage(energyStorage.cdl,energyStorage.fdl)"
                                    :format="format2"
                                ></el-progress>
                            </div>
                        </div>
                        <div class="mg24">
                            <p class="progress-money">放电量</p>
                            <p class="progress-num" id="energyCDL">
                                {{energyStorage.fdl}}
                                <span>MWH</span>
                            </p>
                            <div class="pro_wid">
                                <el-progress
                                    :percentage="percentage(energyStorage.fdl,energyStorage.cdl)"
                                    :format="format2"
                                ></el-progress>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="energy_wrap box_s flot bor4">
                <div class="title">
                    <div class="energy-site"></div>
                    <div class="energy-site-title">
                        <p>延寿站</p>
                        <div class="clearfix"></div>
                    </div>
                </div>
                <div class="energy-content">
                    <div class="energy-center">
                        <el-row>
                            <el-col :span="12">
                                <p class="energy-content-title">数量</p>
                                <p class="energy-content-number">
                                    {{prolongStation.total}}
                                    <span>个</span>
                                </p>
                            </el-col>
                            <el-col :span="12">
                                <p class="energy-content-title">容量</p>
                                <p class="energy-content-number">
                                    {{prolongStation.capacity}}
                                    <span>MWH</span>
                                </p>
                            </el-col>
                        </el-row>
                        <el-row class="top2rem">
                            <el-col :span="12">
                                <p class="energy-content-title">续航时长</p>
                                <p class="energy-content-number">
                                    {{prolongStation.xhsc}}
                                    <span>H</span>
                                </p>
                            </el-col>
                            <el-col :span="12">
                                <p class="energy-content-title">应急时长</p>
                                <p class="energy-content-number">
                                    {{prolongStation.pjxhnl}}
                                    <span>H</span>
                                </p>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="progress_wrap flot">
                        <div class="mg35">
                            <p class="progress-money">续航能力提升</p>
                            <div class="pro_wid2">
                                <p class="progress_top" id="energyCDL">
                                    {{prolongStation.xhnltsnl}}
                                    <span>%</span>
                                </p>
                                <el-progress
                                    :percentage="dealWith(prolongStation.xhnltsnl)"
                                    :format="format2"
                                ></el-progress>
                            </div>
                        </div>
                        <div class="mg24">
                            <p class="progress-money">放电量</p>

                            <div class="pro_wid2">
                                <el-progress
                                    :percentage="percentage(prolongStation.fdl,energyStorage.fdl,energyStorage.cdl)"
                                    :format="format2"
                                ></el-progress>
                                <p class="progress-bottom" id="energyCDL">
                                    {{prolongStation.fdl}}
                                    <span>MWH</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <info />
        <titslot :title="'签约客户'" />
        <signing />
    </div>
</template>

<script>
import six from "@/components/index_mk/six_mg";
import titslot from "@/components/index_mk/tit_slot";
import info from "../../components/index_mk/information";
import signing from "../../components/index_mk/signing";

import * as types from "@/store/types";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
    data() {
        return {
            checked: false,
            isLogin: true,
            checked: false,
            isLogin: false,
            alertsList: [],
            activeName: "bd",
            energyStorage: {
                capacity: 0,
                cdl: 0,
                fdl: 0,
                peakDischargeDuration: 0,
                total: 0
            },
            prolongStation: {
                capacity: 0,
                fdl: 0,
                pjxhnl: 0,
                total: 0,
                xhnltsnl: 0,
                xhsc: 0
            },
            typeData: {},
            chartData: {
                name: [
                    "金融机构",
                    "医疗卫生",
                    "公安交警",
                    "学校教育",
                    "单位机房",
                    "数据中心",
                    "物业管理"
                ],
                data: [
                    { value: 0, name: "金融机构" },
                    { value: 0, name: "医疗卫生" },
                    { value: 0, name: "公安交警" },
                    { value: 0, name: "学校教育" },
                    { value: 0, name: "单位机房" },
                    { value: 0, name: "数据中心" },
                    { value: 0, name: "物业管理" }
                ]
            },
            ids: "chart",
            imgList:[]
        };
    },
    components: {
        six,
        titslot,
        info,
        signing
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    created() {
        let vm = this;
        vm.getnews();
        vm.getall();
        vm.getSwiter();
    },
    mounted() {
        let vm = this;
        vm.drawChart(vm.ids, vm.chartData);
    },
    methods: {
        ...mapMutations({
            setUserInfo: types.global.mutations.SET_USER_INFO
        }),
        tourl(str) {
            window.open(str)
        },
        getSwiter() {
            let vm = this;
            vm.Api.allPicl({ id: 1 }).then(res => {
                console.log(res, 111111111111111);
                vm.imgList = res.result.scrollChildDdetails;
            });
        },
        getall() {
            let vm = this;
            vm.getEnergy_station();
            vm.prolong_station();
            vm.big_type_data(vm.activeName);
        },
        //储能
        getEnergy_station() {
            let vm = this;
            let info = {
                provinceId: vm.userInfo.provinceId,
                cityId: vm.userInfo.cityId,
                prefectureId: vm.userInfo.prefectureId
            };
            vm.Api.energy_station(info).then(res => {
                vm.energyStorage = res.result;
            });
        },
        //延寿
        prolong_station() {
            let vm = this;
            let info = {
                provinceId: vm.userInfo.provinceId,
                cityId: vm.userInfo.cityId,
                prefectureId: vm.userInfo.prefectureId
            };
            vm.Api.prolong_station(info).then(res => {
                vm.prolongStation = res.result;
            });
        },
        //备换发换
        big_type_data(mode) {
            let vm = this;
            let info = {
                provinceId: vm.userInfo.provinceId,
                cityId: vm.userInfo.cityId,
                prefectureId: vm.userInfo.prefectureId,
                mode: mode
            };
            vm.Api.big_type_data(info).then(res => {
                vm.typeData = res.result;
                vm.chartData.data = [
                    { value: vm.typeData.financeCount, name: "金融机构" },
                    { value: vm.typeData.medicalCount, name: "医疗卫生" },
                    { value: vm.typeData.policeCount, name: "公安交警" },
                    { value: vm.typeData.educationCount, name: "学校教育" },
                    { value: vm.typeData.unitComputerCount, name: "单位机房" },
                    { value: vm.typeData.dataCenterCount, name: "数据中心" },
                    { value: vm.typeData.estateManageCount, name: "物业管理" }
                ];
                vm.drawChart(vm.ids, vm.chartData);
            });
        },
        //图表
        drawChart(id, data) {
            let vm = this;
            const charts = this.$echarts.init(this.$refs[id]);
            charts.setOption({
                title: {
                    text: "业务占比"
                },
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    type: "scroll",
                    orient: "vertical",
                    x: "right",
                    data: data.name
                },
                series: [
                    {
                        name: "占比",
                        type: "pie",
                        radius: ["50%", "70%"],
                        center: ["40%", "50%"],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: "rgba(0, 0, 0, 0.5)"
                            }
                        },
                        label: {
                            normal: {
                                show: false,
                                position: "center"
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: "20",
                                    fontWeight: "bold"
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: data.data
                    }
                ]
            });
        },
        percentage(a, b, c) {
            if (c) {
                return a == 0 ? 0 : (a / (b - 0 + c)) * 100;
            } else {
                if (a == 0) {
                    return 0;
                } else if (b == 0) {
                    return 0;
                } else {
                    return (a / (a - 0 + b)) * 100;
                }
            }
        },
        dealWith(num) {
            if (num >= 100) {
                return 100;
            } else {
                return num;
            }
        },
        getnews() {
            let vm = this;
            let info = {
                pageNum: 1,
                pageSize: 7,
                type: 0
            };
            vm.Api.newshomeListl(info).then(res => {
                vm.alertsList = res.result.records;
            });
        },
        gotoDetails(id) {
            let vm = this;
            vm.$router.push({
                path: "details",
                query: {
                    id: id
                }
            });
        },
        toAll() {
            let vm = this;
            vm.$router.push({
                path: "all_details"
            });
        },
        format(percentage) {
            return percentage + "万";
        },
        format2(percentage) {
            return "";
        },
        handleClick() {
            let vm = this;
            vm.big_type_data(vm.activeName);
        }
    }
};
</script>

<style scoped lang='scss'>
.tubiao {
    height: 100%;
    width: 100%;
}
.lasimg {
    width: 286px;
    min-height: 348px;
    cursor: pointer;
}
.page {
    padding-top: 0.7%;
    width: 1280px;
    min-height: 700px;
    margin: 0 auto;
}

//top
.juz {
    overflow: hidden;
    padding: 0 10%;
    position: absolute;
    width: 100%;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    box-sizing: border-box;
}
.bg_orange {
    background: #ff9c00;
}
.bg_blue {
    background: #008eff;
}
.bg_green {
    background: #02c160;
}
.bg_red {
    background: #ff5722;
}
.is_logged {
    width: 100%;
    height: 100%;
    text-align: center;
    position: relative;
    .module {
        height: 50px;
        width: 50px;
        padding: 0 6px;
        margin: 0 auto;
        line-height: 50px;
        font-size: 20px;
        display: block;
        margin-top: 25px;
        color: #fff;
    }
    .describe {
        font-size: 14px;
        margin-top: 5px;
        display: block;
    }
}
.no_logged {
    width: 100%;
    height: 100%;
    padding-left: 5%;
    padding-right: 5%;
    padding-top: 1.7rem;
    .automatic_wrap {
        margin: 20px 0;
        span {
            float: right;
            font-size: 14px;
        }
    }
    .btn_wrap {
        width: 100%;
    }
    .el-input {
        width: auto;
        margin: 0;
    }
    .el-button--primary {
        width: 100%;
    }
}
.news-content {
    padding-top: 10px;
    padding-bottom: 10px;
    li {
        height: 40px;
        cursor: pointer;
        .news-info {
            float: left;
            width: 50%;
            margin-left: 1.8%;
            font-size: 0.9rem;
            color: #283945;
            line-height: 40px;
        }
        .news-date {
            float: right;
            cursor: pointer;
            margin-right: 1.5%;
            font-size: 14px;
            color: #acb7bf;
            line-height: 40px;
        }
        .placed {
            background: #008eff;
            height: 18px;
            line-height: 18px;
            position: relative;
            padding: 0 6px;
            font-size: 12px;
            text-align: center;
            color: #fff;
            border-radius: 2px;
        }
    }
}
.news-content li > .news-info:hover {
    color: #0070c9;
}
.news-title > a {
    display: block;
    float: right;
    font-size: 14px;
    color: #0070c9;
    margin-top: 12px;
}
.news-title > p {
    cursor: default;
    float: left;
    font-size: 16px;
    color: #222637;
    margin-top: 10px;
    margin-left: 5px;
    margin-bottom: 10px;
}
.news-title {
    float: left;
    width: calc(100% - 0.7% - 2% - 0.7% - 0.4rem);
    margin-left: 0.7%;
    margin-right: 0.7%;
    border-bottom: 1px solid #e4ebf0;
}
.news-left-block {
    float: left;
    width: 0.4rem;
    height: 1.1rem;
    background: #0070c9;
    margin-left: 0.7%;
    margin-right: 0.7%;
    margin-top: 12px;
}
.swiper_wrap {
    width: 21%;
    height: 100%;
    overflow: hidden;
    margin-right: 13px;
}
.new_wrap {
    width: 50%;
    background: #fff;
    height: 100%;
}
.login_wrap {
    width: 21%;
    height: 100%;
    margin-left: 13px;
    height: 100%;
    background: #fff;
}
.Part1 {
    height: 348px;
}
.flot {
    float: left;
}
</style>
<style scoped>
.el-carousel__item h3 {
    color: #000;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}

.module_top >>> .el-carousel__indicators--horizontal {
    transform: none;
    left: 20%;
}
</style>

<style scoped lang='scss'>
.energy_wrap {
    width: 22%;
    margin-right: 1%;
    .title {
    }
    .energy-content {
        margin-top: 73px;
        padding-left: 10%;
    }
    .energy-content-title {
        font-size: 14px;
        color: #657580;
    }
    span {
        display: inline-block;
        font-size: 14px;
        color: #acb7bf;
        margin-left: 5px;
    }
    .progress_wrap {
        width: 100%;
        position: relative;
        .progress-money {
            font-size: 16px;
            color: #657580;
            margin-bottom: 0.2%;
        }
        .pro_wid {
            width: 70%;
        }
        .pro_wid2 {
            width: 110%;
            position: relative;
        }
        .progress-num {
            position: absolute;
            right: 15px;
        }
        .progress_top {
            position: absolute;
            top: -15px;
            right: 48px;
        }
        .progress-bottom {
            position: absolute;
            bottom: -15px;
            right: 48px;
        }
    }
}
.top2rem {
    margin-top: 2rem;
}
.energy-site {
    float: left;
    width: 0.4rem;
    height: 1.1rem;
    background: #0070c9;
    margin-left: 0.7%;
    margin-right: 0.7%;
    margin-top: 1.2rem;
}
.energy-site-title {
    float: left;
    width: calc(100% - 0.7% - 2% - 0.7% - 0.4rem);
    margin-left: 0.7%;
    margin-right: 0.7%;
    p {
        cursor: default;
        float: left;
        font-size: 16px;
        color: #222637;
        margin-left: 1rem;
        margin-top: 1rem;
        font-weight: 600;
    }
}
.chart_wrap {
    width: 58.33333333%;
    height: 100%;
    padding-top: 3.5rem;
    box-sizing: border-box;
}
.progress_wrap {
    width: 41.66666667%;
    .progress-money {
        font-size: 16px;
        color: #657580;
        margin-bottom: 0.2%;
    }
    .pro_wid {
        width: 80%;
    }
}
.mar-lef {
    margin-left: 10%;
    height: 250px;
}
.energy-content {
    margin-top: 2.2rem;
    padding-left: 10%;
    .energy-content-title {
        font-size: 14px;
        color: #657580;
    }
    .big-info {
        font-size: 20px;
        color: #222637;
        margin-left: 15%;
        margin-top: 1rem;
    }
    span {
        display: inline-block;
        font-size: 14px;
        color: #acb7bf;
        margin-left: 5px;
    }
}
.mg35 {
    margin-top: 3.5rem;
}
.mg24 {
    margin-top: 1.7rem;
}
.prolong_wrap {
    width: 22%;
}

.electricity_wrap {
    width: 48%;
    margin-right: 1%;
}
.module_buss {
    height: 405px;
}
.module_buss > div {
    height: 100%;
    background: #fff;
}
.flot {
    float: left;
}
.mg20 {
    margin-top: 10px;
    padding: 0 20px;
}
</style>

<style scoped>
.module_buss >>> .el-tabs__header {
    margin-bottom: 0px;
}
.module_buss >>> .el-progress__text {
    margin-left: 20px;
}
</style>