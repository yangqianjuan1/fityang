<template>
  <div>
    <scroll
      top="3"
      :pullUpLoad="setPullUpLoad"
      :pullDownRefresh="setPullDown"
      :pullDownFuc="getRecordList"
      :pullUpLoadFuc="getRecordList"
      pullUpLoadFucParam="UpLoad"
      pullDownFucParam="fresh"
      ref="scroll">
      <div :style="setScrollMinHeight()">
        <div style="padding: 0.2rem 0.5rem" flex="main:justify cross:center">
          <div flex="main:center ">
            <p class="leftTitle" style="line-height: 0.6rem;color: #ffffff">类型：</p>
            <selection :values="selectValue" :selectFunc="selectFunc" ></selection>
          </div>
          <button class="open btn-yellow" @click="begin">确认开始</button>
        </div>

        <table style="padding: 0 0.5rem" :style="{'max-width':$store.state.maxWidth}">
          <tr v-if="type===0">
            <td style="width: 2.5rem;vertical-align:bottom"><p class="leftTitle  usual">信心比率：</p></td>
            <div style="position: relative">
              <!--<img src="../../assets/img/user/list-before.png" style="height:1rem;position: absolute;left:-0.5rem;top: 0;" >-->
              <table class="tab"  cellspacing="0" cellpadding="0">
                <tr>
                  <th v-for="type in type1.title"  >{{type.name}}</th>
                </tr>
                <tr>
                  <td v-for="value in type1.value"><input   placeholder="0"  v-model="value.value"/></td>
                </tr>
              </table>
              <!--<img src="../../assets/img/user/list-after.png" style="height:1rem;position: absolute;right:-0.5rem;top: 0;" >-->
            </div>
          </tr>
          <tr v-if="type===1">
            <td style="width: 2.5rem;vertical-align:bottom"><p class="leftTitle  usual">信心比率：</p></td>
            <div style="position: relative">
              <!--<img src="../../assets/img/user/list-before.png" style="height:1rem;position: absolute;left:-0.5rem;top: 0;" >-->
              <table  class="tab" cellspacing="0">
                <tr><th  v-for="type in type2.title">{{type.name}}</th></tr>
                <tr>
                  <td v-for="value in type2.value"><input   placeholder="0" v-model="value.value"/></td>
                </tr>
              </table>
              <!--<img src="../../assets/img/user/list-after.png" style="height:1rem;position: absolute;right:-0.5rem;top: 0;" >-->
            </div>
          </tr>
          <tr v-if="type===2">
            <td style="width: 2.5rem;vertical-align:bottom"><p class="leftTitle miaobian-lan usual">信心比率：</p></td>
            <div style="position: relative">
              <!--<img src="../../assets/img/user/list-before.png" style="height:1rem;position: absolute;left:-0.5rem;top: 0;" >-->
              <table  class="tab" cellspacing="0">
              <tr>  <th v-for="type in type3.title" >{{type.name}}</th></tr>
                <tr>
                  <td v-for="value in type3.value"><input   placeholder="0" v-model="value.value"/></td>
                </tr>
              </table>
              <!--<img src="../../assets/img/user/list-after.png" style="height:1rem;position: absolute;right:-0.5rem;top: 0;" >-->
            </div>
          </tr>
          <!--<tr>-->
          <!--<td></td>-->

          <!--</tr>-->
          <tr class="ipt">
            <td style="vertical-align:top"><p class="leftTitle miaobian-lan usual"  style="line-height: 0.8rem;height: 0.8rem;">开奖区块：</p></td>
            <td>
              <!--<input   placeholder="8-188" v-model.number="time"/>-->
              <selection :values="timeArr" @curValue="getTime" style="height: 0.8rem"></selection>
            </td>
          </tr>
          <tr>
            <td></td>
            <td class="remarks">确认开局后出现的第<span style="color: red">{{time}}</span>个区块作为竞猜区块</td>
          </tr>
          <tr class="ipt">
            <td style="vertical-align:top"><p class="leftTitle miaobian-lan usual" style="line-height: 0.8rem;height: 0.8rem;">竞猜位数：</p></td>
            <td >
              <input   placeholder="9-40" v-model="index" />
            </td>
          </tr>
          <tr>
            <td></td>
            <td class="remarks">竞猜区块的第<span style="color: red">{{index}}</span>位数字或字母作为竞猜位</td>
          </tr>

          <tr class="ipt">
            <td style="vertical-align:top"><p class="leftTitle miaobian-lan usual"  style="line-height: 0.8rem;height: 0.8rem;">竞猜金额：</p></td>
            <td>
              <input  placeholder="最低1 FMVP" v-model="capital"/>
            </td>
          </tr>
        </table>

        <div  style="position: relative" v-if="list.length>0">
          <!--<img src="../../assets/img/user/list-before.png" style="height:1rem;position: absolute;left:0;top:0;" >-->
          <div  class="resultList" flex="main:center cross:center box:mean">
            <div>场次</div>
            <div>类型</div>
            <div>状态</div>
            <div>操作</div>
          </div>
          <div v-for="(item) in list" class=" resultcontent usual">
            <ul flex="main:center cross:center box:mean">
              <li class="text_nowarp">#{{item.BetId}}</li>
              <li class="text_nowarp">{{getType(item)}}</li>
              <li  class="text_nowarp">{{getResult(item)}}</li>
              <li><button class="btn  btn-violet" @click="detail(item)">查看详情</button></li>
            </ul>
          </div>
          <!--<img src="../../assets/img/user/list-after.png" style="height:1rem;position: absolute;right:0;top:0;" >-->
        </div></div>
    </scroll>
    <my-dialog :dialogOpen="detailDlg">
      <div class="takeCenter detaildlg">
        <p style="text-align: center;font-size: 0.5rem;font-weight: 600" >竞猜详情</p>
        <table cellspacing="0">
          <tr class="first ">
            <th ></th>
            <th >信息比率</th>
            <th >参与人数</th>
            <th >竞猜数</th></tr>
          <tr v-for="(detail,index) in detailType.odd" class="miaobian-hong" :class="index===detailCur?'cur':''">
            <td>{{detail.name}}</td>
            <td>{{detail.Odds}}</td>
            <td>{{detail.people}}</td>
            <td>{{detail.bet}}</td>
          </tr>
        </table>
        <div class="under-line" style="margin:  0.2rem 0"></div>
        <p class="num-abc-warp dlgInfo">竞猜区块：<span>{{detailHashFront}}</span><span class="special-color">{{detailHashMid}}</span><span>{{detailHashLast}}</span></p>
        <p class="dlgInfo "><span style="display:inline-block;text-align: left">竞猜位：</span><span class="special-color">{{detailType.index}}</span></p>
        <p class="dlgInfo "><span style="display:inline-block;text-align: left">竞猜金额：</span><span  class="special-color">{{detailType.capital}}</span></p>
        <button class="cancel cl btn-violet" @click="closeDialog">取消</button>
      </div>

    </my-dialog>
  </div>
