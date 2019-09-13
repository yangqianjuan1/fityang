<template>

  <!--<scroll top="0" bottom="0" >-->
  <div  class="logo" :style="{'max-width':$store.state.maxWidth}">

    <!--<img src="../../assets/img/index/bg-1.png" style="width: 100%;height: 2rem;">-->
    <router-view   ></router-view>
    <!-- <div class="bottom-horse" flex="main:justify">
      <img src="../../assets/img/login/left.png">
      <img src="../../assets/img/login/right.png">
    </div> -->
  </div>
  <!--</scroll>-->

</template>

<script>
  import Scroll from "../../components/scroll/scroll";

  export default {
    components: {
      Scroll},
    name: "logo",
    methods:{
      setMinHeight:function () {
        return
      },
    }
  }
</script>

<style scoped>
  .logo{
    width: 100%;
    margin:  0 auto;
    height: 100vh;
    position: relative;
    background-image: url("../../assets/img/index/index.png");
    background-size: 100% 100%;

  }
  .content{
    position: relative;
    z-index: 5;
    /*background-image: url("../../assets/img/login/sky.png");*/
    /*background-size: 100% 100%;*/
  }
  .bottom-horse{
    /*margin-top: 1rem;*/
    width: 100%;
    position: absolute;
    bottom: 0;
  }
  .bottom-horse img{
    /*width: 30%;*/

    height: 4.2rem;
  }
</style>
