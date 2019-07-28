<template>
    <div class="table_wp">
        <div class="flex">
            <el-table
                :data="data"
                style="width: 100%"
                size="mini"
                :height="her"
                :header-cell-style="{background:'#f2f2f2',color:'#666'}"
                default-expand-all
                @row-click="openDetails"
            >
                <template v-if="type=='zdxqs'">
                    <el-table-column prop="panelName"  fixed label="站点名称"></el-table-column>
                    <el-table-column prop="name"  fixed label="地区名称"></el-table-column>
                    <el-table-column prop="siteDevops" label="站点id"></el-table-column>
                    <el-table-column prop="zdrdliang" width="100px" label="直流总电量"></el-table-column>
                    <el-table-column prop="drdliang"  width="100px" label="环境系数"></el-table-column>
                    <el-table-column prop="yddrdliang"  label="移动电量"></el-table-column>
                    <el-table-column prop="yddrdliangzb " width="120px" label="移动电量占比">
                          <template slot-scope="scope">{{scope.row.yddrdliangzb+'%'}}</template>
                    </el-table-column>
                    <el-table-column prop="ltdliang"  label="联通电量"></el-table-column>
                    <el-table-column prop="ltdliangzb" width="100px"  label="联通电量占比">
                          <template slot-scope="scope">{{scope.row.ltdliangzb+'%'}}</template>
                    </el-table-column>
                    <el-table-column prop="dxdliang" label="电信电量"></el-table-column>
                    <el-table-column prop="dxdliangzb" width="100px" label="电信电量占比">
                          <template slot-scope="scope">{{scope.row.dxdliangzb+'%'}}</template>
                    </el-table-column>
                </template>
                <template v-if="type=='gjs'">
                    <el-table-column prop="name" label="地市/区县"></el-table-column>
                    <el-table-column prop="panelName" label="站点名称"></el-table-column>
                    <el-table-column prop="yddl" label="移动电量"></el-table-column>
                    <el-table-column prop="ltdl" label="联通电量"></el-table-column>
                    <el-table-column prop="dxdl" label="电信电量"></el-table-column>

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
            default: "zdxqs"
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
       openDetails(row){
           console.log(row.siteDevops)

            this.$router.push({
                path: "chart_details",
                query: {
                    id: row.siteDevops
                }
            });
       }
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
    padding: 0px 0px 0px 49px !important;
}
</style>
