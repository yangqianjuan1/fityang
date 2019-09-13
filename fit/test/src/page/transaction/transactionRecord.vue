<template>
    <div class="transactionRecord">
      <scroll
        :pullUpLoad="setPullUpLoad"
        :pullUpLoadFuc="getRecodeList"
        pullUpLoadFucParam="UpLoad"
        top="2"
        style="padding:  0 0.5rem"
        ref="scroll"

      >
     <div > <red-table :titleList="titleList"></red-table>
        <ul  v-if="!empty">
          <li v-for="item in Records" flex="main:center box:mean" class="item">
            <p>{{item.CompleteTime|Time}}</p>
            <p>{{item.IsBuy?'买虎':'卖虎'}}<span v-if="item.TigerNo">(#{{item.TigerNo}})</span></p>
            <p>{{item.Amount}}</p>
          </li>
        </ul>
       <div style="text-align: center" ><img style="width: 2.5rem;padding: 2rem" src="../../assets/img/dialog/empty.png" v-if="empty"/></div>
     </div>
      </scroll>

    </div>
</template>

<script>
  import Scroll from "../../components/scroll/scroll";
  import RedTable from "../../components/red-table";
    export default{
      components: {
        RedTable,
        Scroll},
      name: "transactionRecord",
        data(){
            return {
              pageSize:30,
              offset:0,
              titleList:['时间','类型','金额'],
              Records:[],
              empty:false
            }
        },
      computed:{
        setPullUpLoad:function () {
          return {
            threshold:-30,

          }
        },
      },
      mounted(){
            this.getRecodeList();
      },
      methods:{
        getRecodeList:function (type) {
          let offset,total;
          if(type ==='UpLoad'){
            offset = this.offset;
          }else
          {
            offset = 0;
            this.Records = [];
          }
          this.$axios.get('/api/horse/trade/recordlist/?size='+this.pageSize+'&offset='+offset).then(
            res=>{
              let result = res.data;
              if(result.IsSuccess){
                this.empty = false;
                if(!result.Result.Data) return;
                if(result.Result.Data.length>0){
                  let list = result.Result.Data;
                  this.empty = false;
                  if(type ==='UpLoad'){
                    this.Records =  this.Records.concat(list);
                  }else{
                    this.Records= list;
                  }
                  this.offset = this.Records.length;

                }else{
                  if(type ==='UpLoad')
                  {
                    // this.$tips('暂无更多提现记录');
                  }else{
                    this.empty = true;
                  }
                }
                if(this.$refs.scroll){
                  this.$refs.scroll.finishiPullUp();
                }
              }else{
                if(this.$refs.scroll){
                  this.$refs.scroll.finishiPullUp();
                }
                this.$get_error('tips',result.Code,result.Message);
              }
            },error=>{
              if(this.$refs.scroll){
                this.$refs.scroll.finishiPullUp();
              }
              this.$get_error('reload');
            }
          );
        },//记录
      }
    }
</script>

<style scoped>
    .transactionRecord {
      background-image: url("../../assets/img/transactin/bg.png");
      background-size: 100% 100% ;
      width: 100%;
      height: 100vh;
    }
  .item{
   text-align: center;
    padding: 0.3rem 0;
    border-bottom: 1px solid #CDA669;
  }
</style>
