<template>
    <div class="page">
        <div class="sider">
            <div class="parentNode">
                <el-link type="info" @click="allData()">全部数据</el-link>
            </div>
            <div class="tree-entry" v-for="(item,x) in cityList" :key="x">
                <div class="parentNode">
                    <i class="el-icon-menu"></i>
                    <el-link type="info" @click="seeShi(item.id)">{{item.name}}</el-link>
                </div>
            </div>
        </div>
        <div class="cont_wrap">
            <div class="kong">
                <times :time="time" :show="false" />
            </div>
            <flfrom @Submi="onSubmit" />
            <div class="table_wrap" ref="table_wrap">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane
                        v-for="(item,index) in list"
                        :key="index"
                        :label="item.label"
                        :name="item.name"
                    >
                        <fltable v-loading="loading" :data="data" :type="item.name" :her="her" />
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :page-size="currentPage.pageSize"
                            layout="total, prev, pager, next"
                            :total="currentPage.total"
                        ></el-pagination>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <footer class="layui-footer footer">
                <p>Copyright © 2010-2019 Graphic Resources S.L. All screenshots ©</p>
                <p>creenshots © Their respective owners. Google+</p>
            </footer>
        </div>
    </div>
</template>

<script>
import times from "@/components/tableTime";
import fltable from "@/components/fl_table";
import table from "@/mixins/table";
import flfrom from '@/components/fl_from';
export default {
    data() {
        return {
            currentPage: {
                total: 0,
                pageNum: 1,
                pageSize: 20
            },
            form: {},
            activeName: "bd",
            data: [],
            time: "",
            her: null,
            list: [
                {
                    label: "站点详情",
                    name: "zdxqs"
                },
                {
                    label: "告警详情",
                    name: "gjs"
                }
            ],

            cityList: [],
            showOne: "",
            loading: false,
            cityId: "",
            prefectureId: ""
        };
    },
    mixins: [table],
    components: {
        times,
        fltable,
        flfrom
    },

    created() {
        let vm = this;
        this.activeName = this.$route.query.dataInfo;
        if (vm.userInfo.mapRange == 1) {
            vm.getshi();
        } else if (vm.userInfo.mapRange == 2) {
            vm.getQu();
        } else if (vm.userInfo.mapRange == 3) {
        }
        this.allData();
    },
    mounted() {
        this.showOne = "a";
        this.her = this.$refs.table_wrap.offsetHeight - 200 + "px";
    },
    methods: {
        onSubmit(data){
            console.log(data)
        },
        allData(provinceId, cityId, prefectureId) {
            let vm = this;
            let info = {
                provinceId: provinceId || vm.userInfo.provinceId,
                cityId: cityId || vm.userInfo.cityId,
                prefectureId: prefectureId || vm.userInfo.prefectureId,
                pageNum: vm.currentPage.pageNum,
                pageSize: vm.currentPage.pageSize
            };
            vm.loading = true;
            let url = `fljl_${vm.activeName}`;
            try {
                vm.tableApi[url](info).then(res => {
                    console.log(res);
                    vm.loading = false;
                    vm.data = res.result.records;
                    vm.currentPage.total = res.result.total;
                });
            } catch (error) {
                vm.loading = false;
                vm.data = [];
            }
        },
        seeShi(id) {
            let vm = this;
            if (vm.userInfo.mapRange == 1) {
                vm.cityId = id;
            } else if (vm.userInfo.mapRange == 2) {
                vm.prefectureId = id;
            } else if (vm.userInfo.mapRange == 3) {
            }
            vm.currentPage = {
                total: 0,
                pageNum: 1,
                pageSize: 20
            };
            vm.allData("", vm.cityId, vm.prefectureId);
        },
        getshi() {
            let vm = this;
            vm.tableApi.shi(vm.userInfo.provinceId).then(res => {
                vm.cityList = res.result;
            });
        },
        getQu() {
            let vm = this;
            vm.tableApi.qx(vm.userInfo.cityId).then(res => {
                vm.cityList = res.result;
            });
        },
        handleClick(tab, event) {
            this.currentPage = {
                total: 0,
                pageNum: 1,
                pageSize: 20
            };
            this.data = [];
            this.allData("", this.cityId, this.provinceId);
        },
        handleNodeClick(data) {
            console.log(data);
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.currentPage.pageNum = val;
            this.allData();
        }
    }
};
</script>

<style scoped lang='scss'>
.table_wrap {
    background: #fff;
    padding: 0px 20px 20px 20px;
    height: calc(100% - 190px);
    margin: 0 20px 1px 20px;
}
.kong {
    position: relative;
    padding: 15px 25px 8px 25px;
}
.sider {
    width: 200px;
    overflow-x: hidden;
    background-color: #393d49;
    position: absolute;
    left: 0;
    top: 0;
    padding-left: 10px;
    box-sizing: border-box;
    padding-top: 5px;
    z-index: 1;
    height: 100%;
}
.cont_wrap {
    margin-left: 200px;
    text-align: left;
    position: relative;
    height: 100%;
    box-sizing: border-box;
}
.page {
    min-height: 700px;
}
.down_wrap {
    padding-left: 27px;
}
.parentNode {
    height: 20px;
    line-height: 20px;
    padding: 3px 0;
    font-size: 14px;
    color: #fff;
    cursor: pointer;
    i {
        font-size: 12px;
        margin-right: 7px;
    }
}
.childNodes {
    height: 20px;
    padding: 3px 0;
    color: #fff;
    position: relative;
    i {
        color: #fff;
        font-size: 12px;
        margin-right: 7px;
    }
}
.childNodes::before {
    content: "";
    position: absolute;
    top: 0;
    left: -21px;
    width: 0;
    height: 100%;
    border-left: 1px dotted #c0c4cc;
}
.childNodes::after {
    content: "";
    position: absolute;
    top: 12px;
    left: -19px;
    width: 15px;
    height: 0;
    border-top: 1px dotted #c0c4cc;
}
.footer {
    width: 100%;
    height: 60px;
    background: #5a6378;
    color: #fff;
    font-size: 14px;
    color: #b7b7b7;
    text-align: center;
    position: fixed;
    z-index: 1000;
    left: 200px;
    right: 0;
    bottom: 0;
    line-height: 44px;
    padding: 10px 15px 0 15px;
    p {
        line-height: 30px;
    }
}
</style>
<style scoped>
.page >>> .el-link {
    color: #fff;
}
.el-link:hover {
    color: #909399;
}
</style>

