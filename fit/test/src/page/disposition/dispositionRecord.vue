<template>
  <div class="dispositionRecord">

    <red-table :titleList="titleList" style="margin-top: 1rem">
      <scroll top="6.5" style="margin:  0 auto;padding: 0 0.5rem"
              ref="scroll2"
              :pullUpLoad="setPullUpLoad"
              :pullUpLoadFuc="getRecordList"
              pullUpLoadFucParam="UpLoad" warpId="scroll2">
        <div   v-for="(item,index) in comList">
          <li  flex="main:center cross:center box:mean" class="item">
            <span>#{{item.HorseNo1}}</span>
            <span>{{item.RareLevel1|rare}}</span>
            <span>{{item.Combat1}}</span>
            <span>{{getState(item.GameResult)}}</span>
            <button class="btn-yellow" style="height: 0.69rem" @click="details(item)">查看详情</button>
          </li>
          <div class="under-line" ></div>
        </div>
      </scroll>
    </red-table>


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
    name: "dispositionRecord",
    data(){
      return {
        pageSize:30,
        offset:0,
        titleList:['老虎ID','等级','战斗力','状态','操作'],
        comList:[],
        detail:false,
        detailList:[],
        detailAccountNick:"",
        detailOpponentNick:"",
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

      getTime:function (item) {
        return item.slice(5,16)
      },
      getState:function (GameResult) {
        switch (GameResult){
          case 0:return '—';
          case 1:return '胜';
          case 2:return '负';
        }
      },
      details:function (item) {

        this.$emit("detail",item)
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
        this.$axios.post('/api/battle/character/teamlist/',data).then(
          res=>{
            let result = res.data;
            if(result.IsSuccess){
              if(!result.Result.Data) return;
              if(result.Result.Data.length>0){
                let list = result.Result.Data;
                if(type ==='UpLoad'){
                  this.comList =  this.comList.concat(list);
                }else{
                  this.comList= list;
                }
              }else{
                if(type ==='UpLoad')
                {
                }else{
                  this.empty = true;
                }
              }
              if(this.$refs.scroll2){
                this.$refs.scroll2.finishiPullUp();
              }
              this.offset = this.comList.length;
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
      },//获取添加老虎列表
    }
  }
</script>

<style scoped>
  .dispositionRecord{
    padding:  0 0.5rem;
  }
  .name span{
    display: inline-block;
    width: 45%;
    text-align: center;
    word-break: break-all;
    height: 100%;
    font-size: 0.45rem;
  }
  .item{
    text-align: center;
    padding: 0.2rem 0;
    line-height: 1rem;
  }

  .item span,.detailItem span{
    word-wrap: break-word;
  }
 .detailItem{
    padding: 0.1rem 0;
  }
  .table{
    width: 100%;
    text-align: center;
    font-size: 0.2933rem;
    margin-top: 0.5rem;
  }
  .title{
    background: #ffffff;
    border-radius: 0.15rem;
    color: #666666;
    padding: 0.1rem;
  }
  .title p{
    font-size: 0.2933rem;
  }

</style>
