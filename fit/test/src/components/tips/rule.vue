<template>
  <my-dialog :dialog-open="current">
    <div class="warp takeCenter">
      <img src="../../assets/img/competition/close.png" class="close right" @click="close">
      <scroll style="height: 100%;position: relative" warpId="guide">
        <slot></slot>
      </scroll>
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
    name: "rule",
    props:{
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
    width: 90%;
    height: 80vh;
    padding:1rem 0.5rem;
    background-image: url("../../assets/img/competition/guideBg.png");
    background-size: 100% 100%;
  }
  .digTitle p{

    font-size: 0.4rem;
    margin: 0.3rem;
  }
  .close{
    width: 0.56rem;
    margin-top: 0.5rem;
    margin-right: 0.5rem;
  }
  .digTitle span{
    color: #fe662e;
  }
</style>
