<template>
  <my-dialog :dialogOpen="current">
    <div class=" takeCenter" :class="warp">
      <slot></slot>
      <div flex="main:right cross:center" class="btnWarp cl">
        <button @click="onceCheckCancle" style="margin-right: 1rem" :class="type?'checkSure ':'checkCancle btn-violet'" v-if="type!==1">{{cancleText}}</button>
        <button @click="onceCheckSure"  :class="type?' btn-yellow':' btn-yellow'" >{{sureText}}</button>
      </div>
    </div>
  </my-dialog>
</template>

<script>
  import MyDialog from "./dialog";
  export default{
    components: {MyDialog},
    name: "comfireDialog",
    props:{
      type:{
        default:0  //0双 1 单
      },
      warp:{
          default:'Check'
      },
      value:{},
      sure:{},
      cancleFuc:{
      },
      param:{},
      cancleText:{
        default:'取消'
      },
      sureText:{
        default:'确认'
      },
    },
    data(){
      return {
        current:false,
      }
    },
    watch:{
      value:function (val) {

        this.current = val;
      },
      current:function (val) {
        this.$emit('input',val)
      }
    },
    methods:{
      onceCheckSure:function () {
        if(this.param){
          this.sure(this.param);
        }else{
          this.sure();
        }
      },
      onceCheckCancle:function () {
        if(this.cancleFuc){
          this.cancleFuc();
        }
        this.current =false;
      }
    },
    mounted(){
      if(this.value){
        this.current = this.value
      }
    }
  }
</script>

<style scoped>
  button{
    width:2.5rem;
    height:0.6933rem;
    line-height: 0.6933rem;
    cursor:pointer ;
  }
  .warp{
    padding: 0.5rem;
    background-image: url("../assets/img/competition/guideBg.png");
    background-size: 100% 100%;
    width: 80%;
    border-radius: 5px;
    height: 10rem;
  }
  .Check{
    padding:0.5rem 1rem 1.05rem 1rem;
    width: 90%;
    min-height: 4rem  ;

    background-image: url("../assets/img/transactin/dlg-bg-sm.png");
    background-size: 100% 100%;
  }
  .checkCancle{
    margin-right: 5vw;
    border-radius: 0.3rem;
  }
  .btnWarp{
    position: absolute;
    bottom: 0.36rem;
  }
</style>
