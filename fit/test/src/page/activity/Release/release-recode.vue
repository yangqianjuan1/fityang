<template>
  <my-dialog :dialogOpen="chooseDlg">
    <div class="synthesis takeCenter">
      <div flex="main:center cross:center box:mean" class="synthesis-title type1"  :class="typeCur==0?'type1':'type2'">
        <p :style="{color: typeCur==0?'#545454':'#ffffff'}" @click="chooseType(0)"></p>
        <p :style="{color: typeCur==1?'#545454':'#ffffff'}" @click="chooseType(1)"></p>
      </div>

      <scroll
        ref="scroll2"
        style="height: 7rem;position: relative;margin-top: 0.2rem"
        :pullUpLoad="setPullUpLoad"
        :pullUpLoadFuc="UpLoadFuc"
        pullUpLoadFucParam="UpLoad">
        <ul >
          <li v-for="item in List" class="item">
            <div flex="main:justify" class="title">
              <p >{{gerTigerType(item)}}</p>
              <p v-if="!typeCur">放生<span >{{item.TicketCount}}</span>次</p>
              <p v-if="typeCur">#{{item.HorseNo}}</p>
            </div>
            <div v-if="!typeCur" flex="main:justify" style="margin: 0.2rem 0;">
            <p >感恩祝福号码(第{{item.ReleaseNo}}期)：</p>

            </div>
            <div v-if="typeCur" flex="main:justify"><p>第{{item.ReleaseNo}}期</p>
              <p class="luck" v-if="item.Status==3">幸运号码：#{{item.WinningResultNo}}</p>
              <p  v-if="item.Status==2">待结算</p>
            </div>
            <div v-if="typeCur">幸运获奖者：{{item.NickName}}</div>
            <div v-if="typeCur">结束时间：{{item.WinningTime}}</div>
            <p v-if="!typeCur" class="num-abc-warp"><span v-for="number in item.TicketNos">{{number}}、</span></p>
            <div class="under-line"></div>
          </li>
          <div style="text-align: center" v-if="empty">
            <img style="width: 2.5rem;padding: 1rem" src="../../../assets/img/dialog/empty.png" >
          </div>
        </ul>
      </scroll>
      <button class="cancel cl btn-yellow" @click="closeDialog">取消</button>
    </div>
  </my-dialog>
</template>

<script>
  import Scroll from "../../../components/scroll/scroll";
  import MyDialog from "../../../components/dialog";
  export default{
    components: {
      MyDialog,
      Scroll},
    name: "release-recode",
    props:{
      value:""
    },
    data(){
      return {
        typeCur:0,
        empty:false,
        Offset:0,
        pageSize:20,
        chooseDlg:false,
        List:[]
      }
    },
    computed:{

      setPullUpLoad:function () {
        return {
          threshold:-60,
        }
      },//上拉设置
    },
    mounted(){
      this.chooseDlg = this.value;

    },
    methods:{
      UpLoadFuc:function () {
        if(this.typeCur){
          this.getFinishList('UpLoad')
        }else{
          this.getOnGoingList();
        }
      },
      gerTigerType:function (item) {
        switch (item.ReleaseHorseType){
          case 1:return "猛虎专区（"+(item.IsGenesis?'创世虎)':'神虎）');
          case 2:return "猛虎专区（"+(item.IsGenesis?'创世虎)':'神虎）');
          case 3:return "神虎专区（"+(item.IsGenesis?'创世虎)':'神虎）');
        }
      },
      getOnGoingList:function () {//进行中
        this.$axios.post('/api/releasehorse/getcurrentrelease/').then(
          res => {
            let result = res.data;
            if (result.IsSuccess) {
              if(result.Result.length>0){
                this.empty = false;
                this.List = result.Result;
              }else{
                this.empty = true
              }
            } else {
              this.$get_error('tips',result.Code,result.Message);
            }
          }, error => {
            this.$get_error('network');
          }
        );
      },
      getFinishList:function (type) {//以结束
        let offset;
        if(type ==='UpLoad'){
          offset = this.Offset;
        }else{
          offset =0;
        }
        let data = {offset:offset,size:this.pageSize};
        this.$axios.post('/api/releasehorse/getwinningrecord/',data).then(
          res => {
            let result = res.data;
            if (result.IsSuccess) {
              if(result.Result.Data.length>0){
                if(type ==='UpLoad'){
                  this.List = this.List.concat(result.Result.Data);
                }else{
                  this.List = result.Result.Data
                }
                this.Offset = this.List.length;
                if(type ==='UpLoad'){

                  // this.$tips('暂无更多数据')
                }
              }
              if(this.List.length>0){
                this.empty = false;
              }else{
                this.empty = true;
              }
              if(this.$refs.scroll2){
                this.$refs.scroll2.finishiPullUp();
              }

            } else {
              if(this.$refs.scroll2){
                this.$refs.scroll2.finishiPullUp();
              }
              this.$get_error('tips',result.Code,result.Message);
            }
          }, error => {
            if(this.$refs.scroll2){
              this.$refs.scroll2.finishiPullUp();
            }
            this.$get_error('network');
          }
        );
      },
      closeDialog:function () {
        this.typeCur=0;
        this.chooseDlg = false;
      },
      chooseType:function (type) {
        this.typeCur = type;
        this.empty = false;
        this.List = [];
//          this.List = [];
        if(type){
          this.getFinishList()
        }else{
          this.getOnGoingList();
        }

      },//切换标签
    },
    watch:{
      value:function (val) {
        this.List=[];
        this.chooseDlg = val;
        if(val){
          this.getOnGoingList();
        }
      },
      chooseDlg:function (val) {
        this.$emit('input',val);
      }
    }
  }
