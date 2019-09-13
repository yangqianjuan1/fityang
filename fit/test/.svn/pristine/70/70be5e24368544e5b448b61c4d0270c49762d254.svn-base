<template>
  <div class="showText ">
    <div class="select"><ul  class="text">
      <li v-for="(tex,index) in text" class="tex" :style="{'border-bottom':(index+1) < text.length?'1px solid #D5D7DB':''}">
        <h2>{{tex.title}}</h2>
        <p>{{tex.text}}</p></li>
    </ul>
    </div>
    <foot></foot>
  </div>
</template>

<script>
  import Foot from "../../components/footer";
  export default{
    components: {Foot},
    name: "showText",
    data(){
      return {
        text:[
          {title:'系统公告',text:'猴毛与蟠桃交易已经上线，手续费0.3%，只收卖方（得到币的一方），0.2%会作为掘金收益，0.1%为游戏服务费。2018年01月14日蟠桃不够用？6代小猴专享活动，1月15日至21日期间，每只当天投食数量满5个wkc的6代小猴将于次日获得5个蟠桃，奖励随掘金一起发放，此活动仅举办一次，错过等明年'},
          {title:'客服帮助',text:'要打款2.2341。系统根据转账的hash最后一位数字与当天的星期x值，当尾号=x，则触发双倍喂养，当尾号！=x且属于1-7，则单倍喂养，若0、8、9则喂养减半，增加0.5倍体重。 喂养有概率触发属性值的提升，当hash的尾号x与你的三个属性值的某个属性值a.bc中的b相同时，此属性会增加x/10的属性点，如尾号为5，你的生育属性值为1.58，喂养金额为2.1wkc，则生育属性增加量为2.1/10=0.21，新的生育值就是1.79。若多个属性值的十分位一致且都命中，则多个属性值都会增加。'},
          {title:'客服帮助',text:'要打款2.2341。系统根据转账的hash最后一位数字与当天的星期x值，当尾号=x，则触发双倍喂养，当尾号！=x且属于1-7，则单倍喂养，若0、8、9则喂养减半，增加0.5倍体重。 喂养有概率触发属性值的提升，当hash的尾号x与你的三个属性值的某个属性值a.bc中的b相同时，此属性会增加x/10的属性点，如尾号为5，你的生育属性值为1.58，喂养金额为2.1wkc，则生育属性增加量为2.1/10=0.21，新的生育值就是1.79。若多个属性值的十分位一致且都命中，则多个属性值都会增加。'},
          {title:'客服帮助',text:'要打款2.2341。系统根据转账的hash最后一位数字与当天的星期x值，当尾号=x，则触发双倍喂养，当尾号！=x且属于1-7，则单倍喂养，若0、8、9则喂养减半，增加0.5倍体重。 喂养有概率触发属性值的提升，当hash的尾号x与你的三个属性值的某个属性值a.bc中的b相同时，此属性会增加x/10的属性点，如尾号为5，你的生育属性值为1.58，喂养金额为2.1wkc，则生育属性增加量为2.1/10=0.21，新的生育值就是1.79。若多个属性值的十分位一致且都命中，则多个属性值都会增加。'},
        ]
      }
    }
  }
</script>

<style scoped>
  .showText {
    margin: 0 auto;
    width: 90%;
    /*min-width: 1240px;*/
  }
  .text{
    margin:  0 auto;
    width: 979px;
    padding-bottom: 240px;
  }
  .tex{

    padding: 24px 0;
  }
  h2{
    color: #333333;
    font-size: 20px;
  }
  p{
    padding-top: 15px;
    color: #999999;
    font-size: 16px ;
  }
</style>
