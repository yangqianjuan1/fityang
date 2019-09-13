/**
 * Created by zhengzhiyang on 2017/10/9.
 */
const noBalanceArr=['E02125','E03102','E03301','E03304','E04004','E04100','E04107','E04202','E04302','E11003','E51002'];//余额不足code
const error ={
  install(Vue, options) {
    Vue.prototype.$get_error= function(type=0,Code=0,Message=0,parm){
      for( let item of noBalanceArr){
        if(Code===item){
          return this.$noBalance()
        }
      }
      if(Code==="E95013")
      {//提现余额不足
        let props={
          value:true,
          title:'余额不足!',
          type:1
        };
       return  this.$comFire(props);
      }
      if(Code ==='E0006'){
        this.$router.push({name:'login'});
      return 'login'
    } else{
      if(type)
      {

        if(type ==='reload')
        {

          this.$tips('网络错误，请稍后重试',2000);
        }
        if(type ==='network')
        {

          this.$tips('网络错误，请稍后重试',2000);
        }
        if(type ==='tips'){
          this.$tips(Message,2000);
        }
      }
      }
    };
  }
};

export default error;
