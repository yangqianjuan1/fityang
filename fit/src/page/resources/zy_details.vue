<template>
    <div class="page">
        <div class="sider">
            <div class="parentNode">
                <el-link type="info" @click="allData()">全部数据</el-link>
            </div>
            <div class="tree-entry" v-for="(item,x) in cityList" :key="x">
                <div class="parentNode">
                    <i class="el-icon-plus" @click="open(x)"></i>
                    <el-link type="info" @click="ckan(item.id)">{{item.name}}</el-link>
                </div>
                <div class="down_wrap" v-show="showOne == x">
                    <div class="childNodes" v-for="(one,y) in item.qxlist" :key="y">
                        <i class="el-icon-document"></i>
                        <el-link type="info" @click="seeQx(one.id)">{{one.name}}</el-link>
                    </div>
                </div>
            </div>
        </div>
        <div class="cont_wrap">
            <div class="kong">
                <times :time="time" :show="false" />
            </div>
            <div class="table_wrap" ref="table_wrap">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane
                        v-for="(item,index) in list"
                        :key="index"
                        :label="item.label"
                        :name="item.name"
                    >
                        <zytable v-loading="loading" :data="data" :type="item.name" :her="her" />
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
import times from "../../components/tableTime";
import zytable from "../../components/zy_table";
import table from "../../mixins/table";
export default {
    data() {
        return {
            activeName: "bd",
            data: [],
            time: "",
            her: null,
            list: [
                {
                    label: "备电点",
                    name: "bd"
                },
                {
                    label: "充电点",
                    name: "cd"
                },
                {
                    label: "换电点",
                    name: "hd"
                },
                {
                    label: "售电点",
                    name: "sd"
                },
                {
                    label: "能源包",
                    name: "nyb"
                },
                {
                    label: "储能站",
                    name: "cnz"
                },
                {
                    label: "延寿站",
                    name: "ysz"
                },
                {
                    label: "蓄电池",
                    name: "xdc"
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
        zytable
    },

    created() {
        let vm = this;

        this.activeName = this.$route.query.dataInfo;
        // this.getshi();
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
        this.her = this.$refs.table_wrap.offsetHeight - 73 + "px";
    },
    methods: {
        allData(provinceId, cityId, prefectureId) {
            let vm = this;
            let info = {
                provinceId: provinceId || vm.userInfo.provinceId,
                cityId: cityId || vm.userInfo.cityId,
                prefectureId: prefectureId || vm.userInfo.prefectureId
            };
            vm.loading = true;
            let url = `second_${vm.activeName}_list`;
            try {
                vm.tableApi[url](info).then(res => {
                    console.log(res);
                    vm.loading = false;
                    vm.data = res.result;
                });
            } catch (error) {
                vm.loading = false;
                vm.data = [];
            }
        },
        ckan(id) {
            let vm = this;
            if (vm.userInfo.mapRange == 1) {
                vm.seeShi(id);
            } else if (vm.userInfo.mapRange == 2) {
                vm.seeQx(id);
            } else if (vm.userInfo.mapRange == 3) {
            }
        },
        seeShi(id) {
            let vm = this;
            vm.cityId = id;
            vm.prefectureId = null;
            vm.allData("", id, "");
        },
        seeQx(id) {
            let vm = this;
            vm.prefectureId = id;
            vm.allData("", "", id);
        },
        getshi() {
            let vm = this;
            vm.tableApi.shi(vm.userInfo.provinceId).then(res => {
                vm.cityList = res.result;
                for (let i = 0; i < vm.cityList.length; i++) {
                    vm.tableApi.qx(vm.cityList[i].id).then(res => {
                        vm.cityList[i].qxlist = res.result;
                    });
                }
            });
        },
        getQu() {
            let vm = this;
            vm.tableApi.qx(vm.userInfo.cityId).then(res => {
                vm.cityList = res.result;
            });
        },
        handleClick(tab, event) {
            this.allData("", this.cityId, this.provinceId);
        },
        loadNode(node, resolve) {
            if (node.level === 0) {
                return resolve([{ name: "region" }]);
            }
            if (node.level > 1) return resolve([]);

            setTimeout(() => {
                const data = [
                    {
                        name: "leaf",
                        leaf: true
                    },
                    {
                        name: "zone"
                    }
                ];

                resolve(data);
            }, 500);
        },
        handleNodeClick(data) {
            console.log(data);
        },
        open(num) {
            let vm = this;
            if (vm.showOne == num.toString()) {
                vm.showOne = "a";
            } else {
                vm.showOne = num;
            }
        }
    }
};
</script>

<style scoped lang='scss'>
.table_wrap {
    background: #fff;
    padding: 20px 20px 20px 20px;
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
        border: 1px #909399 solid;
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

