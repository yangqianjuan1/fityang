<template>
    <div class="modify">
        <div class="title">修改密码1</div>
        <div class="line">
            <el-form
                :model="ruleForm"
                status-icon
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
                label-position="top"
            >
                <el-form-item
                    style="margin-top:20px;"
                    label="原密码"
                    prop="old"
                    :rules="filterRules({type:'special',required:true})"
                >
                    <el-input v-model="ruleForm.old" placeholder="请输入原密码"></el-input>
                </el-form-item>
                <el-form-item
                    style="margin-top:20px;"
                    label="新密码"
                    prop="newOne"
                    :rules="filterRules({type:'special',required:true})"
                >
                    <el-input type="password" v-model="ruleForm.newOne" placeholder="请输入新密码"></el-input>
                </el-form-item>
                <el-form-item
                    style="margin-top:20px;"
                    label="重复新密码"
                    prop="newAgain"
                    :rules="filterRules({type:'special',required:true})"
                >
                    <el-input type="password" v-model="ruleForm.newAgain" placeholder="请重复输入新密码"></el-input>
                </el-form-item>
                <div class="btn_wrap">
                    <el-button type="primary" @click="updata('ruleForm')">确定</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
import table from "../../mixins/table";
export default {
    data() {
        return {
            ruleForm: {
                old: "",
                newOne: "",
                newAgain: ""
            }
        };
    },
    mixins: [table],
    components: {},
    created() {},
    mounted() {},
    methods: {
        updata(formName) {
            let vm = this;
            vm.$refs[formName].validate(valid => {
                if (valid) {
                    let info = {
                        id: vm.userInfo.id,
                        old: vm.ruleForm.old,
                        newOne: vm.ruleForm.newOne,
                        newAgain: vm.ruleForm.newAgain
                    };
                    vm.Api.updataPW(info).then(res => {
                        vm.$notify({
                            title: "成功",
                            message: "修改成功",
                            type: "success"
                        });
                        vm.setUserInfo(null);
                        vm.$alert("跳转至登录页", "修改成功", {
                            confirmButtonText: "确定",
                            callback: action => {
                                vm.$router.push({
                                    path: "/login"
                                });
                            }
                        });
                    });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        }
    }
};
</script>

<style scoped lang='scss'>
.demo-ruleForm {
    width: 270px;
    margin: 0 auto;
}
.line {
    margin-top: 1.2%;
    padding-top: 2.1%;
    border-top: 1px solid #e4ebf0;
}
.modify {
    min-height: 700px;
    padding-top: 0.7%;
    width: 1280px;
    margin: 20px auto 0 auto;
    background: #fff;
}
.title {
    font-family: PingFangSC-Medium;
    font-size: 18px;
    color: #0070c9;
    border-left: 6px solid #0070c9;
    margin-top: 10px;
    text-indent: 10px;
    margin-left: 10px;
}
.btn_wrap {
    width: 152px;
    margin: 0 auto;
    .el-button {
        margin-top: 30px;
        width: 100%;
    }
}
</style>
