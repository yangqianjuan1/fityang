<template>
  <div>
    <div class="content"  :style="{'max-width':$store.state.maxWidth}"></div>
    <div >
      <div>
        <scroll
          :pullUpLoad="setPullUpLoad"
          :pullUpLoadFuc="pullUpLoadFuc"
          pullUpLoadFucParam="UpLoad"
          ref="scroll"
          top="0"
        >
          <div class="user">
            <div class="top ct">
              <ul class="numbers " flex="main:center">
                <li  class="item ">
                  <p class="title">余额</p>
                  <p class="price">{{userInfo.infos.Balance}}</p>
                </li>
                <li class="info" @click="editNameShow">
                  <!--<img src="../../assets/img/user/touxiang.png" class="icon">-->
                  <div flex="main:center cross:center"class="name">
                    <p  class="text_nowarp">{{userInfo.infos.NickName}}</p>
                    <img src="../../assets/img/dialog/edite.png" style="height: 0.2rem;margin-left: 0.1rem">
                  </div>
                </li>
                <li  class="item ">
                  <p class="title">冻结</p>
                  <p class="price">{{userInfo.infos.FreezeAmount}}</p>
                </li>
              </ul>
              <router-link to="/joinFamily" tag="button"  class="btn-yellow"  style="padding: 0.1rem 0.7rem;font-size: 0.3rem;position: relative;top: 0.3rem;">加入联盟</router-link>
              <button @click="invite" class="btn-blue" style="padding: 0.1rem 0.7rem;font-size: 0.3rem;position: relative;top: 0.3rem;margin-left: 0.5rem">邀请好友</button>
            </div>
          </div>
          <ul :class="getCur" class="nav-bar usual" flex="main:center cross:center box:mean" style="height: 1rem">
            <li  @click="changeRecode(index)" class="recode "  :class="index===tigerCur?'miaobian-hong white':'miaobian-bai'" v-for="(item,index) in recode" style="position: relative;"></li>
          </ul>

          <div class="detail" style=" position:relative;top:-1rem;">
            <tiger-list
              ref="list"
              v-if="this.tigerCur  ===0"
              :tigers="tigers"
              :totalPage="totalPage"
              :tigerTotal="tigerTotal"
              :empty="listEmpty"
              :listFuc="getTigerList"
              :unionSort="unionSort"
              :comBetSort="comBetSort"
              :breedSort="breedSort"
              :feedSort="feedSort"
              @sort="getSort"
              @feed="getFeedState"
              @feedInfo="getFeedInfo"></tiger-list>
            <!--</keep-alive>-->
            <recode-list
              v-if="this.tigerCur  ===1"
              :recodeFunc="getRecodeList"
              :Records="Records"
              :empty="recordEmpty" ></recode-list>
            <recharge
              v-if="this.tigerCur  ===2"
              :recharge="recharge"
              :account="userInfo.infos"
              :listFuc="getRechargeList"
              :infoFuc="getUserInfo"
              :empty="rechargeEmpty" 
							@userOpenMask="openMask"
							></recharge>
								<!--将2和3互换位置-->
            <withdrawals
              v-if="this.tigerCur  ===3"
              :balance="userInfo.infos.Balance"
              :WithDrawals="WithDrawals"
              :listFuc="getWithDrawalsList"
              :empty="WithDrawalEmpty"
              @withdrawals="getWithDrawalsConfig"
              ref="WithDrawals"></withdrawals>
          </div>
        </scroll>
      </div>
    </div>
    <comfire-dialog v-model="feed.dialog" sureText="一键喂养" cancleText="单次喂养" :cancleFuc="sureToFeed" :sure="sureToFeed" :param="true">
      <img src="../../assets/img/competition/close.png" class="close right" @click="feedCancle">
      <p style="font-size: 0.5rem;text-align: center;" class="miaobian-hong">确认喂养</p>
      <p class=" miaobian-hong" style="margin-top: 0.3rem;text-align: center;">请选择单次喂养（<span class="special-color" style="display: inline;padding: 0">{{feed.price}}FMVP</span>）或者一键喂养</p>
    </comfire-dialog>
    <comfire-dialog v-model="WithDrawalsConfig.WithDrawalsDlg" :sure="toWithDrawals">
      <p style="font-size: 0.5rem;font-weight:600;text-align: center" >确认提现</p>
      <p style="margin-top: 0.3rem;text-align: center;">确认提现<span style="display: inline;padding: 0" class="special-color">{{WithDrawalsConfig.config.amount}}FMVP</span ></p>
    </comfire-dialog>
    <comfire-dialog v-model="editName.dlg"  :sure="editNameSure">
      <p style="font-size: 0.5rem;text-align: center;margin: 0.3rem 0;"  v-if="userInfo.infos.FreeModifyNick">修改昵称</p>
      <p style="font-size: 0.45rem;text-align: center;margin: 0.5rem 0;"  v-if="!userInfo.infos.FreeModifyNick">本次修改昵称需<span style="font-size: 0.45rem;" class="special-color">花费{{namePrice}}FMVP</span></p>

      <div flex="main:center cross:center"  >
        <p class="betdlg " >昵称:</p><input class="betInput  usual"  placeholder="最大12个字符（6个汉字）" v-model="editName.name"/>
      </div>
      <div>
        <div style="height: 20px">
          <p class="betdlg " style="text-align: center" >{{editName.error}}</p>
        </div>
      </div>
      <!--<div class="t" flex="main:center cross:center" style="color: #fff;font-size: 0.4rem"><p>确认支付{{edit.bet}}投注第{{choose.BetId}}场{{choose.title[isCur3+1].name}}</p></div>-->
    </comfire-dialog>
    <comfire-dialog v-model="auction" :sure="toolAuction">
      <p style="font-size: 0.5rem;text-align: center;margin-bottom: 0.3rem">碎片拍卖</p>
      <div flex="main:center"><p class="auction-p">拍卖数量：</p><selection style="width: 75%;text-align: center" :values="selectValue" :selectFunc="selectFunc" ref="selectTool"></selection></div>
      <div flex="cross:center " class="input">
        <p>起拍价格</p>
        <input type="number" v-model="toolAuctionAmount" placeholder="请输入起拍价格"/>
      </div>
      <p class="auction-p">每次拍卖需支付<span>0.1FMVP</span></p>
    </comfire-dialog>
    <my-dialog :dialogOpen="inviteDlg">
      <div style="position: relative;margin: 0.5rem 0" class="invite-bg takeCenter">
        <div id="qrcode" class="cl"></div>
        <div style="width: 4rem;height: 5rem"></div>
        <p ref="text">{{userInfo.infos.NickName}}邀请你一起来玩驯兽师，点击链接玩<span>{{qartConfig.text}}</span></p>
        <div flex="box:mean" >
          <div style="text-align: center"><button class="btn-blue" @click="inviteDlg = false">取消</button></div>
         <div style="text-align: center"><copy :copyText="userInfo.infos.NickName+'邀请你一起来玩驯兽师，点击链接玩'+qartConfig.text" class="btn-yellow" >复制</copy></div>
        </div>
      </div>
    </my-dialog>
		<customDialog v-model="sendVal" type="confirm" title="充值" v-on:cancel="userCancel()" @danger="userDanger()"
		 @confirm="userConfirm()" dangerText="Delete"  @payResult="payReloadInfo"></customDialog>
	</div>

