<template>
  <div class="Release">
    <div class="htitle" flex="cross:center main:right">
      <img src="../../../assets/img/activity/release-recode.png" class="right ruleIcon" style="margin-right: 0" @click="openRecode">
      <img src="../../../assets/img/activity/release-rule.png" class="right ruleIcon" @click="ruleOpen">
    </div>
    <tab :titleArr="titleArr"></tab>
    <release-recode v-model="recodeDlg"></release-recode>
    <rule v-model="ruleDialog">
      <div class="rule">
        <h5>放生规则</h5>
        <p>玩家可在“猛虎专区、神虎专区”放生相应的老虎以此获得感恩券，拥有感恩券的玩家有几率获取“神虎、创世虎”</p>
        <p>1、用户每放生一只老虎，即可获得一张感恩券，每张感恩券将会对应一个祝福号码。</p>
        <p>2、当相应老虎的祝福号码分配完毕后（祝福进度条满），驯兽师区块链感恩祝福程序将自动计算出一个幸运号码，持有该幸运号码的用户可直接获得该老虎。</p>
        <p >3、放生老虎要求：</p>
        <p >放生老虎当天必须没进行过喂养；</p>
        <p >交易中、具有堂主、弟子的老虎无法放生；</p>
      </div>
    </rule>
  </div>
</template>

<script>
  import Tab from "../../../components/tab";
  import MyDialog from "../../../components/dialog";
  import ReleaseRecode from "./release-recode";
  import Scroll from "../../../components/scroll/scroll";
  import Rule from "../../../components/tips/rule";
  export default{
    //骏虎夺神虎
    //SteedGetStud = 1,
    //骏虎夺创世虎
    //SteedGetGenesis = 2,
    //神虎夺创世虎
    // StudGetGenesis = 3
    components: {
      Rule,
      Scroll,
      ReleaseRecode,
      MyDialog,
      Tab},
    name: "Release",
    data(){
      return {
        titleArr:[{routeName:'menHu'},{routeName:'shenHu'}],
        recodeDlg:false,
        ruleDialog:false,
      }
    },
    methods:{
      ruleOpen:function () {
        this.ruleDialog = true;
      },
      openRecode:function () {
        this.recodeDlg = true;
      },
      route:function (name) {
        this.$router.replace({name:name})
      },
    }
  }
</script>

<style scoped>
  .Release {
    width: 100%;
    height: 100%;
    min-height: 100vh;
    background: url("../../../assets/img/tigers/bg2.png");
    background-size: 100% 100%;
  }
  .htitle {
    z-index: 100;
    width: 100%;
    height: 1.5rem;
    position: relative;
  }
  .foot{
    height: 3rem;
  }
  h5{
    font-size: 0.43rem;
    text-align: center;
  }
  .rule{
    padding: 0.5rem 0;
  }
  .rule p{
    font-size: 0.32rem;
    margin: 0.2rem 0;
  }
  .rule span{
    color: #F7FF0F;
  }
  .textIndent{
    text-indent: 2em;
  }
</style>
