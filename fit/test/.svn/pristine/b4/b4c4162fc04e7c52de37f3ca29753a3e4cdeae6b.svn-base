<template>
  <div class="fuseLabel" :class="getCur" flex="box:mean">
    <router-link :to="{name:'fuse'}"></router-link>
    <router-link :to="{name:'upgrade'}"></router-link>
  </div>
</template>

<script>
  export default{
    name: "fuseLabel",
    data(){
      return {}
    },
    computed:{
      getCur:function () {

        if(this.$route.name === 'fuse'){
          return "nav_0"
        }else if(this.$route.name === 'upgrade'){
          return "nav_1"
        }
      }
    }
  }
</script>

<style scoped>
  .fuseLabel {
    background-size: 100% 100%;
    height: 0.8133rem;
    width:6.4rem ;
    margin:  0 auto;
  }
  .nav_0{
      background-image: url("../../assets/img/fuse/nav_0.png");
  }
  .nav_1{
    background-image: url("../../assets/img/fuse/nav_1.png");
  }
</style>