</template>

<script>
  import Selection from "../../components/index/select";
  import Transaction from "../transaction/transaction";
  import tigerList from "./tigerList";
  import RecodeList from "./recodeList";
  import Recharge from "./recharge";
  import Withdrawals from "./withdrawals";
  import Foot from "../../components/footer";
  import Scroll from "../../components/scroll/scroll";
  import common from '../../components/common'
  import ComfireDialog from "../../components/comfireDialog";
  import MyDialog from "../../components/dialog";
  import QRCode from 'qrcodejs2'
  import Copy from "../../components/copy";
	import customDialog from "../../components/mydialog2";
	
  const rem = document.documentElement.style.fontSize.split('px')[0];
  export default{
    components: {
			customDialog,
      Copy,
      MyDialog,
      ComfireDialog,
      Scroll,
      Foot,
      Withdrawals,
      Recharge,
      RecodeList,
      tigerList,
      Transaction,
      Selection,
      QRCode},
    name: "user",
    data(){
      return {
				sendVal: false,
				dialogOpen: '',
        scrollY:0,
        load:true,
        listEmpty:true,
        recordEmpty:true,
        WithDrawalEmpty:true,
        rechargeEmpty:true,
        loadRecode:true,
        tigerCur:0,
        dialogOpen:'',
        auction:false,//碎片拍卖
        WithDrawalsConfig:{
          WithDrawalsDlg:false,//提现Dlg
          config:{
            amount:'',
            ethHash:'',
            vCode:'',
          }
        },
        items:[],
        tigers:[],//我的老虎数据
        Records:[],//收支记录数据
        recharge:[],//充值记录数据
        WithDrawals:[],//提现记录数据
        needLoad:true,
        pageSize:30,
        listOffset:0,//我的老虎offset
        tigerTotal:{},//老虎总数
        RecodeOffset:0,//收支记录offset
        rechargeOffset:0,//充值记录offset
        WithDrawalsOffset:0,//提现记录offset
        unionSort:-1,//联盟排序
        comBetSort:-1,//战斗力排序
        breedSort:-1,//生育值排序
        feedSort:-1,//喂养排序
        userInfo:{
          infos:{
            Balance:0,
            BeautyContest:0,
            BetWinning:0,
            FreezeAmount:0,
            Id:'',
            NickName:'',
            UserName:"",
            WanLiPieces:0
          }},
        clientTotal:0,//上次请求total
        feed: {dialog: false, bornTime: '00.00', price: '',info:''},
        editName:{dlg:false,name:'',error:''},
        recode:[
          {text:'我的老虎'},
          {text:'收支记录'},
         // {text:'提现中心'},
          {text:'充值中心'},
        ],
        namePrice:10,
        selectValue:[
          {value:10},
          {value:100},
        ],
        ToolAuctionCount:10,
        toolAuctionAmount:"",
        inviteDlg:false,
        qartConfig:{
          text: 'http://www.baidu.com',
          width: 4*rem,
          height: 4*rem,
          colorDark : '#000000', //前景色
          colorLight : '#ffffff'  //背景色
        }
      }
    },
    mounted(){
      this.getUserInfo();
    },
    created(){
      this.feed.price = this.$store.state.feedPrice;
      this.namePrice = this.$store.state.namePrice;
      // this.getUserInfo();
      if(typeof(this.$route.query.type) !='undefined' ){
        this.tigerCur =   parseInt(this.$route.query.type);
      }
    },
    computed:{
      getTigerListNO:function () {
        return this.$store.state.tigerNo;
      },
      type:function () {
        return this.$route.query.type;
      },
      getCur:function () {
        switch (this.tigerCur){
          case 0: return 'nav_0';
          case 1: return 'nav_1';
          case 2: return 'nav_2';
          //case 3: return 'nav_3';
        }
      },
      setPullUpLoad:function () {
        return {
          threshold:-30,

        }
      },
      setPullDown:function () {
        return  {
          threshold:100,
          stop:20
        }
      },
    },
    methods:{
			openMask:function() {
				this.sendVal = true;
			},
			userCancel:function(){
				console.log('recharge:点击了取消');
			},
			userDanger:function(){
				console.log('这里是danger回调')
			},
			userConfirm:function(){
				console.log('点击了confirm');
			},
			payReloadInfo:function(){
				this.getRechargeList();
				this.getUserInfo();
				console.log("重载充值记录");
				
			},
      initialization:function(){
        if(this.$refs.list){
          this.$refs.list.init();
        }
      },
      getByteLen: function (val) {
        let len = 0;
        for (let i = 0; i < val.length; i++) {
          let patt = new RegExp(/[^\x00-\xff]/ig);
          let a = val[i];
          if (patt.test(a))
          {
            len += 2;
          }
          else
          {
            len += 1;
          }
        }
        return len;
      },
      editNameShow:function () {
        this.editName.error = '';
        this.editName.dlg = true;
      },
      editNameSure:function () {
        if(!this.editName.name) return   this.editName.error ='昵称不能为空';
        if(this.getByteLen(this.editName.name) >12){
          return   this.editName.error ='昵称最大长度不能超过12个字符';
        }else{
          this.editName.error ='';
        }
        this.editName.dlg = false;
        let data={nick:this.editName.name};
        this.$axios.post('/api/user/modifynick/',data).then(res=>{
          let result = res.data;
          if(result.IsSuccess){
            this.$tips('昵称修改成功');
            this.userInfo.infos.NickName = this.editName.name;
            this.getUserInfo();
          }else{
            this.$get_error('tips',result.Code,result.Message);
          }
        },error=>{
          this.$get_error('network');
        })
      },
      getFeedState:function (val) {
        this.feed.dialog =val;
      },//喂养弹框
      getFeedInfo:function (val) {
        this.feed.info =val;
      },//喂养参数
      sureToFeed:function (feedAllTimes ) {
        let index = this.feed.info.index;
        this.feed.dialog = false;
        let data = {horseId: this.feed.info.HorseKey,feedAllTimes:feedAllTimes };
        this.$axios.post('/api/horse/feed_1/', data).then(
          res => {
            let result = res.data;
            if (result.IsSuccess) {

              if((this.tigers[index].Weight +result.Result.weigthAdded) >200){
                this.tigers[index].Weight = 200
              }else{
                this.tigers[index].Weight = this.tigers[index].Weight +result.Result.weigthAdded
              }
              this.tigers[index].FeedTimes =  result.Result.feedTimes;
              this.userInfo.infos.Balance = result.Result.balance
            } else {
              this.$get_error('tips',result.Code,result.Message);
            }
          }, error => {
            this.$get_error('network');
          }
        );
      },//喂养
      feedCancle:function(){
        this.feed.dialog = false;
      },
      getWithDrawalsConfig:function (val) {
        this.WithDrawalsConfig = val;
      },
      setScrollMinHeight:function () {
        if(document.getElementById('warp'))
        {
          return 'min-height:'+(document.getElementById('warp').offsetHeight+1)+'px'
        }
      },
      pullDownFuc:function () {
        if(this.tigerCur===0){
          this.getUserInfo();
          this.getTigerList();
        }else if(this.tigerCur===1){
          this.getUserInfo();
          this.getRecodeList();
        }else if(this.tigerCur===2){
          this.getUserInfo();
          this.getWithDrawalsList()
        }else if(this.tigerCur===3){
          this.getUserInfo();
          this.getRechargeList()
        }
        this.$refs.scroll.finishPullDown();
      },//下拉刷新
      pullUpLoadFuc:function () {
        if(this.tigerCur===0){
//          this.getTigerList('UpLoad');
        }else if(this.tigerCur===1){
          this.getRecodeList('UpLoad');
        }else if(this.tigerCur===2){
          this.getWithDrawalsList('UpLoad');
        }
        else if(this.tigerCur===3){
          this.getRechargeList('UpLoad');
        }
        this.$refs.scroll.finishiPullUp();
      },//上拉加载
      getUserInfo:function () {
        this.load = true;
        this.$axios.post("/api/user/myaccount/").then(
          res=>{
            let result = res.data;
            if(result.IsSuccess){
              this.userInfo.infos = result.Result;
              this.load = false;
            }else{
//              this.$get_error('tips',result.Code,result.Message);
              this.load = false;
            }
          },
          error=>{
//            this.$get_error('reload');
            this.load = false;
          }
        )
      },//用户信息
      getSort:function (val) {//点击排序
        switch (val){
          case 'union':this.unionSort = this.unionSort===-1?this.unionSort=0:(this.unionSort>0?0:1);
            this.comBetSort=-1;//战斗力排序
            this.breedSort=-1;//生育值排序
            this.feedSort=-1;//喂养排序
            break;
          case 'comBet':this.comBetSort = this.comBetSort===-1?this.comBetSort=0:(this.comBetSort>0?0:1);
            this.unionSort=-1;//战斗力排序
            this.breedSort=-1;//生育值排序
            this.feedSort=-1;//喂养排序
            break;
          case 'breed':this.breedSort = this.breedSort===-1?this.breedSort=0:(this.breedSort>0?0:1);
            this.unionSort=-1;//战斗力排序
            this.comBetSort=-1;//生育值排序
            this.feedSort=-1;//喂养排序
            break;
          case 'feed':this.feedSort = this.feedSort===-1?this.feedSort=0:(this.feedSort>0?0:1);
            this.unionSort=-1;//战斗力排序
            this.comBetSort=-1;//生育值排序
            this.breedSort=-1;//喂养排序
            break;
        }
        this.getTigerList()
      },
      getTigerList:function (pageIndex) {
        let tigerNo = this.$store.state.tigerNo;
        let level = this.$store.state.level;
        let offset;
        if(pageIndex){
          offset = (pageIndex-1) *this.pageSize;
        }else
        {
          if(this.$refs.list){
            this.$refs.list.reSetPage();
          }
          offset = 0;
        }
        let data={
          pageSize:this.pageSize,
          offset:offset,
          orderByFamily:this.unionSort,
          orderByCombat:this.comBetSort,
          orderByBreed:this.breedSort,
          orderByFeed:this.feedSort
        };

        if(tigerNo!==null){
          data.horseNo = tigerNo;
        }
        if(level!==null){
          data.level = level;
        }
        this.$axios.post('/api/horse/list/',data).then(
          res=>{
            let result = res.data;
            let tigers=[];
            if(result.IsSuccess){
              if(result.Result.horseCountInfo){
                this.tigerTotal =result.Result.horseCountInfo;
              }
              this.totalPage = result.Result.total?Math.ceil(result.Result.total/this.pageSize):0;
              if(!result.Result.Data) return;
              if(pageIndex){
                this.$refs.scroll.scrollYto(0);
              }
              if(result.Result.Data.length>0){
                this.listEmpty = false;
                tigers = result.Result.Data;
                for(let tiger in tigers ){
                  tigers[tiger].tiger= common.svgApi+result.Result.Data[tiger].HorseKey;
                }
              }else{
                // if(pageIndex){

                // }else{
                this.listEmpty = true;
                // }
              }
              // if(pageIndex){
              // this.tigers =  this.tigers.concat(tigers);
              // }else{
              this.tigers =[];
              this.$nextTick(()=>{
                this.tigers =tigers;
              });

              // }
              this.listOffset = this.tigers.length;
            }else{
              this.$get_error('tips',result.Code,result.Message);
            }
          },error=>{
            this.$get_error('reload');
          }
        );
      },//我的老虎list
      getRecodeList:function (type) {
        this.loadRecode = true;
        let recodeType = this.$store.state.recodeType;
        let offset,total;
        if(type ==='UpLoad'){
          offset = this.RecodeOffset;
        }else
        {
          offset = 0;
          this.Records = [];
        }
        if(type ==='UpLoad'){
          total = this.clientTotal;
        }else
        {
          total = 0;
        }
        let data={pageSize:this.pageSize,offset:offset,type:recodeType,clientTotal:total};
        this.$axios.post('/api/user/getaccountdetaillsit/',data).then(
          res=>{
            let result = res.data;
            if(result.IsSuccess){
              this.recordEmpty = false;
              if(!result.Result.Data) return;
              if(result.Result.Data.length>0){
                let list = result.Result.Data;
                for(let index in list){
                  list[index].CreateTime =  list[index].CreateTime.slice(5,16);
                }
                this.recordEmpty = false;
                if(type ==='UpLoad'){
                  this.Records =  this.Records.concat(list);
                }else{
                  this.Records= list;
                }
              }else{
                if(type ==='UpLoad')
                {
                  // this.$tips('暂无更多提现记录');
                }else{
                  this.recordEmpty = true;
                }
              }

              this.RecodeOffset = this.Records.length;
              this.loadRecode = false;
              this.clientTotal = result.Result.total;
            }else{
              this.$get_error('tips',result.Code,result.Message);
              this.loadRecode = false;
            }
          },error=>{
            this.$get_error('reload');
            this.loadRecode = false;
          }
        );
      },//记录
      getRechargeList:function (type) {
        let offset,total;
        if(type ==='UpLoad'){
          offset = this.rechargeOffset;
					total = this.clientTotal;
        }else
        {
          offset = 0;
					total = 0;
        }
        let data={pageSize:this.pageSize,offset:offset,clientTotal:total};
        this.$axios.post('/api/user/getrechargelist/',data).then(
          res=>{
            let result = res.data;
            if(result.IsSuccess){
              this.clientTotal = result.Result.total;
              if(!result.Result.Data) return;
              if(result.Result.Data.length>0){
                // this.empty = false;
                let list = result.Result.Data;
                for(let index in list){
                  list[index].CreateTime =  list[index].CreateTime.slice(5,16);
                }
                this.rechargeEmpty = false;
                if(type ==='UpLoad'){
                  this.recharge =  this.recharge.concat(list);
                }else{
                  this.recharge= list;
                }
              }else{
                if(type ==='UpLoad')
                {
                  // this.$tips('暂无更多提现记录');
                }else{
                  this.rechargeEmpty = true;
                }
              }
              this.rechargeOffset = this.recharge.length;

            }else{
              this.$get_error('tips',result.Code,result.Message);
            }
          },error=>{
            this.$get_error('reload');
          }
        );
      },//充值记录
      toWithDrawals:function () {
        let data={
          amount:this.WithDrawalsConfig.config.amount,
//          ethHash:this.WithDrawalsConfig.config.ethHash,
          vCode:this.WithDrawalsConfig.config.vCode
        };
        this.WithDrawalsConfig.WithDrawalsDlg = false;
        this.$axios.post('/api/happymoney/withdraw/',data).then(
          res=>{
            let result = res.data;
            if(result.IsSuccess){

              let props={
                value:true,
                title:'提现成功!',
                type:1
              };
              this.$comFire(props);
              this.getUserInfo();
              this.getWithDrawalsList();
              this.$refs.WithDrawals.reSet();
            }else{
              this.$get_error('tips',result.Code,result.Message);
            }
          },error=>{
            this.dialogOpen = false;
            this.codeError = '网络错误，请稍后重试';
          }
        );
      },//提现
      getWithDrawalsList:function (type) {
        let  WithDrawals = '2,-1';
        let offset,total;
        if(type ==='UpLoad'){
          offset = this.WithDrawalsOffset;
        }else
        {
          offset = 0;
        }
        if(type ==='UpLoad'){
          total = this.clientTotal;
        }else
        {
          total = 0;
        }
        let data={size:this.pageSize,offset:offset,clientTotal:total};
        this.$axios.post('/api/user/withdrawlist/',data).then(
          res=>{
            let result = res.data;
            if(result.IsSuccess){
              this.clientTotal = result.Result.total;
              if(!result.Result.Data) return;
              if(result.Result.Data.length>0){
                this.WithDrawalEmpty = false;
                if(type ==='UpLoad'){
                  this.WithDrawals =  this.WithDrawals.concat(result.Result.Data);

                }else{
                  this.WithDrawals= result.Result.Data;
                }
              }else{
                if(type ==='UpLoad')
                {
                  // this.$tips('暂无更多提现记录');
                }else{
                  this.WithDrawalEmpty = true;
                }

              }
              this.WithDrawalsOffset = this.WithDrawals.length;
            }else{

              this.$get_error('tips',result.Code,result.Message);
            }
          },error=>{
            this.$get_error('reload');
          }
        );
      },//提现记录
      changeRecode:function (index) {
        this.tigerCur = index;
        this.clientTotal = 0;

        this.$router.replace({path:'/user',query:{type:index}});
//        this.$nextTick(function () {
//          if(index ===0){
//            this.initialization();
//            this.getTigerList();
//          }
//        })
      },
      openToolAuction:function () {
        this.toolAuctionAmount="";
        this.auction = true;
      },
      selectFunc:function (val) {
        this.ToolAuctionCount = val
      },
      toolAuction:function () {
        if( !common.isNumber(this.toolAuctionAmount)){
          return   this.$tips('请输入合法数字')
        }
        this.auction = false;
        let data={amount:this.toolAuctionAmount,count:this.ToolAuctionCount,probId:1001};
        this.$axios.post('/api/prob/userauctionsale/',data).then(
          res=>{
            let result = res.data;
            if(result.IsSuccess){
              this.$tips('上架成功');
              this.getUserInfo();
            }else{
              this.$get_error('tips',result.Code,result.Message);
            }
          },error=>{
            this.$get_error('reload');
          }
        );
      },//确认拍卖碎片
      invite :function(){
        this.$axios.post('/api/happymoney/getinviteurl/').then(
          res=>{
            let result = res.data;
            if(result.IsSuccess){
             this.qartConfig.text= result.Result.inviteRegUrl;
              this.inviteDlg = true;
              this.$nextTick(()=>{
                let qrcodeObj = new QRCode('qrcode', this.qartConfig);
              })
            }else{
              this.$get_error('tips',result.Code,result.Message);
            }
          },error=>{
            this.$get_error('reload');
          }
        );
      },
    },
    watch:{
      "$route"(to,from) {
        if(to !='undefined' ){
          this.tigerCur =   parseInt(this.$route.query.type);
        }
      },
    }
  }
