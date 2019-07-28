<template>
    <div class="page">
        <times :show="false" />
        <div class="area">
            <div class="news-left-block"></div>
            <div class="news-title">
                <p>{{name}} - 详情页面</p>
            </div>
            <el-form ref="form" :model="form" label-width="100px">
                <el-row :gutter="20">
                    <el-col :span="6">
                        <el-form-item label="基站名称：">
                            <el-input v-model="form.name" disabled size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="基站编码：">
                            <el-input v-model="form.name" disabled size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="6">
                        <el-form-item label="经度：">
                            <el-input v-model="form.name" disabled size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="纬度：">
                            <el-input v-model="form.name" disabled size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="详细地址：">
                            <el-input v-model="form.name" disabled size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item>
                            <el-button type="primary" size="mini">返回</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="6">
                        <el-form-item label="运营商：">
                            <el-input v-model="form.name" disabled size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div class="clear"></div>
        </div>
        <div class="area2">
            <div class="topwrap">
                <el-form ref="form" :model="form" label-width="100px">
                    <el-row :gutter="20">
                        <el-col :span="6">
                            <el-form-item label="查询类型:">
                                <el-radio-group v-model="form.radio" size="mini">
                                    <el-radio-button label="date">日</el-radio-button>
                                    <el-radio-button label="month">月</el-radio-button>
                                    <el-radio-button label="year">年</el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="活动时间">
                                <el-date-picker
                                    v-model="form.time"
                                    type="datetimerange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                ></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item>
                                <el-button type="primary" size="mini">查询</el-button>
                                <el-button type="primary" size="mini">重置</el-button>
                                <el-button type="primary" size="mini">导出</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <div class="pie" ref="pie" id="pie"></div>
        </div>
    </div>
</template>

<script>
import times from "../../../components/tableTime";
export default {
    data() {
        return {
            form: {
                year: "",
                month: "",
                day: ""
            },
            name: "",
            oneinf: {}
        };
    },
    components: {
        times
    },
    created() {},

    mounted() {},
    methods: {}
};
</script>

<style scoped lang='scss'>
.topwrap {
    border-bottom: 1px solid #dcdfe6;
    padding-bottom: 10px;
}
.pie{
    height: 350px;
}
.news-left-block {
    float: left;
    width: 6px;
    height: 16px;
    background: #0070c9;
    margin-left: 16px;
    margin-top: 20px;
}
.area {
    background: #fff;
    padding: 10px;
    margin-bottom: 20px;
    border-radius: 5px;
}
.area2 {
    background: #fff;
    padding-top: 10px;
    margin-bottom: 20px;
    border-radius: 5px;
}
.page {
    padding-top: 0.7%;
    width: 1280px;
    min-height: 700px;
    margin: 0 auto;
}
.news-title {
    float: left;
    width: calc(100% - 0.7% - 0.7% - 6px - 16px);
    margin-left: 0.7%;
    margin-right: 0.7%;
    p {
        cursor: default;
        float: left;
        font-size: 16px;
        color: #0070c9;
        margin-top: 17px;
        margin-bottom: 13px;
        font-weight: bold;
    }
}
</style>
<style scoped>
.page >>> .el-form-item {
    margin: 0;
}
</style>


