<template>
    <div class="red-table">
      <div  flex="main:center" >
        <ul style="width: 100%;" class="table">
          <li  class="list-title" flex="main:center cross:center box:mean">
            <p class="miaobian-hong" v-for="title in titleList">{{title}}</p>
          </li>
          <slot></slot>
        </ul>
      </div>
    </div>
</template>

<script>
    export default{
        name: "red-table",
      props:{
        titleList:[]
      },
        data(){
            return {}
        }
    }
</script>

<style scoped>
    .list-title{
      height: 0.7rem;
      background: #d8b072;
      border-radius: 0.4rem;
    }
    .list-title p{
      text-align: center;
      font-weight: 600;
    }
</style>
