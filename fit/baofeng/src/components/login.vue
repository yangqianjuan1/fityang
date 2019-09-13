<template>
  <div id="login">
    <div class="logo w">

      <img src="../assets/logo.png"
           alt="">
    </div>
    <div class="main">
      <div class="mainbody w">
        <div class="mainbodyleft">

        </div>
        <!-- 登录 -->
        <div class="mainbodyright"
             v-if="islogin===1">
          <h4>暴风登录</h4>
          <el-form :model="ruleForm"
                   status-icon
                   :rules="rules"
                   ref="ruleForm"
                   class="demo-ruleForm">
            <el-form-item prop="user">
              <el-input prefix-icon="el-icon-user"
                        v-model="ruleForm.user"
                        autocomplete="off"
                        size='mini'
                        placeholder="输入手机/邮箱/用户名"></el-input>
            </el-form-item>

            <el-form-item prop="password">
              <el-input v-model.number="ruleForm.password"
                        size="mini"
                        type="password"
                        prefix-icon="el-icon-shopping-bag-2"
                        placeholder="输入密码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-checkbox v-model="checked"
                           class="fl">记住我</el-checkbox>

              <p class="fr"><a href="javascript:void(0)"
                   @click="lijizhuche">立即注册</a> | <a href="https://sso.baofeng.net/new/backpwd.htm">找回密码</a> </p>
              <el-button type="primary"
                         class="loginbtn"
                         @click="submitForm">登录</el-button>

              <p class="frombm"> <a href="http://service.baofeng.com/hhelpcenter/sanji/39"
                   class="fl">遇到问题</a> <span class="fr">手机验证登录</span> </p>
            </el-form-item>
          </el-form>

          <div class="sanfanglogin">
            <img src="../assets/sanfanglogin.png"
                 alt="">
          </div>
        </div>

        <!-- 注册 -->
        <div class="mainbodyright"
             v-if="islogin!==1">
          <h4>暴风注册</h4>
          <el-form :model="ruleForm"
                   status-icon
                   :rules="rules"
                   ref="ruleForm"
                   class="demo-ruleForm">
            <el-form-item prop="user">
              <el-input prefix-icon="el-icon-user"
                        v-model="ruleForm.user"
                        autocomplete="off"
                        size='mini'
                        placeholder="输入手机/邮箱/用户名"></el-input>
            </el-form-item>

            <el-form-item prop="password">
              <el-input v-model.number="ruleForm.password"
                        size="mini"
                        type="password"
                        prefix-icon="el-icon-shopping-bag-2"
                        placeholder="输入密码"></el-input>
            </el-form-item>
            <el-form-item prop="yanzhengma">
              <el-input v-model="ruleForm.yanzhengma"
                        size="mini"
                        type="yanzhengma"
                        prefix-icon="el-icon-eleme"
                        placeholder="输入右侧验证码"></el-input>
              <!-- 验证码 -->
              <img :src=ruleForm.yzm
                   class="yzm"
                   alt="">

              <span class="el-icon-refresh shuaxin"
                    @click="shuaxin"></span>
            </el-form-item>
            <el-form-item prop="duanxin">
              <el-input v-model="ruleForm.duanxin"
                        size="mini"
                        type="yanzhengma"
                        prefix-icon="el-icon-eleme"
                        placeholder="输入短信验证码"></el-input>
              <!-- 验证码 -->
              <el-button size="small"
                         class="mianfeigetduanxin"> 免费获取短信 </el-button>
            </el-form-item>
            <el-form-item>
              <el-checkbox v-model="checked"
                           class="fl">我同意 <a href="http://home.baofeng.com/user_protocol.html">《暴风注册协议》</a></el-checkbox>

              <p class="fr"><a href="javascript:void(0)"
                   @click="lijilogin">立即登录</a> </p>
              <el-button type="primary"
                         class="loginbtn"
                         @click="register('ruleForm')">注册</el-button>
              <p class="frombm"> <a href="http://service.baofeng.com/hhelpcenter/sanji/39"
                   class="fl">遇到问题</a> </p>
            </el-form-item>
          </el-form>

          <div class="sanfanglogin">
            <img src="../assets/sanfanglogin.png"
                 class="yzm"
                 alt="">
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <p>客服 QQ：800111739 电话：4000987846（周一至周日9:30-21:30）</p>
      <p>暴风集团股份有限公司</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {

    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱/手机/QQ号'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var password = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var yanzhengma = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入右侧验证码'));
      } else {
        if (this.ruleForm.yanzhengma !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };

    return {
      ruleForm: {
        user: '',
        yanzhengma: '',
        password: '',
        yzm: 'https://sso.baofeng.net/new/api/get_imgcode?appid=6412&action=reg&r=0.5223902502948425',
        duanxin: ''
      },
      rules: {
        user: [
          { validator: validatePass, trigger: 'blur' }
        ],

        password: [
          { validator: password, trigger: 'blur' }
        ],
        yanzhengma: [
          { validator: yanzhengma, }
        ],
      },
      checked: false,   //记住密码的
      islogin: 1, //是1就显示登录,不是1就显示注册
    };
  },
  methods: {
    async submitForm () {
      if (!this.ruleForm) {
        return
      }
      let res = await this.$axios.get('http://localhost:3000/list', this.ruleForm)
      console.log(res);
      const right = res.data.find(item => {
        return item.user === this.ruleForm.user
      })
      if (right) {
        if (right.password === this.ruleForm.password) {
          this.$router.push('/home')
          return
        }
      }
      alert('用户名密码错误')

    },
    register (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          alert('注册成功去登录吧')
        } else {
          alert('校验失败')
          return false;
        }
        let res = await this.$axios.post('http://localhost:3000/list', this.ruleForm)
        this.ruleForm = ''
      });

    },
    lijilogin () {
      this.islogin = 1;
    },
    lijizhuche () {
      this.islogin = 2
    },
    shuaxin () {
      this.yzm = "https://sso.baofeng.net/new/api/get_imgcode?appid=6412&action=reg&r=0.522390250294142"
    }
  }
}
</script>

