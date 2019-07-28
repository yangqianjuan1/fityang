<template>
    <div class="page">
        <layouts>
            <template #time>
                <times :time="time" />
            </template>
            <template #left>
                <div class="area">
                    <titlebox :title=" '能源经营' " />
                    <div class="pad20">
                        <h1>能源经营业务</h1>
                        <div class="operation-content" @click="gotoSituation">
                            <div style="padding-top: 15px;">
                                <el-row>
                                    <el-col :span="12">
                                        <div class="option-item-info">
                                            <p>备电用户数量(个)</p>
                                        </div>
                                    </el-col>
                                    <el-col :span="12">
                                        <div class="option-item-number">
                                            <p id="bdkhsl">{{left_data.bdkhsl ||0}}</p>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                            <div style="padding-top: 10px;">
                                <el-row>
                                    <el-col :span="12">
                                        <div class="option-item-info">
                                            <p>备电点数量(个)</p>
                                        </div>
                                    </el-col>
                                    <el-col :span="12">
                                        <div class="option-item-number">
                                            <p id="bdkhsl">{{left_data.bddsl ||0}}</p>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                            <div style="padding-top: 10px;padding-bottom: 10px; ">
                                <el-row>
                                    <el-col :span="12">
                                        <div class="option-item-info">
                                            <p>备电客户固定电池容量(AH)</p>
                                        </div>
                                    </el-col>
                                    <el-col :span="12">
                                        <div class="option-item-number">
                                            <p id="bdkhsl">{{left_data.bdkhgddcrl ||0}}</p>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                        </div>
                        <div class="operation-content" @click="gotoSituation">
                            <div style="padding-top: 15px;">
                                <el-row>
                                    <el-col :span="12">
                                        <div class="option-item-info">
                                            <p>充电点数量(个)</p>
                                        </div>
                                    </el-col>
                                    <el-col :span="12">
                                        <div class="option-item-number">
                                            <p id="bdkhsl">{{left_data.cddsl ||0}}</p>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                            <div style="padding-top: 15px;">
                                <el-row>
                                    <el-col :span="12">
                                        <div class="option-item-info">
                                            <p>充电总量(KWH)</p>
                                        </div>
                                    </el-col>
                                    <el-col :span="12">
                                        <div class="option-item-number">
                                            <p id="bdkhsl">{{left_data.cddcdzl ||0}}</p>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                            <div style="padding-top: 15px;">
                                <el-row>
                                    <el-col :span="12">
                                        <div class="option-item-info">
                                            <p>YD能源包数量(个)</p>
                                        </div>
                                    </el-col>
                                    <el-col :span="12">
                                        <div class="option-item-number">
                                            <p id="bdkhsl">{{left_data.yddcbsl ||0}}</p>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                            <div style="padding-top: 15px;">
                                <el-row>
                                    <el-col :span="12">
                                        <div class="option-item-info">
                                            <p>YD能源包容量(AH)</p>
                                        </div>
                                    </el-col>
                                    <el-col :span="12">
                                        <div class="option-item-number">
                                            <p id="bdkhsl">{{left_data.yddcbrl ||0}}</p>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                            <div style="padding-top: 15px;">
                                <el-row>
                                    <el-col :span="12">
                                        <div class="option-item-info">
                                            <p>发电次数(次)</p>
                                        </div>
                                    </el-col>
                                    <el-col :span="12">
                                        <div class="option-item-number">
                                            <p id="bdkhsl">{{left_data.fdcs ||0}}</p>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                        </div>
                        <div class="operation-content" @click="gotoSituation">
                            <div style="padding-top: 15px;">
                                <el-row>
                                    <el-col :span="12">
                                        <div class="option-item-info">
                                            <p>换电点数量(个)</p>
                                        </div>
                                    </el-col>
                                    <el-col :span="12">
                                        <div class="option-item-number">
                                            <p id="bdkhsl">{{left_data.hddsl ||0}}</p>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                            <div style="padding-top: 10px;">
                                <el-row>
                                    <el-col :span="12">
                                        <div class="option-item-info">
                                            <p>HD能源包数量(KWH)</p>
                                        </div>
                                    </el-col>
                                    <el-col :span="12">
                                        <div class="option-item-number">
                                            <p id="bdkhsl">{{left_data.hdnybsl ||0}}</p>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                            <div style="padding-top: 10px;padding-bottom: 10px; ">
                                <el-row>
                                    <el-col :span="12">
                                        <div class="option-item-info">
                                            <p>HD能源包容量(AH)</p>
                                        </div>
                                    </el-col>
                                    <el-col :span="12">
                                        <div class="option-item-number">
                                            <p id="bdkhsl">{{left_data.hdnybrl ||0}}</p>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                        </div>

                        <div class="operation-content" @click="gotoSituation">
                            <div style="padding-top: 15px;">
                                <el-row>
                                    <el-col :span="12">
                                        <div class="option-item-info">
                                            <p>售电点数量(个)</p>
                                        </div>
                                    </el-col>
                                    <el-col :span="12">
                                        <div class="option-item-number">
                                            <p id="bdkhsl">{{left_data.sddsl ||0}}</p>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                            <div style="padding-top: 15px;">
                                <el-row>
                                    <el-col :span="12">
                                        <div class="option-item-info">
                                            <p>售电量(KWH)</p>
                                        </div>
                                    </el-col>
                                    <el-col :span="12">
                                        <div class="option-item-number">
                                            <p id="bdkhsl">{{left_data.sdl ||0}}</p>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                        </div>
                        <div class="operation-content" @click="gotoSituation">
                            <div style="padding-top: 15px;">
                                <el-row>
                                    <el-col :span="12">
                                        <div class="option-item-info">
                                            <p>在网设备总量(个)</p>
                                        </div>
                                    </el-col>
                                    <el-col :span="12">
                                        <div class="option-item-number">
                                            <p id="bdkhsl">{{left_data.zwsbzl ||0}}</p>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                            <div style="padding-top: 15px;">
                                <el-row>
                                    <el-col :span="12">
                                        <div class="option-item-info">
                                            <p>能源服务车辆(辆)</p>
                                        </div>
                                    </el-col>
                                    <el-col :span="12">
                                        <div class="option-item-number">
                                            <p id="bdkhsl">{{left_data.nyfwcl ||0}}</p>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                            <div style="padding-top: 15px;">
                                <el-row>
                                    <el-col :span="12">
                                        <div class="option-item-info">
                                            <p>能源服务人员(位)</p>
                                        </div>
                                    </el-col>
                                    <el-col :span="12">
                                        <div class="option-item-number">
                                            <p id="bdkhsl">{{left_data.nyfwrysl ||0}}</p>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                        </div>
                        <h1>能源保障</h1>
                        <div class="operation-content" @click="gotoSituation">
                            <div style="padding-top: 15px;">
                                <el-row>
                                    <el-col :span="12">
                                        <div class="option-item-info">
                                            <p>储能站点数量(个)</p>
                                        </div>
                                    </el-col>
                                    <el-col :span="12">
                                        <div class="option-item-number">
                                            <p id="bdkhsl">{{left_data.cnzsl ||0}}</p>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                            <div style="padding-top: 15px;">
                                <el-row>
                                    <el-col :span="12">
                                        <div class="option-item-info">
                                            <p>储能总容量(KWH)</p>
                                        </div>
                                    </el-col>
                                    <el-col :span="12">
                                        <div class="option-item-number">
                                            <p id="bdkhsl">{{left_data.cnzrl ||0}}</p>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                            <div style="padding-top: 15px;">
                                <el-row>
                                    <el-col :span="12">
                                        <div class="option-item-info">
                                            <p>充电总量(KWH)</p>
                                        </div>
                                    </el-col>
                                    <el-col :span="12">
                                        <div class="option-item-number">
                                            <p id="bdkhsl">{{left_data.cnzcdzl ||0}}</p>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                            <div style="padding-top: 15px;">
                                <el-row>
                                    <el-col :span="12">
                                        <div class="option-item-info">
                                            <p>充电总量(元)</p>
                                        </div>
                                    </el-col>
                                    <el-col :span="12">
                                        <div class="option-item-number">
                                            <p id="bdkhsl">{{left_data.cnzcdzlje ||0}}</p>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                        </div>
                        <div class="operation-content" @click="gotoSituation">
                            <div style="padding-top: 15px;">
                                <el-row>
                                    <el-col :span="12">
                                        <div class="option-item-info">
                                            <p>延寿站点数量(个)</p>
                                        </div>
                                    </el-col>
                                    <el-col :span="12">
                                        <div class="option-item-number">
                                            <p id="bdkhsl">{{left_data.yszsl ||0}}</p>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                            <div style="padding-top: 15px;">
                                <el-row>
                                    <el-col :span="12">
                                        <div class="option-item-info">
                                            <p>平均应急时长(H)</p>
                                        </div>
                                    </el-col>
                                    <el-col :span="12">
                                        <div class="option-item-number">
                                            <p id="bdkhsl">{{left_data.yszpjyjsc ||0}}</p>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <template #right>
                <tablemap
                    :showType="'yy'"
                    :mapUrl="mapUrl"
                    :isQx="false"
                    :notab="true"
                    @getinfo="getinfo"
                >
                    <template #info>
                        <div class="tit_w">
                            <titlebox :title=" '项目分类汇总' " />
                            <el-row>
                                <el-col :span="8">
                                    <div class="layui-tag">
                                        <span class="tag-num">{{left_data.bddsl ||0}}</span>
                                        <span class="tag-info">备电点数量(个)</span>
                                    </div>
                                </el-col>
                                <el-col :span="8">
                                    <div class="layui-tag">
                                        <span class="tag-num">{{left_data.fdcs ||0}}</span>
                                        <span class="tag-info">发电次数(个)</span>
                                    </div>
                                </el-col>
                                <el-col :span="8">
                                    <div class="layui-tag" style=" border-right:none;">
                                        <span class="tag-num">{{left_data.hddsl ||0}}</span>
                                        <span class="tag-info">换电次数(次)</span>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </template>
                    <template #title>
                        <titlebox :title=" '地图' " />
                    </template>
                </tablemap>
            </template>
        </layouts>
    </div>
