<template>
  <div>
  <div class="title" flex="main:center box:mean"  :class="'cur-'+titleArr.length+'-'+isCur"  >
    <div  v-for="(item,index) in titleArr"   @click="choose(item,index)"><div></div></div>
  </div>

    <router-view></router-view>
  </div>
</template>

<script>

  export default{
    components: {},
    name: "tab",
    props:{
      titleArr:{
        type:Array,
        default:[],//{name:'',routeName:''}
      },
    },
    data(){
      return {
        isCur:0
      }
    },
    methods:{
      choose:function (item,index) {
        this.isCur = index;
        this.$router.replace({name:item.routeName});
      }
    }
  }
</script>

<style scoped>
  .title{
    height: 0.92rem;
    background-size: 84% 100%!important;
  }
  .cur-2-1{
    background: url("../assets/img/transactin/nav2_1.png") center no-repeat;
  }
  .cur-2-0{
    background: url("../assets/img/transactin/nav2_0.png") center no-repeat;
  }

</style>
