<template>
  <div >
    <scroll
      :onScroll="onScroll"

      ref="scroll"
      top="4">
      <div :style="setScrollMinHeight()">
        <div class="list" v-for="(item,index) in list1">
          <p flex="main:justify cross:center" style="padding: 0.2rem 0.5rem;" class=" usual">
            <span>{{item.BetId}}场</span>
            <span>{{item.BlockEndCount}}个区块后公布</span>
          </p>
          <p style="text-align: left;padding: 0 0.5rem">开局者：{{item.NickName}}</p>
          <div  style="position: relative">
            <!--<img src="../../assets/img/user/list-before.png" style="height: 1rem;position: absolute;left:-0.5rem;top: 0.2rem;;" >-->
            <ul class="tab"  >
              <li class="first  white" flex="cross:center box:mean">
              <p v-for="(item2,index2) in getTitle(item)" @click="chooseBet(index,index2,index3,item)">{{item2.name}}</p>
              </li>
              <li class="second  usual" flex="cross:center box:mean">
                <p class="second-td">{{item.UnitIndex}}</p>
                <p  class="second-td" v-for="(item3,index3) in item.Odds" :style="index" @click="chooseBet(index,index2,index3,item)" :class="index===isCur1&&index3===isCur3?'cur miaobian-qiangreen':''">{{item3}}</p>
              </li>
            </ul>
            <!--<img src="../../assets/img/user/list-after.png" style="height: 1rem;position: absolute;right: -0.5rem;top: 0.2rem;">-->
          </div>
          <div class="under-line" style="margin: 0.3rem auto 0;width: 90%"></div>
        </div>
        <img class="takeCenter" style="width: 2.5rem;padding: 2rem" src="../../assets/img/dialog/empty.png"  v-if="empty"/>
        <paging :totalPage="totalPage" :pageFunc="getList"  ref="pages"></paging>
      </div>
    </scroll>

    <div class="editItem cl" v-if="editCur">
      <!--<div flex="main:center cross:center" class="editItem">-->
      <!--<p style="width: 50%;height: 100%;line-height: 100%; border-right:1px solid #d6d7dc" flex="main:center cross:center">账户余额：<span>{{edit.balance}}</span></p>-->

      <!--</div>-->
      <!--<div flex="main:center cross:center"  class="editItem ">-->
      <!--&lt;!&ndash;<div>&ndash;&gt;-->
      <!--&lt;!&ndash;<p>最大下单额：{{edit.max}}<span></span></p>&ndash;&gt;-->
      <!--&lt;!&ndash;<p>最小下单额：{{edit.min}}<span></span></p>&ndash;&gt;-->
      <!--&lt;!&ndash;</div>&ndash;&gt;-->
      <!--<div flex="main:center cross:center" class="bg" style="height: 100%"><span >金额：</span><input type="number" placeholder="0" v-model.number="edit.bet"/>-->

      <!--</div>-->
      <!--<button   :disabled="edit.bet>0?undefined:'disabled'" @click="betting()" class="bg2">确认</button></div>-->
    </div>
    <comfire-dialog v-model="edit.betdlg"  :sure="sureBetting" >
      <p style="font-size: 0.5rem;text-align: center;margin-bottom: 0.3rem;" >竞猜</p>

      <div flex="main:left cross:center" >
        <p class="betdlg " >竞猜金额:</p><input class="betInput special-color" style="border: 1px solid #8B5735;"  placeholder="最低0.01FMVP" v-model="edit.bet"/>
      </div>
      <div>
        <div style="height: 20px">
        <p class="betdlg " style="margin: 0.2rem 0;text-align: left" v-if="maxBetting">最大竞猜金额：<span class="betInput" >{{maxBet}}</span></p>
        </div>
      </div>
      <!--<div class="t" flex="main:center cross:center" style="color: #fff;font-size: 0.4rem"><p>确认支付{{edit.bet}}下单第{{choose.BetId}}场{{choose.title[isCur3+1].name}}</p></div>-->
    </comfire-dialog>
  </div>
</template>

