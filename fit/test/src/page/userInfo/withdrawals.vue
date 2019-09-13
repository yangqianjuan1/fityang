<template>
  <div class="withdrawals">
    <div >
      <div style="margin-bottom: 0.5rem" >
        <contain>
          <div class="Tips ">
            <p>温馨提示</p>
            <!--<p>•需等待人工审核（一个工作日）后到账，请耐心等待；</p>-->
            <p>•仅支持提现至HAPPY MONEY钱包；</p>
            <p>•最低提现额度：100 FMVP；</p>
            <p>•提现将产生提现额度5%的手续费</p>
          </div>
          <div style="width: 100%;margin: 0 auto;position: relative">
            <div class="inputs" style="">
              <div style="position: relative" flex="main:justify cross:center">
                <span  class="title  usual">FMVP数量：</span>
                <input style="color: #666666" placeholder="请输入FMVP数量" v-model="num" />
                <p class="balance send-code "><span class="all" @click="allBalance">全部提现</span></p>
              </div>
              <!--<div flex="main:justify cross:center"><span class="title  usual">提现地址：</span><input style="color: #666666"  placeholder="请输入钱包地址" v-model="address"/></div>-->
              <!--<div style="position: relative" flex="main:justify cross:center">-->
                <!--<span class="title  usual">手机验证码：</span><input  style="color: #666666;width: 40%" placeholder="请输入验证码" v-model="code"/>-->
                <!--&lt;!&ndash;<send-code ></send-code>&ndash;&gt;-->
                <!--&lt;!&ndash;<send-code  style="  font-size: 12px;width: 1.5rem;margin: 0;padding:0;height:1rem;line-height: 1rem"  class="send-code miaobian-huang code ct" :email="address" :type="3" @error="getCodeError"></send-code>&ndash;&gt;-->
                <!--<send-code  style="width: 25%;margin-left: 5%"  class="code btn-violet" :type="3" @error="getCodeError"></send-code>-->
              <!--</div>-->
              <p style="font-size: 0.2667rem;color: #f07765;text-align: center;text-indent: 0;height: 0.5rem;line-height: 0.5rem">{{codeError}}</p>
              <button  class="commit  btn-yellow" @click="WithDrawalsDialog">确认提现</button>
            </div>
          </div>
        </contain>
      </div>
      <p style="font-size: 16px;margin: 0 auto;width: 100%;line-height:0.9375rem;padding-left: 0.625rem" v-if="!empty" class="miaobian-lan usual">提现记录</p>
      <div  flex="main:center" v-if="!empty">
      <ul style="width: 100%;padding:0 0.5rem" class="table">
        <li  class="list-title" flex="main:center cross:center box:mean">
          <p>时间</p>
          <p>提现数量</p>
          <!--<th>提现地址</th>-->
          <p>状态</p>
        </li>
        <li v-for="withdrawals in WithDrawals"  class="usual">
        <div flex="main:center cross:center box:mean" >
          <p class="miaobian-lan">{{withdrawals.CreateTime|Time}}</p>
          <p class="miaobian-lan">{{withdrawals.Amount}}</p>
          <!--<td>{{withdrawals.address}}</td>-->
          <p class="miaobian-lan">{{getType(withdrawals.Status)}}</p></div>
          <div class="under-line"></div>
        </li>
      </ul>
      </div>
      <!--<paging  :pageFunc="getWithDrawalsList" :totalPage="totalPage"></paging>-->
    </div>

    <foot></foot>

  </div>
</template>

