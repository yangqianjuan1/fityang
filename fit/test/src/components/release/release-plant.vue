<template>
 <div>
   <div :class="type==1?'chuanshi':'shen'" flex="dir:top main:left cross:center">
    <release-title :type="type" :info="info"></release-title>
     <tiger-info  :Info="info.HorseInfo" id="bronResult" style="width: 4rem;margin-top: 0.1rem" :type="4" v-if="info.HorseInfo"></tiger-info>
    <p>第{{info.ReleaseNo}}期</p>
    <release-progress :progress="getProgress" class="Progress" :style="{background:type?'#3623DB':'#0077C2'}" :type="type" ></release-progress>
    <p >祝福次数：{{info.CurrentCount}}/{{info.ReleaseCount}}</p>
  </div>
 </div>
</template>

<script>
  import tigerInfo from "../tigerInfo";
  import ReleaseProgress from "../progress";
  import ReleaseTitle from "../../page/activity/Release/releaseTitle";
  export default{
    components: {
      ReleaseTitle,
      ReleaseProgress,
      tigerInfo},
    name: "release-plant",
    props:{
        info:{
        },
        type:{
            default:0
        }
    },
    computed:{
      getProgress:function () {
        return parseInt(this.info.CurrentCount)/parseInt(this.info.ReleaseCount)*100
      },

    },
    data(){
      return {
        stage:1111,
        cur:511,
        total:100000,
        progress:30,
        chooseDlg:true
      }
    },
  }
</script>

<style scoped>
  .release-plant {

  }
  .Progress{
    position: relative;
    width: 62%;
    height: 0.2rem;
    margin: 0.1rem 0 ;
    overflow: hidden;
  }
  .shen{
    background-image: url("../../assets/img/activity/shenma-bg.png");
    background-size:100% 100% ;
    width: 7.15rem;
    height: 9rem;
    position: absolute;
  }
  p{
    color: #ffffff;
    text-align: center;
  }
  .chuanshi{
    position: absolute;
    background-image: url("../../assets/img/activity/chuangshima-bg.png");
    background-size:100% 100% ;
    width: 7.15rem;
    height: 9rem;
  }
</style>
