<template>
    <div class="page">
        <times :time="time" :show="false"/>
        <div class="area">
            <el-form
                :inline="true"
                :model="formInline"
                class="demo-form-inline"
                label-width="80px"
                size="small"
                label-position="left"
            >
                <el-row>
                    <el-form-item label="区域">
                        <div class="wrap">
                             <div class="search-box" :class="clasId == item.id? 'active':'' " v-for="(item,index) in cityList" :key="index" @click="act(item.id)">{{item.name}}</div>
                        </div>
                        <!-- <el-radio-group v-model="formInline.devType" size="small">
                            <el-radio-button v-for="(item,index) in cityList"  :label="item.name" :key="index"></el-radio-button>
                        </el-radio-group> -->
                       
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="业务类型">
                        <el-radio-group v-model="formInline.devType" size="small">
                            <el-radio-button label="备电"></el-radio-button>
                            <el-radio-button label="充电"></el-radio-button>
                            <el-radio-button label="换电"></el-radio-button>
                            <el-radio-button label="售电"></el-radio-button>
                            <el-radio-button label="储能"></el-radio-button>
                            <el-radio-button label="延寿"></el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="时间">
                        <el-radio-group v-model="formInline.devType" size="small">
                            <el-radio-button label="1月"></el-radio-button>
                            <el-radio-button label="2月"></el-radio-button>
                            <el-radio-button label="3月"></el-radio-button>
                            <el-radio-button label="6月"></el-radio-button>
                            <el-radio-button label="12月"></el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                </el-row>

                <el-row>
                    <el-button type="primary">查询</el-button>
                </el-row>
            </el-form>
        </div>
        <div class="area" style="margin-top: 20px;padding:20px;">
            <el-table
                :data="tableData"
                style="width: 100%;margin-top:10px;"
                :header-cell-style="{background:'#E4EAEC',color:'#666',fontSize:'12px'}"
            >
                <el-table-column prop="userName" label="站点名称" align="center"></el-table-column>
                <el-table-column prop="userTrueName" label="站点编号" align="center"></el-table-column>

                <el-table-column prop="userTrueName" label="蓄电池类型" align="center"></el-table-column>

                <el-table-column prop="userTrueName" label="蓄电池容量" align="center"></el-table-column>

                <el-table-column prop="userTrueName" label="DTU/电池管理器" align="center"></el-table-column>
                <el-table-column prop="userTrueName" label="启用时间" align="center"></el-table-column>

                <el-table-column prop="userTrueName" label="备电时长" align="center"></el-table-column>

                <el-table-column prop="userTrueName" label="末次应急放电时长" align="center"></el-table-column>

            </el-table>
        </div>
    </div>
</template>

<script>
import times from "../../components/tableTime";
import table from "../../mixins/table";

export default {
    data() {
        return {
            dialogVisible: false,
            time: "",
            srtatendTime: "",
            formInline: {
                provinceId: "",
                cityId: "",
                prefectureId: "",
            },
            clasId:'',
            tableData: [],
            cityList:[]
        };
    },
    mixins: [table],
    components: {
        times,
    },
    created() {
        // this.onSubmit();
        this.getShi()
    },
    mounted() {},
    methods: {
        act(id){
            this.clasId = id;
        },
        onSubmit() {
            let vm = this;
            vm.Api.select_customer(vm.formInline).then(res => {
                vm.tableData = res.result;
            });
        },
        getShi(){
            let vm  = this;
            vm.tableApi.shi(17).then((res) => {
                console.log(res)
                vm.cityList = res.result
            })
        }
    }
};
</script>

<style scoped lang='scss'>
.page {
    padding-top: 0.7%;
    width: 1280px;
    min-height: 700px;
    margin: 0 auto;
}
.area {
    background: #fff;
    padding: 20px 0 20px 25px;
}
.wrap{
    width: 95%;
    float: right;
    margin-top: -33px;
}
.line {
    text-align: center;
}
.search-box{
    padding: 0 20px;
    margin-left: 5px;
    margin-right: 5px;
    cursor: pointer;
    border-radius: 25px;
    transition: background-color .3s ease;
    margin-bottom: 10px;
   
   display: inline-block;
}
.active {
    background-color: #409EFF;
    color: #fff;
}
</style>


<style scoped>
</style>
