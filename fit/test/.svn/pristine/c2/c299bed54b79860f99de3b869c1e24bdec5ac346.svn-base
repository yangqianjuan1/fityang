<template>
  <div class="competition">
    <div class="content"  :style="{'max-width':$store.state.maxWidth}"></div>
    <div class="htitle" flex="cross:center main:right">
      <img src="../../assets/img/competition/guide.png" class="right ruleIcon" @click="open">
    </div>
    <div flex="main:center cross:center box:mean"   :class="getCur" class="title usual" >
      <p v-for="(item,index) in list" key="competition"  :class="index===isCur?'miaobian-hong white':'miaobian-bai'" style="height: 100%;   margin-bottom: 0.2rem;"  @click="router(item,index)"></p>
    </div>
    <router-view></router-view>
    <my-dialog :dialog-open="guideDialog">
      <div class="warp takeCenter">
        <img src="../../assets/img/competition/close.png" class="close right" @click="close">
        <scroll style="height: 100%;position: relative" warpId="guide">
          <div class="digTitle" >
            <p style=" font-size: 0.5rem;text-align: center;font-weight: 600">竞猜指南</p>
            <p>1、基于区块链“分布式、公开、不可篡改”的特性，根据未出块的区块签名，自动判别竞猜结果，杜绝作弊的可能性，用公开透明的方式，保证游戏的公平性。</p>
            <p>2、每隔一段时间链上会出现一个区块，如：</p>
            <p>141d6108f27b384554a3821026597ef62f5d61be（由0-f组成的40位16进制字符串），且没人能预测未来出现的区块。而我们竞猜的结果就跟这个未知的区块相关联。</p>
            <p>3、玩家可自行在“<span>竞猜列表</span>”与“<span>我的竞猜</span>”中选择<span>竞猜</span>或者<span>开局</span>。 </p>
            <p>4、开局规则：</p>
            <p>玩家需选择开奖区块、竞猜位置、竞猜类型、信息比率以及奖金池金额。</p>
            <p><span>开奖区块：</span>确认开始后出现的第几个区块作为开奖区块（例：每3秒出现一个区块，开奖区块为20，则表示1分钟后开奖）；</p>
            <p><span>竞猜位置：</span>竞猜区块上对应位置的字符作为竞猜位（例：竞猜区块为07b2a2*****ac56，竞猜位为5，则开奖结果为字母a）；</p>
            <p><span>竞猜类型：</span>共“猜奇偶、三选一、四区间”三种；</p>
            <p>     猜奇偶：判断竞猜结果为奇数还是偶数（a-f 对应数字10-15）；</p>
            <p>      三选一：判断竞猜结果为奇数、字母或者偶数；</p>
            <p>      四区间：判断竞猜结果所属0-3、4-7、8-b、c-f哪个区间。</p>
            <p><span>信息比率：</span>对应竞猜区的比率,（例：竞猜一个比率为1.5的区域1FMVP，中奖后可获得1.5FMVP）；</p>
            <p><span>奖金池：</span>决定其他玩家竞猜的最大额度，玩家竞猜后可能获得奖金不得大于资金池里的量。</p>
            <p>5、竞猜规则：</p>
            <p><span>奇数 VS 偶数</span> 竞猜区块为07b2<span>a</span>2*****ac56，竞猜位置为<span>第5位</span>，如果玩家参与竞猜“<span>偶数</span>”100，倍数1.5则返还奖励150（a-f 对应数字10-15）；</p>
            <p><span>奇数 VS 字母 VS 偶数</span> 竞猜区块为07b2<span>a</span>2*****ac56，竞猜位置为<span>第5位</span>，如果玩家参与竞猜“<span>字母</span>”100，倍数1.5则返还奖励150；</p>
            <p><span>0-3 VS 4-7 VS 8-b VS c-f</span> 竞猜区块为07b2<span>a</span>2*****ac56，竞猜位置为<span>第5位</span>，如果玩家参与竞猜“<span>8-b</span>”100，倍数1.5则返还奖励150；</p>
          </div>
        </scroll>
      </div>
    </my-dialog>
  </div>
</template>

<script>
  import MyDialog from "../../components/dialog";
  import Scroll from "../../components/scroll/scroll";
  export default {
    name: "competition",
    components: {Scroll, MyDialog},
    data(){
      return{
        guideDialog:false,
        isCur:0,
        list:[
          {name:'竞猜列表',router:'list'},
          {name:'竞猜记录',router:'record'},
          {name:'我的竞猜',router:'myCompetition'}
        ]
      }
    },
    created(){
      this.isCur = this.$route.meta.competitionIndex;

    },
    computed:{
      getCur:function () {
        switch (this.isCur){
          case 0: return 'nav_0';
          case 1: return 'nav_1';
          case 2: return 'nav_2';
        }
      },
    },
    methods:{
      open:function(){
        this.guideDialog = true;
      },
      close:function(){
        this.guideDialog = false;
      },
      router:function (item,index) {
        this.isCur =index;
        this.$router.replace({name:item.router})
      }
    }
  }
</script>

<style scoped>

  .competition{
    text-align: center;
    background-image: url("../../assets/img/tigers/bg2.png");
    background-size: 100% 100% ;
    width: 100%;
    height: 100vh;
  }
  .content{
    background-image: url("../../assets/img/activity/release-bg.png");
    background-size: 100% 100%;
    position: fixed;
    top:2.5rem;
    bottom: 0;
    width: 100%;
  }
  .htitle {
    z-index: 100;
    width: 100%;
    height: 1.5rem;
    position: relative;
  }

  .title{
    height: 1.2rem;
    margin-left: 0.3rem ;
    margin-right: 1.7rem ;

  }
  .close{
    width: 0.56rem;
    margin-top: 0.5rem;
    margin-right: 0.5rem;
  }
  .warp{
    width: 90%;
    height: 80vh;
    padding:1rem 0.5rem;
    background-image: url("../../assets/img/competition/guideBg.png");
    background-size: 100% 100%;
  }

  .digTitle p{
    margin: 0.3rem;
    text-align: left;
  }
  .content span{
    color: #fe662e;
  }
  .nav_0{
    background: url("../../assets/img/transactin/nav_0.png") center no-repeat;
    background-size: 100% 100%;
  }
  .nav_1{
    background: url("../../assets/img/transactin/nav_1.png") center no-repeat;
    background-size: 100% 100%;
  }
  .nav_2{
    background: url("../../assets/img/transactin/nav_2.png") center no-repeat;
    background-size: 100% 100%;
  }
</style>
