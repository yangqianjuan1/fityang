<template>
  <div>
    <scroll>
      <div>
      <img src="../../assets/img/activity/pps_top.png" style="width: 100%;height: 5.6rem"/>
      <div class="content">
        <div class="info cl">活动详情</div>
        <div class="people">资金池：16666 PPS</div>
        <p>1、预言家PPS空投会根据万利马玩家拥有GXS的数量和马匹的数量的不同，得到相应比例的PPS。空投总数会在6月11号24点之前公布。万利马玩家获得的PPS可以在活动页面里提现，提取PPS到公信链钱包。</p>
        <p>2、权重分配：</p>
        <p >万利马玩家账户余额GXS   占比20%</p>
        <p>万利马玩家拥有骏马数量   占比20%</p>
        <p>万利马玩家拥有神马数量   占比60%</p>
        <p>3、用户获得PPS空投数：</p>
        <p>玩家神马数/游戏总神马数*总空投数*60%+玩家骏马数/游戏总骏马数*总空投数*20%*+玩家余额GXS/总玩家余额GXS*总空投数*20%；</p>
        <p>4、资产统计：</p>
        <p>6月10日23:59:59资产快照时间为准。</p>
        <p>5、活动最终解释权归万利马所有。</p>
      </div>
      <div class="Tips miaobian-wudi3">
        <p>温馨提示</p>
        <p>•提现PPS需等待人工审核（一周之内）到账，请耐心等待</p>
        <p>•仅支持提现至公信链钱包</p>
      </div>
      <div class="with">
        <div flex="main:center"><label >获得PPS数量：</label><input disabled v-model="number"/></div>
        <div flex="main:center"> <label>提现地址：</label><input placeholder="请输入公信链钱包地址" v-model="address"/></div>
        <button class="commit" @click="withdrawals">提现</button>
      </div>
      <div flex="box:mean" class="recode" v-if="recode">
        <p>{{recode.ModifyTime?recode.ModifyTime.split(" ")[0]:""}}</p>
        <p>{{recode.WithdrawAmount}}</p>
        <p>{{getState(recode.Status)}}</p>
      </div>
      <div class="content-2" style="text-align: left">
        <div flex="main:justify cross:center" class="title">
          <div class="border"></div>
          <p >预言家介绍</p>
          <div class="border"></div>
        </div>
        <p style="text-indent: 2em">预言家prophet是一个基于公信链的移动社交类预测平台。平台充分利用分布式公开账本增加预测市场的透明度，通过数字代币经济激励开发者在平台发布预测项目，将自己的智慧进行社区共享，为用户提供不同类型的预测事件，汇聚用户群体的智慧从而有效的预测未来。像预言家Prophet这样的项目，相信一定能把“区块链+预测市场”完美落地，为整个预测市场行业带来革命性变化。</p>
      </div>
      </div>
    </scroll>
  </div>
</template>

<script>
  import Scroll from "../../components/scroll/scroll";

  export default {
    name: "chest",
    components: { Scroll},
    data(){
      return{
        number:"",
        address:"",
        recode:{}
      }
    },
  mounted(){
    this.getAccount();
  },
    methods:{
      getState:function (state) {
        switch (state) {
          case 2:return "待审核";
          case 3:return "提现成功";
          case 4:return "提现驳回";
        }
      },
      getAccount:function () {
        this.$axios.get("/api/activity/getpps/").then(
          res=>{
            let result = res.data;
            if(result.IsSuccess){
              this.number = result.Result.Data;
              this.recode = result.Result.Info;
            }else{
              this.$get_error('tips',result.Code,result.Message);
              this.number = "获取失败";
            }
          },
          error=>{
            this.number = "获取失败";
            this.$get_error('reload');
          }
        )
      },
      withdrawals:function () {
        if(this.number ==="获取失败"){
          return this.$tips("获取失败，请刷新重试") ;
        }
        if(this.number ===""){
          return this.$tips("请求中，请耐心等待或刷新") ;
        }
        if(this.number ==="已提现"){
          return  this.$tips("已提交申请，请耐心等待");
        }
        if(!this.address){
          return  this.$tips("请输入公信链钱包地址");
        }
        this.$axios.get("api/activity/withdrawallpps/?address="+this.address).then(
          res=>{
            let result = res.data;
            if(result.IsSuccess){
             this.$tips("提现申请成功，请耐心等待");
             this.recode = result.Result.Info;
             this.number = "已提现";
            }else{
              this.$get_error('tips',result.Code,result.Message);
            }
          },
          error=>{
            this.$get_error('reload');
          }
        )
      }
    }
  }
