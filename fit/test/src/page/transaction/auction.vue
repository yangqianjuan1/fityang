<template>
  <div class="auction">
    <div class="title usual"
         flex="main:center box:mean"
         :class="'cur_'+isCur">
      <div @click="choose(0)"
           :class="isCur===0?'miaobian-hong white':'miaobian-bai'">拍卖行</div>
      <div @click="choose(1)"
           :class="isCur===1?'miaobian-hong white':'miaobian-bai'">竞拍</div>
      <div @click="choose(2)"
           :class="isCur===2?'miaobian-hong white':'miaobian-bai'">拍卖</div>
    </div>
    <div v-loading="load">
      <div flex="main:justify cross:center"
           style="background: #F07765;padding:0.2rem 0.5rem">
        <selection :values="selectValue"
                   :selectFunc="selectFunc"
                   ref="selectTrans"
                   v-if="isCur===0"></selection>
        <div class="ui-select"
             flex="main:justify cross:center">
          <input style="height:0.7rem;line-height:0.7rem;text-indent:0.325rem;width:70%;color:#9F9F9F;border-right: 2px solid #7A7A7A;font-size: 14px;border-radius: unset"
                 placeholder="搜索ID"
                 v-model="searchValue" /><i class="search ct"
             @click="search()"></i>
        </div>
        <div flex="main:center cross:center">
          <span class="slot miaobian-hong"
                @click="timeSlot(!secondsPositiveSequence)">剩余时间</span>
          <span :class="secondsPositiveSequence?'arrow-up':'arrow-down' "
                class="arrow"
                style="margin-left: 5px"></span>
        </div>
        <div flex="main:center cross:center">
          <span class="slot miaobian-hong"
                @click="priceSlot(!pricePositiveSequence)">价格</span>
          <span :class="pricePositiveSequence?'arrow-up':'arrow-down'"
                class="arrow"
                style="margin-left: 5px"></span>
        </div>
      </div>
      <scroll top="2.5"
              :scrollY="scrollY"
              scrollTypeName="SET_TRANS_LIST_SCROLL"
              ref="scroll">
        <!--<contain >-->
        <div>
          <!--<ul style="overflow: hidden;"  v-if="!empty" :style="getPadding()">-->
          <ul v-if="!empty">
            <li v-for="(info,index) in horses"
                class="horse">
              <horse-info :Info="info"
                          class="horseIcon"
                          :type="2"
                          :reflash="getHorseList"
                          @click.native="transactionDetail(info)"></horse-info>
              <!--<p class="price" style="">最新价：{{info.MaxAuctionAmount|ETH}}ETH</p>-->
              <!--<P v-if="info.CurAmountMaxAuction" style="color: #fff;font-size: 12px;margin:  0.1rem 0;position: relative;top: -0.1rem;white-space: nowrap;"class="miaobian-lan">我的竞价：{{info.CurAmountMaxAuction}}</P>-->

              <button class="Bidding myUnCur  white miaobian-green"
                      @click="Bidding(index,info)"
                      v-if="isCur!==2">竞价</button>
            </li>
          </ul>
          <paging :totalPage="totalPage"
                  :pageFunc="pullUpLoadFuc"
                  ref="page"></paging>
          <div style="position: relative;height: 100%;text-align: center"> <img style="width: 2.5rem;padding: 2rem"
                 src="../../assets/img/dialog/empty.png"
                 v-if="empty" /></div>
          <!--</contain>-->
        </div>
      </scroll>
    </div>
    <foot></foot>
    <!--<login-register-find v-model="dialogOpen"></login-register-find>-->
    <comfire-dialog v-model="bidDlg"
                    :sure="sureToBidding"
                    :param="biddingInfo">
      <div flex="dir:top main:center cross:center"
           style="height: 100%">
        <p class="miaobian-hong"
           style="font-size: 22px;color: #fff;text-align: center;margin-bottom: 20px">竞价</p>

        <div style="width: 90%;margin: 0 auto"
             flex="main:left cross:center">
          <!--<input  placeholder="请输入出售金额" v-model.number="sell.price"/>-->
          <!--<span style="color: #fff" class="miaobian-hong">竞拍价格</span>-->
          <div flex="main:center cross:center"
               style="width: 100%;padding: 0.3rem 0">
            <!--<button class="minus active" flex="main:center cross:center" @click="toMinus()"></button>-->
            <input type="number"
                   class="bid miaobian-bai usual"
                   placeholder="请输入竞拍价格"
                   v-model.number="biddingPrice" />
            <!--<img src="../../assets/img/transactin/plus.png" >-->
            <!--<button class="plus active" flex="main:center cross:center" @click="toPlus()"></button>-->
          </div>
        </div>
        <p style="text-align: left;font-size: 14px;color: #ffffff;width: 90%;margin: 0 auto"
           class="miaobian-hong">每次提价不得低于<span style="color: #FFE619">现价的{{onceBid*100}}%</span></p>
      </div>
    </comfire-dialog>
  </div>
