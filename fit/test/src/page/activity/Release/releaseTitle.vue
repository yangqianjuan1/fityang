<template>
    <div class="releaseTitle">
      <p flex="main:center cross:center">{{getTitle}}</p>
    </div>
</template>

<script>
    export default{
        name: "releaseTitle",
        data(){
            return {}
        },
      props:{
        type:{},
        info:{}
      },
      computed:{
        getTitle:function () {
          if(this.type ==1)
          {
            return '创世虎'
          }else{
            return '神虎'
          }
        }
      }
    }
</script>

<style scoped>
    .releaseTitle {
      width: 110%;
      font-size: 0.44rem;
      height: 1.42rem;
      background-image: url("../../../assets/img/activity/release-title.png");
      background-size: 100% 100%;
      color: #FFFDCD;
      text-align: center;
      line-height:1.25rem;
    }
</style>
