<template>
  <div>
    <div class="progress" :style="{width: Progress+'%'}"></div>
  </div>
</template>

<script>
  export default{
    name: "release-progress",
    props:{
        type:{},
      progress: {
        type:Number,
        default:0
      }
    },
    data(){
      return {
        trueProgress:0
      }
    },
    computed:{
      Progress:function () {
        if(this.progress===0){
            return 0
        }else if(this.progress===100){
            return this.progress+6
        }else {
          return this.progress+4
        }
      }
    }
  }
</script>

<style scoped>

  .progress{
    height: 100%;
    transform: skew(-35deg);
    position: absolute;
    left: -4%;
    background-color: #ffffff;
  }
</style>