</template>

<script>
import Contain from "../../components/contain";
import HorseInfo from "../../components/tigerInfo";
import Paging from "../../components/paging";
import Foot from "../../components/footer";
import Selection from "../../components/index/select";
import LoginRegisterFind from "../../components/loginRegisterFind";
import common from '../../components/common'
import ComfireDialog from "../../components/comfireDialog";
import Scroll from "../../components/scroll/scroll";
export default {
  components: {
    Scroll,
    ComfireDialog,
    LoginRegisterFind,
    Selection,
    Foot,
    Paging,
    HorseInfo,
    Contain  },
  name: "auction",
  data () {
    return {
      load: true,
      empty: false,
      scrollY: 0,
      dialogOpen: '',
      pageSize: 30,
      pageIndex: 1,
      currentpage: 1,
      offset: 0,
      totalPage: 0,
      orderByEndTime: -1,//剩余时间排序 1：小到大 0：大到小
      orderByPrise: -1,//价格排序 1：小到大 0：大到小
      horseNo: '',     //搜索id
      searchValue: '',
      IntervalNum: 0,//定时器
      isCur: 0,
      maxBid: 999999999,
      onceBid: 0.1,//单次加价
      type: 0,//请求类型，0拍卖 1 我的竞价
      list: [
        { text: '拍卖行' },
        { text: '我的竞拍' },
      ],

      secondsPositiveSequence: true,//剩余时间
      pricePositiveSequence: true,//价格
      selectValue: [
        { value: "全部" },
        { value: "创世马" },
        { value: "神马" },
        { value: "骏马" },
      ],
      level: -1,//种类传参
      horses: [],
      chooseCur: 0,
      highest: false,
      bidDlg: false,
      biddingPrice: 10,
      biddingInfo: '', //拍卖信息
      BidIndex: -1,
    }
  },

  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (from.name === "buyDetail") {
        vm.scrollY = vm.$store.state.transactionScroll;

      } else {
        vm.scrollY = 0;
        vm.isCur = 0;
        vm.getHorseList();
        vm.reSetConfig();
      }
      vm.onceBid = vm.$store.state.onceBid;
      vm.$nextTick(() => {
        setTimeout(() => {
          vm.$refs.scroll.initScroll();
        }, 100)

      });
    });
  },
  computed: {
    setPullUpLoad: function () {
      return {
        threshold: -60,
      }
    },
  },
  destroyed () {
    if (this.IntervalNum)
      clearInterval(this.IntervalNum)
  },
  methods: {
    setScrollMinHeight: function () {
      if (document.getElementById('warp')) {
        return { 'min-height': (document.getElementById('warp').offsetHeight + 1) + 'px' }
      }
    },
    pullUpLoadFuc: function (offset) {
      if (this.isCur === 1) {
        this.getMyList(offset);
      } else if (this.isCur === 0) {
        this.getHorseList(offset);
      } else if (this.isCur === 2) {
        this.getMySellList(offset);
      }
    },
    toMinus: function () {
      if (this.biddingInfo.MaxAuctionAmount > this.biddingPrice - this.onceBid - this.onceBid || this.biddingInfo.MaxAuctionAmount === this.biddingPrice - this.onceBid - this.onceBid) {
        this.biddingPrice = parseFloat((this.biddingInfo.MaxAuctionAmount + this.onceBid).toFixed(5));
      } else {

        this.biddingPrice = parseFloat((this.biddingPrice - this.onceBid).toFixed(5));
      }
    },
    toPlus: function () {
      if (this.maxBid < this.biddingPrice + this.onceBid || this.maxBid === this.biddingPrice + this.onceBid) {
        this.biddingPrice = this.maxBid;
      } else {
        this.biddingPrice = parseFloat((this.biddingPrice + this.onceBid).toFixed(5));
      }
    },
    getPadding: function () {
      if (document.getElementById('warp')) {
        let number = Math.floor(document.getElementById('warp').offsetWidth % (parseFloat(document.documentElement.style.fontSize.split('px')[0]) * 4));
        return { 'padding': '0 ' + number / 2 + 'px' }
      }
    },
    reSetConfig: function (type) {//重置选项
      this.searchValue = '';
      this.orderByEndTime = -1;
      this.orderByPrise = -1;
      this.offset = 0;
      this.totalPage = 0;
      this.secondsPositiveSequence = true;
      this.pricePositiveSequence = true;
      this.$refs.page.reSetPage();
      if (type !== 'select' && type !== 'slot' && this.$refs.selectTrans) {
        this.$refs.selectTrans.init();
      }
      if (type !== 'slot') {
        this.level = -1;
      }
    },
    myAuction: function () {
      // if(this.IntervalNum){
      //   clearInterval(this.IntervalNum )
      // }
      this.type = 1;
      this.reSetConfig();
      // this.$refs.page.reSetPage();
      this.getMyList();
      // this.IntervalNum =  setInterval( this.getMyList,5000)
    },//点击竞拍
    Auction: function () {
      // if(this.IntervalNum){
      //   clearInterval(this.IntervalNum )
      // }
      this.reSetConfig();
      this.type = 0;
      // this.$refs.page.reSetPage();
      this.getHorseList();
      // this.IntervalNum =  setInterval( this.getHorseList,5000)
    },//点击拍卖行
    mySellAuction: function () {
      this.reSetConfig();
      this.type = 2;
      this.getMySellList();

    },//点击拍卖
    choose: function (index) {
      this.horses = [];
      switch (index) {
        case 0: this.Auction(); break;
        case 1: this.myAuction(); break;
        case 2: this.mySellAuction(); break;
      }
      this.isCur = index;
    },
    getCurrentPage: function (val) {
      this.currentpage = val;
    },//获得当前page
    getHorseList: function (page) {
      let offset = 0;
      if (page - 1) {
        offset = this.pageSize * (page - 1);
      }
      this.load = true;
      let data = {
        pageSize: this.pageSize,
        offset: offset,
        horseNo: this.searchValue,
        orderByEndTime: this.orderByEndTime,
        orderByPrice: this.orderByPrise,
        sortType: this.level,
      };
      this.$axios.post('/api/horse/trade/auctionlist/', data).then(
        res => {
          let result = res.data;
          if (result.IsSuccess) {
            if (this.orderByEndTime === 1) {
              this.secondsPositiveSequence = true;
            } else if (this.orderByEndTime === 0) {
              this.secondsPositiveSequence = false;
            } else if (this.orderByEndTime === -1) {
              this.secondsPositiveSequence = false;
            }
            if (this.orderByPrise === 1) {
              this.pricePositiveSequence = true;
            } else if (this.orderByPrise === 0) {
              this.pricePositiveSequence = false;
            } else if (this.orderByPrise === -1) {
              this.pricePositiveSequence = false;
            }
            this.totalPage = Math.ceil(result.Result.total / this.pageSize);
            if (!result.Result.Data) return;
            if (result.Result.Data.length > 0) {
              this.empty = false;
              let horselist = [];
              horselist = result.Result.Data;
              for (let horse in horselist) {
                horselist[horse].horse = common.svgApi + result.Result.Data[horse].HorseKey;
                horselist[horse].MaxAuctionNick = null;
                if (!horselist[horse].CurAmountMaxAuction) {
                  horselist[horse].CurAmountMaxAuction = "未出价";
                }
                horselist[horse].IsHighestBid = null;
              }
              this.horses = horselist;
            } else {
              this.empty = true;

            }

            this.load = false;
          } else {
            this.$get_error('tips', result.Code, result.Message);
            this.load = false;
          }
        }, error => {
          this.$get_error('reload');
          this.load = false;
        }
      );
    },//拍卖行list
    getMyList: function (page) {
      let offset = 0;
      if (page - 1) {
        offset = this.pageSize * (page - 1);
      }
      this.load = true;
      let data = {
        pageSize: this.pageSize,
        offset: offset,
        horseNo: this.searchValue,
        orderByEndTime: this.orderByEndTime,
        orderByPrice: this.orderByPrise,
        //          sortType:this.sortType
      };
      this.$axios.post('/api/horse/trade/myauctionlist/', data).then(
        res => {
          let result = res.data;
          if (result.IsSuccess) {
            if (this.orderByEndTime === 1) {
              this.secondsPositiveSequence = true;
            } else if (this.orderByEndTime === 0) {
              this.secondsPositiveSequence = false;
            } else if (this.orderByEndTime === -1) {
              this.secondsPositiveSequence = false;
            }
            if (this.orderByPrise === 1) {
              this.pricePositiveSequence = true;
            } else if (this.orderByPrise === 0) {
              this.pricePositiveSequence = false;
            }
            else if (this.orderByPrise === -1) {
              this.pricePositiveSequence = false;
            }
            this.totalPage = Math.ceil(result.Result.total / this.pageSize);
            if (!result.Result.Data) return;
            if (result.Result.Data.length > 0) {
              this.empty = false;
              let horselist = {};
              horselist = result.Result.Data;
              for (let horse in horselist) {
                horselist[horse].horse = common.svgApi + result.Result.Data[horse].HorseKey;
                horselist[horse].MaxAuctionNick = null;

              }
              this.horses = horselist;
            } else {
              this.empty = true;
            }
            this.load = false;
          } else {
            this.$get_error('tips', result.Code, result.Message);
            this.load = false;
          }
        }, error => {
          this.$get_error('reload');
          this.load = false;
        }
      );
    },//我的竞价list
    getMySellList: function (page) {
      let offset = 0;
      if (page - 1) {
        offset = this.pageSize * (page - 1);
      }
      this.load = true;
      let data = {
        pageSize: this.pageSize,
        offset: offset,
        horseNo: this.searchValue,
        orderByEndTime: this.orderByEndTime,
        orderByPrice: this.orderByPrise,
        //          sortType:this.sortType
      };
      this.$axios.post('/api/horse/trade/myauctionsalelist/', data).then(
        res => {
          let result = res.data;
          if (result.IsSuccess) {
            if (this.orderByEndTime === 1) {
              this.secondsPositiveSequence = true;
            } else if (this.orderByEndTime === 0) {
              this.secondsPositiveSequence = false;
            } else if (this.orderByEndTime === -1) {
              this.secondsPositiveSequence = false;
            }
            if (this.orderByPrise === 1) {
              this.pricePositiveSequence = true;
            } else if (this.orderByPrise === 0) {
              this.pricePositiveSequence = false;
            }
            else if (this.orderByPrise === -1) {
              this.pricePositiveSequence = false;
            }
            this.totalPage = Math.ceil(result.Result.total / this.pageSize);
            if (!result.Result.Data) return;
            if (result.Result.Data.length > 0) {
              this.empty = false;
              let horselist = {};
              horselist = result.Result.Data;
              for (let horse in horselist) {
                horselist[horse].horse = common.svgApi + result.Result.Data[horse].HorseKey;
                horselist[horse].SellerUserName = null;
                horselist[horse].MaxAuctionNick = horselist[horse].MaxAuctionNick ? horselist[horse].MaxAuctionNick : "未出价";
                horselist[horse].CurAmountMaxAuction = null;
              }
              this.horses = horselist;
            } else {
              this.empty = true;
            }
            this.load = false;
          } else {
            this.$get_error('tips', result.Code, result.Message);
            this.load = false;
          }
        }, error => {
          this.$get_error('reload');
          this.load = false;
        }
      );
    },//我的拍卖list
    search: function () {//搜索

      //          this.$refs.page.reSetPage();
      //          this.horseNo =this.searchValue;
      if (this.isCur === 0) {
        this.getHorseList();
      } else if (this.isCur === 1) {
        this.getMyList();
      } else if (this.isCur === 2) {
        this.getMySellList();
      }

    },// 搜索
    timeSlot: function (type) {
      this.reSetConfig('slot');
      //          this.$refs.page.reSetPage();
      this.orderByEndTime = type ? 1 : 0;
      this.orderByPrise = -1;
      if (this.isCur === 0) {
        this.getHorseList();
      } else if (this.isCur === 1) {
        this.getMyList();
      } else if (this.isCur === 2) {
        this.getMySellList();
      }
    },//时间排序
    priceSlot: function (type) {
      this.reSetConfig('slot');
      //          this.$refs.page.reSetPage();
      this.orderByPrise = type ? 1 : 0;
      this.orderByEndTime = -1;
      if (this.isCur === 0) {
        this.getHorseList();
      } else if (this.isCur === 1) {
        this.getMyList();
      } else if (this.isCur === 2) {
        this.getMySellList();
      }

    },//价格排序
    transactionDetail: function (info) {
      this.$router.push({ path: '/buyDetail', query: { HorseKey: info.HorseKey, type: 'auction' } })
    },
    getLevel: function (val) {
      switch (val) {
        case '全部': this.level = -1; break;
        case '创世马': this.level = 4; break;
        case '神马': this.level = 2; break;
        case '骏马': this.level = 1; break;
      }
    },//分类
    selectFunc: function (value) {
      this.reSetConfig('select');
      this.getLevel(value);
      this.getHorseList();
    },

    Bidding: function (index, info) {
      this.biddingInfo = info;
      this.BidIndex = index;
      if (info.MaxAuctionAmount * (1 + this.onceBid) > parseFloat((info.MaxAuctionAmount * (1 + this.onceBid)).toFixed(5))) {
        this.biddingPrice = (parseFloat((info.MaxAuctionAmount * (1 + this.onceBid)).toFixed(5)) + 0.00001).toFixed(5);
      } else {
        this.biddingPrice = parseFloat((info.MaxAuctionAmount * (1 + this.onceBid)).toFixed(5));
      }

      this.bidDlg = true;

    },//竞价
    sureToBidding: function (info) {
      if (this.biddingPrice > this.$store.state.max || this.biddingPrice == this.$store.state.max) {
        this.biddingPrice = this.$store.state.max;
      }
      this.bidDlg = false;
      let data = { tradeKey: info.HorseTradeKey, amount: this.biddingPrice };
      this.$axios.post('/api/horse/trade/auctionincrease/', data).then(
        res => {
          let result = res.data;
          if (result.IsSuccess) {
            this.bidDlg = false;
            if (!result.Result.result) {
              this.$tips(result.Result.message);
              this.horses[this.BidIndex].MaxAuctionAmount = result.Result.maxAmount;
              return
            }
            this.$tips('竞价成功');
            if (this.type === 0) {
              this.choose(1);
            } else if (this.type === 1) {
              this.getMyList();
            }
          } else {
            this.bidDlg = false;
            this.$get_error('tips', result.Code, result.Message);
            this.load = false;
          }
        }, error => {
          this.bidDlg = false;
          this.$get_error('reload');
          this.load = false;
        }
      );
    }//提交竞价dialog
  },
  watch: {
    biddingPrice: function (val) {
      if (val > 999999999 || val == 999999999) {
        return 999999999;
      }
    }
  }
}
</script>

