<template>
    <div class="pages">
        <slot name="info"></slot>
        <div class="wrap" :class="notab?'nopad':''">
            <div class="tab_wrap" v-if="!notab">
                <el-radio-group v-if="one == 'all'" v-model="tabPosition" size="mini">
                    <el-radio-button label="map">地图</el-radio-button>
                    <el-radio-button label="table">列表</el-radio-button>
                </el-radio-group>
                <el-radio-group v-else v-model="tabPosition" size="mini">
                    <el-radio-button label="map">地图</el-radio-button>
                </el-radio-group>
            </div>
            <slot name="title"></slot>
            <div v-show="tabPosition == 'map'" class="map_wrap">
                <el-button
                    class="mapreturn"
                    type="primary"
                    @click="mapReturn"
                    icon="el-icon-back"
                    circle
                ></el-button>
                <div id="boxMap" v-loading="loading"></div>
            </div>
            <div v-if="tabPosition == 'table'" v-show="tabPosition =='table'" class="table_wrap">
                <el-table
                    :data="tableData"
                    style="width: 100%"
                    size="small"
                    height="710px"
                    :header-cell-style="{background:'#f2f2f2',color:'#606266'}"
                >
                    <template v-if="showType=='zy'">
                        <el-table-column prop="name" label="地区"></el-table-column>
                        <el-table-column prop="bddsl" width="70" label="备电点">
                            <template slot-scope="scope">{{scope.row.bddsl+'个'}}</template>
                        </el-table-column>
                        <el-table-column prop="cddsl" width="70" label="充电点">
                            <template slot-scope="scope">{{scope.row.cddsl+'个'}}</template>
                        </el-table-column>
                        <el-table-column prop="hddsl" width="70" label="换电点">
                            <template slot-scope="scope">{{scope.row.hddsl+'个'}}</template>
                        </el-table-column>
                        <el-table-column prop="sddsl" width="70" label="售电点">
                            <template slot-scope="scope">{{scope.row.sddsl+'个'}}</template>
                        </el-table-column>
                        <el-table-column prop="xdcgmBdCdHdSd" label="蓄电池">
                            <template slot-scope="scope">{{scope.row.xdcgmBdCdHdSd+'AH'}}</template>
                        </el-table-column>
                        <el-table-column prop="cnzsl" width="70" label="储能站">
                            <template slot-scope="scope">{{scope.row.cnzsl+'个'}}</template>
                        </el-table-column>
                        <el-table-column prop="yszsl" width="70" label="延寿站	">
                            <template slot-scope="scope">{{scope.row.yszsl+'个'}}</template>
                        </el-table-column>
                        <el-table-column prop="xdcgmCnzYsz" label="蓄电池规模">
                            <template slot-scope="scope">{{scope.row.xdcgmCnzYsz+'AH'}}</template>
                        </el-table-column>
                    </template>
                    <template v-if="showType=='jk'">
                        <el-table-column prop="name" label="站址名称"></el-table-column>
                        <el-table-column prop="deviceCode" label="站址编码"></el-table-column>
                        <el-table-column prop="pjfdsc" label="平均放电时长">
                            <template slot-scope="scope">{{scope.row.pjfdsc+'/H'}}</template>
                        </el-table-column>
                        <el-table-column prop="syfdsc" label="剩余放电时长">
                            <template slot-scope="scope">{{scope.row.syfdsc+'/H'}}</template>
                        </el-table-column>
                        <el-table-column prop="hbyj" label="环比预警">
                            <template slot-scope="scope">{{scope.row.hbyj+'%'}}</template>
                        </el-table-column>
                        <el-table-column prop="dcyxzt" label="电池运行状态"></el-table-column>
                    </template>
                    <template v-if="showType=='yw'">
                        <el-table-column prop="name" label="地区"></el-table-column>
                        <el-table-column prop="name" label="储能电池容量总计(KWH)">
                            <template slot-scope="scope">{{scope.row.energyStation.capacity}}</template>
                        </el-table-column>
                        <el-table-column prop="address" label="削峰填谷能力(KWH)">
                            <template slot-scope="scope">{{scope.row.energyStation.fdl}}</template>
                        </el-table-column>
                        <el-table-column prop="address" label="节费金额(元)">
                            <template slot-scope="scope">{{scope.row.energyStation.ljjfje}}</template>
                        </el-table-column>
                    </template>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
