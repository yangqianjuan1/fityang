<template>
    <div class="page">
        
        <el-row>
            <el-col :span="14">
                <div class="area">
                    <div class="wrap">
                        <div class="title">
                            <p>客户信息</p>
                            <span>查看全部 &gt;</span>
                        </div>
                        <el-table
                            :data="tableData1"
                            style="width: 100%;margin-top:10px;margin-bottom:10px;"
                            :header-cell-style="{background:'#E4EAEC',color:'#666',fontSize:'12px'}"
                            size='mini'
                        >
                            <el-table-column prop="date" label="客户名称" align="center"></el-table-column>
                            <el-table-column prop="name" label="联系人" align="center"></el-table-column>
                            <el-table-column prop="name" label="联系电话" align="center"></el-table-column>
                            <el-table-column prop="name" label="联系地址" align="center"></el-table-column>
                            <el-table-column prop="name" label="业务类型" align="center"></el-table-column>
                        </el-table>
                    </div>
                </div>
            </el-col>
             <el-col :span="10">
                <div class="area">
                    <div class="wrap">
                        <div class="title">
                            <p>合同信息</p>
                            <span>查看全部 &gt;</span>
                        </div>
                        <el-table
                            :data="tableData1"
                            style="width: 100%;margin-top:10px;margin-bottom:10px;"
                            :header-cell-style="{background:'#E4EAEC',color:'#666',fontSize:'12px'}"
                            size='mini'
                        >
                            <el-table-column prop="date" label="计费模式" align="center"></el-table-column>
                            <el-table-column prop="name" label="合同周期" align="center"></el-table-column>
                            <el-table-column prop="name" label="付款方式" align="center"></el-table-column>
                            <el-table-column prop="name" label="合同附件" align="center"></el-table-column>
                        </el-table>
                    </div>
                </div>
            </el-col>
        </el-row>
         <el-row style="margin-top:10px;">
            <el-col :span="10">
                <div class="area">
                    <div class="wrap">
                        <div class="title">
                            <p>固定被电+移动发电使用记录</p>
                            <span>查看全部 &gt;</span>
                        </div>
                        <el-table
                            :data="tableData1"
                            style="width: 100%;margin-top:10px;margin-bottom:10px;"
                            :header-cell-style="{background:'#E4EAEC',color:'#666',fontSize:'12px'}"
                            size='mini'
                        >
                            <el-table-column prop="date" label="开始时间" align="center"></el-table-column>
                            <el-table-column prop="name" label="结束时间" align="center"></el-table-column>
                            <el-table-column prop="name" label="使用内容" align="center"></el-table-column>
                            <el-table-column prop="name" label="结束原因" align="center"></el-table-column>
                        </el-table>
                    </div>
                </div>
            </el-col>
             <el-col :span="14">
                <div class="area">
                    <div class="wrap">
                        <div class="title">
                            <p>备电设备信息</p>
                            <span>查看全部 &gt;</span>
                        </div>
                        <el-table
                            :data="tableData1"
                            style="width: 100%;margin-top:10px;margin-bottom:10px;"
                            :header-cell-style="{background:'#E4EAEC',color:'#666',fontSize:'12px'}"
                            size='mini'
                        >
                            <el-table-column prop="date" label="备电设备编号" align="center"></el-table-column>
                            <el-table-column prop="name" label="备电地址" align="center"></el-table-column>
                            <el-table-column prop="name" label="主设备" align="center"></el-table-column>
                            <el-table-column prop="name" label="电池" align="center"></el-table-column>
                            <el-table-column prop="name" label="设备类型" align="center"></el-table-column>
                            <el-table-column prop="name" label="电池管理系统" align="center"></el-table-column>

                        </el-table>
                    </div>
                </div>
            </el-col>
         </el-row>
         <el-row style="margin-top:10px;">
            <el-col :span="10">
                <div class="area">
                    <div class="wrap">
                        <div class="title">
                            <p>订单执行情况查看全部 ></p>
                            <span>查看全部 &gt;</span>
                        </div>
                        <el-table
                            :data="tableData1"
                            style="width: 100%;margin-top:10px;margin-bottom:10px;"
                            :header-cell-style="{background:'#E4EAEC',color:'#666',fontSize:'12px'}"
                            size='mini'
                        >
                            <el-table-column prop="date" label="客户名称" align="center"></el-table-column>
                            <el-table-column prop="name" label="金额" align="center"></el-table-column>
                            <el-table-column prop="name" label="状态" align="center"></el-table-column>
                            <el-table-column prop="name" label="发单时间" align="center"></el-table-column>
                        </el-table>
                    </div>
                </div>
            </el-col>
             <el-col :span="14">
                <div class="area">
                    <div class="wrap">
                        <div class="title">
                            <p>服务信息</p>
                            <span>查看全部 &gt;</span>
                        </div>
                        <el-table
                            :data="tableData1"
                            style="width: 100%;margin-top:10px;margin-bottom:10px;"
                            :header-cell-style="{background:'#E4EAEC',color:'#666',fontSize:'12px'}"
                            size='mini'
                        >
                            <el-table-column prop="date" label="客户名称" align="center"></el-table-column>
                            <el-table-column prop="name" label="状态" align="center"></el-table-column>
                            <el-table-column prop="name" label="相关信息" align="center"></el-table-column>
                        </el-table>
                    </div>
                </div>
            </el-col>
         </el-row>
    </div>
</template>

<script>

export default {
    data() {
        return {
            tableData1: [],
            form: {}
        };
    },
    components: {
    },
    created() {},
    mounted() {},
    methods: {}
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
    padding-right: 10px;
    .wrap {
        padding-left: 20px;
        padding-right: 20px;
        padding-bottom: 20px;
        background: #fff;
        border-radius: 4px;
    }
}
.title {
    padding-top: 20px;
    padding-bottom: 20px;
    font-size: 16px;
    p {
        float: left;
    }
    span {
        float: right;
        font-size: 13px;
        color: #0070c9;
    }
}
</style>