<style scoped>
.title {
  text-align: center;
  padding: 0.2rem 0;
  margin: 0 auto;
  font-size: 0.44rem;
}
.minus {
  width: 1rem;
  height: 1rem;
  background-image: url("../../assets/img/transactin/minus.png");
  border-radius: 5px;
  border: 1px solid #90473d;
  background-position: center;
}
.active:active {
  /*点击效果*/ /* For Firefox3.6+ */
  -webkit-box-shadow: 0 0 15px #f07765 inset; /* For Chrome5+, Safari5+ */
}
.plus {
  width: 1rem;
  height: 1rem;
  background-image: url("../../assets/img/transactin/plus.png");
  background-size: 100% 100%;
  border-radius: 5px;
  border: 1px solid #90473d;
  background-position: center;
}
/*.minus img{*/
/*width: 40%;*/
/*}*/
.arrow {
  width: 0.375rem;
  height: 0.5rem;
  display: inline-block;
  background-size: 100% 100%;
}
.bid {
  height: 1rem;
  /*width: 50%;*/
  font-size: 16px;

  text-align: center;
  margin: 0 0.1rem;
  border-radius: 5px;
  width: 100%;
  border: 1px solid #90473d;
}
.arrow-up {
  background-image: url("../../assets/img/transactin/up.png");
}
.arrow-down {
  background-image: url("../../assets/img/transactin/down.png");
}
.ui-select {
  /*float: left;
     */
  overflow: hidden;
  width: 35%;
  background-color: #ffffff;
  color: #d6d6d6;
  font-size: 14px;

  height: 0.8rem;
  text-align: left;
  position: relative;
  border-radius: 5px;
  border: 1px solid #7a7a7a;
}
select {
  width: 100%;
  height: 1.125rem;
  line-height: 1.125rem;
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
}
.slot {
  /*float: right;
     */
  display: block;
  /*margin-left: 0.625rem;
     */
  cursor: pointer;
  color: #ffffff;
  -webkit-text-stroke: 0;
  height: 1.125rem;
  line-height: 1.125rem;
}
.search {
  cursor: pointer;
  display: inline-block;
  width: 0.5rem;
  height: 0.53125rem;
  /*top:0.53125rem;
     */
  position: absolute;
  right: 0.3125rem;
  background: url("../../assets/img/transactin/search.png") no-repeat;
  background-size: 100% 100%;
}
.price {
  margin: 0.3rem 0;
  text-align: center;
  /*height: 0.71875rem;*/
  font-size: 0.5rem;
  color: #333333;
}
.horse {
  width: 33.3%;
  position: relative;
  display: inline-block;
  cursor: pointer;
  text-align: center;
  margin-top: 0.2rem;
}
.input {
  height: 100%;

  background: #ffffff;
}
.Bidding {
  /*width: 2.76rem;*/
  font-size: 0.3rem;
  height: auto;
  margin-top: 0.2rem;
  padding: 0.2rem 0.5rem;
  background-size: 100% 100%;
  cursor: pointer;
  border-radius: 0.2rem;
}
.myCur {
  background-image: url("../../assets/img/index/anniu.png");
}
.myUnCur {
  background-image: url("../../assets/img/transactin/jingjia.png");
}
/*.Bidding[disabled]{*/
/*background-image: url("../../assets/img/transactin/jingjia_disable.png");*/
/*}*/
.dialog {
  border: 2px solid #9a9a9a;
  background: #ffffff;
  border-radius: 5px;
}
.dialog span {
  text-align: center;
  display: inline-block;
  font-size: 16px;
  color: #bcbcbc;
  font-weight: 100;
  margin: 0.1rem 0;
  padding: 0.1rem 0.1rem;
}
input::-webkit-input-placeholder {
  text-shadow: none;
}
.bg {
  height: 1rem;
  background: #ffffff;
}
button {
  background: #ffffff;
  /*line-height: 1rem;*/
  /*height: 1rem;*/
  padding: 0.2rem 0;
  width: 80%;
  text-align: center;
}
.cur_1 {
  background-size: 100% 100%;
  background-image: url("../../assets/img/transactin/tab-3-1.png");
}
.cur_0 {
  background-image: url("../../assets/img/transactin/tab-3-0.png");
  background-size: 100% 100%;
}
.cur_2 {
  background-image: url("../../assets/img/transactin/tab-3-2.png");
  background-size: 100% 100%;
}
</style>
