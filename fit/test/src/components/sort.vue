<template>
  <div class="sort"  flex="main:center cross:center">
    <span style="height: 0.6rem;line-height: 0.6rem;">{{name}}</span>
    <span :class="up?'arrow-up':'arrow-down' " class="arrow" style="margin-left: 5px"></span>
  </div>
</template>

<script>
  export default{
    name: "sort",
    props:{
      name:{},
      up:{
        default:true
      }
    },
    data(){
      return {

      }
    }
  }
</script>

<style scoped>
  .sort{
    position: relative;
    cursor: pointer;
    color: #ffffff;
    height:0.6rem;
    line-height: 0.6rem;
    padding:0 0.3rem;
    background: #502211;
    border-radius: 0.2rem;
  }
  .arrow-up {
    background-image: url("../assets/img/transactin/up.png");
  }
  .arrow-down{
    background-image: url("../assets/img/transactin/down.png");
  }
  .arrow {
    height:0.3rem;
    width: 0.2rem;
    display: inline-block;
    background-size: 100% 100% ;
  }
</style>