<script>
  import Foot from "../../components/footer";
  import Contain from "../../components/contain";
  import SendCode from "../../components/sendCode";
  import MyDialog from "../../components/dialog";
  import Paging from "../../components/paging";
  import LoginRegisterFind from "../../components/loginRegisterFind";
  import ComfireDialog from "../../components/comfireDialog";

  export default{
    components: {

      ComfireDialog,
      LoginRegisterFind,
      Paging,
      MyDialog,
      SendCode,
      Contain,
      Foot},
    name: "withdrawals",
    props:{
      balance:{
          default:0
      },
      listFuc:{},
      empty:true,
      WithDrawals:[]
    },
    data(){
      return {
        // WithDrawals:[{
        //   CreateTime:'2018-01-01 19:44:11',
        //   Amount:1000000111,
        //   SecondType:8
        // }],
        dialogOpen:'',
        totalPage:0,
        pageSize:10,
        empty:false,
        num:'',
        address:'',
        code:'',
        codeError:'',
        opendlog:false,
        outAddress:'',
        inAddress: '',
        number:'',
      }
    },
    created(){
      this.listFuc();
    },
    methods:{
      getCodeError:function (val) {
        this.codeError = val;
      },
      getType:function (SecondType) {
        switch (SecondType){
          case 1:return '审核中';
          case 2:return '提现驳回';
          case 8:return '提现成功';
        }
      },
      reSet:function () {
        this.num = '';
        this.address = '';
        this.code = '';
      },
      WithDrawalsDialog:function () {
        if(!this.num ) return this.codeError = '请输入提现数量' ;
//        if(!this.address ) return this.codeError = '请输入提现地址' ;
//        if(!this.code ) return this.codeError = '请输入验证码' ;
        this.codeError = '';
       let  WithDrawalsConfig={
          WithDrawalsDlg:true,//提现Dlg
            config:{
            amount:this.num,
//              ethHash:this.address,
              vCode:this.code,
          }
        };
        this.$emit('withdrawals',WithDrawalsConfig);
      },
      allBalance:function () {
        this.num = this.balance;
      }
    }
  }
</script>

<style scoped>
  .code{
    font-size: 0.2667rem;
    height: 0.85rem;
  }
  .commit{
   height: 0.8rem;
    line-height: 0.8rem;
    padding: 0 1rem;
    font-size: 0.32rem;
  }
  .Tips{
    width: 100%;
    padding:0 0.625rem;
    margin: 0 auto;
    font-size:0.26rem;
    line-height: 0.625rem;
    -webkit-border-radius: 0.3125rem;
    border-radius: 0.3125rem;
    -moz-border-radius: 0.3125rem;
  }
  .inputs{
    line-height:  1.375rem;
    width: 100%;
    text-align: center;
  }
  .inputs div{
    margin:0.2rem;
  }
  .inputs input{
    height: 0.853rem;

    width: 70%;
    -webkit-border-radius: 0.15625rem;
    border-radius: 0.15625rem;
    -moz-border-radius: 0.15625rem;
    border: 1px solid #877C69;
    text-indent: 0.3125rem;
  }
  /*.inputs button{*/
    /*padding: 0 0.625rem;*/
    /*height: 1.125rem;*/

    /*background-size: 100% 100%;*/
    /*-webkit-border-radius:  0.2rem;*/
    /*border-radius: 0.2rem;*/
    /*-moz-border-radius:  0.2rem;*/
    /*font-size:14px ;*/
  /*}*/
  .title{
    display: inline-block;
    text-align: right;
    width: 3.3rem;
    height: 0.85rem;
    line-height: 0.85rem;
    font-size: 0.2667rem;
  }
  .list-title{
    height: 0.62rem;
    line-height: 0.62rem;
    padding: 0;
    width: 100%;
    background:#D3AA6D;
    border-radius: 0.31rem;
  }
  .list-title p{
    color: #4F2111;
    font-size: 0.37rem;
    font-weight: 600;
  }
  input::-webkit-input-placeholder{
    font-size: 0.2667rem;
    line-height: 0.85rem;
    color:#999999;
  }
  .balance{
    /*position: absolute;*/
    /*right: 0.625rem;*/
    /*top:0;*/
    color: #999999;
    font-size:10px ;
  }
  button{
    cursor: pointer;
  }
  .all{
    cursor: pointer;
    margin-left: 0.3125rem;
    color: #2D6D7B ;
    font-size:0.2667rem;
    text-decoration: underline;
  }
  li{
    text-align: center;
    /*height: 0.91rem;*/
    padding: 0;
    margin: 0;
    /*line-height: 0.91rem;*/

    /*min-width: 2.8rem;*/
    /*border-radius: 0.2rem;*/
  }

  li p{

    text-align: center;
    padding: 0.3rem 0;
    word-WRAP: break-word;
    /*border-top: 0.03125rem solid #E5E5E5;*/
  }
  tr{
    text-align: left;
  }
.send-code{
    position: absolute;
  right: 0.3125rem;
  height: 0.85rem;
  font-size: 0.2667rem  ;
  line-height: 0.85rem;
}

</style>
