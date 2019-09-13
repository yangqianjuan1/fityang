<template>
  <div class="filp" >
    <ul class="pagination takeCenter" >
      <li v-if="current>1" @click="previous" >上一页</li>
      <li @click="next" v-if="current&&itemSize">下一页</li>
    </ul>
  </div>
</template>

<script>
  export default{
    name: "filp",
    props:{
      itemSize:{
        type:Boolean,
        default:false
      },

      pageFunc:{
        type:Function,
      }
    },
    data:function(){
      return{
        current:1,
        fur:true,
      }
    },
    created(){
    },
    methods:{
      previous:function () {
        if(  this.current>1)
        {
            if(this.pageFunc(this.current-1)){
              this.current--
            }

        }
      },
      next:function () {
        if(  this.current>0)
        {
            if(this.pageFunc(1+this.current))
            {
              this.current++;
            }
        }

    },
    reSetPage:function () {
      this.current = 1;
    }
  }
  }
</script>

<style scoped>
  .filp{
    width: 100%;
    height:2rem;
    position: relative;
    bottom: 0;
  }
  li{
    list-style:none;
    cursor: pointer ;
    padding: 5px 0.625rem;
    background: #2D6D7B;
    color:#ffffff;
    -webkit-border-radius:5px;
    -moz-border-radius:5px;
    border-radius:5px;
  }
  a{
    text-decoration:none;
  }
  .pagination {

    /*position: relative;*/
  }
  .pagination li{
    display: inline-block;
    margin:0 5px;
  }
  .pagination li a{
    padding:.5rem 1rem;
    display:inline-block;
    border:1px solid #ddd;
    background:#fff;

    color:#2D6D7B;
  }
  .pagination li a:hover{
    background:#eee;
  }
  .pagination li.active a{
    background:#2D6D7B;
    color:#fff;
  }
</style>
