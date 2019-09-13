<template>
  <div >
    <scroll>
      <div >

        <img src="../../assets/img/activity/csmlx-top.png" style="width: 100%">
        <contain style="text-align: center">

          <div class="content">
            <div class="info cl">活动详情</div>
            <div class="people">邀请人数：{{detailList.InviteCount}}</div>

            <p>1、活动期间玩家通过自己老虎下的注册邀请，邀请好友注册并体验万利马，即有机会获得创世马；</p>
            <p>2、活动结束后，邀请数排名前20的用户奖励创世马及等价的GXS；</p>
            <p>3、活动时间：{{detailList.StartTime}}—{{detailList.EndTime}}</p>
            <p>4、活动最终解释权归万利马所有。</p>
          </div>
          <div flex="main:center:cross:center">
            <img src="../../assets/img/user/list-before.png" style="height: 1rem">
            <ul  style="color: #ffffff;width: 100%" >

              <li class="table-title miaobian-hong" flex="main:center cross:center box:mean">
                <div v-for="title in titleList">{{title}}</div>

              </li>
              <div  class=" miaobian-lan"  v-for="(item,index) in detailList.details">
                <ul flex="main:center cross:center box:mean" style="width: 100%" class="usual">
                  <li  class="items" v-for="(items,index2) in item">{{items}}</li>
                </ul>
                <div class="under-line"></div>
              </div>
            </ul>
            <img src="../../assets/img/user/list-after.png" style="height: 1rem">
          </div>
        </contain>
      </div>
    </scroll>
  </div>
</template>

<script>
  import Contain from "../../components/contain";
  import Scroll from "../../components/scroll/scroll";
  import HorseInfo from "../../components/tigerInfo";

  export default{
    components: {
      HorseInfo,
      Scroll,
      Contain},
    name: "hrlx",
    data(){
      return {
        titleList:['排名','用户名','邀请人数'],
        detailList:
          {
            InviteCount:'',
            details:[],
          },
      }
    },
    mounted(){
      let key = this.$route.query.key;
      this.getInfo(key);
    },
    methods:{
      getInfo:function (key) {

        this.$axios.get('/api/activity/hrlxpageinfo/?key='+key).then(res=>{
          let result= res.data;
          if(result.IsSuccess){
            this.detailList= result.Result;

            this.detailList.details =  result.Result.Ranks.map(json=>{
              let list=[];
              Object.keys(json).forEach(function(item, index) {
                if(item !=='AccountKey'){
                  list[0] = json['Rank'];
                  list[1] = json['NickName'];
                  list[2] = json['InviteCount'];
                }
              });
               return list
            }
            );
          }else{
            this.$get_error('tips',result.Code,result.Message);
          }
        },error=>{
          this.$get_error('network');
        })
      },
    }
  }
</script>

<style scoped>
  .info{
    color: #ffffff;
    display: inline-block;
    padding: 0  1rem;
    background-image: url("../../assets/img/activity/title.png");
    background-size: 100% 100% ;
    font-size: 0.5rem;
    height: 0.9rem;
    line-height: 0.9rem;
    position: absolute;
    top: -18px;
  }
  .table-title{
    background-image: url("../../assets/img/user/list-mid.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  .table-title div{
    text-align: center;
    font-size: 0.4rem;
    margin: 0 1px;
    height: 1rem;
    line-height: 1rem;

  }
  .people{
    text-align: center;
    line-height: 0.75rem;
    margin-bottom: 0.5rem;
    color: #FFF850;
    width: 100%;
    height: 1rem;
    background-image: url("../../assets/img/invite/yaoqingdi.png");
    background-size: 100% 100% ;
  }
  .items{
    text-align: center;
    padding: 0.3rem 0;
    width: 33.3%;
  }
  .content p{
    font-size: 0.4rem;
    color: #074D5B;
    line-height: 0.6rem;
  }
  .content{
    position: relative;
    text-align: left;
    border-radius: 10px;
    border: 5px solid #ffffff ;
    background-color:rgba(0,0,0,0.2);
    padding: 1rem 0.5rem;
    margin: 0.5rem 0;
  }
</style>
