<template>
  <div class="page">
    <times :show="false" />客户管理页面
    <el-row>
      <el-col :span="6">
        <div class="area">
          <div class="wrap">
            <div class="title">
              <p>客户信息</p>
              <span @click="lookClientInfo">查看全部 &gt;</span>
            </div>
            <el-table
              :data="tableData1"
              style="width: 100%;margin-top:10px;margin-bottom:10px;"
              :header-cell-style="{background:'#E4EAEC',color:'#666',fontSize:'12px'}"
            >
              <el-table-column
                prop="date"
                label="客户名称"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="name"
                label="联系方式"
                align="center"
              ></el-table-column>
            </el-table>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="area">
          <div class="wrap">
            <div class="title">
              <p>订购信息</p>
              <span @click="lookOrderInfo">查看全部 &gt;</span>
            </div>
            <el-table
              :data="tableData1"
              style="width: 100%;margin-top:10px;margin-bottom:10px;"
              :header-cell-style="{background:'#E4EAEC',color:'#666',fontSize:'12px'}"
            >
              <el-table-column
                prop="date"
                label="客户名称"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="name"
                label="联系方式"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="name"
                label="发单时间"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="name"
                label="客户负责人"
                align="center"
              ></el-table-column>
            </el-table>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="area">
          <div class="wrap">
            <div class="title">
              <p>需求发布</p>
            </div>
            <el-form
              ref="form"
              :model="form"
              :inline="true"
              size="mini"
              label-width="70px"
              label-position="left"
              style="margin-top:10px"
            >
              <el-form-item label="标题">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="类型">
                <el-select
                  class="wid58"
                  v-model="form.region"
                  placeholder="类型选择"
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

              <el-form-item label="活动形式">
                <el-input
                  type="textarea"
                  class="wid58"
                  resize="none"
                  v-model="form.desc"
                ></el-input>
              </el-form-item>
              <el-form-item label="手机号">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="验证码">
                <el-input
                  class="wid23"
                  v-model="form.name"
                ></el-input>
                <el-button
                  class="winmin"
                  size="mini"
                  type="primary"
                >立即获取</el-button>
              </el-form-item>
              <el-button
                class="win100"
                type="primary"
              >立即发布</el-button>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row style="margin-top:10px;margin-bottom:30px;">
      <el-col :span="10">
        <div class="area">
          <div class="wrap">
            <div class="title">
              <p>财务信息</p>
              <span @click="lookCaiWuInfo">查看全部 &gt;</span>
            </div>
            <el-table
              :data="tableData1"
              style="width: 100%;margin-top:10px;margin-bottom:10px;"
              :header-cell-style="{background:'#E4EAEC',color:'#666',fontSize:'12px'}"
            >
              <el-table-column
                prop="date"
                label="合同名称"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="name"
                label="签订日期"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="name"
                label="已支付月份"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="name"
                label="已服务月份"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="name"
                label="合同时长"
                align="center"
              ></el-table-column>
            </el-table>
          </div>
        </div>
      </el-col>
      <el-col :span="14">
        <div class="area">
          <div class="wrap">
            <div class="title">
              <p>备电信息</p>
              <span @click="lookBeiDianInfo">查看全部 &gt;</span>
            </div>
            <el-table
              :data="tableData1"
              style="width: 100%;margin-top:10px;margin-bottom:10px;"
              :header-cell-style="{background:'#E4EAEC',color:'#666',fontSize:'12px'}"
            >
              <el-table-column
                prop="date"
                label="客户名称"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="name"
                label="状态"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="name"
                label="相关信息"
                align="center"
              ></el-table-column>
            </el-table>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import times from "../../components/tableTime";

export default {
  data() {
    return {
      tableData1: [],
      form: {}
    };
  },
  components: {
    times
  },
  created() {},
  mounted() {},
  methods: {
    lookClientInfo() {
      //查看全部客户信息
      alert("查看全部客户信息");
    },
    lookOrderInfo() {
      alert("查看订购信息"); //查看订购信息
    },
    lookCaiWuInfo() {
      alert("查看财务信息");
    },
    lookBeiDianInfo() {
      alert("查看备电信息");
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
  padding-right: 10px;
  .wrap {
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 20px;
    height: 334px;
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
    cursor: pointer;
  }
}
.wid58 {
  width: 178px;
}
.wid23 {
  width: 100px;
}
.win100 {
  width: 100%;
}
.winmin {
  width: 74px;
}
</style>