</template>

<script>
  import Scroll from "../../components/scroll/scroll";
  import Selection from "../../components/index/select";
  import MyDialog from "../../components/dialog";

  export default {
    components: {
      MyDialog,
      Selection,
      Scroll},
    name: "mycompetition",
    data(){
      return{
        offset:0,
        pageSize:20,
        selectValue:[
          {value:"猜奇偶"},
          {value:"三选一"},
          {value:"四区间"},
        ],
        type:1,
        type1:{
          title:[{name:'奇数'},{name:'偶数'}],
          value:[{value:""},{value:""}]
        },
        type2:{
          title:[{name:'奇数'},{name:'字母'},{name:'偶数'}],
          value:[{value:""},{value:""},{value:""},]
        },
        type3:{
          title:[{name:'0-3'},{name:'4-7'},{name:'8-B'},{name:'C-F'}],
          value:[{value:""},{value:""},{value:""},{value:""}]
        },
        timeArr:[{value:"100"},{value:"200"},{value:"300"},{value:"600"},{value:"1200"},{value:"2400"},],
        detailType1:[
          {name:'奇数'},
          {name:'偶数'},
        ],
        detailType2:[
          {name:'奇数'},
          {name:'字母'},
          {name:'偶数'},
        ],
        detailType3:[
          {name:'0-3'},
          {name:'4-7'},
          {name:'8-B'},
          {name:'C-F'},
        ],
        index:null,//开奖位数
        time:null,//开奖时间
        capital:null,//资金池
        list:[
        ],
        detailDlg:false,
        detailType:{
          odd:[
          ],
          index:0,//开奖位数
          hash:1,//开奖hash
          capital:0,//资金池
        },
        detailCur:-1,
        detailHashFront:'',
        detailHashMid :'',
        detailHashLast:''
      }
    },
    computed:{
      setPullUpLoad:function () {
        return {
          threshold:this.$store.state.upLoad,
        }
      },
      setPullDown:function () {
        return  {
          threshold:100,
          stop:50
        }
      },
    },
    mounted(){
      this.getRecordList();
    },
    methods:{
      getType:function (item) {
        switch (item.Odds.length){
          case 2:return "猜奇偶";
          case 3:return "三选一";
          case 4:return "四区间";
        }
      },
      getTime:function(val){
        this.time =val;
      },
      setScrollMinHeight:function () {
        if(document.getElementById('warp'))
        {
          return 'min-height:'+(document.getElementById('warp').offsetHeight+1)+'px'
        }
      },

      getResult:function (item) {
        switch (item.Status){
          case 0:return'待结算';
          case 1:return '待结算';
          case 2:return '待结算';
          case 4:return "待结算";
          case 8:return '已失效';
          case 16:return '待结算';
          case 32:return item.Profit;
          case 64:return '已失效';
        }
      },
      reSet:function () {
        for(let index in this.type1.value)
        {
          this.type1.value[index].value = '';
        }
        for(let index in this.type2.value)
        {
          this.type2.value[index].value = '';
        }
        for(let index in this.type3.value)
        {
          this.type3.value[index].value = '';
        }
        this.index = '';
        this.capital = '';
      },
      reSetDetail:function(){
        this.detailHashFront = '';
        this.detailHashMid = '';
        this.detailHashLast = '';
        this.detailType.index= '';
        this.detailCur = -1;
        this.detailType.capital = '';
      },
      getRecordList:function (type) {
        let offset;
        if(type ==='UpLoad'){
          offset = this.offset;
        }else{
          offset = 0;
        }

        let data = {offset:offset,size :this.pageSize};
        this.$axios.post('/api/betgame/getmybet/',data).then(
          res => {
            let result = res.data;
            if (result.IsSuccess) {
              if(type ==='UpLoad'){
                this.$refs.scroll.finishiPullUp();

              }else{
                this.$refs.scroll.finishPullDown();
              }
              if(!result.Result.Data){
                // this.$tips('暂无更多数据');
                return;
              }

              if(type ==='UpLoad'){
                this.list =  this.list.concat(result.Result.Data)
              }else{
                this.list =result.Result.Data;
              }
              this.offset = this.list.length;

            } else {
              if(type ==='UpLoad'){
                this.$refs.scroll.finishiPullUp();

              }else{
                this.$refs.scroll.finishPullDown();
              }
              this.$get_error('tips',result.Code,result.Message);
            }
          }, error => {
            if(type ==='UpLoad'){
              this.$refs.scroll.finishiPullUp();

            }else{
              this.$refs.scroll.finishPullDown();
            }
            this.$get_error('reload');
          }
        )
      },
      selectFunc:function (type) {
        for(let index in this.selectValue){
          if(this.selectValue[index].value ===type){
            this.type = parseInt(index);
            this.reSet();
          }
        }
      },
      // getGoingDetail:function (item) {
      //   let data= {BetId:item.BetId};
      //   this.$axios.post('/api/betgame/getmybetstatis/',data).then(
      //     res => {
      //       let result = res.data;
      //       if (result.IsSuccess) {
      //         switch(item.Odds.length){
      //           case 2:this.detailType.odd = this.detailType1;break;
      //           case 3:this.detailType.odd  = this.detailType2;break;
      //           case 4:this.detailType.odd  = this.detailType3;break
      //         }
      //
      //         for(let index in this.detailType.odd){
      //           this.detailType.odd[index].Odds = item.Odds[index];
      //           this.detailType.odd[index].people = result.Result.Data[index].PlayerCount;
      //           this.detailType.odd[index].bet = result.Result.Data[index].PlayerAmount;
      //         }
      //         this.detailType.hash = item.BlockEnd?item.BlockEnd.BlockHash:'暂无';
      //         this.detailType.index = item.UnitIndex;
      //         this.detailType.capital = result.Result.currentCapitalPool;
      //         // this.detailType.Odds[index].people = item.BetSections?;
      //         // this.detailType.Odds[index].bet = item.BetSections?;
      //
      //         this.detailDlg = true;
      //       } else {
      //
      //         this.$get_error('tips',result.Code,result.Message);
      //       }
      //     }, error => {
      //
      //       this.$get_error('reload');
      //     }
      //   )
      // },
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
      detail:function (item) {//查询正在进行中的局详情
        this.reSetDetail();//重置参数
        switch(item.Odds.length){
          case 2:this.detailType.odd = this.detailType1;break;
          case 3:this.detailType.odd  = this.detailType2;break;
          case 4:this.detailType.odd  = this.detailType3;break
        }

        for(let index in this.detailType.odd){
          this.detailType.odd[index].Odds = item.Odds[index];
          this.detailType.odd[index].people = item.Statis?item.Statis[index].Count:0;
          this.detailType.odd[index].bet = item.Statis?item.Statis[index].Amount:0;
        }
        this.detailType.hash = item.BlockEnd?item.BlockEnd.BlockHash:'暂无';
        if(item.BlockEnd.BlockHash){
          if(item.UnitIndex ===0)
          {
            this.detailHashFront = "";
            this.detailHashMid = item.BlockEnd.BlockHash.charAt(item.UnitIndex);
            this.detailHashLast = item.BlockEnd.BlockHash.substring(item.UnitIndex,item.BlockEnd.BlockHash.length);
          }else{
            this.detailHashFront = item.BlockEnd.BlockHash.substring(0,item.UnitIndex-1);
            this.detailHashMid = item.BlockEnd.BlockHash.charAt(item.UnitIndex-1);
            this.detailHashLast = item.BlockEnd.BlockHash.substring(item.UnitIndex,item.BlockEnd.BlockHash.length);
          }

        }
        this.detailType.index = item.UnitIndex;
        this.detailType.capital = item.CurrentCapitalPool?item.CurrentCapitalPool:'';
        if(item.Status ===32){
          this.detailCur = item.Result;
        }else{
          this.detailCur = -1;
        }
        this.detailDlg = true;
      },//查看详情
      closeDialog:function () {
        this.detailDlg  =false;
      },
      begin:function () {

        let type;
        switch (this.type){
          case 0:type = this.type1;break;
          case 1:type = this.type2;break;
          case 2:type = this.type3;break;
        }
        let value =[];
        for(let index in type.value)
        {
          value[index] =type.value[index].value;
          if(/^[\s]*$/.test(value[index]) ){
            this.$tips(type.title[index].name+"倍数不能为零");
            return
          }
          value[index] = value[index].replace(/\s+/g, "");
          // if(!/^[0-9]+.?[0-9]*$/.test(value[index])){
          //   this.$tips(type.title[index].name+'倍数请输入数字');
          //   return
          // }
          if( !this.ifNumber(value[index])){
            this.$tips(type.title[index].name+'倍数请输入数字');
            return
          }
          value[index] = parseFloat( value[index]).toString();
          if( value[index]<=0 ){
            this.$tips(type.title[index].name+"倍数必须大于零");
            return
          }
        }

        if(/^[\s]*$/.test(this.index )){
          this.$tips('竞猜位数不能为零');
          return
        }
        this.index = this.index.replace(/\s+/g, "");
        // if(!/^[0-9]+.?[0-9]*$/.test(this.index)){
        //   this.$tips('竞猜位数请输入数字');
        //   return
        // }
        if( !this.ifNumber(this.index)){
          this.$tips('竞猜位数请输入数字');
          return
        }
        this.index = parseFloat( this.index).toString();
        if(!/^[1-9]\d*$/.test(this.index)){
          this.$tips('请输入9-40正整数竞猜位数');
          return
        }

        if(this.index<9||this.index>40){
          this.$tips('竞猜位数需在9-40');
          return
        }

        if(/^[\s]*$/.test(this.capital ) ||this.capital ==0){
          this.$tips('竞猜金额不能为零');
          return
        }
        this.capital = this.capital.replace(/\s+/g, "");
        // if(!/^[0-9]+.?[0-9]*$/.test(this.capital)){
        //   this.$tips('竞猜金额请输入数字');
        //   return
        // }
        if( !this.ifNumber(this.capital)){
          this.$tips('竞猜金额请输入数字');
          return
        }
        this.capital = parseFloat( this.capital).toString();
        if(this.capital<1){
          this.$tips('竞猜金额最低为1 FMVP');
          return
        }
        let data=
          {odds:value,
            unitIndex:parseInt(this.index),
            initCapitalPool:parseFloat(this.capital),
            endBlockCount:parseInt(this.time),
          };
        this.$axios.post('/api/betgame/create/',data).then(
          res=>{
            let result = res.data;
            if(result.IsSuccess){
              this.$tips('创建成功');
              this.reSet();
              this.getRecordList();
            }
            else{
              this.$get_error('tips',result.Code,result.Message)
            }

          },error=>{

            this.$get_error('network')
          }
        )
      }//创建局
    }
  }
