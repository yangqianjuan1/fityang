<template>
    <div class="money">
      <p>欢乐四选一奖池：</p>
      <div class="num">
        <span v-for="(bit,index) in total" >{{bit}}</span>
      </div>
    </div>
</template>

<script>
    export default{
        name: "money",
      props:{
            total:{}
      },
      methods:{
        getStyle:function (index) {
          if(index===5){
              return
          }
        }
      }
    }
</script>

<style scoped>
    .money {

    }
    .num{
      margin: 0.1rem 0;
    }
  .num span{

    background-size: 100% 100%;
    background-repeat: no-repeat;
    display: inline-block;
    color: #ffffff;
    background-image: url("../../assets/img/login/money.png");
    width: 0.6rem;
    height: 0.7rem;
    text-align: center;
    line-height: 0.7rem;
  }

</style>
