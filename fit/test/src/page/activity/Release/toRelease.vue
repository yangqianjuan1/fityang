<template>
  <div class="toRelease">
    <my-dialog  :dialogOpen="releaseDialog">
      <div class="Check takeCenter" style="text-align: center">
        <div class="synthesis-title ">
          <!--<p  style="transform: skewX(15deg);">{{getArea}}<span>（{{getType}}）</span></p>-->
          <p  >{{getArea}}<span>（{{getType}}）</span></p>
        </div>
        <div flex="main:justify">
          <search style="width: 35%;" :value="searchValue" @input="getSearch" :searchFuc="search"></search>
          <div @click="sort"> <sort name="战斗力" :up="orderByCombat" ></sort></div>
        </div>
        <scroll
          ref="scroll2"
          style="height: 6.5rem;position: relative;margin-top: 0.2rem"
          :pullUpLoad="setPullUpLoad"
          :pullUpLoadFuc="getList"
          pullUpLoadFucParam="UpLoad">
          <ul >
            <li v-for="item in List" >
              <div flex="main:justify cross:center "  class="synthesis-item " >
                <div class='checkbox'>
                  <input type='checkbox' :id='item.HorseNo':value="item.HorseNo" v-model="chooseArr" ref="checkbox">
                  <label :for='item.HorseNo' class="ct"></label>
                </div>
                <tiger-img :Style="item.Style" style="width: 35%;top: -0.2rem;left: 0.5rem"></tiger-img>
                <div style="width: 50%">
                  <p>ID号：{{item.HorseNo}}</p>
                  <p>等级：{{item.RareLevel|rare}}</p>
                  <p>战斗力：{{item.CombatPower}}</p>
                </div>
                <div>
                </div>
              </div>
              <div class="under-line"></div>
            </li>
            <div style="text-align: center" v-if="empty">
              <img style="width: 2.5rem;padding: 1rem" src="../../../assets/img/dialog/empty.png" >
            </div>
          </ul>
        </scroll>
        <div flex="main:right cross:center" class="btnWarp cl">
          <button @click="onceCheckCancle"  class="checkCancle btn-violet">取消</button>
          <button @click="onceCheckSure" class="checkSure  btn-yellow">确认</button>
        </div>
      </div>
    </my-dialog>
    <my-dialog :dialogOpen="success">

      <div class="Check takeCenter" >
        <scroll
          style="height: 7rem;position: relative;text-align: center">
          <p style="font-size: 0.4rem;margin: 0.5rem 0">获得感恩卷X{{result.count}}</p>
          <img src="../../../assets/img/activity/release-tick.png" style="width:30%;margin: 0.5rem">
          <p style="text-align: left">感恩祝福号码：</p>
          <div class="under-line" style="margin: 0.2rem 0"></div>
          <p style="width: 100%;text-align: left" class="num-abc-warp"><span v-for="number in result.ticketNos">{{number}}、</span></p>
        </scroll>
        <button class="cl btn-yellow btnWarp" @click="closeSuccess">确认</button>
      </div>
    </my-dialog>
  </div>
</template>

