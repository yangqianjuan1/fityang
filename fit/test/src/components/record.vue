<template>
  <div class="record" style="position: relative">
    <div class="contain" style="margin:  0 auto;position: relative" v-if="Records.length>0">
      <div  v-if="type===0" flex="main:center:cross:center">
        <ul  v-if="type===0" style="color: #ffffff">
          <li class="table-title miaobian-hong" flex="main:center cross:center box:mean">
            <div>时间</div>
            <div>体重</div>
            <div>喂养</div>
            <div>收益</div>
          </li>
          <div v-for="(Record,index) in Records"   class=" miaobian-lan">
            <ul flex="main:center cross:center box:mean" style="width: 100%" class="usual">
              <li  class="items">{{Record.Time}}</li>
              <li  class="items" >+{{Record.WeightAdded?Record.WeightAdded:0}}kg </li>
              <li   class="items">-{{Record.FeedFee?Record.FeedFee:0}}</li>
              <li   class="items">{{Record.ProfitValue?Record.ProfitValue:'待结算'}} </li>
            </ul>
            <div class="under-line"></div>
          </div>
        </ul>

      </div>
      <div  v-if="type===1" flex="main:center:cross:center">

        <ul  v-if="type===1" style="color: #ffffff">
          <li class="table-title miaobian-hong" flex="main:center cross:center box:mean">
            <div>时间</div>
            <div>收益</div>
          </li>
          <div v-for="(Record,index) in Records"   class=" miaobian-lan">
          <ul flex="main:center cross:center box:mean" style="width: 100%" class="usual">
            <li  class="items">{{Record.Time}}</li>
            <li   class="items">{{Record.FamilyProfitValue?Record.FamilyProfitValue:0}}</li>
          </ul>
            <div class="under-line" ></div>
          </div>

        </ul>

      </div>
    </div>
    <div style="text-align: center" ><img style="width: 2.5rem;padding: 1rem" src="../assets/img/dialog/empty.png" v-if="empty"/></div>
    <div v-if="type===2" style="padding: 0.5rem" class=" usual from">
      <p >来源</p>
      <p  v-if="Records.Source===1||Records.Source===2||Records.Source===32||Records.Source===1024">于{{Records.CreateTime}}诞生。</p>
      <p  v-if="Records.Source===4">于{{Records.CreateTime}}在{{getType(Records)}}#{{Records.ParentHorseNo}}呵护中诞生。</p>
      <p  v-if="Records.Source===8">于{{Records.CreateTime}}在捕虎场中获得。</p>
      <p  v-if="Records.Source===16">于{{Records.CreateTime}}通过联盟邀请购买获得。</p>
      <p  v-if="Records.Source===64||Records.Source===256||Records.Source===512">于{{Records.CreateTime}}活动赠送</p>
      <p  v-if="Records.Source===128">于{{Records.CreateTime}}融合</p>
    </div>
  </div>
</template>

<script>

  export default{
    name: "record",
    props:{
      type:{
        default:0
      },
      empty:{},
      Records:""
    },
    methods:{
      getType:function (Records) {
        switch (Records.ParentLevelType){
          case 4: return "创世虎";
          case 2: return"神虎";
        }
      }
    }
  }
</script>

<style scoped>
  ul{
    width: 95%;
    margin: 0 auto;
    border-collapse: collapse;
  }
  .table-title{
    background: #ffffff;
    border-radius: 0.31rem;

  }
  .table-title div{
    text-align: center;
    font-size:0.3733rem ;
    line-height: 0.62rem;
    color: #535353;
    height: 0.62rem;
  }
  .items{
    text-align: center;
    padding: 0.3rem 0.3rem;
    color: #ffffff;
  }
  .under-line{
    width: 100%;
    height: 1px;
    background: #ffffff;
  }
  .from{
      color: #ffffff;

  }
  .from p:first-child{
    font-size: 0.373rem;
  }
</style>