import table from "../mixins/table";

export default {
    data() {
        return {
            tabPosition: "map",
            tableData: [],
            maozoom: {},
            map: null,
            pointImg: require("../assets/img/icon_point.png"),
            cityId: "",
            prefectureId: "",
            clickName: ""
        };
    },
    mixins: [table],
    props: {
        showType: {
            type: String,
            required: false
        },
        mapUrl: {
            type: String,
            required: false
        },
        tableUrl: {
            type: String,
            required: false
        },
        fuUrl: {
            type: String,
            required: false
        },
        usemap: {
            type: Boolean,
            required: false,
            default: false
        },
        notab: {
            type: Boolean,
            required: false,
            default: false
        },
        isQx: {
            type: Boolean,
            required: false,
            default: true
        },
        one: {
            type: String,
            required: false,
            default: "all"
        }
    },
    created() {
        let vm = this;
        if (!this.userInfo) {
            this.$alert("请先登录！", "提示", {
                confirmButtonText: "确定",
                callback: action => {
                    vm.$router.push({
                        path: "/login"
                    });
                }
            });
        }
        // this.getTable();
    },
    mounted() {
        this.getMapData();
    },
    methods: {
        getMapData() {
            let vm = this;
            if (this.showType != "table") {
                vm.setMap();
            }
        },
        //切换
        changeClick(url, taurl) {
            let vm = this;
            if (vm.map) {
                vm.map.clearOverlays(); //清除地图覆盖物
                vm.getData("", "", "", url, taurl);
                vm.pduan();
            }
        },
        /**
         * 初始化地图
         */
        setMap(data) {
            let map = new BMap.Map("boxMap");

            let vm = this;
            if (vm.userInfo.mapRange == 1) {
                map.centerAndZoom(new BMap.Point(113.557234, 33.902115), 8);
            } else if (vm.userInfo.mapRange == 2) {
                map.centerAndZoom(new BMap.Point(113.557234, 33.902115), 8);
            } else if (vm.userInfo.mapRange == 3) {
                map.centerAndZoom(new BMap.Point(113.557234, 33.902115), 8);
            }

            map.setCurrentCity("郑州");
            vm.map = map;
            var overView = new BMap.OverviewMapControl();
            // var overViewOpen = new BMap.OverviewMapControl({
            //     isOpen: true,
            //     anchor: BMAP_ANCHOR_BOTTOM_RIGHT
            // });
            map.setMinZoom(3); //最小zoom缩放级别
            map.setMaxZoom(14); //最大zoom缩放级别
            // map.disableScrollWheelZoom(); //关闭鼠标滚轮缩放，自定义滚轮事件，调用map.zoomIn()与map.zoomOut()来控制缩放，避免直接使用而导致一次放大或缩小几级导致数据加载问题
            // vm.bindZoomSwithListener(map); //初始化zoom缩放监听事件
            map.enableScrollWheelZoom();
            // vm.bindProvinceAndCitySwitchListener(map); //初始化map拖动监听事件
            map.addControl(overView); //添加默认缩略地图控件
            // map. (overViewOpen);
            vm.getData();
            vm.pduan();

            // vm.addreturn(map);
        },
        pduan() {
            let vm = this;
            if (vm.userInfo.mapRange == 1) {
                vm.getShi();
            } else if (vm.userInfo.mapRange == 2) {
                vm.getQu();
            } else if (vm.userInfo.mapRange == 3) {
            }
        },
        //返回按钮
        mapReturn() {
            let vm = this;
            if (!vm.cityId && !vm.prefectureId) {
                return;
            }
            vm.cityId = "";
            vm.prefectureId = "";
            vm.map.centerAndZoom(new BMap.Point(113.557234, 33.902115), 8);
            vm.map.setCurrentCity("郑州");
            vm.map.clearOverlays();
            vm.getData();
            vm.pduan();
            vm.childMethod("", "", "");
        },
        //列表数据
        getData(provinceId, cityId, prefectureId, url, taurl) {
            let vm = this;
            let info = {
                provinceId: provinceId || vm.userInfo.provinceId,
                cityId: cityId || vm.userInfo.cityId,
                prefectureId: prefectureId || vm.userInfo.prefectureId
            };
            vm.tableApi[url || vm.mapUrl](info).then(res => {
                if (info.provinceId && !info.cityId && !info.prefectureId) {
                    vm.addPoint(res.result, "shi");
                } else if (info.cityId && !info.prefectureId) {
                    vm.addPoint(res.result, "qu");
                } else {
                    vm.addPoint(res.result);
                }
                if (!vm.tableUrl) {
                    vm.tableData = res.result;
                }
            });
            if (vm.tableUrl || taurl) {
                vm.tableData = [];
                vm.tableApi[taurl || vm.tableUrl](info).then(res => {
                    vm.tableData = res.result;
                });
            }
        },
        //获取市列表
        getShi() {
            let vm = this;
            vm.tableApi.shi(vm.userInfo.provinceId).then(res => {
                let data = res.result;
                for (let i = 0; i < data.length; i++) {
                    vm.getBoundary(data[i].name);
                }
            });
        },
        getQu(id) {
            let vm = this;
            vm.tableApi.qx(id || vm.userInfo.cityId).then(res => {
                let data = res.result;
                for (let i = 0; i < data.length; i++) {
                    vm.getBoundary(data[i].name);
                }
            });
        },
        jdwd(obj) {
            if (obj.longitude) {
                return [obj.longitude, obj.latitude];
            } else {
                return [obj.jd, obj.wd];
            }
        },
        //添加点
        addPoint(data, type) {
            let vm = this;
            let positionArray = [];
            for (let i = 0; i < data.length; i++) {
                positionArray.push(vm.jdwd(data[i]));
            }

            if (positionArray.length > 0) {
                for (let i = 0; i < positionArray.length; i++) {
                    // 一个坐标对应一个mark的生成
                    let point = new BMap.Point(
                        positionArray[i][0],
                        positionArray[i][1]
                    );
                    let myIcon = new BMap.Icon(
                        vm.pointImg,
                        new BMap.Size(24, 24)
                    );
                    vm.addMark(point, myIcon, data[i], type);
                }
            }
        },
        //悬浮窗
        addMark(point, myIcon, data, type) {
            // 生成图像标注
            let vm = this;
            var mark = new BMap.Marker(point, {
                icon: myIcon
            });
            vm.map.addOverlay(mark);
            // 添加鼠标划入坐标点的显示内容
            let str = "";
            str += '<div class="info-box">';
            str += "<p>" + data.name + "</p>";
            if (vm.showType == "zy") {
                str += "<p>备电点：" + data.bddsl + "</p>";
                str += "<p>充点电：" + data.cddsl + "</p>";
                str += "<p>换电点：" + data.hddsl + "</p>";
                str += "<p>售电点：" + data.sddsl + "</p>";
                str += "<p>储能站：" + data.cnzsl + "</p>";
                str += "<p>延寿站：" + data.yszsl + "</p>";
            } else if (vm.showType == "jk") {
                if (vm.mapUrl === "energy_station_map") {
                    data.topDisChargeCount != ""
                        ? (str +=
                              "<p>蓄电池放电8小时以上站点数量：" +
                              data.topDisChargeCount +
                              "个</p>")
                        : (str += "<p>蓄电池放电8小时以上站点数量：0</p>");
                    data.lowDisChargeCount != ""
                        ? (str +=
                              "<p>蓄电池放电不足4小时站点数量：" +
                              data.lowDisChargeCount +
                              "个</p>")
                        : (str += "<p>蓄电池放电不足4小时站点数量：0</p>");
                    data.dtuSysWarnCount != ""
                        ? (str +=
                              "<p>蓄电池管理设备/DTU系统告警数量：" +
                              data.dtuSysWarnCount +
                              "个</p>")
                        : (str += "<p>蓄电池管理设备/DTU系统告警数量：0</p>");
                    data.normalDisChargeCount != ""
                        ? (str +=
                              "<p>蓄电池放电4~8小时站点数量：" +
                              data.normalDisChargeCount +
                              "个</p>")
                        : (str += "<p>蓄电池放电4~8小时站点数量：0</p>");
                    data.averageDisChargeWaveCount != ""
                        ? (str +=
                              "<p>平均放电时长变动>20%站点数量：" +
                              data.averageDisChargeWaveCount +
                              "个</p>")
                        : (str += "<p>平均放电时长变动>20%站点数量：0</p>");
                    data.dtuOfflineCount != ""
                        ? (str +=
                              "<p>蓄电池管理设备/DTU离线告警数量：" +
                              data.dtuOfflineCount +
                              "个</p>")
                        : (str += "<p>蓄电池管理设备/DTU离线告警数量：0</p>");
                    data.voltageWarnCount != ""
                        ? (str +=
                              "<p>蓄电池电压告警数量：" +
                              data.voltageWarnCount +
                              "个</p>")
                        : (str += "<p>蓄电池电压告警数量：0</p>");
                    data.tempWarnCount != ""
                        ? (str +=
                              "<p>蓄电池温度告警数量：" +
                              data.tempWarnCount +
                              "个</p>")
                        : (str += "<p>蓄电池温度告警数量：0</p>");
                } else {
                    data.topDisChargeCount != ""
                        ? (str +=
                              "<p>蓄电池放电3小时以上站点数量：" +
                              data.topDisChargeCount +
                              "个</p>")
                        : (str += "<p>蓄电池放电3小时以上站点数量：0</p>");
                    data.lowDisChargeCount != ""
                        ? (str +=
                              "<p>蓄电池放电不足1小时站点数量：" +
                              data.lowDisChargeCount +
                              "个</p>")
                        : (str += "<p>蓄电池放电不足1小时站点数量：0</p>");
                    data.dtuOfflineCount != ""
                        ? (str +=
                              "<p>蓄电池管理设备/DTU离线告警数量：" +
                              data.dtuOfflineCount +
                              "个</p>")
                        : (str += "<p>蓄电池管理设备/DTU离线告警数量：0</p>");
                    data.normalDisChargeCount != ""
                        ? (str +=
                              "<p>蓄电池放电1~3小时站点数量：" +
                              data.normalDisChargeCount +
                              "个</p>")
                        : (str += "<p>蓄电池放电1~3小时站点数量：0</p>");
                    data.dtuSysWarnCount != ""
                        ? (str +=
                              "<p>蓄电池管理设备/DTU系统告警数量：" +
                              data.dtuSysWarnCount +
                              "个</p>")
                        : (str += "<p>蓄电池管理设备/DTU系统告警数量：0</p>");
                    data.voltageWarnCount != ""
                        ? (str +=
                              "<p>蓄电池电压告警数量：" +
                              data.voltageWarnCount +
                              "个</p>")
                        : (str += "<p>蓄电池电压告警数量：0</p>");
                    data.tempWarnCount != ""
                        ? (str +=
                              "<p>蓄电池温度告警数量：" +
                              data.tempWarnCount +
                              "个</p>")
                        : (str += "<p>蓄电池温度告警数量：0</p>");
                }
            } else if (vm.showType == "yw") {
                let energyStation = data.energyStation;
                let prolongStation = data.prolongStation;
                energyStation.capacity != ""
                    ? (str +=
                          "<p>储能电池容量总计：" +
                          energyStation.capacity +
                          "KWH</p>")
                    : (str += "<p>储能电池容量总计：0</p>");
                energyStation.fdl != ""
                    ? (str +=
                          "<p>削峰填谷能力：" + energyStation.fdl + "KWH</p>")
                    : (str += "<p>削峰填谷能力：0</p>");
                energyStation.ljjfje != ""
                    ? (str +=
                          "<p>累计节费金额：" + energyStation.ljjfje + "元</p>")
                    : (str += "<p>累计节费金额：0</p>");
                energyStation.dzrjfdsc != ""
                    ? (str +=
                          "<p>单站日均放电时长：" +
                          energyStation.dzrjfdsc +
                          "H</p>")
                    : (str += "<p>单站日均放电时长：0</p>");
                prolongStation.t0pjyjsc != ""
                    ? (str +=
                          "<p>T0平均应急时长：" +
                          prolongStation.t0pjyjsc +
                          "H</p>")
                    : (str += "<p>T0平均应急时长：0</p>");
                prolongStation.t1pjyjsc != ""
                    ? (str +=
                          "<p>T1平均应急时长：" +
                          prolongStation.t1pjyjsc +
                          "H</p>")
                    : (str += "<p>T1平均应急时长：0</p>");
                prolongStation.t1pjyjsc != ""
                    ? (str +=
                          "<p>延寿管理提升：" +
                          prolongStation.t1pjyjsc +
                          "%</p>")
                    : (str += "<p>延寿管理提升：0</p>");
                prolongStation.t1pjyjsc != ""
                    ? (str +=
                          "<p>应急次数：" + prolongStation.t1pjyjsc + "次</p>")
                    : (str += "<p>应急次数：0</p>");
            } else if (vm.showType == "yy") {
                str += '<div class="chart-info-item">';
                str += "<p>蓄电池保障:</p>";
                str +=
                    "<p>正常:<span>" +
                    data.xdczcsl +
                    "</span>&nbsp;&nbsp;预警:<span>" +
                    data.xdcgjsl +
                    "</span>&nbsp;&nbsp;应急:<span>" +
                    data.xdcyjsl +
                    "</span></p>";
                str +=
                    "<p>储存量:<span>" +
                    data.xdccdl +
                    "</span>&nbsp;&nbsp;释放能量:<span>" +
                    data.xdcfdl +
                    "</span>&nbsp;&nbsp;光伏充电量(KWH):<span>" +
                    data.xdcgfcdl +
                    "</span>&nbsp;&nbsp;</p>";
                str += "</div>";
                str += '<div class="chart-info-item">';
                str += "<p>充电站:</p>";
                str +=
                    "<p>正常:<span>" +
                    data.cdzzcsl +
                    "</span>&nbsp;&nbsp;预警:<span>" +
                    data.cdzgjsl +
                    "</span>&nbsp;&nbsp;应急:<span>" +
                    data.cdzyjsl +
                    "</span></p>";
                str +=
                    "<p>储存量:<span>" +
                    data.cdzcdl +
                    "</span>&nbsp;&nbsp;释放能量:<span>" +
                    data.cdzfdl +
                    "</span>&nbsp;&nbsp;光伏充电量(KWH):<span>" +
                    data.cdzgfcdl +
                    "</span>&nbsp;&nbsp;</p>";
                str += "</div>";
                str += '<div class="chart-info-item">';
                str += "<p>移动电池包:</p>";
                str +=
                    "<p>正常:<span>" +
                    data.yddcbzcsl +
                    "</span>&nbsp;&nbsp;预警:<span>" +
                    data.yddcbgjsl +
                    "</span>&nbsp;&nbsp;应急:<span>" +
                    data.yddcbyjsl +
                    "</span></p>";
                str +=
                    "<p>储存量:<span>" +
                    data.yddcbcdl +
                    "</span>&nbsp;&nbsp;释放能量:<span>" +
                    data.yddcbfdl +
                    "</span>&nbsp;&nbsp;光伏充电量(KWH):<span>" +
                    data.yddcbgfcdl +
                    "</span>&nbsp;&nbsp;</p>";
                str += "</div>";
                str += '<div class="chart-info-item">';
                str += "<p>储能中心:</p>";
                str +=
                    "<p>正常:<span>" +
                    data.cnzzcsl +
                    "</span>&nbsp;&nbsp;预警:<span>" +
                    data.cnzgjsl +
                    "</span>&nbsp;&nbsp;应急:<span>" +
                    data.cnzyjsl +
                    "</span></p>";
                str +=
                    "<p>储存量:<span>" +
                    data.cnzcdl +
                    "</span>&nbsp;&nbsp;释放能量:<span>" +
                    data.cnzfdl +
                    "</span>&nbsp;&nbsp;光伏充电量(KWH):<span>" +
                    data.cnzgfcdl +
                    "</span>&nbsp;&nbsp;</p>";
            } else if (vm.showType == "fl") {
                str += "<p>平均电流：" + data.zpjdl + "</p>";
                str += "<p>平均电量：" + data.zpjdliang + "</p>";
            }

            // str += '<p>蓄电池规模：' + data.xdcgmBdCdHdSd + '</p>';
            str += "</div>";
            // 创建一个文本标注实例
            var lable = new BMap.Label(str);
            // 清除百度地图自带样式
            lable.setStyle({
                border: "none",
                border: "1px solid rgba(36,110,221, .5)",
                borderRadius: "5px",
                paddding: "0 10px"
            });
            // 设置标注的地理坐标
            lable.setPosition(point);
            // 默认不显示文本标注
            lable.hide();
            // 在全景场景内添加覆盖物
            vm.map.addOverlay(lable);
            mark.addEventListener("mouseover", function(e) {
                lable.show();
            });
            mark.addEventListener("mouseout", function() {
                lable.hide();
            });
            var label1 = new BMap.Label(data.name, {
                offset: new BMap.Size(20, -10)
            });
            label1.setStyle({
                border: "none",
                border: "1px solid rgba(36,110,221, .5)",
                borderRadius: "5px"
            });

            mark.setLabel(label1);

            if (!vm.isQx && type == "qu") {
                return;
            }
            if (type) {
                mark.addEventListener("click", function(e) {
                    if (type == "shi") {
                        vm.cityId = data.id;
                    } else if (type == "qu") {
                        vm.prefectureId = data.id;
                    }
                    vm.childMethod("", vm.cityId, vm.prefectureId);
                    vm.pointClick(data.name);
                });
            }
        },
        //父级事件
        childMethod(provinceId, cityId, prefectureId) {
            this.$emit("getinfo", provinceId, cityId, prefectureId);
        },
        //市级点击事件
        pointClick(name) {
            // 百度地图API功能
            let vm = this;
            vm.clickName = name;
            vm.map.enableScrollWheelZoom();
            vm.map.clearOverlays(); //清除地图覆盖物
            function getPointBoundary() {
                let bdary = new BMap.Boundary();
                bdary.get(name, function(rs) {
                    //获取行政区域

                    let count = rs.boundaries.length; //行政区域的点有多少个
                    if (count === 0) {
                        alert("未能获取当前输入行政区域");
                        return;
                    }
                    let pointArray = [];
                    for (let i = 0; i < count; i++) {
                        let ply = new BMap.Polygon(rs.boundaries[i], {
                            strokeWeight: 2,
                            strokeColor: "#2174ee",
                            fillOpacity: 0.07,
                            fillColor: "#2174ee"
                        }); //建立多边形覆盖物
                        vm.map.addOverlay(ply); //添加覆盖物
                        pointArray = pointArray.concat(ply.getPath());
                    }
                    vm.map.setViewport(pointArray); //调整视野
                    vm.getData("", vm.cityId, vm.prefectureId);
                });
            }
            setTimeout(function() {
                getPointBoundary();
            }, 100);
        },
        //行政区边界
        getBoundary(name) {
            let vm = this;
            let bdary = new BMap.Boundary();
            bdary.get(name, function(rs) {
                // map.clearOverlays();
                var count = rs.boundaries.length;
                if (count === 0) {
                    alert("未能获取当前输入行政区域");
                    return;
                }
                var pointArray = [];
                for (var i = 0; i < count; i++) {
                    var ply = new BMap.Polygon(rs.boundaries[i], {
                        strokeWeight: 2,
                        strokeColor: "#2174ee",
                        fillOpacity: 0.07,
                        fillColor: "#2174ee"
                    });
                    vm.map.addOverlay(ply);
                    pointArray = pointArray.concat(ply.getPath());
                }
                // if ($.cookie("userRole") != "河南") {
                //     map.setViewport(pointArray); //调整视野
                // }
            });
        }
    }
};
</script>

<style scoped lang='scss'>
.mapreturn {
    cursor: pointer;
    position: absolute;
    z-index: 10;
    text-size-adjust: none;
    bottom: auto;
    right: auto;
    top: 10px;
    left: 10px;
}
.red {
    background: red;
}

.wrap {
    padding: 12px 12px 12px 12px;
    background: #fff;
}
.nopad {
    padding: 0px 12px 12px 12px;
}
.tab_wrap {
    padding-bottom: 10px;
    border-bottom: 1px solid #e4ebf0;
    height: 100%;
}
.map_wrap {
    margin-top: 14px;
    width: 100%;
    height: 700px;
    overflow: hidden;
    position: relative;
    z-index: 0;
    // background-color: rgb(243, 241, 236);
    color: rgb(0, 0, 0);
    text-align: left;
}
.pages {
    width: 90%;
    min-height: 448px;
    margin-left: 10px;
}
#boxMap {
    height: 100%;
    width: 100%;
}
</style>
