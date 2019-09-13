<template>
  <div class="fomo3dList ">
    <p class="first">第{{info.GameId}}轮</p>
    <scroll top="6.5" style="margin:0 auto;padding: 0 1rem">
      <p v-if="info.LastNickName" style="font-size: 0.43rem;font-weight: 600;text-align: center;margin: 0.2rem 0">最后买入者：{{info.LastNickName}}({{getName(info.LastTeamName)}})</p>
      <div class="item" v-for="item in info.TeamInfos" @click="buy(item)"><img :src="'../../../static/img/'+item.Name+'.png'"><p class="num-abc-warp">{{item.Funds}}FMVP</p></div>
    </scroll>
  </div>
</template>

<script>
  import Selection from "../../components/index/select";
  import RedTable from "../../components/red-table";
  import MyDialog from "../../components/dialog";
  import ComfireDialog from "../../components/comfireDialog";
  import Scroll from "../../components/scroll/scroll";
  import common from '../../components/common'
  export default{
    components: {
      Scroll,
      ComfireDialog,
      MyDialog,
      RedTable,
      Selection},
    name: "fomo3dList",
    props:{
      info:{}
    },
    data(){
      return {
      }
    },
    methods:{
      getName:function (name) {
          switch (name){
            case 'Dog':return "狗";
            case 'Horse':return "马";
            case 'Fish':return "鱼";
            case 'Cattle':return "牛";
          }
      },
      buy:function (item) {
         this.$emit('choose',item)
      },
    },
  }
</script>

<style scoped>
  .first{
    height: 1.5rem;
    padding: 0 1rem;
    line-height: 1.3rem;
    color: #ffffff;
    font-size: 0.4rem;
    text-align: center;
    margin-top: 0.3rem ;
    background-image: url("../../assets/img/activity/release-title.png");
    background-size: 100% 100%;
  }
  .item{
    text-align: center;
    width: 49%;
    display: inline-block;
    position: relative;
    cursor: pointer;
  }
  .item img{
    width: 80%;
  }
  .item p{
    position: absolute;
    bottom: 0.3rem;
    left: 50%;
    width: 65%;
    transform: translateX(-50%);
  }
  .comTitle{
    text-align: center;
    font-size: 0.48rem;
  }
  .comText{
    text-align: center;
    font-size: 0.37rem;
    margin-top: 0.3rem;
  }
  .comText span{
    color: #FFF719;
  }
</style>

