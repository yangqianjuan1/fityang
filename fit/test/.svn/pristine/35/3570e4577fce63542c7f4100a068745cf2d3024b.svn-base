<template>
  <!--<div class="warp">-->
    <img src="../assets/img/index/back.png" class=" ruleIcon warp"  :style="{'max-width':$store.state.maxWidth}" v-if="getShow" @click="$router.go(-1)">
  <!--</div>-->
</template>

<script>
    export default{
        name: "back",
        data(){
            return {
                showPage:['activity','transaction','tigers','fomo3d','list','record','myCompetition','user','fomo3dList','fomo3dRecord','fomo3dHistory','index']
            }
        },
      computed:{
            getShow:function () {
              for(let item of this.showPage){
                  if(this.$route.name ===item){
                      return false
                  }
              }
              return true
            },

      }
    }
</script>

<style scoped>
  .warp{


    height: 1.5rem;
    position: fixed;
    top:0;
    z-index: 101;
  }
</style>