<script>
  import Scroll from "../../components/scroll/scroll";
  import ComfireDialog from "../../components/comfireDialog";
  import Paging from "../../components/paging";

  export default {
    components: {
      Paging,
      ComfireDialog,
      Scroll},
    name: "list",
    data(){
      return{
        editCur:false,
        offset:0,
        pageSize:20,
        totalPage:0,
        empty:false,
        maxBet:'',
        edit:{
          balance:1000,
          min:100,
          max:1000,
          bet:"",
          betdlg:false,

          showMax:false,
        },
        isCur1:-1,
        isCur2:-1,
        isCur3:-1,
        Tiltetype:{
          type1:[
            {name:'竞猜位'},
            {name:'奇数'},
            {name:'偶数'},
          ],
          type2:[
            {name:'竞猜位'},
            {name:'奇数'},
            {name:'字母'},
            {name:'偶数'},
          ],
          type3:[
            {name:'竞猜位'},
            {name:'0-3'},
            {name:'4-7'},
            {name:'8-B'},
            {name:'C-F'},
          ],
        },
        list1:[],
        choose:{
          BetId:'',
          title:[ {name:'竞猜位'},
            {name:'奇数'},
            {name:'偶数'},]
        },
      }
    },
    mounted(){
      this.getList();
    },
    computed:{
      setPullUpLoad:function () {
        return {
          threshold:100,
        }
      },
      setPullDown:function () {
        return  {
          threshold:100,
          stop:50
        }
      },
      maxBetting:function () {
        if(this.maxBet!=='')
        {
          return true

        }else {

          return false;
        }

      },
    },
    methods:{
      getTitle:function (item) {
          if(!item.Odds)return;
        switch (item.Odds.length){
          case 2:return  this.Tiltetype.type1;break;
          case 3:return this.Tiltetype.type2;break;
          case 4:return this.Tiltetype.type3;break;
        }
      },
      setScrollMinHeight:function () {
        if(document.getElementById('warp'))
        {
          return 'min-height:'+(document.getElementById('warp').offsetHeight+1)+'px'
        }
      },
      getList:function (page) {
          let offset=0;
        if(page){
          offset = this.pageSize * page
        }
        this.$axios.get('/api/betgame/list/?offset='+offset+'&size='+this.pageSize).then(
          res=>{
            let result = res.data;
            if(result.IsSuccess){
                this.totalPage= Math.floor(result.Result.total/this.pageSize);
//                this.list1 =  this.list1.concat(result.Result.Data);
                this.list1 =result.Result.Data;
              if(result.Result.Data.length===0){
                // this.$tips('目前无更多数据');
                  this.empty = true;
              }else{
                this.empty = false;
              }
              this.offset =  this.list1.length;
//              if(type ==='fresh'){
//                this.$refs.scroll.finishPullDown();
//              }
//              if(type ==='UpLoad'){
//                this.$refs.scroll.finishiPullUp();
//
//              }
            }else{

//              if(type ==='fresh'){
//                this.$refs.scroll.finishPullDown();
//              }
//              if(type ==='UpLoad'){
//                this.$refs.scroll.finishiPullUp();
//
//              }
              this.$get_error('tips',result.Code,result.Message)
            }
          },error=>{
//            if(type ==='UpLoad') {
//              this.$refs.scroll.finishiPullUp();
//            }else{
//              this.$refs.scroll.finishPullDown();
//            }
            this.$get_error('network')
          }
        )
      },
      chooseBet:function (index,index2,index3,item) {
        // if(index3<1) return;

        if(index2 ===0) return;
        this.isCur1 = index;
        if(typeof (index2) ==='undefined'){
          this.isCur2 = index3;
          this.isCur3 =index3;
        } else if(typeof (index3) ==='undefined'){
          this.isCur2 = index2;
          this.isCur3 = index2-1;
        }
        this.choose = item;
        // this.maxBet = '';
        this.getMaxBet();
        this.editCur = true;

        this.edit.betdlg = true;
      },
      onScroll:function () {
        this.editCur = false;
      },
      betting:function () {
        if(!this.edit.bet)return;

        this.edit.betdlg = true;

        //  if(下单成功)
        //  {
        // //保持
        //  }else{
        //    isCur = -1;
        //  }
      },
      getMaxBet:function () {
        this.$axios.get('/api/betgame/betmax/?BetId='+this.choose.BetId+'&betUnit='+this.isCur3).then(
          res=>{
            let result = res.data;
            if(result.IsSuccess){
              this.maxBet = result.Result;
            }
            else{
              this.maxBet = '';
              // this.edit.betdlg = false;
              // this.$get_error('tips',result.Code,result.Message)
            }

          },error=>{
            this.maxBet = '';
            // this.edit.betdlg = false;
            // this.$get_error('network')
          }
        )
      },//获取最大下单金额
      ifNumber:function(val){
        //不能判断空串或一个空格
        //如果是一个空串或是一个空格，而isNaN是做为数字0进行处理的，而parseInt与parseFloat是返回一个错误消息，这个isNaN检查不严密而导致的。

        if(isNaN(val)){
          return false
        }
        if(parseFloat(val).toString() == "NaN") {

          //alert("请输入数字……");注掉，放到调用时，由调用者弹出提示。
          return false;
        } else {
          return true;
        }
      },
      sureBetting:function () {
        if(/^[\s]*$/.test(this.edit.bet )){
          this.$tips('请输入下单金额');
          return
        }
        this.edit.bet = this.edit.bet.replace(/\s+/g, "");
        // if( !/^[0-9]+.?[0-9]*$/.test(this.edit.bet)){
        //   this.$tips('请输入数字');
        //   return
        // }
        // if(!/^[0-9]+.?[0-9]*$/.test(this.edit.bet)){
        //   this.$tips('竞猜位数请输入数字');
        //   return
        // }
        if( !this.ifNumber(this.edit.bet)){
          this.$tips("请输入数字");
          return
        }
        this.edit.bet = parseFloat(this.edit.bet).toString();
        if(this.edit.bet<0.01){
          this.$tips('下单金额最低为0.01');
          return
        }
        this.edit.betdlg = false;
        let data={betId:this.choose.BetId,unit:this.isCur3,amount:this.edit.bet};
        this.$axios.post('/api/betgame/bet/',data).then(
          res=>{
            let result = res.data;
            if(result.IsSuccess){
              this.edit.betdlg = false;
              this.$tips('下单成功');
            }
            else{
              this.edit.betdlg = false;
              this.$get_error('tips',result.Code,result.Message)
            }

          },error=>{
            this.edit.betdlg = false;
            this.$get_error('network')
          }
        )
      }
    },
  }
