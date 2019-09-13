<template>
  <div v-if="totalPage>1">
    <div class="paging"  flex="cross:center">
      <ul class="pagination " flex="main:center">
        <li v-show="current != 1" @click="  current-1&&goto(current,'minus')" ><a class="limit">首页</a></li>
        <li v-for="index in pages" @click="goto(index)" :class="{'active':current == index}" :key="index">
          <a >{{index}}</a>
        </li>
        <li v-show="totalPage != current && totalPage != 0 " @click="current+1 && goto(current,'plus')" ><a class="limit">末页</a></li>
      </ul>
    </div>
    <div class="enter">跳转到<input v-model.trim="enterPage" type="tel"/>页<a class="limit" @click="enter">跳转</a></div>
  </div>
</template>

<script>
  export default{
    name: "paging",
    props:{
      totalPage:{
        type:Number,
        default:0
      },
      pageFunc:{
        type:Function,
      }
    },
    data:function(){
      return{
        current:1,
        showItem:3,
        enterPage:"",
      }
    },
    computed:{
      pages:function(){
        let pag = [];
        if( this.current < this.showItem ){ //如果当前的激活的项 小于要显示的条数
          //总页数和要显示的条数那个大就显示多少条
          let i = Math.min(this.showItem,this.totalPage);
          while(i){
            pag.unshift(i--);
          }
        }else{ //当前页数大于显示页数了
          let middle = this.current - Math.floor(this.showItem / 2 ),//从哪里开始
            i = this.showItem;
          if( middle >  (this.totalPage - this.showItem)  ){
            middle = (this.totalPage - this.showItem) + 1
          }
          while(i--){
            pag.push( middle++ );
          }
        }
        return pag
      }
    },
    methods:{
      enter:function () {

        var r = /^\+?[1-9][0-9]*$/;　　//正整数
        if(!r.test(this.enterPage)){
            return this.$tips("请输入有效页数");
        }
        if(!this.enterPage){return}
        if(this.enterPage >this.totalPage){
            return this.$tips("超过当前最大页数")}
        this.pageFunc(this.enterPage);
        this.current = this.enterPage;
        this.enterPage =""
      },
      goto:function(index,type){
        if(type==='minus'){
          index =1
        }else if(type==='plus'){
          index = this.totalPage
        }
        if(index === this.current) return;
        this.pageFunc(index);
        this.current = index;
        //这里可以发送ajax请求
      },
      reSetPage:function () {
        this.current = 1;
      }
    },
    watch:{
      current(val){
        this.$emit('currentPage',val)
      }
    }
  }
</script>

<style scoped>
  .enter{
   text-align: center;
    margin-top: 0.2rem;
    color:#4F2111;
    font-size: 0.32rem;
  }
  .enter input{
    width: 4em;
    border-radius: 0.1rem;
    border:1px solid #666666;
    color: #4F2111;
    margin: 0 0.1rem;
    padding: .15rem 0.1rem;
    font-size: 0.3rem;
  }
  .paging{
    /*width: 100%;
     */
    /*text-align: center;
     */
    margin-top: 0.3rem;
    position: relative;
  }
  li{
    list-style:none;
    cursor: pointer ;
  }
  a{
    font-size: 0.3rem;
    text-decoration:none;
  }
  .pagination {
    /*position: relative;
     */
    width: 100%
  }
  .pagination li{
    display: inline-block;
    margin:0 0.15625rem;
  }
  .pagination li a,.btn{
    text-align: center;
    padding:.15rem 0.5rem;
    display:inline-block;
    background-image: url("../assets/img/dialog/btn-violet-small.png");
    background-size: 100% 100%;
    color: #ffffff;
  }
  .pagination li.active a{
    padding:.15rem 0.5rem;
    background-image: url("../assets/img/dialog/btn-yellow-small.png");
    background-size: 100% 100%;
    color: #ffffff;
  }
  .limit{
    padding:.15rem 0.6rem !important;
    background-image: url("../assets/img/dialog/btn-violet.png")!important;
    background-size: 100% 100%;
    color: #ffffff;

  }
</style>