</script>

<style scoped>
  .close{
    width: 0.56rem;
    margin-top: 0.5rem;
    margin-right: 0.5rem;
  }
  .content{
    background-image: url("../../assets/img/user/user-bg.png");
    background-size: 100% 100%;
    position: fixed;
    top:0;

    bottom: 0;
    width: 100%;
  }
  .Check{
    padding:0.5rem 1rem 1rem 1rem;
    /*max-width: 7rem;*/
    width: 90%;
    min-height: 4rem  ;
    /*-webkit-border-radius:0.3125rem;*/
    /*-moz-border-radius:0.3125rem;*/
    /*border-radius:0.3125rem;*/
    background-image: url("../../assets/img/transactin/dlg-bg-sm.png");
    background-size: 100% 100%;
  }
  .btnWarp{
    position: absolute;
    bottom: -0.5rem;
  }
  .checkSure{
    background-image: url("../../assets/img/index/anniu.png");
    background-size: 100% 100%;
    border-radius: 0.3rem;
    font-size: 0.5rem;
    color:#D07416 ;
  }
  .checkCancle{
    margin-right: 5vw;
    background-image: url("../../assets/img/dialog/sell-cur.png");

    color: #ffffff;

  }
  .btn{
    background-size: 100% 100%;
    border-radius: 0.3rem;
    font-size: 0.5rem;
    width:3.5rem;
    height: 1.125rem;
    line-height: 1.125rem;
  }
  .user {
    /*position: relative;*/
    /*margin: 0 auto;*/
    height: 5rem;
    background-image: url("../../assets/img/user/baiyundi.png");
    background-repeat:no-repeat;
    background-size:100% 100%;
    text-align: center;
  }
  .top{

    position: relative;

  }
  .numbers{
    width:100% ;
  }
  .numbers li{
    text-align: center;
  }
  .title{
    color: #2D6D7B;
    margin: 0.2rem 0;
    font-size: 0.4375rem;
  }
  .price{
    color: #2D6D7B;
    font-size: 18px;
    word-WRAP: break-word;
    margin: 0 auto;
  }
  .bg{
    background: #ffffff;
    position: absolute;
    width: 100%;
    height: 50%;
    bottom: 0;
    left: 0;
  }
  .item{
    width: 35%;
    margin-top:0.6rem;
    position: relative;
  }
  .item p{
    color: #ffffff;
    font-size: 0.32rem;
  }
  .info{
    max-width: 50%;
    position: relative;
    /*width: 100%;*/
    width: 2.48rem;
    height: 2.33rem;
    background-image: url("../../assets/img/user/touxiang.png");
    background-size: 100% auto;
  }

  .icon{
    height: 2.24rem;
    margin: 0 auto;
  }
  .icon img{
    width: 100%;
    height: 100%;
  }
  .name{
    width: 100%;
    color: #ffffff;
    padding:1% 0.3rem 0;
    height: 25%;
    position: absolute;
    bottom: 0;
    text-align: center;
  }
  .name p{
    font-size: 0.2667rem;

  }
  .button{
    padding: 0.2rem 0.4rem;
    font-size: 0.4rem;
    background-image: url("../../assets/img/index/anniu.png");
    background-size: 100% 100%;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px
  }
  .button-auction{
    padding: 0.2rem 0.4rem;
    font-size: 0.4rem;
    background-image: url("../../assets/img/dialog/lvda.png");
    background-size: 100% 100%;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    color: #ffffff;
  }
  .recode{
    width: 25%;
    font-size: 0.4rem;
    padding: 0.2rem 0;
    text-align: center;
    height: 100%;
  }
  .nav-bar{
    margin: 0.3rem 0;
    background-size: 100% 100%;
    position: relative;
    top:-1rem;
  }
  .nav_0{
    background-image: url("../../assets/img/user/nav_0.png");
  }
  .nav_1{
    background-image: url("../../assets/img/user/nav_1.png");
  }
  .nav_2{
    background-image: url("../../assets/img/user/nav_2.png");
  }
  .nav_3{
    background-image: url("../../assets/img/user/nav_3.png");
  }
  .mar{
    margin-right: 2.34375rem;
  }
  .betdlg{
    height: 0.267rem;
    line-height: 0.267rem;
  }
  .betInput{

    margin-left: 0.3rem;
    height: 0.69rem;
    width: 60%;
    text-align: center;
    border-radius: 5px;
    border: 1px solid #928577;
  }
  .input{
    width: auto;
    text-align: center;
    height: 0.85rem;
    background: #ffffff;
    border: 1px solid #8C8C8C;
    border-radius: 0.2rem;
    margin-top: 0.2rem ;
  }
  .input input{
    text-indent: 1em;
    padding-left: 0.2rem;
    width: 100%;
    height: 100%;
    border-radius: 0.2rem;
  }
  .input input::placeholder{
    font-size: 0.37rem;
  }
  .input p{
    color: #8C8C8C;
    border-right: 2px solid #8C8C8C;
    height:0.85rem;
    text-align: center;
    line-height: 1rem;
    width: 2.5rem;
    font-size: 0.37rem;

  }
  .auction-p{
    font-size: 0.32rem;
    height: 0.8rem;
    line-height: 0.8rem;
  }
  .auction-p span{
    color: #FFE94B;
    font-size: 0.32rem;
  }
  #qrcode{
    margin: 0.5rem auto;
  }
  .invite-bg{
    padding:0.5rem 1rem 1.05rem 1rem;
    width: 90%;
    min-height: 4rem  ;
    background-image: url("../../assets/img/transactin/dlg-bg-sm.png");
    background-size: 100% 100%;
  }
  .invite-bg p{
    width: 80%;
    text-align: center;
    margin:  0 auto;
  }
  .invite-bg span{
    color: #CDA669;
    word-wrap: break-word;
  }
  .invite-bg button{
    margin-top: 0.5rem;
    padding: 0.15rem 0.8rem;
  }
</style>
