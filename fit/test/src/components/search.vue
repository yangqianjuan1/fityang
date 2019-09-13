<template>
  <div class="ui-select" flex="main:justify cross:center">
    <input  type="number" :placeholder="placeholder" v-model.number="currentValue"/>
    <img src="../assets/img/transactin/search.png" class="search " @click="searchFuc">
  </div>
</template>

<script>
    export default{
        name: "search",
      props:{
        value:{},
        searchFuc:{
            type:Function
        },
        placeholder:{
            default:'搜索ID'
        }
      },
        data(){
            return {
              currentValue:"",
            }
        },
     mounted(){
        this.currentValue = this.value
     },
     watch: {
       value(val)
       {
         this.currentValue = val ;
       },
       currentValue(val){
           this.$emit('input',val)
       }
     }
    }
</script>

<style scoped>
  .ui-select{
    background-color:#ffffff;
    color: #4F2111;
    height: 0.6rem;
    text-align: left;
    position: relative;
    border-radius: 5px ;
    border: 1px solid #4F2111;
  }
  .ui-select input {
    width: 75%;
text-indent: 1em;
  }
  .search{
    cursor: pointer ;
    display: inline-block;
    height: 80%;
    right:0;
  }
</style>
