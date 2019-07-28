<template>
  <div class="page">
    <div class="no_logged box_s">
      <div class="login"></div>
      <el-form
        :model="ruleForm"
        status-icon
        ref="ruleForm"
        label-width="0px"
        class="demo-ruleForm"
      >
        <el-form-item
          style="margin-top:20px;"
          label
          prop="name"
          :rules="filterRules({required:true})"
        >
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item
          style="margin-top:20px;"
          label
          prop="pass"
          :rules="filterRules({required:true})"
        >
          <el-input
            type="password"
            v-model="ruleForm.pass"
          ></el-input>
        </el-form-item>
        <div class="btn_wrap">
          <el-button
            type="primary"
            @click="updata('ruleForm')"
          >确定</el-button>
        </div>
      </el-form>
    </div>
    <p class="text">Copyright © 2019 版权所有 京ICP备16028392号-1 京公网安备11010802021520号</p>
  </div>
</template>

<script>
import * as types from "@/store/types";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        pass: "",
        appCode: "HENAN"
      }
    };
  },
  components: {},
  created() {
    window.noal = false;
  },
  mounted() {},
  methods: {
    ...mapMutations({
      setUserInfo: types.global.mutations.SET_USER_INFO
    }),
    updata(formName) {
      let vm = this;
      vm.$refs[formName].validate(valid => {
        if (valid) {
          let info = {
            userName: vm.ruleForm.name,
            userPwd: vm.ruleForm.pass
          };
          // vm.Api.login(info).then(res => {
          //     if (res.result.adminToken) {
          //         let data = res.result;
          //         if (data.mapRange == 1) {
          //             data.provinceId = data.mapRangeId;
          //             data.cityId = null;
          //             data.prefectureId = null;
          //         } else if (data.mapRange == 2) {
          //             data.provinceId = null;
          //             data.cityId = data.mapRangeId;
          //             data.prefectureId = null;
          //         } else if (data.mapRange == 3) {
          //             data.provinceId = null;
          //             data.cityId = null;
          //             data.prefectureId = data.mapRangeId;

          //         }
          //         vm.setUserInfo(data);
          //         this.$router.push({
          //             path: "/"
          //         });
          //     }
          // });
          this.$router.push({
            path: "/"
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
  margin: 0 30px;
}
.btn_wrap {
  width: 100%;
  margin-top: 46px;
  .el-button {
    width: 100%;
  }
}
.page {
  background: url("../../assets/img/bg.png") no-repeat;
  background-size: cover;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.login {
  width: 162px;
  height: 49px;
  background-image: url("../../assets/img/logo_B.png");
  background-size: 100%;
  margin: auto;
  margin-top: 18px;
}
.text {
  font-family: MicrosoftYaHei;
  font-size: 10.5px;
  color: #ffffff;
  letter-spacing: 0;
  text-align: center;
  margin-top: 179px;
  position: absolute;
  bottom: 4%;
  margin: auto;
  width: 100%;
}
.no_logged {
  width: 380px;
  height: 368px;
  background: #ffffff;
  box-shadow: 0 0 22px 0 rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  margin-right: 106px;
  margin-top: 150px;
  float: right;
}
</style>

