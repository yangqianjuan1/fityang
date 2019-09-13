<template>
  <div class="scroll" :id="warpId" :style="{top:top+'rem',bottom:bottom+'rem','max-width':$store.state.maxWidth}" >
    <div class="content" style="padding-bottom: 1.5rem">
      <bubble  :y="bubbleY" v-if="pullDownRefresh"></bubble>
      <slot ></slot>
      <loading  v-if=" pullUpLoading"></loading>
      <!--<p style="height: 1rem;line-height: 1rem;position: relative;bottom: -1.5rem;text-align: center">暂无更多数据</p>-->
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  import Loading from "./loading";
  import Bubble from "./bubble";
  export default{
    components: {
      Bubble,
      Loading},
    name: "scroll",
    props:{
      warpId:{
        default:'warp',
      },
      scrollY:{
        default:0
      },
      scrollTypeName:{

      },
      preventDefault:{
        default:true
      },
      top:{
        default:0
      },
      bottom:{
        default:2
      },
      pullUpLoad:{
        default:false,
      },
      pullUpLoadFuc:{
        type:Function,
      },
      pullUpLoadFucParam:{
      },
      pullDownRefresh:{
        default:false,
      },
      pullDownFuc:{},
      pullDownFucParam:{},
      onScroll:{
        default:null
      }
    },
    data(){
      return {
        scroll:null,
        bubbleY:10,
        beforePullDown:true,
        pullDownInitTop:-30,
        pullUpLoading:false,
      }
    },

    mounted(){
      if(!this.$route.meta.keepAlive){
        this.$nextTick(() => {
          setTimeout(()=>{
            this.initScroll();
          },100)
        });
      }
    },
    methods:{
      destroy:function(){
        if(this.scroll)
        {
          this.scroll.destroy();
        }
      },
      scrollYto:function(Y){
        if(this.scroll)
        {

          this.scroll.scrollTo(0,Y);
          this.$store.commit(this.scrollTypeName,Y);
        }
      },
      closePullUp:function () {//动态关闭上拉加载功能
        this.scroll.closePullUp();
      },
      finishPullDown:function () {//下拉刷新结束
        if(this.scroll){
          this.scroll.finishPullDown();
          this.scroll.refresh();
        }
      },
      finishiPullUp:function () {//上拉加载结束
        if(this.scroll){
          this.pullUpLoading = false;
          this.scroll.finishPullUp();
          this.scroll.refresh();
        }
      },
      initScroll:function () {
        let self = this;
        let warp = document.getElementById(this.warpId);
        this.scroll=  new BScroll(warp,{
          startY:this.scrollY,
          click:true,
          tap:true,
          probeType:2,
          pullUpLoad: this.pullUpLoad,
          mouseWheel:true,//开启鼠标
          autoBlur:false,
          pullDownRefresh:this.pullDownRefresh,
          preventDefaultException:{ tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|A|IMG)$/,//取消阻止默认行为
            className:/(^|\s)noPreventDefaultException(\s|$)/
          }
        });

          if(self.scrollTypeName){
            this.scroll.on('scroll', function (pos) {
            self.$store.commit(self.scrollTypeName,pos.y);
            });
          }

        if (this.pullUpLoad) {
          this.scroll.on('pullingUp', function () {
            self.pullUpLoading = true;

            if(self.pullUpLoadFucParam){
              self.pullUpLoadFuc(self.pullUpLoadFucParam);
            }else{
              self.pullUpLoadFuc();
            }
          });
        }
        this.scroll.on('pullingDown',function () {
          this.beforePullDown  =false;
          if(self.pullDownFucParam){
            self.pullDownFuc(self.pullDownFucParam);
          }else{
            self.pullDownFuc();
          }

        });
        // if (this.pullDownRefresh) {
        //   this._initPullDownRefresh()
        // }
        if(this.pullDownRefresh||this.onScroll)
        {
          this.scroll.on('scroll', (pos) => {

            if(this.onScroll)
            {
              this.onScroll();
            }
            if (self.beforePullDown) {
              self.bubbleY = Math.max(0, pos.y + self.pullDownInitTop);
              self.pullDownStyle = `top:${Math.min(pos.y + this.pullDownInitTop, 10)}px`
            } else {
              self.bubbleY = 0
            }
          });
        }

        window.onresize = function () {
          setTimeout(function () {
            self.scroll.refresh();
          },500)

        }
      },
      hideLoading:function () {
        this.pullUpLoading = false;
      }
    }
  }
</script>

<style scoped>
  .scroll {
    position: fixed;
    margin:  0 auto;

    left: 0;
    /*transform: translate(-50%);*/
    right: 0;
    /* overflow: hidden */
    overflow: hidden;
  }
</style>
