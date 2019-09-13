<template>

  <img src="../assets/img/dialog/football.png" style="width: 2.5rem;" :style="{'right':right+'px'}" @click="show"   id="foot" class="foot">
</template>

<script>
  export default{
    name: "football",
    data(){
      return {
        open:false,
        right:0,
      }
    },
    mounted(){
      this.defaultEvent();
      if(document.documentElement.clientWidth>540){
        this.right = (document.documentElement.clientWidth-540)/2;
      }
      this.move();
    },
    destroyed(){
      document.querySelector('body').removeEventListener('touchmove', function (ev) {
        ev.preventDefault();
      });
    },
    methods: {
      move:function () {
        var block = document.getElementById("foot");
        var oW,oH;
        // 绑定touchstart事件
        block.addEventListener("touchstart", function(e) {

          var touches = e.touches[0];
          oW = touches.clientX - block.offsetLeft;
          oH = touches.clientY - block.offsetTop;
          //阻止页面的滑动默认事件
        },false);

        block.addEventListener("touchmove", function(e) {
          var touches = e.touches[0];
          var oLeft = touches.clientX - oW;
          var oTop = touches.clientY - oH;
          let rem = parseFloat(document.documentElement.style.fontSize.split('px')[0]);
          if(document.documentElement.clientWidth<=540)
          {
            if(oLeft < 0) {
              oLeft = 0;
            }else if(oLeft > document.documentElement.clientWidth - block.offsetWidth) {
              oLeft =  document.documentElement.clientWidth - block.offsetWidth
//              oLeft = document.documentElement.clientWidth;
            }
          }else{

            let margin = (document.documentElement.clientWidth-540)/2;
            if(oLeft < margin) {

              oLeft = margin;
            }else if(oLeft > margin+540 - block.offsetWidth) {
              oLeft =  margin+540-block.offsetWidth
            }
          }

          if(oTop<(rem *1.5)){
            oTop = rem *1.5;
          }else if(oTop > document.documentElement.clientHeight-rem *3 ){
            oTop =  document.documentElement.clientHeight-rem *3
          }
          // block.style.transform = "translate3d("+oLeft+"px,"+oTop + "px,0)";
          block.style.top =oTop + "px" ;
          block.style.left = oLeft+"px";
        },false);
      },
      show:function () {
        this.$axios.get('/lottery/').then(
          res=>{
            let result= res.data;
            if(result.IsSuccess){
              window.location.href = result.Result;
            }else{
              this.$get_error('tips',result.Code,result.Message);
            }
          },error=>{
            this.$get_error('network');
          }
        );
      },
      defaultEvent:function (e) {
        document.querySelector('body').addEventListener('touchmove', function (ev) {
          ev.preventDefault();
        });
      },
    }
  }
</script>

<style scoped>
  .foot{
    position: absolute;
    bottom:25vh;
  }
</style>
