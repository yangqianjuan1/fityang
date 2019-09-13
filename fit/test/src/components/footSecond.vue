<template>
  <ul class="second" >
    <li class="item "@click="Fomo3D" :class="this.$route.meta.Fomo3D?'cur':'uncur'">欢乐四选一</li>
    <!--<li class="item "@click="goCompetition" :class="this.$route.meta.isCompetition?'cur':'uncur'">区块竞猜</li>-->
  </ul>
</template>

<script>
    export default {
        name: "foot-second",
      props:{
        value:{
          default:false
        }
      },

      data(){
          return{
           current:false
          }
      },
      created(){
        document.addEventListener('click', (e) => {//点击其他隐藏
          if (!this.$el.contains(e.target)){
            this.current = false;
          }
        })
      },
      mounted(){
          this.current = this.value;
      },
      methods:{
        goCompetition:function () {
          this.$router.replace('/competition');
          this.current = false;
        },
        Fomo3D:function () {
          this.$router.replace('/fomo3d');
          this.current = false;
        },
      },
      watch:{
        current(val){
          this.$emit('input',val);
        }
      }
    }
</script>

<style scoped>
  .item{
    font-size: 0.32rem;
    position: relative;
    -webkit-tap-highlight-color:transparent;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke: 0 #384248;
    height: 1rem;
    line-height: 1rem;
  }
  .icon{
    width: 0.5rem;
    height: 0.5rem;
  }
  .cur{
    color: #54413c;
    font-weight: 600;
  }
  .uncur{
    color: #7e7e7e;
  }
  .second{
    color: #fff;
    z-index: 10;
    position: absolute;
    width: 1.8rem;
    height:2rem ;
    background-image: url("../assets/img/transactin/jiaoyisuoxuankuang.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center;
    top: -1.8rem;
    right: 21%;
  }
</style>
