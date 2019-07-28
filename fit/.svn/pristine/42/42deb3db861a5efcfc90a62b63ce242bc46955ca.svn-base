<template>
    <div class="table_wp">
        <div class="flex">
            <el-table
                :data="data"
                style="width: 100%"
                size="mini"
                :height="her"
                :header-cell-style="{background:'#f2f2f2',color:'#666'}"
                :border="type=='cnz'"
                @row-click="openDetails"
            >
                <template v-if="type=='bd'">
                    <el-table-column prop="name" label="地市/区县"></el-table-column>
                    <el-table-column prop="customerName" label="客户名称"></el-table-column>
                    <el-table-column prop="panelName" label="备电点名称"></el-table-column>
                    <el-table-column prop="deviceCode" label="编号"></el-table-column>
                    <el-table-column prop="readyTime" label="签约时长">
                        <template slot-scope="scope">{{scope.row.readyTime+'H'}}</template>
                    </el-table-column>
                    <el-table-column prop="batType" label="蓄电池类型"></el-table-column>
                    <el-table-column prop="capacity" label="蓄电池容量"></el-table-column>
                    <el-table-column prop="dcglq" label="DTU/电池管理器"></el-table-column>
                    <el-table-column prop="dcddsbl" label="PCS/UPS"></el-table-column>
                    <el-table-column prop="fdcs" label="备电使用次数">
                        <template slot-scope="scope">{{scope.row.zcbdsc+'次'}}</template>
                    </el-table-column>
                    <el-table-column prop="zcbdsc" label="最长备电时长">
                        <template slot-scope="scope">{{scope.row.zcbdsc+'H'}}</template>
                    </el-table-column>
                </template>
                <template v-if="type=='cd'">
                    <el-table-column prop="name" label="地市/区县"></el-table-column>
                    <el-table-column prop="cdzmc" label="充电站名称"></el-table-column>
                    <el-table-column prop="deviceCode" label="编号"></el-table-column>
                    <el-table-column prop="ydnybsl" label="YD能源包"></el-table-column>
                    <el-table-column prop="capacity" label="蓄电池容量"></el-table-column>
                    <el-table-column prop="dtusl" label="DTU"></el-table-column>
                    <el-table-column prop="nycsl" label="能源车"></el-table-column>
                    <el-table-column prop="nbqsl" label="逆变器数量"></el-table-column>
                    <el-table-column prop="hlqsl" label="合路器数量"></el-table-column>
                    <el-table-column prop="cdzsl" label="充电桩数量"></el-table-column>
                    <el-table-column prop="cdwsl" label="充电量当月累计KWH"></el-table-column>
                </template>
                <template v-if="type=='hd'"></template>
                <template v-if="type=='sd'"></template>
                <template v-if="type=='nyb'">
                    <el-table-column prop="name" label="地市/区县"></el-table-column>
                    <el-table-column prop="nybbm" label="能源包编码"></el-table-column>
                    <el-table-column prop="zdmc" label="站点名称"></el-table-column>
                    <el-table-column prop="zzywid" label="站点编号"></el-table-column>
                    <el-table-column prop="batType" label="电池类型"></el-table-column>
                    <el-table-column prop="capacity" label="能源包容量"></el-table-column>
                    <el-table-column prop="brand" label="电池厂商"></el-table-column>
                    <el-table-column prop="rwsj" label="入网时间"></el-table-column>
                    <el-table-column prop="fdbl" label="放电倍率"></el-table-column>
                </template>
                <template v-if="type=='cnz'">
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-form label-position="left" inline class="demo-table-expand">
                                <el-table
                                    :data="props.row.deviceList"
                                    style="width: 100%"
                                    :show-header="false"
                                    :cell-style="{background:'#bcb6b6',color:'#fff'}"
                                    @row-click="openDetails2"
                                >
                                    <el-table-column prop label="地市/区县" align="center"></el-table-column>
                                    <el-table-column
                                        prop="name"
                                        label="储能站点名称"
                                        width="150px"
                                        align="center"
                                    ></el-table-column>
                                    <el-table-column prop="deviceCode" label="编号" align="center"></el-table-column>
                                    <el-table-column label="拓扑图" width="100" align="center"></el-table-column>
                                    <el-table-column prop="batType" label="蓄电池类型" align="center"></el-table-column>
                                    <el-table-column
                                        prop="capacity"
                                        label="蓄电池容量/AH"
                                        align="center"
                                    ></el-table-column>
                                    <el-table-column prop="dcglq" label="DTU/电池管理器" align="center"></el-table-column>
                                    <el-table-column prop="gffdl" label="光伏/KW" align="center"></el-table-column>
                                    <el-table-column prop="rjfdsc" label="日均放电时长/H" align="center"></el-table-column>
                                    <el-table-column
                                        prop="ljfdrl"
                                        label="累计放电容量/KWH"
                                        align="center"
                                    ></el-table-column>
                                    <el-table-column prop="ljxhcs" label="累计循环次数/次" align="center"></el-table-column>
                                </el-table>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="地市/区县" align="center"></el-table-column>
                    <el-table-column prop="cnzmc" label="储能站点名称" width="150px" align="center"></el-table-column>
                    <el-table-column prop="deviceCode" label="编号" align="center"></el-table-column>
                    <el-table-column label="拓扑图" width="100" align="center">
                        <template slot-scope="scope">
                            <el-button @click="open(scope.row)" type="text" size="small">查看</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop label="蓄电池类型" align="center"></el-table-column>
                    <el-table-column prop="capacity" label="蓄电池容量/AH" align="center"></el-table-column>
                    <el-table-column prop label="DTU/电池管理器" align="center"></el-table-column>
                    <el-table-column prop="gffdl" label="光伏/KW" align="center"></el-table-column>
                    <el-table-column prop="rjfdsc" label="日均放电时长/H" align="center"></el-table-column>
                    <el-table-column prop="ljfdrl" label="累计放电容量/KWH" align="center"></el-table-column>
                    <el-table-column prop="ljxhcs" label="累计循环次数/次" align="center"></el-table-column>
                </template>
                <template v-if="type=='ysz'">
                    <el-table-column prop="name" label="地市/区县"></el-table-column>
                    <el-table-column prop="yszmc" label="延寿站点名称"></el-table-column>
                    <el-table-column prop="deviceCode" label="编号"></el-table-column>
                    <el-table-column prop="batType" label="蓄电池类型"></el-table-column>
                    <el-table-column prop="capacity" label="蓄电池容量/AH"></el-table-column>
                    <el-table-column prop="dcglq" label="DTU/电池管理器"></el-table-column>
                    <el-table-column prop="qysj" label="启用时间"></el-table-column>
                    <el-table-column prop="bdsj" label="备电时长/H"></el-table-column>
                    <el-table-column prop="mcyjfdsc" label="末次应急放电时长/H"></el-table-column>
                </template>
                <template v-if="type=='xdc'">
                    <el-table-column prop="name" label="地市/区县"></el-table-column>
                    <el-table-column prop="xdcbh" label="蓄电池组成码"></el-table-column>
                    <el-table-column prop="zzywid" label="站址名称/站址编号"></el-table-column>
                    <el-table-column prop="batType" label="蓄电池类型"></el-table-column>
                    <el-table-column prop="capacity" label="蓄电池容量"></el-table-column>
                    <el-table-column prop="rwsj" label="电池入网时间"></el-table-column>
                    <el-table-column prop="mchr" label="末次核容"></el-table-column>
                    <el-table-column prop="bdsc" label="预期寿命"></el-table-column>
                    <el-table-column prop="soh" label="SHO"></el-table-column>
                </template>
            </el-table>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    props: {
        type: {
            type: String,
            required: false,
            default: "bd"
        },
        data: {
            type: Array,
            required: false
        },
        her: {
            type: String,
            required: false,
            default: "100px"
        }
    },
    components: {},
    created() {},
    mounted() {},
    methods: {
        open(row) {
            let routeUrl = this.$router.resolve({
                path: "/topology",
                query: {
                    panelId: row.panelId
                }
            });
            window.open(routeUrl.href, "_blank");
        },
        openDetails2(row) {
            if (row.devType == 18) {
                window.open(
                    `http://www.baoxingtech.com:2037/escape/siteDetail.html?panelId=${row.id}`
                );
            } else if (
                row.devType == 25 ||
                row.devType == 26 ||
                row.devType == 27
            ) {
                let routeUrl = this.$router.resolve({
                    path: "/chartDetails",
                    query: {
                        panelId: row.id
                    }
                });
                window.open(routeUrl.href, "_blank");
            } else {
                console.log(111);
                return;
            }
        },
        openDetails(row) {
            if (this.type == "bd") {
                if (
                    row.devType == 25 ||
                    row.devType == 26 ||
                    row.devType == 27
                ) {
                    let routeUrl = this.$router.resolve({
                        path: "/chartDetails",
                        query: {
                            panelId: row.panelId
                        }
                    });
                    window.open(routeUrl.href, "_blank");
                } else {
                    return;
                }
            } else if (this.type == "cd") {
            } else if (this.type == "hd") {
            } else if (this.type == "sd") {
            } else if (this.type == "nyb") {
            } else if (this.type == "cnz") {
            } else if (this.type == "ysz") {
                if (row.devType == 18) {
                    window.open(
                        `http://www.baoxingtech.com:2037/escape/siteDetail.html?panelId=${row.panelId}`
                    );
                } else {
                    return;
                }
            } else if (this.type == "xdc") {
            }
        }
        //具体操作
    }
};
</script>

<style scoped lang='scss'>
.flex {
    display: flex;
}
</style>
<style scoped>
.table_wp >>> .el-table__expanded-cell {
    padding: 0px 0px 0px 47px !important;
}
</style>