</script>

<style scoped>

  .list{
    padding: 0.3rem 0;
    font-size: 0.33rem;
  }
  .first{
    height: 1.5rem;
    padding: 0 1rem;

    margin-top: 0.3rem ;
    background-image: url("../../assets/img/activity/release-title.png");
    background-size: 100% 100%;
  }
  .second {
    padding: 0 1rem;
  }
  .second p{
    height: 0.73rem;
    line-height:  0.73rem;
    margin: 0 0.5rem;
  }
  .first p{
    height: 100%;
    line-height: 1.3rem;
  }
  .bg{
    width: 70%;
    padding: 0.5rem;

    background-image: url("../../assets/img/transactin/goumaixiangqing.png");
    background-size: 100% 100%;
  }
  .bg span{
    color: #ffffff;

    font-size: 0.5rem;
    /*padding-left: 0.5rem;*/
    text-align: center;
  }
  .bg2{
    padding: 0 0.5rem;
    height: 100%;
    background-image: url("../../assets/img/transactin/querenanniu.png");
    background-size: 100% 100%;
    border-radius: 0.2rem;
    font-size: 0.5rem;
    color: #ffffff;
  }
  .edit{
    position: fixed;
    margin: 0 auto;
  }
  .second td{
    margin-top: 0.2rem;
  }
  .editItem p{
    /*padding: 0.2rem 0;*/
    text-align: center;
  }
  .editItem{

    position: fixed;
    margin:  0 auto;
    width: 9rem;
    bottom: 1rem;
    height: 1rem;;
    /*background: #F07765;*/
    border-radius: 0.3rem;
  }
  .editItem input{

    border-radius: 5px;
    text-align: center;
    /*padding: 0.1rem;*/
    font-size: 0.5rem;
    width: 50%;
  }
  .cur{
    background: #8B5735;
    color: #ffffff;
    border-radius: 0.2rem;
  }
  .betdlg{
    height: 20px;
    line-height: 20px;
  }
  .betInput{
    margin-left: 0.3rem;
    height: 0.8rem;
    width: 60%;
    text-align: center;
    border-radius: 5px;

  }

</style>
