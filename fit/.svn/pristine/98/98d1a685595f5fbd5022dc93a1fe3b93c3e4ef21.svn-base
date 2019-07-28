<template>
    <div class="module">
        <div class="electricity_wrap box_s flot bor4">
            <div class="mg20">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="备电点" name="first"></el-tab-pane>
                    <el-tab-pane label="发电点" name="second"></el-tab-pane>
                    <el-tab-pane label="换电点" name="third"></el-tab-pane>
                    <el-tab-pane label="售电点" name="fourth"></el-tab-pane>
                </el-tabs>
            </div>
            <div class="energy-content">
                <el-row>
                    <el-col :span="8">
                        <p class="energy-content-title">数量</p>
                        <p class="energy-content-number">
                            <span class="big-info" id="number">0</span>
                            <span>个</span>
                        </p>
                    </el-col>
                    <el-col :span="8">
                        <p class="energy-content-title">收入</p>
                        <p class="energy-content-number">
                            <span class="big-info" id="number">0</span>
                            <span>万</span>
                        </p>
                    </el-col>
                    <el-col :span="8">
                        <p class="energy-content-title">容量</p>
                        <p class="energy-content-number">
                            <span class="big-info" id="number">0</span>
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
                            <el-progress :percentage="0" :format="format"></el-progress>
                        </div>
                    </div>
                    <div class="mg24">
                        <p class="progress-money">回款金额</p>
                        <div class="pro_wid">
                            <el-progress :percentage="0" :format="format"></el-progress>
                        </div>
                    </div>
                    <div class="mg24">
                        <p class="progress-money">出账金额</p>
                        <div class="pro_wid">
                            <el-progress :percentage="0" :format="format"></el-progress>
                        </div>
                    </div>
                </div>
                <div class="chart_wrap flot">1</div>
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
                                4
                                <span>个</span>
                            </p>
                        </el-col>
                        <el-col :span="12">
                            <p class="energy-content-title">容量</p>
                            <p class="energy-content-number">
                                3565.7
                                <span>MWH</span>
                            </p>
                        </el-col>
                    </el-row>
                    <el-row class="top2rem">
                        <el-col :span="12">
                            <p class="energy-content-title">峰值放电时长</p>
                            <p class="energy-content-number">
                                3.9
                                <span>H</span>
                            </p>
                        </el-col>
                    </el-row>
                </div>
                <div class="progress_wrap flot">
                    <div class="mg35">
                        <p class="progress-money">充电量</p>
                        <p class="progress-num" id="energyCDL">
                            64.2
                            <span>MWH</span>
                        </p>
                        <div class="pro_wid">
                            <el-progress :percentage="0" :format="format2"></el-progress>
                        </div>
                    </div>
                    <div class="mg24">
                        <p class="progress-money">放电量</p>
                        <p class="progress-num" id="energyCDL">
                            64.2
                            <span>MWH</span>
                        </p>
                        <div class="pro_wid">
                            <el-progress :percentage="0" :format="format2"></el-progress>
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
                                4
                                <span>个</span>
                            </p>
                        </el-col>
                        <el-col :span="12">
                            <p class="energy-content-title">容量</p>
                            <p class="energy-content-number">
                                3565.7
                                <span>MWH</span>
                            </p>
                        </el-col>
                    </el-row>
                    <el-row class="top2rem">
                        <el-col :span="12">
                            <p class="energy-content-title">平均续航时长</p>
                            <p class="energy-content-number">
                                3.9
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
                                504.3
                                <span>%</span>
                            </p>
                            <el-progress :percentage="0" :format="format2"></el-progress>
                        </div>
                    </div>
                    <div class="mg24">
                        <p class="progress-money">放电量</p>

                        <div class="pro_wid2">
                            <el-progress :percentage="0" :format="format2"></el-progress>
                            <p class="progress-bottom" id="energyCDL">
                                0<span>MWH</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeName: "first"
        };
    },
    components: {},
    created() {},
    mounted() {},
    methods: {
        format(percentage) {
            return percentage + "万";
        },
        format2(percentage) {
            return "";
        },
        handleClick(tab, event) {
            console.log(tab, event);
        }
    }
};
</script>

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
        .progress-bottom{
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
.module {
    height: 405px;
}
.module > div {
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
.module >>> .el-tabs__header {
    margin-bottom: 0px;
}
.module >>> .el-progress__text {
    margin-left: 20px;
}
</style>