</script>

<style scoped>
  .item{
    margin: 0.2rem 0;
    font-size: 0.3rem;
    line-height: 0.8rem;
  }

  .item >p,.item span{

  }
  .luck{
   background: url("../../../assets/img/dialog/luck.png");
    background-size: 100% 100%;
    padding:  0 0.3rem;
    color: #ffffff;
  }
  .synthesis{
    padding: 0.5rem;
    background-image: url("../../../assets/img/competition/guideBg.png");
    background-size: 100% 100%;
    width: 80%;
    border-radius: 5px;
    height: 10rem;
  }
  .title{
    background-color: #D2AA6D;
    border-radius: 0.2rem;
    padding: 0 0.4rem;
    margin-bottom: 0.2rem;
  }
  .synthesis-title{
    text-align: center;
    color: #9B9B9B;
    padding: 0.1rem 0;
    border-radius: 0.1rem;
  }
  .under-line-white{
    margin-top: 0.2rem;
    height: 2px;
    /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#f1806f+0,f1806f+14,ffffff+25,ffffff+71,ffffff+71,ffffff+75,f1806f+100 */
    background: #f1806f; /* Old browsers */
    background: -moz-linear-gradient(left, #f1806f 0%, #f1806f 14%, #ffffff 25%, #ffffff 71%, #ffffff 71%, #ffffff 75%, #f1806f 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(left, #f1806f 0%,#f1806f 14%,#ffffff 25%,#ffffff 71%,#ffffff 71%,#ffffff 75%,#f1806f 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to right, #f1806f 0%,#f1806f 14%,#ffffff 25%,#ffffff 71%,#ffffff 71%,#ffffff 75%,#f1806f 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f1806f', endColorstr='#f1806f',GradientType=1 ); /* IE6-9 */
  }
  .type1{
    background: url("../../../assets/img/fuse/type1.png");
    background-size: 100% 100%;
  }
  .type2{
    background: url("../../../assets/img/fuse/type2.png");
    background-size: 100% 100%;
  }
  .type{
    background: #6D4A2E;
    width: 2.5rem;
    height: 0.7rem;
    line-height:0.7rem;
    text-align: center;
    border-radius: 0.2rem;
    margin-top: 0.2rem;
    position: relative;
    left: 0.8rem;
  }
  .synthesis-title{
    width: 90%;
    margin:  0 auto;
    height:0.8533rem ;
    text-align: center;
    color: #9B9B9B;
    font-size: 0.32rem;
    padding: 0.1rem 1rem;
    border-radius: 0.1rem;
  }
  .synthesis-title p{
    height: 100%;
  }
  .cancel{
    position: absolute;
    bottom: 0.36rem;
    width:2.5rem;
    height:0.6933rem;
    line-height: 0.6933rem;
    cursor:pointer ;
  }

</style>
