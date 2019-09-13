<template>
  <div id="home">
    <div class="home_header_box">
      <div class="home_header w">
        <div class="home_vip_logo"></div>
        <div class="home_login">
          <ul>
            <li @click="lijidenglu">登录</li>
            <li @click="lijizhuche">注册</li>
            <li>开通vip</li>
            <li>个人中心</li>
            <li>暴风首页</li>
          </ul>
        </div>
      </div>
    </div>

    <!--登录 Form -->

    <el-dialog title="暴风影视"
               :visible.sync="login">

      <div class="left fl">
        <el-input v-model="phone"
                  size="mini"
                  placeholder="手机/邮箱/用户名"></el-input>
        <el-input v-model="password"
                  size="mini"
                  placeholder="密码"></el-input>
        <el-input v-model="password"
                  size="mini"
                  style="width:142px"
                  v-if="!islogin"
                  placeholder="密码"></el-input>
        <!-- <el-input v-model="password"
                  size="mini"
                  v-if="!islogin"
                  style="width:142px;height:50px"
                  placeholder="密码"></el-input> -->

        <img src="https://sso.baofeng.com/new/api/get_imgcode?appid=8637&action=reg&r=0.028754700994429117"
             alt="">
        <el-input v-model="password"
                  size="mini"
                  v-if="!islogin"
                  style="width:142px;height:50px"
                  placeholder="密码"></el-input>

        <el-button size="small"
                   v-if="!islogin"
                   style="width:142px">免费获取短信</el-button>
        <el-checkbox v-model="checked"
                     v-if="islogin"
                     class="mt10 checked">30天内自动登录</el-checkbox>

        <el-checkbox v-model="checked"
                     v-if="!islogin"
                     class="mt10 checked">我已阅读并同意《暴风影音注册协议》</el-checkbox>
        <a href="#"
           v-if="islogin"
           class="zhmima">找回密码</a>
        <div slot="footer"
             class="dialog-footer">
          <el-button type="primary"
                     v-if="islogin"
                     @click="login = false">登录</el-button>
          <el-button type="primary"
                     v-else
                     @click="login = false">注册</el-button>
        </div>
      </div>
      <div class="xian"></div>
      <div class="right fr">
        <div class="right_login">

        </div>
        <p class="zhuche"><span>还没暴风账户?</span>
          <span @click="lijizhuche"
                v-if="islogin"><a href="#">立即注册</a></span>
          <span v-else
                @click="lijidenglu"><a href="#">立即登录</a></span> </p>
      </div>

    </el-dialog>

  </div>
</template>

<script>
export default {
  data () {
    return {
      islogin: true,
      login: false,
      phone: '', //手机邮箱用户名
      password: '', //mima 
      checked: false,
      ruleForm: {
        user: '',
        password: '',

        delivery: false,

      },

    }

  },
  methods: {
    lijizhuche () {
      this.login = true
      this.islogin = false
    },
    lijidenglu () {
      this.login = true
      this.islogin = true
    },
  },
}
</script>

<style scoped>
ul {
  list-style: none;
}
.w {
  width: 1100px;
  margin: 0 auto;
  /* overflow: hidden; */
}

.home_header_box {
  height: 15px;
  border-bottom: 1px solid #ccc;
  position: relative;
}
.home_header {
  height: 100%;
}
.home_vip_logo {
  background: url("../assets/vip-logo.png") 0 -144px no-repeat;
  height: 29px;
  float: left;
  width: 191px;
  position: absolute;
  top: -36px;
}
.home_login {
  float: right;
  width: 320px;
  height: 30px;
  position: relative;
  top: -28px;
}
.home_login ul li {
  width: 20%;
  float: left;
  font-size: 12px;
}

.left {
  width: 60%;
  height: 100%;
}
.xian {
  height: 232px;
  width: 0px;
  border: 1px dashed #ccc;
  position: absolute;
  right: 195px;
  top: 74px;
}

.right {
  width: 30%;
  height: 100%;
}

.zhmima {
  float: right;
  margin-top: 10px;
  font-size: 12px;
  text-decoration: none;
}
.right_login {
  background: url("../assets/homelogin.jpg") 100% 100%;
  width: 170px;
  height: 170px;
}
.zhuche {
  font-size: 12px;
}
.zhuche a {
  text-decoration: none;
}
</style>