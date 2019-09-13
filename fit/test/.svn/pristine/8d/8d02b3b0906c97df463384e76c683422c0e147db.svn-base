<template>
    <div class="exchange">
      <!--<div class="bg" flex="main:center">-->
        <!--<button v-for="(item,index) in list" :class="index===isCur?'cur':''" @click="choose(index)">{{item.text}}</button>-->
      <!--</div>-->
      <router-view></router-view>
    </div>
</template>

<script>
    export default{
        name: "exchange",
        data(){
            return {
                isCur:0,

            }
        },
    }
</script>

<style scoped>
    .exchange {

    }
  .bg{
    height: 1rem;

  }
  button{

  line-height: 1rem;
    height: 1rem;
    padding: 0 0.5rem;
    text-align: center;
  }
  .cur{
    border-bottom: 1px solid #2D6D7B;
  }
</style>
