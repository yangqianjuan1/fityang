<template>
  <div class="shopType ">
    <div class="content" flex="dir:top main:top cross:center">
      <div style="position: relative" >
        <p class="top-title cl">{{info.MerchandiseName}}</p>
        <img  class="top" :src="'/static/img/shop/shop-label-'+info.Type+'.png'">
      </div>
      <div  class="icon"><img  :src="'/static/img/shop/shop-icon-'+info.Type+'.png'"></div>

      <div class="price" flex="main:center cross:center">
        <img src="../../assets/img/activity/suipain.png" ><p>{{info.WanLiPiecesPrice}}</p>
      </div>
      <p style="font-size: 0.3rem;" v-if="info.Type===1">剩余数量：{{info.RemainCount}}</p>
    </div>
  </div>
</template>

<script>
  export default{
    name: "shopType",
    props:{
      info:{
        Type:{
          default:2
        }
      },

    },
    data(){
      return{
          text:'',
      }
    }
  }
</script>

<style scoped>
  .shopType {
    width: 40%;
    height: 4rem;
    position: relative;
    display: inline-block;
    text-align: center;
    margin-left: 0.667rem;
    margin-top: 0.6rem;
    background-image: url("../../assets/img/activity/shop-bg.png");
    background-size: 100% 100%;
  }
  .top{
    width: 90%;
    height: 1rem;
  }
  .top-title{
    font-size: 0.3rem ;
    color: #545454;
    position: absolute;
    top: 5%;
  }
  .content{
    width: 95%;
    height: 4.4rem;
    margin: 0 auto;
    position: relative;
    top:-0.4rem;
  }
  .icon{
    height: 2rem;

  }
  .icon img{
    height: 100%;
  }
  .price{
    padding: 0 0.2rem;
    border-radius: 0.5rem;
    height: 0.5rem;
    width: auto;
    min-width: 1.5rem;
    margin: 0.1rem 0;
    background: #c5ac74;
    color: #ffffff;
    box-shadow: 0 5px  10px  #be934e inset;

  }
  .price img{
    height: 50%;
  }
  .price p{
    font-size: 0.3rem;
    line-height: 0.5rem;
    margin-left: 0.1rem;
  }
</style>
