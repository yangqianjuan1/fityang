<template>

  <div class="page">
    <times :show="false" />
    <div class="area">

      <div class="news-title">
        <p><span class="news-left-block"></span><span>创建合同信息</span></p>
        <el-button
          type="primary"
          size="mini"
          class="back"
          @click="fanhui"
        >返回列表</el-button>
      </div>

      <div class="wrap">
        <el-row :gutter="20">
          <el-col
            :span="16"
            class="form"
            :offset="4"
          >
            <el-form
              ref="form"
              :model="form"
              label-width="80px"
            >
              <el-form-item
                label="合同编号"
                label-width="200px"
              >
                <el-input
                  v-model="form.username"
                  placeholder="请输入合同编号"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="客户名称"
                label-width="200px"
              >
                <el-input
                  v-model="form.customer"
                  placeholder="请输入客户名称"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="合同类别"
                label-width="200px"
              >
                <el-radio-group
                  v-model="form.level"
                  size="mini"
                  :border="true"
                >
                  <el-radio-button label="VIP1"></el-radio-button>
                  <el-radio-button label="VIP2"></el-radio-button>
                  <el-radio-button label="VIP3"></el-radio-button>
                  <el-radio-button label="VIP4"></el-radio-button>
                  <el-radio-button label="VIP5"></el-radio-button>

                </el-radio-group>
              </el-form-item>

              <el-form-item
                label="基站"
                label-width="200px"
              >
                <el-select
                  v-model="form.station"
                  placeholder="请选择活动区域"
                >
                  <el-option
                    label="区域一"
                    value="shanghai"
                  ></el-option>
                  <el-option
                    label="区域二"
                    value="beijing"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="合同地址"
                label-width="200px"
              >
                <el-input v-model="form.address"></el-input>
              </el-form-item>
              <el-form-item
                label="签约金额"
                label-width="200px"
              >
                <el-input
                  v-model="form.iphone"
                  placeholder="请输入手机号码"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="约定备店时长"
                label-width="200px"
              >
                <el-input
                  v-model="form.iphone"
                  placeholder="请输入手机号码"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="客户签约人"
                label-width="200px"
              >
                <el-input
                  v-model="form.iphone"
                  placeholder="请输入手机号码"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="经办人"
                label-width="200px"
              >
                <el-input
                  v-model="form.iphone"
                  placeholder="请输入手机号码"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="办理日期"
                label-width="200px"
              >
                <el-date-picker
                  v-model="handleDate"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>

              <el-form-item
                label="签约周期"
                label-width="200px"
              >
                <el-input
                  v-model="form.iphone"
                  placeholder="请输入手机号码"
                ></el-input>
              </el-form-item>
              <el-form-item
                label='合约生效日'
                label-width="200px"
              >
                <el-date-picker
                  v-model="srtatendTime"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
              </el-form-item>
              <el-form-item
                label="付款方式"
                label-width="200px"
              >
                <el-radio-group
                  v-model="form.level"
                  size="mini"
                  :border="true"
                >
                  <el-radio-button label="VIP1"></el-radio-button>
                  <el-radio-button label="VIP2"></el-radio-button>
                  <el-radio-button label="VIP3"></el-radio-button>
                  <el-radio-button label="VIP4"></el-radio-button>
                  <el-radio-button label="VIP5"></el-radio-button>

                </el-radio-group>
              </el-form-item>
              <el-form-item
                label="延期还款日"
                label-width="200px"
              >
                <el-input v-model="form.address"></el-input>
              </el-form-item>

              <el-form-item
                label="添加附件"
                label-width="200px"
              >
                <el-col :span='18'>
                  <el-input v-model="form.file"></el-input>
                </el-col>
                <el-col :span="6">
                  <span style="">
                    <el-input
                      v-model="form.file"
                      type="file"
                      style="width:80px;"
                    ></el-input>
                  </span>
                </el-col>
              </el-form-item>
              <el-form-item
                label="合同状态"
                label-width="200px"
              >
                <el-select
                  v-model="form.service"
                  placeholder="请选择活动区域"
                >
                  <el-option
                    label="区域一"
                    value="shanghai"
                  ></el-option>
                  <el-option
                    label="区域二"
                    value="beijing"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="center">
                <el-button
                  type="primary"
                  @click="onSubmit"
                >立即创建</el-button>
                <el-button>取消</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>

    </div>
  </div>
</template>

<script>
import times from "../../components/tableTime";
const cityOptions = [
  "金融机构",
  "卫生医疗",
  "公安交警",
  "学校教育",
  "单位机房",
  "数据中心",
  "物业管理"
];

export default {
  data() {
    return {
      cities: cityOptions,
      srtatendTime: "",
      options: [
        "金融机构",
        "卫生医疗",
        "公安交警",
        "学校教育",
        "单位机房",
        "数据中心",
        "物业管理"
      ],
      form: {
        handleDate: "",
        username: "",
        password: "",
        customer: "",
        contact: "",
        iphone: "",
        level: "VIP1",
        type: ["金融机构"],
        address: "",
        service: "",
        station: "",
        date1: "",
        date2: "",
        delivery: false,
        resource: "",
        desc: ""
        // 级联选择器的数据
      }
    };
  },
  methods: {
    handleChange() {},
    change() {},
    onSubmit() {
      console.log("submit!");
    },
    fanhui() {
      this.$router.push({ path: "/customer" });
    }
  },
  components: {
    times
  }
};
</script>

<style scoped lang='scss'>
.wrap {
  padding-top: 15px;
  // display: flex;
  // text-align: center;
}
.el-radio-button {
  margin-right: 20px;
  border: 1px solid #dcdfe6;
  .el-radio-button__inner {
    border-radius: 4px;
    border: 0 !important;
  }
}
.el-date-editor--datetimerange.el-input,
.el-date-editor--datetimerange.el-input__inner {
  width: 100%;
}
.el-select {
  width: 100%;
}
.center {
  text-align: center;
}
.news-left-block {
  display: inline-block;
  vertical-align: middle;
  width: 6px;
  height: 16px;
  background: #409eff;
  margin-right: 16px;
}
.area {
  background: #fff;
  padding: 10px;
}
.page {
  padding-top: 0.7%;
  width: 1280px;
  min-height: 700px;
  margin: 0 auto;
}
.news-title {
  width: calc(100% - 0.7% - 0.7% - 6px - 16px);
  margin-left: 0.7%;
  margin-right: 0.7%;
  height: 53px;
  border-bottom: 1px solid #e4ebf0;
  padding: 14px 0px;
  box-sizing: border-box;
  &::before,
  &::after {
    clear: both;
    content: "";
    display: block;
  }
  p {
    cursor: default;
    float: left;
    font-size: 16px;
    color: #409eff;
    font-weight: bold;
    span {
      vertical-align: middle;
      display: inline-block;
    }
  }
  .back {
    float: right;
    vertical-align: middle;
  }
}
</style>


