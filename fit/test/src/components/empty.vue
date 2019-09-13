<template>
  <img  src="../assets/img/dialog/empty.png" v-if="empty"/>
</template>

<script>
    export default{
        name: "empty",
      props:{
        empty:{
            default:false
        }
      },
        data(){
            return {}
        }
    }
</script>

<style scoped>
  img {
    width: 2.5rem;
    padding: 2rem;
    display: block;
    margin: 0 auto;
    }
</style>
