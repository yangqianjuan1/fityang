<template>
    <div class="wrap">
        <el-form
            :inline="true"
            :model="form"
            class="demo-form-inline"
            size="small"
            label-width="100px"
            label-position="left"
        >
            <el-row>
                <el-form-item label="基站名称：">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="基站编码：">
                    <el-input v-model="form.code"></el-input>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="开始时间：">
                    <el-date-picker v-model="form.st" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间：">
                    <el-date-picker v-model="form.et" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                    <el-button type="primary" @click="onSubmit">重置</el-button>
                    <el-button type="primary" @click="onSubmit">导出</el-button>
                </el-form-item>
            </el-row>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                name:'',
                code:'',
                st:'',
                et:''
            }
        };
    },
    components: {},
    created() {},
    mounted() {},
    methods: {
        onSubmit(){
            let data = {

            }
            this.$emit('Submi',data)
        }
    }
};
</script>

<style scoped lang='scss'>
.wrap {
    background: #fff;
    padding: 20px 20px 0px 20px;
    margin: 0 20px 0px 20px;
}
</style>
