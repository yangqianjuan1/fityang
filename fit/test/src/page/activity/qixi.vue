<template>
  <div >
    <scroll>
      <div style="text-align: center">
        <img src="../../assets/img/activity/qixi.png" style="width: 100%">
        <contain style="text-align: center">
          <div class="content">
            <div class="info cl">活动说明</div>
            <p style="text-indent: 0">1、活动规则：</p>
            <p>性格大比拼排行榜在活动结束时稳居第一的用户，可以获得牛郎织女的祝福，得到77枚万利碎片，每拥有一匹神马可获得2个套马券。（如果拥有创世马用户，每一匹神马额外获得1个套马券）</p>
            <p >守护鹊桥第二名用户，可获得20枚万利碎片。   每拥有一匹神马可获得1个套马券。（如果拥有创世马，每一匹神马可额外获得1个套马券）</p>
            <p>守护鹊桥第三名用户，可获得5枚万利碎片。（如果拥有创世马，每一匹神马可获得1个套马券）</p>
            <p style="text-indent: 0">2、额外福利：</p>
            <p> 活动期间，在性格比拼大擂台与对手比拼中获胜！就有概率获得七夕祝福“万利碎片”；</p>
            <p>概率为1/100</p>
            <p style="text-indent: 0">3、活动时间：</p>
            <p> 2018年8月17日12点—2018年8月20日12点。</p>
            <p style="text-indent: 0">4、活动最终解释权归万利马所有。</p>
          </div>
        </contain>
      </div>
    </scroll>
  </div>
</template>

<script>
  import Contain from "../../components/contain";
  import Scroll from "../../components/scroll/scroll";

  export default{
    components: {
      Scroll,
      Contain},
    name: "qixi",
  }
</script>

<style scoped>
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
  .content p{
    font-size: 0.4rem;
    color: #074D5B;
    line-height: 0.6rem;
    text-indent: 2em;
  }
  .content{
    position: relative;
    text-align: left;
    border-radius: 10px;
    border: 5px solid #ffffff ;
    background-color:rgba(0,0,0,0.2);
    padding: 1rem 0.5rem;
    margin: 0.5rem 0;
  }

</style>