</script>

<style scoped>
  .people{
    text-align: center;
    line-height: 0.75rem;
    margin-bottom: 0.5rem;
    color: #FFF850;
    width: 100%;
    height: 1rem;
    background-image: url("../../assets/img/invite/yaoqingdi.png");
    background-size: 100% 100% ;
  }
.recode{
  margin: 0.5rem 0.5rem;
  font-size: 0.32rem;
  color:#074D5B;
  text-align: center;
}
  .chance span{
    color: #E50011;
  }
  .content-2{
    margin-top: 1rem;
    padding: 0 0.5rem;
    text-align: center;
  }
  .content-2>img{
    width: 30%;
  }
  .content-2 p{
    font-size: 0.36rem;
    color: #074D5B;
  }
  .content p{
    font-size: 0.4rem;
    color: #074D5B;
    line-height: 0.6rem;
  }
  .content{
    position: relative;
    text-align: left;
    border-radius: 10px;
    border: 5px solid #ffffff ;
    background-color:rgba(0,0,0,0.2);
    padding: 1rem 0.5rem;
    margin: 0.5rem 0.5rem;
  }
  .border{
    width: 35%;
    height: 1px;
    background-image: linear-gradient(to right, #074D5B 0%, #074D5B 50%, transparent 50%);
    background-size: 8px 1px;
    background-repeat: repeat-x;
  }
  .with{
    text-align: center;
    margin: 0 0.5rem;
  }
  .with div{
    margin-top: 0.2rem;

  }
  .with label{
    text-align: right;
    color: #074D5B;
    font-size: 0.32rem;
    width: 30%;
    height:1rem ;
    line-height: 1rem;
  }
  .with input{
    text-align: center;
    color: #074D5B;
    font-size: 0.32rem;
    width: 60%;
    border-radius: 0.2rem;
    border: 1px solid #657681;
  }
  .title{
    color: #074D5B;
    text-align: center;
    position: relative;
    margin-bottom: 0.5rem;
  }
  .title p{
    font-size: 0.4rem;
    font-weight: 600;
  }
  .commit{
    background-image: url("../../assets/img/user/tixiananniu.png");
    background-size: 100% 100%;
    padding: 0.2rem 0.5rem;
    color: #ffffff;
    font-size: 0.4rem;
    margin-top: 0.5rem;
    border-radius: 0.2rem;
  }
  .Tips{
    padding: 0.625rem;
    background-image: url("../../assets/img/index/erweimadi.png");
    background-size: 100% 100%;
    margin: 0 0.5rem;
    font-size:14px;
    color: #ffffff;
    line-height: 0.625rem;
    -webkit-border-radius: 0.3125rem;
    border-radius: 0.3125rem;
    -moz-border-radius: 0.3125rem;
  }
  .Tips p{
    color: #ffffff;
  }
  .info{
    color: #ffffff;
    display: inline-block;
    padding: 0  1rem;
    background-image: url("../../assets/img/activity/title.png");
    background-size: 100% 100% ;
    font-size: 0.5rem;
    height: 0.9rem;
    line-height: 0.9rem;
    position: absolute;
    top: -18px;
  }
</style>
