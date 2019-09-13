<template>
  <div class="myMagquee" :style="{'max-width':$store.state.maxWidth}" >
    <div class="warp">
      <p ref="text" :style="{'left':set+'px'}">{{text}}</p>
    </div>
  </div>
</template>

<script>
  export default{
    name: "myMagquee",
    props:{
      text:{
        default:''
      },
      speed:{
        default:3
      },
      rem:''
    },
    data(){
      return {
        set:0,
        Interval:null,
      }
    },
    mounted(){
      this.rem =document.documentElement.style.fontSize.split('px')[0];
      this.Interval=  setInterval(this.run,10)
    },
    destroyed(){
      if(this.Interval){
        clearInterval(this.Interval)
      }
    },
    methods:{
      run:function () {
        if(!this.$refs.text){
          return
        }
        if(!this.rem){
          this.rem =document.documentElement.style.fontSize.split('px')[0];
        }
        if(this.set <= -this.$refs.text.offsetWidth){
          this.set = 7*this.rem
        }else{
          this.set =  this.set-0.2*this.speed
        }
      },

    }
  }
</script>

<style scoped>
  .myMagquee {
    position: fixed;
    top:1rem;
    width: 100%;
    background: url("../assets/img/Common/top_img_push.png");
    background-size: 100% 100%;
    overflow: hidden;
    z-index: 2000;
  }
  .myMagquee p{
    color: #ffffff;
    white-space: nowrap;
    display: inline-block;
    position: relative;

  }
  .warp{
    margin:  0 1.5rem;
    overflow: hidden;
  }
</style>
