<template>
    <div class="module">
        <el-row class="Part1">
            <div class="swiper_wrap flot bor4">
                <el-carousel height="348px">
                    <el-carousel-item v-for="item in 4" :key="item">
                        <h3 class="small">{{ item }}</h3>
                    </el-carousel-item>
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
                <div v-if="!isLogin" class="no_logged box_s">
                    <el-form
                        :model="ruleForm"
                        status-icon
                        ref="ruleForm"
                        label-width="50px"
                        class="demo-ruleForm"
                    >
                        <el-form-item label="账号" prop="name" :rules="filterRules({required:true})">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="pass" :rules="filterRules({required:true})">
                            <el-input type="password" v-model="ruleForm.pass"></el-input>
                        </el-form-item>
                        <div class="automatic_wrap">
                            <el-checkbox v-model="checked">两周内自动登录</el-checkbox>
                            <span>
                                <el-link href="#" target="_blank">忘记密码</el-link>
                            </span>
                        </div>
                        <div class="btn_wrap">
                            <el-button type="primary" @click="updata('ruleForm')">确定</el-button>
                        </div>
                    </el-form>
                </div>
                <div v-else class="is_logged">
                    <el-row>
                        <div class="news-left-block"></div>
                        <div class="news-title">
                            <p>工作台</p>
                            <a href="#">
                                退出登录
                                <i class="el-icon-arrow-right"></i>
                            </a>
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
</template>

<script>
import * as types from "@/store/types";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
    data() {
        return {
            ruleForm: {
                name: "",
                pass: ""
            },
            checked: false,
            isLogin: false,
            alertsList: [],
        };
    },
    components: {},
    created() {
        let vm = this;
        vm.getnews();
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    mounted() {
        let vm = this;
        if (vm.userInfo.adminToken) {
            vm.isLogin = true;
            vm.getall();
        }
    },
    methods: {
        ...mapMutations({
            setUserInfo: types.global.mutations.SET_USER_INFO
        }),
        getall(){
            let vm = this;
            vm.getEnergy_station();
        },
        getEnergy_station(){
            let vm = this;
            let info = {
                provinceId: vm.userInfo.mapRangeId,
            }
            vm.Api.energy_station(info).then((res) => {
                console.log(res)

            })
        },
        getnews() {
            let vm = this;
            let info = {
                size: 7,
                type: 0
            };
            debugger
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
        updata(formName) {
            let vm = this;
            vm.$refs[formName].validate(valid => {
                if (valid) {
                    let info = {
                        userName: vm.ruleForm.name,
                        userPwd: vm.ruleForm.pass
                    };
                    vm.Api.login(info).then(res => {
                        console.log(res);
                        if (res.result.adminToken) {
                            vm.setUserInfo(res.result);
                        }
                    });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        }
    }
};
</script>

<style scoped lang='scss'>
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

.module >>> .el-carousel__indicators--horizontal {
    transform: none;
    left: 20%;
}
</style>