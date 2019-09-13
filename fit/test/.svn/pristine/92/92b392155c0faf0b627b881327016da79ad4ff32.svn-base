/**
 * Created by zhengzhiyang on 2017/10/9.
 */
const common={
  // svgApi: "http://192.168.2.22:9999/horse.svg?key=",
  // svgApi: "http://59.111.89.37/horse.svg?key=",
  // svgApi: "http://192.168.2.172/horse.svg?key=",
  svgApi: "https://tiger-game.oss-cn-shanghai.aliyuncs.com/",
  maxBeautyContest : 30,
  isNumber:function(val){
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
  filterPositiveInteger:function (val,tipsFuc){
    if(!this.isNumber(val)){
      tipsFuc('请输入数字');
      return false
    };
    let type="^[0-9]*[1-9][0-9]*$";
    let r=new RegExp(type);
    let flag=r.test(val);
    if(!flag){
      tipsFuc('请输入正整数');
      return false;
    }else{
      return true
    }
}
} ;
export default common;
