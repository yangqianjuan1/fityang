<template>
  <div class="fomo3dRecord">
    <scroll top="6.5" style="margin:  0 auto;padding: 0 1rem"
            ref="scroll2"
            :pullUpLoad="setPullUpLoad"
            :pullUpLoadFuc="getRecordList"
            pullUpLoadFucParam="UpLoad" warpId="scroll2">
      <red-table :titleList="titleList" style="margin-top: 0.2rem"></red-table>
      <div v-for="item in List" >
        <div flex="box:mean cross:center" class="list">
          <p style="border-right: #f4f5f000 dashed  1px;">{{item.GameKey}}</p>
          <p style="border-right: #f4f5f000 dashed  1px;">{{getTeam(item.TeamName)}}</p>
          <!-- <p>{{item.KeyCount}}</p> -->
          <p style="border-right: #f4f5f000 dashed  1px;">{{item.TeamReward}}</p>
          <p style="border-right: #f4f5f000 dashed  1px;">{{item.LastReward}}</p>
					<p>{{item.EndTime|Time}}</p>
        </div>
        <div class="under-line"></div>
      </div>
    </scroll>
  </div>
</template>

<script>
  import RedTable from "../../components/red-table";
  import MyDialog from "../../components/dialog";
  import OneCancelDialog from "../../components/tips/oneCancelDialog";
  import Scroll from "../../components/scroll/scroll";
  import ComfireDialog from "../../components/comfireDialog";

  export default{
    components: {
      ComfireDialog,
      Scroll,
      OneCancelDialog,
      MyDialog,
      RedTable},
    name: "fomo3dHistory",
    data(){
      return {
        pageSize:10,
        offset:0,
        titleList:['轮数','获胜动物','团队分红','最终大奖','结束时间'],
        List:[],
        HistoryRecord:{}
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
      this.getRecordList();
    },
    methods:{
      getTeam:function (name) {
        switch (name){
          case 'Horse':return "马";
          case 'Dog':return "狗";
          case 'Fish':return "鱼";
          case 'Cattle':return "牛";
        }
      },
      getRecordList:function (type) {
        let offset;
        if(type ==='UpLoad'){
          offset = this.offset;
        }else
        {
          offset = 0;
//          this.comList = [];
        }
        let data={size:this.pageSize,offset:offset};
        this.$axios.get('/api/fomo3d/fomo3dHistory/?offset='+offset+'&size='+this.pageSize).then(
          res=>{
            let result = res.data;
            if(result.IsSuccess){
              if(!result.Result.Data) return;
              this.HistoryRecord = result.Result.Data.HistoryRecord;
              if(result.Result.Data.FOMO3DHistoryList.List.length>0){
                let list = result.Result.Data.FOMO3DHistoryList.List;
                if(type ==='UpLoad'){
                  this.List =  this.List.concat(list);
                }else{
                  this.List= list;
                }
              }else{
                if(type ==='UpLoad')
                {
                  // this.$tips('暂无更多提现记录');
                }else{
                  this.empty = true;
                }
              }
              if(this.$refs.scroll2){
                this.$refs.scroll2.finishiPullUp();
              }
              this.offset = this.List.length;
            }else{
              if(this.$refs.scroll2){
                this.$refs.scroll2.finishiPullUp();
              }
              this.$get_error('tips',result.Code,result.Message);
            }
          },error=>{
            if(this.$refs.scroll2){
              this.$refs.scroll2.finishiPullUp();
            }
            this.$get_error('reload');
          }
        );
      },//获取记录
    }
  }
</script>

<style scoped>
  .total{
    background-image: url("../../assets/img/fomo3d/total-bg.png");
    background-size: 100% 100%;
    padding: 0.5rem 0.8rem;
  }
  .total span{
    font-weight: 600;
    line-height: 0.5rem;
  }
  .list{
    word-WRAP: break-word;
    text-align: center;
    padding: 0.2rem 0;
  }
</style>
