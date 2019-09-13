<template>
    <div class="noBalance">
      <comfire-dialog :sure="goRecharge" v-model="noBalanceDlg" sureText="去充值">
        <p class="title">余额不足</p>
        <p class="text">余额不足,是否前往充值？</p>
      </comfire-dialog>
    </div>
</template>

<script>
  import ComfireDialog from "../comfireDialog";

    export default{
      components: {ComfireDialog},
      name: "noBalance",
        data(){
            return {
              noBalanceDlg:true,
            }
        },

      methods:{
        goRecharge:function () {
            this.noBalanceDlg = false;
          this.$router.push('/user?type=2');
        }
      }
    }
</script>

<style scoped>
    .noBalance {

    }
  .title{
    text-align: center;
    font-size: 0.5rem;
    font-weight: 600;
  }
  .text {
    margin-top: 0.5rem;
    text-align: center;
  }
</style>
