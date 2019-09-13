<template>
  <button class="copyWrap "
          v-clipboard:copy="copyText"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError">
    <slot></slot>
  </button>
</template>

<script>
    export default{
        name: "copy",
      props:{
        text:{
          default:"复制"
        },
            copyText:{
                type:String,
            }
      },
        data(){
            return {
              current:false,
            }
        },
      methods:{
        onCopy:function (val) {
          this.$emit('input',false);
          this.$tips("已复制成功，可贴粘。");
        },
        onError:function () {
          this.$emit('input',false);
          this.$tips("复制失败，请长按选择复制");
        },

      }
    }
</script>

<style scoped>
  .copyWrap{
    text-align: center;
  }
</style>
