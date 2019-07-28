<template>
  <div class="page">
    维护页面
    <times
      :time="time"
      :show="false"
    />
    <div class="area">
      <el-form
        :inline='true'
        :model="formInline"
        class="demo-form-inline"
        size="small"
        label-position="left"
      >
       
        <el-row
          class="row1"
          :gutter="20"
        >
          <el-col :span="6">
            <el-form-item label="查询城市">
              <span class="demonstration"></span>
              <el-cascader
                size="mini"
                v-model="value"
                :options="options"
                @change="handleChange"
              >
              </el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="用户名称">
              <el-input
                size="mini"
                v-model="formInline.userTrueName"
                placeholder="用户名称"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              label="客户名称"
              :span="6"
            >
              <el-input
                size="mini"
                v-model="formInline.userName"
                placeholder="客户名称"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              label="客户等级"
              :span="6"
            >
              <el-input
                size="mini"
                v-model="formInline.userName"
                placeholder="客户等级"
              ></el-input>
            </el-form-item>
          </el-col>

        </el-row>

        <el-row
          :gutter="20"
          class="row2"
        >
          <el-col :span="6">
            <el-form-item
              label="客户联系"
              label-width="68px"
            >
              <el-input
                v-model="formInline.customerContact"
                placeholder="请输入客户联系人名称"
                size="mini"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="手机号码">
              <el-input
                v-model="formInline.mobile"
                placeholder="请输入联系人手机号"
                size="mini"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="用户类型">
              <el-select
                v-model="formInline.customerType"
                placeholder="客户类型"
                size="mini"
              >
                <el-option
                  label="金融机构"
                  value="1"
                ></el-option>
                <el-option
                  label="医疗卫生"
                  value="2"
                ></el-option>
                <el-option
                  label="公安交警"
                  value="3"
                ></el-option>
                <el-option
                  label="学校教育"
                  value="4"
                ></el-option>
                <el-option
                  label="单位机房"
                  value="5"
                ></el-option>
                <el-option
                  label="数据中心"
                  value="6"
                ></el-option>
                <el-option
                  label="物业管理"
                  value="7"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span='6'>
            <el-form-item label="用户地址">
              <el-input
                v-model="formInline.address"
                placeholder="客户地址"
                size="mini"
              ></el-input>
            </el-form-item>
          </el-col>

        </el-row>

        <el-row
          class="row3"
          :gutter="20"
        >

          <el-col :span=6>
            <el-form-item label="服务人员">
              <el-input
                v-model="formInline.customerServer"
                placeholder="客户服务人名称"
                size="mini"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span='6'>
            <el-form-item
              label="操作人"
              label-width="68px"
            >
              <el-input
                v-model="formInline.customerServer"
                placeholder="请输入操作人"
                size="mini"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="时间">
              <el-date-picker
                size="mini"
                v-model="srtatendTime"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row></el-row>
        <el-row>

        </el-row>
        <el-row>
          <el-button
            type="primary"
            @click="Query"
          >查询</el-button>
          <el-button
            type="warning"
            @click="gotoadd"
          >新建</el-button>
        </el-row>
      </el-form>
    </div>
    <div
      class="area"
      style="margin-top: 20px;padding:20px;"
    >

      <el-table
        :data="tableData"
        style="width: 100%;margin-top:10px;"
        height="500"
        :header-cell-style="{background:'#E4EAEC',color:'#666',fontSize:'12px'}"
      >

        <el-table-column
          prop="diQu"
          label="地区"
          align="center"
        ></el-table-column>

        <el-table-column
          prop="userTrueName"
          label="用户名称"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="userIphone"
          label="客户联系人"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="userIphone"
          label="手机号"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="userType"
          label="客户类型"
          align="center"
        >
          <template slot-scope="scope">{{ userType[scope.row.userType]}}</template>
        </el-table-column>
        <el-table-column
          prop="devType"
          label="业务类型"
          align="center"
        >
          <template slot-scope="scope">{{ tyoecl(scope.row.devType)}}</template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="客户地址"
          align="center"
        ></el-table-column>

        <el-table-column
          prop="customerContact"
          label="联系人"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="customerServer"
          label="服务人员"
          align="center"
        ></el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100"
        >
          <template slot-scope="scope">
            <el-button
              @click="deletes(scope.row)"
              type="text"
              size="small"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>确定要删除吗？</span>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="customer_center"
        >确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import times from "../../../components/tableTime";
import layouts from "../../../components/layouts";
import tablemap from "../../../components/table_map";
import table from "../../../mixins/table";

export default {
  data() {
    return {
      dialogVisible: false,
      time: "",
      value: '',
      options: [],
      srtatendTime: "", //开始时间,和结束时间
      formInline: {
        mobile: '',//手机号
        userName: '', //客户名称
        provinceId: "", //所在省
        cityId: "", //所在市
        prefectureId: "", //所在县区
        devType: "", //业务类型
        beginTimeString: "",
        endTimeString: "",
        userTrueName: "", //用户名称
        customerType: "", //客户类型
        address: "", //客户地址
        customerContact: "", //客户联系人名称
        customerServer: "" //客户服务人名称
      },
      radio: "备电",
      tableData: [],
      devType: {
        "25": "备电客户",
        "19": "充电",
        "22": "储能站",
        "18": "延寿站"
      },
      userType: {
        "0": "个人用户",
        "1": "企业用户"
      }
    };
  },
  mixins: [table],
  components: {
    times,
    layouts,
    tablemap
  },
  created() {
    this.onSubmit();
  },
  mounted() { },
  methods: {
    onSubmit() {
      let vm = this;
      vm.Api.select_customer(vm.formInline).then(res => {
        vm.tableData = res.result;
      });
    },
    gotoadd() {
      this.$router.push({ path: "/customer/add" });
    },
    tyoecl(str) {
      let vm = this;
      return vm.devType[str] || "未知";
    },
    deletes(row) {
      let vm = this;
      vm.dialogVisible = true;
      vm.detId = row.id;
    },
    handleClose(done) {
      done();
    },
    customer_center() {
      let vm = this;
      vm.Api.customer_center_delete(vm.detId).then(res => {
        console.log(res);
        vm.dialogVisible = false;
        vm.$notify({
          title: "成功",
          message: "删除成功",
          type: "success"
        });
        vm.onSubmit();
      });
    },

    handleChange() { },

    Query() {
      alert('你点击了查询')
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
.line {
  text-align: center;
}

.el-input--mini .el-input__inner {
  margin-right: 20px;
}

</style>


<style>

</style>
