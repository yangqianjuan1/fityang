<template>
  <div class="spine">
    <my-dialog :dialogOpen="spine">
      <div class="ct" style="width:10rem;height: 10rem;">
        <spine-tiger  v-for="item in battle.Fragments" :Info="item.myHorseImg"  key="img" style="width: 3.5rem;position: absolute;left: 0;top: 0;" :type="4" class="myTiger"></spine-tiger>
        <spine-tiger v-for="item in battle.Fragments" :Info="item.enemyHorseImg"  key="img" style="width: 3.5rem;position: absolute;left: 0;top: 0;" :type="4" class="enemyTiger"></spine-tiger>
        <div id="show"style="width:10rem;height: 10rem;position: absolute;left: 0;top: 0;z-index: 100;color: #fff8fd; background: #000000">
          <p class="takeCenter" v-if="progress!=='100%'" style="font-size: 0.5rem">...载入中{{progress}}</p>
          <button @click="close" class="btn-yellow btn cl" >跳过动画</button>
        </div>
      </div>
    </my-dialog>
  </div>
</template>

<script>
  import MyDialog from "../dialog";
  import TigerInfo from "../tigerInfo";
  import SpineTiger from "./spineTiger";
  const rem = document.documentElement.style.fontSize.split('px')[0]*2;
  export default{
    components: {
      SpineTiger,
      TigerInfo,
      MyDialog,
    },
    name: "spine",
    props:{
      battle:{

      },
    },
    data(){

      return {
        spine:true,
        myRound:true,
        enemyRound:false,
        myCurHP:100,
        enemyCurHP:100,
        progress:'0%',
        canvasWidth:0,
        canvasHeight:0,
        hitAction:['baoji','putong_baodian','miss','shandian_shouji'],
        Application:null,
        myImgList:[],
        enemyImgList:[],
      }
    },
    mounted(){
      setTimeout(()=>{
        this.getImage();
      },1000)
    },

    methods:{
      close:function () {
        this.toDestroy();
        this.spine = false;
      },
      toDestroy:function () {
        if(this.Application !==null)
        {
          this.Application.destroy();
        }
      },
      getImage:function () {
        let self = this;
        let myImg = document.getElementsByClassName('myTiger');
        let enemyImg = document.getElementsByClassName('enemyTiger');

        for(let index in myImg) {
          html2canvas(myImg[index], {backgroundColor: null, useCORS: true,async:false}).then(function (canvas) {
            self.myImgList[index] = canvas.toDataURL('image/png');
          })
        }
        for(let index in enemyImg) {
          html2canvas(enemyImg[index], {backgroundColor: null, useCORS: true,async:false}).then(function (canvas) {
            self.enemyImgList[index] = canvas.toDataURL('image/png');
          })
        }
     self.Init()
      },

      async wholeBattle( start,win,lose,my,enemy,Application,myTextureList,enemyTextureList){//完整战斗 多对多
        Application.start();
        try{
          await this.gameStart(start,Application);
          for( let index in this.battle.Fragments){
            let myTexture,enemyTexture;
            myTexture =  PIXI.Texture.fromImage(this.myImgList[index]);
            enemyTexture =  PIXI.Texture.fromImage(this.enemyImgList[index]);
            this.changeHorse(my,myTexture);
            this.changeHorse(enemy,enemyTexture);
            await new Promise((resolve, reject)=>{
              setTimeout(resolve,50)
            })
            if(index>0){
              Application.stage.children.splice(Application.stage.children.length-4,4);
            }
            this.addNoText('#'+this.battle.Fragments[index].myHorseImg.HorseNo,Application,'my');
            this.addNoText('#'+this.battle.Fragments[index].enemyHorseImg.HorseNo,Application,'enemy');
            await this.oneBattle(my,enemy,Application,this.battle.Fragments[index].myAction,this.battle.Fragments[index].enemyAction);
            await new Promise((resolve, reject)=>{
              setTimeout(resolve,1000)
            })
          }
          if(this.battle.GameResult===1){
            await  this.gameWin(win,Application)
          }else{
            await  this.gameLose(lose,Application)
          }

        }catch(res){
          console.log(res)
        }

      },
      addNoText:function (No,Application,type) {
        let style = new PIXI.TextStyle({
          fontFamily: 'Arial',
          fontSize: 0.32*rem,
          fontStyle: 'italic',
          fill: ['#ffffff', '#ffffff'], // gradient
        });
        let richText = new PIXI.Text(No, style);
        richText.x = this.canvasWidth/2-richText.width/2;
        if(type==='my'){
          richText.y =this.canvasHeight- 1*rem-richText.height;
        }
        else{
          richText.y = 1*rem;
        }
        Application.stage.addChild(richText);
      },
      async oneBattle( my,enemy,Application,myAction,enemyAction) {//单对单战斗
        try {
          for(let index in myAction){
            if(index>0){
              Application.stage.children.splice(Application.stage.children.length-2,2)
            }
            let mySprite = this.newMySprite(my);
            let enemySprite = this.newEnemySprite(enemy);

            if(this.hitAction.indexOf(myAction[index].move)!==-1){
              Application.stage.addChild(mySprite);
              Application.stage.addChild(enemySprite);
              await this.oneAttack(enemySprite,enemyAction[index].move,mySprite,myAction[index].move,Application);
              this.myCurHP = myAction[index].hp;
            }
            else{
              Application.stage.addChild(enemySprite);
              Application.stage.addChild(mySprite);
              await this.oneAttack(mySprite,myAction[index].move,enemySprite,enemyAction[index].move,Application)
              this.enemyCurHP = enemyAction[index].hp
            }
          }
        }catch(res) {
          console.log(res)
        }

      },
      gameStart:function (start,Application) {
        return new Promise((resolve, reject) =>{
          let startSprite = new PIXI.spine.Spine(start);
          startSprite.x = this.canvasWidth/2;
          startSprite.y = this.canvasHeight/2;
          startSprite.width = 8*rem;
          startSprite.height =startSprite.width / (522/140);
          startSprite.state.setAnimation(0, 'battle_star', false, 0);
          Application.stage.addChild(startSprite);
          startSprite.state.addListener({
            complete:function (entry) {
              resolve('start');
            }
          });
        })

      },
      gameLose:function (win,Application) {
        return new Promise((resolve, reject) =>{
          let loseSprite = new PIXI.spine.Spine(win);
          loseSprite.x = this.canvasWidth/2;
          loseSprite.y = this.canvasHeight/2;
          loseSprite.width = 8*rem;
          loseSprite.height =loseSprite.width / (750/236);
          loseSprite.state.setAnimation(0, 'battle_lose', false, 0);
          Application.stage.addChild(loseSprite);
          loseSprite.state.addListener({
            complete:function (entry) {
              resolve('win');
            }
          });
        })

      },
      changeHorse:function (spineData,Texture) {
        spineData.skins[0].attachments[0].xiaohu.region.texture = Texture;
        spineData.skins[0].attachments[1].xiaohu.region.texture = Texture;
        spineData.skins[0].attachments[2].xiaohu.region.texture = Texture;
        spineData.skins[0].attachments[3].xiaohu.region.texture = Texture;
      },
      gameWin:function (win,Application) {
        return new Promise((resolve, reject) =>{
          let winSprite = new PIXI.spine.Spine(win);
          winSprite.x = this.canvasWidth/2;
          winSprite.y = this.canvasHeight/2;
          winSprite.width = 8*rem;
          winSprite.height =winSprite.width / (750/512);
          winSprite.state.setAnimation(0, 'battle_win', false, 0);
          Application.stage.addChild(winSprite);
          winSprite.state.addListener({
            complete:function (entry) {
              resolve('win');
            }
          });
        })

      },
      oneAttack:  function (attack,attackAction,defense,defenseAction,Application) {
        return new Promise((resolve, reject) =>{
          attack.state.setAnimation(0, attackAction, false, 0);
          attack.state.addListener({
            event: function(entry, event) {
              defense.state.setAnimation(0, defenseAction, false, 0);
            },
          });

          defense.state.addListener({
            complete:function (entry) {
              resolve('one attack finish');
            }
          });
        })
      },
      newMySprite:function (spineData) {
        let my = new PIXI.spine.Spine(spineData);
        my.x = this.canvasWidth/2;
        my.width = 3*rem;
        my.height = 3*rem;
        my.y = this.canvasHeight- my.height;
        my.state.timeScale = 1;
        return my
      },
      newEnemySprite:function (spineData) {
        let enemy = new PIXI.spine.Spine(spineData);
        enemy.x = this.canvasWidth/2;
        enemy.width = 3*rem;
        enemy.height = 3*rem;
        enemy.y = enemy.height;
        enemy.state.timeScale = 1;
        return enemy
      },
      myHP:function (HPTexture,Application) {
        let HP = new PIXI.Sprite(HPTexture);
        HP.height = 0.3*rem;
        HP.width = 1.8*rem;
        HP.x = this.canvasWidth/2-HP.width/2;
        HP.y =this.canvasHeight- 0.6*rem- HP.height;
        Application.stage.addChild(HP);
        return HP

      },
      enemyHP:function (HPTexture,Application) {

        let HP = new PIXI.Sprite(HPTexture);
        HP.height = 0.3*rem;
        HP.width = 1.8*rem;
        HP.x = this.canvasWidth/2-HP.width/2;
        HP.y = 0.6*rem;
        Application.stage.addChild(HP);
        return HP
      },
      loadProgressHandler:function (loader,Application)  {
        this.progress = (loader.progress | 0) + "%"
      },
      loadingSuccess:function (loader, resources,Application) {
        //己方血条
        let self = this;
        self.myHP(loader.resources['HP1'].texture,Application);
        let hp2 =   self.myHP(loader.resources['HP2'].texture,Application);
        hp2.x = self.canvasWidth/2-hp2.width/2+0.2*rem;
        hp2.width = 1.6*rem;
        self.myHP(loader.resources['HP3'].texture,Application);

        //敌方血条
        self.enemyHP(loader.resources['HP1'].texture,Application);
        let enemyhp2 =   self.enemyHP(loader.resources['HP2'].texture,Application);
        enemyhp2.x = self.canvasWidth/2-enemyhp2.width/2+0.2*rem;
        enemyhp2.width = 1.6*rem;
        self.enemyHP(loader.resources['HP3'].texture,Application);

        let fullMyHp = hp2.width;
        let fullEnemyHp = enemyhp2.width;
        Application.ticker.add(function() {
          if(hp2.width >(self.myCurHP*fullMyHp/100)) {

            hp2.width = hp2.width-4
          }else if(self.myCurHP===100){
            hp2.width = fullMyHp;
          }
          if(enemyhp2.width >(self.enemyCurHP*fullEnemyHp/100)) {
            enemyhp2.width = enemyhp2.width-4
          }else if(self.enemyCurHP===100){
            enemyhp2.width = fullEnemyHp;
          }
        });
        self.wholeBattle(
          resources.start.spineData,
          resources.win.spineData,
          resources.lose.spineData,
          resources.wofang.spineData,
          resources.difang.spineData,
          Application,
        );
      },
      Init: function (myList,enemyList) {

        this.canvasWidth = document.getElementById("show").offsetWidth*2;
        this.canvasHeight = document.getElementById("show").offsetHeight*2;
        let self = this;

        let Application = new PIXI.Application(this.canvasWidth, this.canvasHeight, {
          resolution: 2,
          transparent: true,
          roundPixels:true
        });
        this.Application = Application;
        let background = PIXI.Sprite.fromImage('../../../static/data/spine-bg.png');
        background.width = this.canvasWidth;
        background.height = this.canvasHeight;
        Application.stage.addChild(background);
        Application.view.style.width = document.getElementById("show").offsetWidth+'px';
        Application.view.style.height = document.getElementById("show").offsetHeight+'px';
        document.getElementById('show').appendChild(Application.view);
        Application.stop();
        if( PIXI.loader.resources.wofang){
          this.progress = '100%';
          return   self.loadingSuccess(PIXI.loader, PIXI.loader.resources,Application)
        }
        PIXI.loader.add('wofang', '../../../static/data/wofang.json');
        PIXI.loader.add('difang', '../../../static/data/difang.json');
        PIXI.loader.add('start', '../../../static/data/battle_star.json');
        PIXI.loader.add('win', '../../../static/data/battle_win.json');
        PIXI.loader.add('lose', '../../../static/data/battle_lose.json');
//        PIXI.loader.add('tiger', 'http://img3.imgtn.bdimg.com/it/u=3843701697,2314695676&fm=26&gp=0.jpg')
//        PIXI.loader.add('tiger2', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3450831534,3868299923&fm=26&gp=0.jpg')
        PIXI.loader.add('HP1', '../../../static/data/HP-1.png');
        PIXI.loader.add('HP2', '../../../static/data/HP-2.png');
        PIXI.loader.add('HP3','../../../static/data/HP-3.png')
          .on("progress", function (loader, resources)  {
            self.loadProgressHandler(loader,Application)
          })
          .load(function (loader, resources) {
            self.loadingSuccess(loader, resources,Application)
          });

      },
    }
  }
</script>

<style scoped>
  .spine {

  }
  .btn{
    padding: 0.2rem 0.5rem;
    position: absolute;
    bottom: -1rem;
  }
</style>