<script>
  import MyDialog from "../../../components/dialog";
  import common from '../../../components/common'
  import Scroll from "../../../components/scroll/scroll";
  import TigerImg from "../../../components/tigerImg";
  import Search from "../../../components/search";
  import Sort from "../../../components/sort";
  export default{
    components: {
      Sort,
      Search,
      TigerImg,
      Scroll,
      MyDialog},
    name: "toRelease",
    props:{
      infoFun:{

      },
      type:{
        default:1,
      },
      Info:{
      },
      value:{},
    },
    data(){
      return {
        releaseDialog:false,
        List:[],
        size:30,
        fragmentOffset:0,
        empty:false,
        chooseArr:[],
        success:false,
        result:{
          count:0,
          ticketNos:[]
        },
        orderByCombat:-1,
        searchValue:''
      }
    },
    computed:{
      setPullUpLoad:function () {
        return {
          threshold:-60,
        }
      },//上拉设置
      getArea:function () {
        switch (this.type){
          case 1:return '猛虎专区';
          case 2:return '猛虎专区';
          case 3:return '神虎专区';
        }
      },
      getType:function () {
        if(this.Info.IsGenesis){
            return '创世虎';
        }else if(this.Info.IsStud){
          return '神虎';
        }else{
            return '猛虎';
        }
      }
    },
    mounted(){
      this.releaseDialog = this.value
    },
    methods:{
      closeSuccess:function () {
        this.success =false
      },
      sort:function () {
        this.searchValue = "";
        if(this.orderByCombat===-1)
        {
          this.orderByCombat = 0
        }else
        {
          this.orderByCombat = this.orderByCombat>0?0:1;
        }

        this.getList();
      },
      search:function () {
        this.orderByCombat = -1;
        this.getList();
      },
      getSearch:function (val) {
        this.searchValue = val
      },
      getList:function (type) {
        let offset;
        if(type ==='UpLoad'){
          offset = this.fragmentOffset;
        }else{

          offset =0;
        }
        let data = {offset:offset,size:this.size,type:this.type,horseNo:this.searchValue,orderByCombat:this.orderByCombat};
        this.$axios.post('/api/activity/getreleasehorses/', data).then(
          res => {
            let sameIndex=null;
            let result = res.data;
            if (result.IsSuccess) {
              if(result.Result.Data.length>0){
                let record = [];
                result.Result.Data.map(item=>{
                  item.horse = common.svgApi+item.HorseKey;
                  record.push(item);
                });
                if(type ==='UpLoad'){
                  this.List = this.List.concat(record);
                }else{
                  this.List = record
                }
                this.fragmentOffset = this.List.length;
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
      },//list
      onceCheckCancle:function () {
        this.chooseArr=[];
        this.releaseDialog = false;
      },
      onceCheckSure:function () {
        if(!this.chooseArr.length>0){
          this.$tips('请至少选择一只虎');
          return
        }
        let data={horseNos:this.chooseArr,type:this.type};
        this.$axios.post("/api/activity/releasehorses/",data).then(
          res=>{
            let result = res.data;
            if(result.IsSuccess){
              this.releaseDialog = false;
              this.result = result.Result;
              this.chooseArr=[];
              this.success = true;
              this.infoFun();
            }else{
              this.releaseDialog = false;
              this.chooseArr=[];
              this.$get_error('tips',result.Code,result.Message);
            }
          },error=>{
            this.releaseDialog = false;
            this.$get_error('network');
          }
        )
      }
    },
    watch:{
      value(val){
        this.List=[];
        this.releaseDialog = val;
        if(val){
          this.getList();
        }
      },
      releaseDialog(val){
          this.searchValue= "";
          this.orderByCombat = -1;
        this.$emit('input',val)
      }
    }
  }
</script>

<style scoped>

  .synthesis-item{
    position: relative;
    padding: 0.2rem 0;
  }
  .checkbox input[type='checkbox']
  { position: absolute; left: 0; top: 0; width:100%; height: 100%; opacity: 0; }
  .checkbox label {

    height: 0.5rem;
    width: 0.5rem;
    line-height: 0.5rem;
    border: 1px solid #9D4E42;
    background-color: #ffffff;
    border-radius: 0.1rem;
  }

  .checkbox input[type='checkbox']:checked + label:before { background: #ffffff; border-color: #4cd764; }
  .checkbox label:before {
    content: '';
    position: absolute;
    width:  0.1rem;
    height:  0.3rem;
    left: 20%;
    top: 31%;
    border: 1px solid #9D4E42;
    background-color: #ffffff;
    border-radius: 0.1rem;
    opacity: 0;
    transform:rotate(145deg);
  }
  .checkbox label:after {
    content: '';
    position: absolute;
    width: 6px;
    left: 70%;

    height: 0.5rem;
    border: 0;
    background: #fff;
    transform: rotate(45deg);

    transition: all 0.3s ease;
    -webkit-transition: all 0.3s ease;
    -moz-transition: all 0.3s ease;
    opacity: 0;
  }
  .checkbox input[type='checkbox']:checked + label:before {

    background: #4cd764;
    opacity: 1;
  } .checkbox input[type='checkbox']:checked + label:after {
      background: #4cd764;
      opacity: 1;
    }
  button{
    width:2.5rem;
    height:0.6933rem;
    line-height: 0.6933rem;
    cursor:pointer ;
  }
  .Check{
    padding:0.5rem 1rem 1.05rem 1rem;
    background-image: url("../../../assets/img/competition/guideBg.png");
    background-size: 100% 100%;
    width: 80%;
    border-radius: 5px;
    height: 10rem;
  }

  .checkCancle{
    margin-right: 5vw;
  }
  .btnWarp{
    position: absolute;
    bottom: 0.36rem;
  }
  .type{
    background: #6D4A2E;
    width: 2.5rem;
    height: 0.7rem;
    color: #ffffff;
    line-height:0.7rem;
    text-align: center;
    border-radius: 0.2rem;
    margin-top: 0.2rem;
    position: relative;
    left: 0.8rem;
  }

  .synthesis{
    padding: 0.5rem;
    background-image: url("../../../assets/img/fuse/choose-bg.png");
    background-size: 100% 100%;
    width: 80%;
    border-radius: 5px;
    color: #fff;;
    height: 10rem;
  }
  .synthesis-title{
    text-align: center;
    margin: 0 auto;
    padding: 0.2rem ;
    /*transform: skewX(-15deg);*/
    /*color: #9B9B9B;*/
    /*background-color: #ffffff;*/
    display: inline-block;

    font-weight: 600;
  }
  .synthesis-title p,.synthesis-title span{
    font-size: 0.4rem;
    font-weight: 600;
    /*color: #545454;*/
  }
  /*{*/
    /*font-size: 0.5rem;*/
    /*font-weight: 600;*/
    /*!*color: #f07765;*!*/
  /*}*/
  .under-line-white{
    height: 2px;
    /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#f1806f+0,f1806f+14,ffffff+25,ffffff+71,ffffff+71,ffffff+75,f1806f+100 */
    background: #f1806f; /* Old browsers */
    background: -moz-linear-gradient(left, #f1806f 0%, #f1806f 14%, #ffffff 25%, #ffffff 71%, #ffffff 71%, #ffffff 75%, #f1806f 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(left, #f1806f 0%,#f1806f 14%,#ffffff 25%,#ffffff 71%,#ffffff 71%,#ffffff 75%,#f1806f 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to right, #f1806f 0%,#f1806f 14%,#ffffff 25%,#ffffff 71%,#ffffff 71%,#ffffff 75%,#f1806f 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f1806f', endColorstr='#f1806f',GradientType=1 ); /* IE6-9 */
  }
</style>