</template>

<script>
import times from "../../components/tableTime";
import layouts from "../../components/layouts";
import tablemap from "../../components/table_map";
import titlebox from "../../components/title";
import table from "../../mixins/table";

export default {
    data() {
        return {
            mapUrl: "operation_center",
            time: "",
            left_data: {}
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
    },
    mounted() {},
    methods: {
        getinfo(provinceId, cityId, prefectureId) {
            let vm = this;
            let info = {
                provinceId: provinceId || vm.userInfo.provinceId,
                cityId: cityId || vm.userInfo.cityId,
                prefectureId: prefectureId || vm.userInfo.prefectureId
            };
            vm.Api.left_data(info).then(res => {
                vm.left_data = res.result;
            });
            vm.getTime();
        },
        gotoSituation() {
            this.$router.push({ path: "/operating/situation" });
        }
    }
};
</script>

<style scoped lang='scss'>
.option-item-number {
    font-size: 20px;
}
.option-item-info {
    text-align: right;
    margin-right: 10px;
}
.operation-content {
    background: #0070c9;
    color: #fff;
    border-radius: 5px;
    margin-top: 10px;
    padding-bottom: 5px;
    cursor: pointer;
}
.pad20 {
    padding: 0 20px 20px 20px;
}
#boxMap {
    height: 100%;
    width: 100%;
}
.page {
    padding-top: 0.7%;
    // width: 1280px;
    min-height: 700px;
}
.area {
    background: #fff;
}
h1 {
    font-size: 18px;
    text-align: center;
    margin-top: 10px;
    font-weight: bold;
}
</style>

<style lang="scss" scoped>
.layui-tag {
    margin-top: 20px;
    border-right: 1px solid #e3e3e3;
    margin-bottom: 24px;
    .tag-num {
        font-size: 26px;
        color: #0070c9;
        margin-bottom: 18px;
    }
    span {
        display: block;
        text-align: center;
    }
}
.tit_w {
    background: #fff;
    margin-bottom: 10px;
    padding: 0 12px;
    box-sizing: border-box;
}
.page_w {
    width: 90%;
    height: calc(100% - 174px);
    margin-left: 10px;
    background: #fff;
}
.wrap {
    padding: 12px;
    height: 100%;
    box-sizing: border-box;
}
.map_wrap {
    margin-top: 14px;
    width: 100%;
    height: calc(100% - 76px);
    overflow: hidden;
    position: relative;
    z-index: 0;
    background-color: rgb(243, 241, 236);
    color: rgb(0, 0, 0);
    text-align: left;
}
</style>
