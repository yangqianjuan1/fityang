<template>
  <div>
    <scroll>
      <img src="../../assets/img/activity/worldCup.png" style="width: 100%;height: 5.6rem"/>
      <div class="content">
        <div class="info cl">活动详情</div>
        <div class="people">奖金：1000 GXS</div>
        <table>
          <tr>
            <th>品种</th>
            <th>创世马</th>
            <th>神马</th>
            <th>骏马</th>
          </tr>
          <tr v-for="item in result">
            <td>{{item.name}}</td>
            <td>{{item.num1}}</td>
            <td>{{item.num2}}</td>
            <td>{{item.num3}}</td>
          </tr>
        </table>
        <p>亲爱的万利马玩家：</p>
        <p class="text-index">等待了四年的世界杯终于到来啦，赶紧带上你的万利马，为世界杯加油助威啦~</p>
        <p >1、活动时间：</p>
        <p class="text-index">2018年6月14日—2018年7月15日。</p>
        <p class="text-index"> 所属国家的马匹数量统计截止时间：世界杯决赛前1天。</p>
        <p>2、活动内容：</p>
        <p class="text-index">万利马游戏中马匹的种类会随机出现球队国家名，世界杯活动结束之后，冠军国家球队的马匹，可以平分1000个GXS的奖励。</p>
        <p class="text-index">一匹骏马助威次数为1次，平分奖励系数为1。</p>
        <p class="text-index">一匹神马助威次数为20次，平分奖励系数为20。</p>
        <p class="text-index">一匹创世马助威次数为20次，平分奖励系数为20。</p>
        <p class="text-index">创世马助威的国家球队夺冠，拥有夺冠队伍国家的创世马小伙伴可额外得到100GXS奖励。</p>
        <p>3、活动最终解释权归万利马所有。</p>
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
        recode:{},
        result:[
          {name:'法国马',num1:0,num2:1401,num3:16337},
        ]
      }
    },
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
  table{
    width: 95%;
    text-align: center;
    font-size: 0.4rem;
    color: #074D5B;
    line-height: 0.6rem;
    margin-bottom: 0.5rem;
  }
  .text-index{
    text-indent: 2em;
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
