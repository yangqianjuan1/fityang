<template>
  <div class="huntingSpine">
    <my-dialog :dialogOpen="huttingSpine">
      <div class="ct" style="width:10rem;height: 7rem;">
        <div id="huntingSpine"style="width:10rem;height: 7rem;position: absolute;left: 0;top: 0;z-index: 100;color: #ffffff; background: #000000">
          <p class="takeCenter" v-if="progress!=='100%'" style="font-size: 0.5rem">...载入中{{progress}}</p>
          <button @click="close" class="btn-yellow btn cl" >跳过动画</button>
        </div>
      </div>
    </my-dialog>
  </div>
</template>

<script>
  import MyDialog from "../dialog";
  const rem = document.documentElement.style.fontSize.split('px')[0];
  export default{
    components: {MyDialog},
    name: "huntingSpine",
    data(){
      return {
        huttingSpine: true,
        progress:'0%',
        canvasWidth:0,
        canvasHeight:0,
        Application:null,
      }
    },
    mounted(){
      this.$nextTick(()=>{
        this.Init();
      })

    },
    methods: {
      close:function () {
        this.toDestroy();
        this.huttingSpine = false;
      },
      toDestroy:function () {
        if(this.Application !==null)
        {
          this.Application.destroy();
        }
      },
      Init: function (myList, enemyList) {

        this.canvasWidth = document.getElementById("huntingSpine").offsetWidth*2;
        this.canvasHeight = document.getElementById("huntingSpine").offsetHeight*2;
        let self = this;

        let Application = new PIXI.Application(this.canvasWidth, this.canvasHeight, {
          resolution: 2,
          transparent: true,
          roundPixels: true
        });
        this.Application = Application;
//        let background = PIXI.Sprite.fromImage('../../../static/data/spine-bg.png');
//        background.width = this.canvasWidth;
//        background.height = this.canvasHeight;
//        Application.stage.addChild(background);
        Application.view.style.width = document.getElementById("huntingSpine").offsetWidth+'px'
        Application.view.style.height = document.getElementById("huntingSpine").offsetHeight+'px'
        document.getElementById('huntingSpine').appendChild(Application.view);
        Application.stop();
        if (PIXI.loader.resources.hunting) {
          this.progress = '100%';
          return self.loadingSuccess(PIXI.loader, PIXI.loader.resources, Application)
        }
        PIXI.loader.add('hunting', '../../../static/data/wanlihu_xiaolu.json')
          .on("progress", function (loader, resources) { 
            self.loadProgressHandler(loader, Application)
          })
          .load(function (loader, resources) {
            self.loadingSuccess(loader, resources, Application)
          });

      },
      loadProgressHandler:function (loader,Application)  {
        this.progress = (loader.progress | 0) + "%"
      },
      loadingSuccess: function (loader, resources, Application){
        let postition = 0,
          background,
          background2,
          foreground,
          foreground2;
        let self = this;
        background = PIXI.Sprite.fromImage('../../../static/data/iP4_BGtile.png');
        background2 = PIXI.Sprite.fromImage('../../../static/data/iP4_BGtile.png');
        foreground = PIXI.Sprite.fromImage('../../../static/data/iP4_ground.png');
        foreground2 = PIXI.Sprite.fromImage('../../../static/data/iP4_ground.png');
        background.height = this.canvasHeight;
        background2.height = this.canvasHeight;
        Application.stage.addChild(background, background2);
        let pixie = new PIXI.spine.Spine(resources.hunting.spineData);
        pixie.width = 0.9*this.canvasWidth;
        pixie.height = 0.5*this.canvasHeight;
        pixie.x = this.canvasWidth/2+1*rem;
        pixie.y = this.canvasHeight-pixie.height/2
        pixie.state.addAnimation(0,'animation',false);
        Application.stage.addChild(pixie);
        Application.start();
        pixie.state.addListener({
          complete:function (entry) {
            Application.stop();
            self.$nextTick(()=>{
              self.close();
            })

          }
        });
        Application.ticker.add(function() {
          postition -= 10;
          background.x = -(postition * 0.6);
          background.x %= 1286 * 2;
          if(background.x < 0)
          {
            background.x += 1286 * 2;
          }
          background.x -= 1286;

          background2.x = -(postition * 0.6) + 1286;
          background2.x %= 1286 * 2;
          if(background2.x < 0)
          {
            background2.x += 1286 * 2;
          }
          background2.x -= 1286;

          foreground.x = -postition;
          foreground.x %= 1286 * 2;
          if(foreground.x < 0)
          {
            foreground.x += 1286 * 2;
          }
          foreground.x -= 1286;

          foreground2.x = -postition + 1286;
          foreground2.x %= 1286 * 2;
          if(foreground2.x < 0)
          {
            foreground2.x += 1286 * 2;
          }
          foreground2.x -= 1286;
        })
      }
    }
  }
</script>

<style scoped>
  .btn{
    padding: 0.2rem 0.5rem;
    position: absolute;
    bottom: -1rem;
  }
</style>