</script>

<style scoped>
  .bg{
    /*padding:0 0.5rem;*/
  }

  tr{
  }
  .open{
    height: 0.8rem;
    line-height: 0.8rem;
    padding:  0 0.5rem;
    font-size: 0.4rem;
    border-radius: 5px;
  }
  table{
    width: 100%;
    text-align: center;
  }
  th{
    text-align: center;
  }
  .leftTitle{
    line-height: 0.6rem;
    height: 0.8rem;
    text-align: right;
    font-size: 0.4rem;
  }
  .tab{

    border-collapse: collapse;
    border: none;
  }
  .tab tr:first-child th:first-child{
    border-radius: 0.31rem 0 0 0.31rem;
  }
  .tab tr:first-child th:last-child{
    border-radius:0 0.31rem  0.31rem 0;
  }
  .tab th{

    padding: 0;
    height: 0.62rem;
    line-height: 0.62rem;
    color: #4F2111;
    background:#D3AA6D;
    font-size: 0.37rem;
    font-weight: 600;

  }
  .tab input{
    width: 95%;
    border-radius: 0.2rem;
    height: 0.8rem;
    text-align: center;
    -webkit-text-stroke: 0;
    font-size: 0.3733rem;
    border: 1px solid #906B53;
  }
  .ipt input{
    width: 100%;
    height: 0.8rem ;
    border: 1px solid #906B53;
    text-align: center;
    border-radius: 0.2rem;
    -webkit-text-stroke: 0;
    font-size: 0.3733rem;
  }
  .ipt p:nth-child(2){
    text-align: left;
    line-height: 0.5rem;
    height: 0.5rem;
    color: #808080;
    -webkit-text-stroke: 0;
    font-size: 0.4rem;
  }

  .resultList{
    width: 100%;
    /*font-size: 12px;*/
    padding:  0 1rem ;
    margin-top: 0.3rem ;
    background-image: url("../../assets/img/activity/release-title.png");
    background-size: 100% 100%;
    height:1.5rem;

  }
  .resultList div{
    height: 100%;
    text-align: center;
    line-height: 1.3rem;
    color: #ffffff;
    padding: 0;
  }
  .resultcontent{
    text-align: center;
    margin: 0 1rem;
    height: 1.09rem;
    border-bottom: 1px solid #CDA669;
  }
  .resultcontent ul{
    height: 100%;
  }
  .btn{

    padding: 0.2rem 0.3rem;
    border-radius: 0.2rem;
  }
  .detaildlg{
    padding: 1rem;
    background-image: url("../../assets/img/competition/guideBg.png");
    background-size: 100% 100%;
    width: 80%;
  }
  .detaildlg th{
    margin-bottom: 0.2rem;
    padding: 0.15rem 0;
    background:#D7AF71 ;
  }
  .first th:nth-child(1) {
    border-radius: 0.21rem  0   0 0.21rem ;
  }
  .first th:last-child{
    border-radius: 0  0.21rem   0.21rem 0 ;
  }
  .detaildlg td:first-child {
    border-radius: 0.21rem  0   0 5px ;
  }
  .detaildlg td:last-child{
    border-radius: 0  0.21rem   0.21rem 0 ;
  }
  .detaildlg td{
    padding: 0.1rem;
    /*border-radius: 5px;*/
  }
  .detaildlg table{
    padding: 0;
    margin: 0.3rem 0;
  }
  .dlgInfo{
    /*margin: 0.2rem 0;*/
    padding: 0.1rem 0;
    text-align: left;
  }
  .cancel{
    position: absolute;
    bottom: 0.36rem;
    width:2.5rem;
    height:0.6933rem;
    line-height: 0.6933rem;
    cursor:pointer ;
  }
  .remarks{
    font-size: 0.25rem;
    color: #666666;
  }
  .cur td:nth-child(2){
    border-radius: 0.21rem  0   0 0.21rem ;
  }
  .cur td:nth-child(2),.cur td:last-child,.cur td:nth-child(3){
    background:  #8B5735 50% 50%;
    color: #ffffff;
  }
</style>
