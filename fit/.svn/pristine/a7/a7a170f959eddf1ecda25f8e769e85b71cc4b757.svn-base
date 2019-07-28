<template>
    <div class="page">
        <layouts>
            <template #time>
                <times :time="time"/>
            </template>
            <template #left>
                <div class="area">
                    <titlebox :title=" '能源经营业务' "/>
                    <ol class="flex" style="margin-top:20px">
                        <li class="tag top_b" @click="access('bd')">
                            <span class="tag-num">{{topData.bddsl||0}}</span>
                            <span class="tag-info">备电点(个)</span>
                        </li>
                        <li class="tag top_b" @click="access('cd')">
                            <span class="tag-num">{{topData.cddsl||0}}</span>
                            <span class="tag-info">充电点(个)</span>
                        </li>
                        <li class="tag top_b top_b" @click="access('hd')">
                            <span class="tag-num">{{topData.hddsl||0}}</span>
                            <span class="tag-info">换电点(个)</span>
                        </li>
                        <li class="tag top_b top_b" @click="access('sd')">
                            <span class="tag-num">{{topData.sddsl||0}}</span>
                            <span class="tag-info">售电点(个)</span>
                        </li>
                        <li class="tag top_t" @click="access('nyb')">
                            <span class="tag-num">{{topData.bddrl||0}}</span>
                            <span class="tag-info">能源包(AH)</span>
                        </li>
                        <li class="tag top_t" @click="access('nyb')">
                            <span class="tag-num">{{topData.cddrl||0}}</span>
                            <span class="tag-info">能源包(AH)</span>
                        </li>
                        <li class="tag top_t" @click="access('nyb')">
                            <span class="tag-num">{{topData.hddrl||0}}</span>
                            <span class="tag-info">能源包(AH)</span>
                        </li>
                        <li class="tag top_t" @click="access('nyb')">
                            <span class="tag-num">{{topData.sdddl||0}}</span>
                            <span class="tag-info">电量(KWH)</span>
                        </li>
                    </ol>
                </div>
                <div class="area marg">
                    <titlebox :title=" '能源生产保障' "/>
                    <ol class="flex" style="margin-top:20px">
                        <li class="tag top_b" style="width:49%;" @click="access('cnz')">
                            <span class="tag-num">{{botData.cnzsl}}</span>
                            <span class="tag-info">储能站(个)</span>
                        </li>
                        <li
                            class="tag top_b"
                            style="width:49%;  border-right: none;"
                            @click="access('ysz')"
                        >
                            <span class="tag-num">{{botData.yszsl}}</span>
                            <span class="tag-info">延寿站(个)</span>
                        </li>
                        <li class="tag top_t" style="width:49%; " @click="access('xdc')">
                            <span class="tag-num">{{botData.cnzrl}}</span>
                            <span class="tag-info">蓄电池(AH)</span>
                        </li>
                        <li class="tag top_t" style="width:49%;" @click="access('xdc')">
                            <span class="tag-num">{{botData.yszrl}}</span>
                            <span class="tag-info">蓄电池(AH)</span>
                        </li>
                    </ol>
                </div>
            </template>
            <template #right>
                <tablemap :showType="'zy'" :mapUrl='mapUrl' @getinfo="getinfo" :tableUrl="tableUrl"/>
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
            mapUrl: 'resource_center_map',
            tableUrl:'resource_center_list',
            time: "",
            topData: {},
            botData: {}
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
        let vm = this;
        vm.getinfo();
    },
    mounted() {},
    methods: {
        getinfo(provinceId,cityId,prefectureId) {
            let vm = this;
             let info ={
                provinceId: vm.userInfo.provinceId,
                cityId:  vm.userInfo.cityId,
                prefectureId: vm.userInfo.prefectureId,
            };
            vm.Api.energy_business_data(info).then(res => {
                vm.topData = res.result;
            });
            vm.Api.energy_product_guarantee(info).then(res => {
                vm.botData = res.result;
            });
            vm.getTime();
        },
        access(str) {
            this.$router.push({
                path: "/resources/zydetails",
                query: {
                    dataInfo: str
                }
            });
        }
    }
};
</script>

<style scoped lang='scss'>
.page {
    padding-top: 0.7%;
    // width: 1280px;
    min-height: 700px;
}
.area {
    background: #fff;
    padding-bottom: 20px;
}
</style>

<style lang="scss" scoped>
.flex {
    overflow: hidden;
    li {
        float: left;
    }
}
.flex > li:nth-child(4n + 0) {
    border-right: none;
}
.tag {
    border-right: 1px solid #e3e3e3;
    cursor: pointer;
    width: 24%;
}
.tagb {
    border-right: 1px solid #e3e3e3;
    cursor: pointer;
    width: 49%;
}
.tag span {
    display: block;
    text-align: center;
}
.tag-num {
    font-size: 26px;
    color: #0070c9;
    margin-bottom: 18px;
}
.marg {
    margin-top: 10px;
}
.top_b {
    padding-bottom: 20px;
}
.top_t {
    padding-top: 20px;
}
</style>
