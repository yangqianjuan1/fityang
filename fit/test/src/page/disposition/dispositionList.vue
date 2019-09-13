<template>
  <div class="dispositionList ">

    <div class="label " flex="main:justify cross:center">
      <div  flex="main:justify cross:center"> <span class="label-left">类型:</span><selection :values="selectValue" :selectFunc="selectFunc" ref="selectTrans"></selection></div>
      <button class="btn-yellow com" @click="confirm">确认参赛</button>
    </div>

    <red-table :titleList="titleList" style="margin: 0.2rem 0.5rem;">
      <scroll top="8" style="margin:0 auto;padding: 0 0.5rem">
        <div   v-for="(item,index) in comList">
          <li  flex="cross:center box:mean" class="item">

            <p flex="main:justify"><span class="num-abc-warp" style="width: 80%;margin-left: 0.5rem;line-height: 0.5rem">{{item.HorseNo?'#'+item.HorseNo:'—'}}</span><img src="../../assets/img/disposition/delete.png" class="ct delete" v-if="item.HorseKey" @click="deleteCom(index)"></p>
            <span v-if="item.RareLevel">{{item.RareLevel|rare}}</span>
            <span v-if="!item.RareLevel">—</span>
            <span>{{item.CombatPower?item.CombatPower:'—'}}</span>
            <button class="btn-violet" style="height: 0.8rem" @click="edit(index)">添加老虎</button>
          </li>
          <div class="under-line" v-if="index!==4"></div>
        </div>
      </scroll>
    </red-table>
  </div>
</template>

<script>
  import Selection from "../../components/index/select";
  import RedTable from "../../components/red-table";
  import MyDialog from "../../components/dialog";
  import ComfireDialog from "../../components/comfireDialog";
  import Scroll from "../../components/scroll/scroll";
  import common from '../../components/common'
  export default{
    components: {
      Scroll,
      ComfireDialog,
      MyDialog,
      RedTable,
      Selection},
    name: "dispositionList",
    props:{
      com:[
        {num:1,RareLevel:'',CombatPower:''},
        {num:2,RareLevel:'',CombatPower:''},
        {num:3,RareLevel:'',CombatPower:''},
        {num:4,RareLevel:'',CombatPower:''},
        {num:5,RareLevel:'',CombatPower:''},
      ],
    },
    data(){
      return {
        pageSize:30,
        offset:0,
        comList:[
          {num:1,RareLevel:'',CombatPower:''},
          {num:2,RareLevel:'',CombatPower:''},
          {num:3,RareLevel:'',CombatPower:''},
          {num:4,RareLevel:'',CombatPower:''},
          {num:5,RareLevel:'',CombatPower:''},
        ],
        chooseIndex:-1,
        chooseDlg:false,
        titleList:['老虎ID','等级','战斗力','操作'],
        selectValue:[
          {value:"猛虎专区"},
          {value:"神虎专区"},
        ],
        type:0,//0猛虎专区 1神虎专区
        empty:false,
        comDialog:false
      }
    },
    computed:{

      getPrice:function () {
        switch (this.type){
          case 0:return "0.01";
          case 1:return "0.2";
        }
      },

    },
    methods:{
      reset:function () {//重置参赛老虎
        {
          this.comList=  [
            {num:1,RareLevel:'',CombatPower:''},
            {num:2,RareLevel:'',CombatPower:''},
            {num:3,RareLevel:'',CombatPower:''},
            {num:4,RareLevel:'',CombatPower:''},
            {num:5,RareLevel:'',CombatPower:''},
          ]
        }
      },
      selectFunc:function (val) {//筛选
        this.reset();
        if(val ==='猛虎专区'){
          this.type = 0;

        }else if(val ==='神虎专区'){
          this.type = 1;
        }
        this.$emit('select',this.type)
      },
      deleteCom:function (index) {
        this.$emit('delete',index)
      },
      edit:function (index) {//选择老虎
        let choose={};
        choose.index = index;
        choose.type = this.type;
        this.$emit('index',choose);
      },

      sure:function () {
        this.commit();
      },

      confirm:function () {
      let result=this.comList.filter((item)=>{
              if(item.HorseKey) {
                return true
              }
          });
          if(result.length>0){
            return  this.$emit('commit',true)
          }else{
            return this.$tips('请至少选择一只老虎！')
          }
      }
    },
    watch:{
      com:function (val) {
        this.comList = val
      }
    }
  }
</script>

<style scoped>
  .dispositionList{
  }
  .delete{
    height: 0.5rem;
    width: 0.5rem;
    position: absolute;
    left: 0
  }
  .Check{
    padding: 0.5rem;
    background-image: url("../../assets/img/competition/guideBg.png");
    background-size: 100% 100%;
    width: 80%;

    border-radius: 5px;
    height: 10rem;
  }
  .synthesis-title{
    text-align: center;
    margin: 0 auto;
    padding: 0.2rem ;
    transform: skewX(-15deg);
    color: #000000;
    background-color: #ffffff;
    display: inline-block;
    font-size: 0.32rem;
  }
  .synthesis-item{
    position: relative;
    padding: 0.2rem 0;
    text-align: left;
  }
  .checkCancle{
    position: absolute;
    bottom: 0.36rem;
    width:2.5rem;
    height:0.6933rem;
    line-height: 0.6933rem;
    cursor:pointer ;
  }
  .label{
    height: 1.16rem;
    width: 100%;
    padding: 0 0.42rem;
    margin-top: 1rem;
  }
  .label-left{
    margin-right: 0.5rem;
    font-weight: 600;
  }
  .com{
    width: 1.92rem;
    height: 0.7333rem;
    font-size: 0.2933rem;
  }
  .item{
    text-align: center;
    font-size: 0.333rem;
    padding: 0.2rem 0;
    line-height: 1rem;
    position: relative;
  }

</style>