<style  scoped>
.w {
  width: 1000px;
  margin: 0 auto;
  z-index: 99;
}
.logo {
  position: relative;
}
.logo img {
  position: absolute;
  left: 0;
  top: -80px;
}
.main {
  background-color: #46a4e9;
  margin-top: 100px;
  width: 100%;
  height: 542px;
}
.main .mainbody {
  background-image: url("../assets/mbanner.jpg");
  height: 542px;
  position: relative;
}
.main .mainbody .mainbodyleft {
  background-image: url("../assets/duang.jpg");
  width: 587px;
  height: 450px;
  position: absolute;
  top: 64px;
}
.mainbodyright {
  margin-top: 60px;
  float: right;
  width: 332px;
  height: 446px;
  padding: 20px 24px;
  box-sizing: border-box;
  background-color: #fff;
}
.mainbodyright h4 {
  text-align: left;
  color: #46a4e9;
  margin-bottom: 40px;
}

.el-form-item__content {
  line-height: 0;
}
a {
  text-decoration: none;
  color: #46a4e9;
}

.fr a {
  cursor: pointer;
  color: #46a4e9;
  font-size: 12px;
}
.frombm {
  margin-top: 10px;
  color: #46a4e9;
}

.sanfanglogin {
  position: absolute;
  top: 424px;
  left: 667px;
}
.sanfanglogin img {
  position: absolute;
  top: 0px;
  left: 0px;
}

.yzm {
  position: absolute;
  right: 27px;
  top: -8px;
}
.shuaxin {
  z-index: 99999;
  font-size: 24px;
  border: 1px solid #ccc;
  position: absolute;
  right: 10px;
  color: #46a4e9;
}

.footer {
  margin-top: 14px;
}
.footer p {
  font-size: 12px;
  color: #999;
}
</style>