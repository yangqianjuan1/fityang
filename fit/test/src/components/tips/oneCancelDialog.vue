<template>
  <my-dialog :dialog-open="current">
    <div class="warp takeCenter">
      <p v-if="title" class="title">{{title}}</p>

        <slot></slot>
      <button @click="close"  class="checkCancle btn-violet cl">取消</button>
    </div>
  </my-dialog>
</template>

<script>
  import MyDialog from "../dialog";
  import Scroll from "../scroll/scroll";
  export default{
    components: {
      Scroll,
      MyDialog},
    name: "oneCancelDialog",
    props:{
        title:{},
      value:{}
    },
    mounted(){
      if(this.value){
        this.current = this.value;
      }
    },
    data(){
      return {
        current:false
      }
    },
    methods:{

      close:function () {
        this.current = false;
      }
    },
    watch:{
      value(val){
        this.current = this.value;
      },
      current(val){
        this.$emit('input',val);
      }
    }
  }
</script>

<style scoped>
  .warp{
    padding: 0.5rem;
    background-image: url("../../assets/img/competition/guideBg.png");
    background-size: 100% 100%;
    width: 80%;
    border-radius: 5px;
    height: 10rem;
  }
  .title{
    font-size: 0.48rem;
    color: #ffffff;
    text-align: center;
    margin-bottom: 0.5rem;
  }
  .digTitle p{
    color: #ffffff;
    font-size: 0.4rem;
    margin: 0.3rem;
  }
  .close{
    width: 0.56rem;
    margin-top: 0.5rem;
    margin-right: 0.5rem;
  }
  .digTitle span{
    color: #F7FF0F;
  }
  .checkCancle{
    position: absolute;
    bottom: 0.36rem;
    width:2.5rem;
    height:0.6933rem;
    line-height: 0.6933rem;
    cursor:pointer ;
  }
</style>
