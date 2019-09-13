<template>
    <div class="dialog" v-if="dialogOpen">
      <div class="mask"  :style="{'max-width':$store.state.maxWidth}"></div>
      <div class="dlg"  :style="{'max-width':$store.state.maxWidth}">
        <slot></slot>
      </div>
    </div>
</template>

<script>
    export default{
      name: "myDialog",
      props:{
        dialogOpen:{}
      },
        data(){

            return {

            }
        }
    }
</script>

<style scoped>
    .dialog {
      z-index:99999;
    }
    .close{
      position: absolute;
      right: 0;
      top:0;
    }
    .mask{
      margin: 0 auto;
      position:fixed;
      /*left:0;*/
      top:0;
      width:100%;
      height:100vh;
      z-index:2200;
      background-color: #000000;
      opacity: 0.4;

    }
  .dlg{
    width: 100%;
    margin: 0 auto;
    height:100vh;
    top:0;
    position:fixed;
    z-index:2300;
  }
</style>
