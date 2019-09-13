<template>
  <div class="makeSureDialog ">
    <my-dialog :dialogOpen="current">
      <div class="bg takeCenter">
        <div class="takeCenter" style="overflow: hidden">
          <h1 style="text-align:center;margin-bottom: 30px">确认订单</h1>
          <table class="tab"  cellspacing="0">
            <tr>
              <td>转出地址：</td>
              <td>{{outAddress}}</td>
            </tr>
            <tr>
              <td>转入地址：</td>
              <td style="color: red;position:relative"><p >{{inAddress}}</p>
                <textarea id="inAddress" style="opacity: 0;position: absolute">{{inAddress}}</textarea>
                <div class="copy" @click="copy" id="copyFuc"><img class="icon" src="../assets/img/dialog/dlgIcon.png"/><span style="float: left">复制</span></div>
              </td>
            </tr>
            <tr>
              <td>转账金额：</td>
              <td><span style="color: red">{{number}}</span>&nbspETH</td>
            </tr>
          </table>
          <p style="color: red;font-size: 14px;line-height: 20px;height: 20px">{{error}}</p>
          <button @click="makeSure">确认</button>
          <button   @click="canCle">取消</button>
        </div>
      </div>
    </my-dialog>
  </div>
</template>

<script>
  import MyDialog from "./dialog";
  export default{
    components: {MyDialog},
    name: "makeSureDialog",
    props:{
      value:{
        type:Boolean,
        default:true
      },
      outAddress:{

        type:String,
        default:'0xcd05141d8b7e8e3ff1c965bd2cddca8bbc40c678'
      },
      inAddress:{
        type:String,
        default:'0xcd05141d8b7e8e3ff1c965bd2cddca8bbc40c678'
      },
      number:{
        type:String,
        default:'0.00'
      }
    },
    data(){
      return {
        current:false,
        error:"错误提示"
      }
    },
    methods:{
        copy:function () {
            var Url = document.getElementById("inAddress");//这里填订单号ID
          Url.value = this.inAddress;
            Url.select(); // 选择对象
            document.execCommand("Copy"); // 执行浏览器复制命令
            alert("已复制好，可贴粘。");

        },
      makeSure:function () {
        this.current = false;
      },
      canCle:function () {
        this.current = false;
      }
    },
    watch:{
      current(val){
        this.$emit('input', val);
      },
      value(val){
        this.current = val;
      }
    },
    mounted(){
        if(this.value)
        {
          this.current = this.value;
        }

    }
  }
</script>

<style scoped>
  .makeSureDialog {
  }
  .bg{
    width: 23.75rem;
    height: 11.40625rem;
    background: #ffffff;
    border-radius: 0.3125rem;
    -webkit-border-radius: 0.3125rem;
    -moz-border-radius: 0.3125rem;
  }
  tr{
    height: 1.375rem;
  }
  button{
    color: #ffffff;
    background: #2D6D7B;
    width: 2.8125rem;
    height: 1.125rem;
    margin-top: 0.3125rem;
    margin-left: 0.625rem;
    float: right;
    border-radius: 0.15625rem;
    -webkit-border-radius: 0.15625rem;
    -moz-border-radius: 0.15625rem;
    cursor: pointer;
  }
  .copy{
    cursor: pointer;
    height: 0.625rem;
    line-height: 0.625rem;
    text-align: center;
    position: absolute;
    color: #2D6D7B ;
    right: 0.3125rem;
    top:50%;
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    transform: translateY(-50%);
  }
  .icon{
    float: left;
    width: 0.5rem;
    margin-right: 0.15625rem;
    height: 0.5625rem;
  }
  table,table tr th, table tr td {
    border:1px solid #666666;
  }
  table {
    width: 18.75rem;
    text-align: center;
    border-collapse: collapse;
    padding:0.0625rem;
    color: #666666;
    font-size: 0.4375rem
  }

</style>
