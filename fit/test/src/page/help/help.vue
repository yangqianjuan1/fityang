<template>
  <div class="showText miaobian-lan usual">
    <div class="content" :style="{'max-width':$store.state.maxWidth}"></div>
    <scroll
    bottom="4">
      <ul  class="text">
        <!--<li>-->
        <!--<div flex="main:justify cross:center" style="height: 1rem;line-height: 1rem" @click="showDetail(0)"> <h2>万利马社区</h2></div>-->
        <!--<div  style="padding-bottom: 0.2rem">-->
        <!--<p>社区一：</p>-->
        <!--<p flex="cross:center" >-->
        <!--<img src="../../assets/img/dialog/qq.png"style="height: 0.5rem;margin-right: 0.2rem"> 万利马QQ群：</p>-->
        <!--<p style="  color: #f07765;" class="miaobian-lan">749697877,704952538，646295154</p>-->
        <!--<div >-->
        <!--<p>社区二：</p>-->
        <!--<p>关注微信公众号</p>-->
        <!--<div style="text-align: center">-->
        <!--<img src="../../assets/img/dialog/weixing.png" style="width: 5rem">-->
        <!--<p>保存图片，打开微信扫一扫</p>-->
        <!--</div>-->
        <!--</div>-->
        <!--<p>社区三</p>-->
        <!--<p>点击<a style="color: #f07765" class="miaobian-lan" href="https://beechat.io/join?g=7a685b3241b74be8b023908508d59e02&lang=zh" target="_blank">加入BeeChat社区</a></p>-->
        <!--</div>-->
        <!--<div class="line"></div>-->
        <!--</li>-->
        <li class="tex" v-for="(item,index) in text" >
          <div flex="main:justify cross:center" style="height: 1rem;line-height: 1rem" @click="showDetail(index+1)"> <h2>{{item.title}}</h2><div  :class="show[index+1]?'open':'close'" ></div></div>
          <div v-show="show[index+1]" style="padding-bottom: 0.2rem;">

            <p v-for="item2 in item.content">{{item2}}</p>
            <div style="text-align: center">
              <img src="../../assets/img/dialog/family.png" style="width: 90%" v-if="index ===0">
            </div>
          </div>
          <div class="under-line"></div>

        </li>
      </ul>
      <foot></foot>
    </scroll>
  </div>
</template>

<script>
  import Foot from "../../components/footer";
  import Scroll from "../../components/scroll/scroll";
  export default{
    components: {
      Scroll,
      Foot},
    name: "showText",
    data(){
      return {
        show:[false,false,false,false,false,false,false,false,false,false,false],
        text:[
          {title:'联盟：',content:[
            '每一只老虎都可以通过“联盟邀请”向好友发送盟主ID，邀请好友购买神虎，购买的神虎将成为其堂主；',
            "建立联盟可以获得堂主喂养手续费（喂养金额的2%）80%的奖励，此外堂主可以以同样的形式建立自己的联盟关系，建立联盟还可以获得相应的购买神虎的费用； ",
            "不同的虎种，奖励的程度也会有不同，猛虎无奖励；",
            "交易创世虎、神虎会将该老虎的所拥有的联盟权益一并交易出去。"
          ]},
          {title:'交易：',content:['玩家可将自己的老虎放于交易所中进行自由的交易，每次完成交易我们将抽取交易金额的5%作为手续费。']},
          {title:'生育：',content:['仅“创世虎、神虎”可生育；',
            "当老虎体重达到最大值（200kg）时才可进行生育（生育免费），生育结束后体重会恢复至初始值（50kg）。 "]},
          {title:'生育值：',content:['每次生育成功，生育值减1，生育值为0将无法继续生育；']},
          {title:'奖金池：',content:['玩家在驯兽师中的某些消费（如捕虎费用、喂养费用、师徒购虎金额、交易手续费等）将投注奖金池中。']},
          {title:'喂养：',content:[
            '任何老虎每天可喂养10次，每次喂养会增加该老虎的体重以及喂养奖励；',
            "每日凌晨系统会根据当天各老虎的喂养奖励总和进行结算，分配资金池里的奖励；",
            "喂养后将老虎交易出去，当天喂养产生的收益还是归喂养人所有。"
          ]},
          {title:'捕虎：',content:['玩家能在捕虎场中有几率捕获猛虎、神虎。']},
          {title:'联系我们：',content:['QQ:3048834015','微信：alex178448']},
        ]
      }
    },
    methods:{
      showDetail:function (index) {
        this.$set( this.show,index,!this.show[index])

      }
    }
  }
</script>

<style scoped>
  .content{
    background-image: url("../../assets/img/activity/activity-bg.png");
    background-size: 100% 100%;
    position: fixed;
    top:0;
    bottom: 0;
    width: 100%;
  }
  .showText {
    margin: 0 auto;
    /*padding: 0 0.5rem;*/
  }
  .text{
    margin: 0 auto;
    padding: 1rem 0.8rem;

    /*padding-bottom: 7.5rem;
     */
  }
  .tex{
    padding-top: 0.2rem ;
  }
  h2{
    font-weight: 600;
    font-size: 0.5rem;
    text-align: left;
  }
  .open{
    background-image: url("../../assets/img/curose/open.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    width: 0.5rem;
    height: 0.4rem;
  }
  .close{
    background-image: url("../../assets/img/curose/close.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    width: 0.4rem;
    height: 0.5rem;
  }
  p{
    padding-top: 0.1rem;
    font-size: 0.4rem;
    line-height: 0.8rem;
  }

</style>
