<template>
  <div >
    <contain style="text-align: center;padding: 1.125rem 0.5rem;" class="Course borAshow">
      <h1>以太币钱包注册登录以及绑定教程</h1>
      <p>以太钱包网址：</p>
      <p> <a>http://www.myetherwallet.com </a></p>
      <p>首先是创建钱包 </p>
      <p>第一步：进入界面，设置一个密码，这个密码是用于登录钱包用的。如图</p>
      <img src="../../assets/img/curose/curose_1.png">
      <P>第二步：下载密钥文件（UTC开头的一个文档），这个文件千万不要丢掉了，这是你开启钱包的密钥文件，必须有这个才能开启钱包。</P>
      <img src="../../assets/img/curose/curose_2.png">
      <p>只需要两步，钱包就注册好了。</p>
      <div class="line"></div>
      <p>下来就是如何登录钱包。</p>
      <p>第一步：点击【发送以太币/发送代币】</p>
      <p>第二步：使用【Keystore File (UTC / JSON)】登录，然后 【选择钱包文件】，找到那个你之前保存的UTC开头的文档 ，输入你之前设置的
        密码，点击【解锁】。</p>
      <img src="../../assets/img/curose/curose_3.png">
      <P>账号绑定：</P>
      <P>第一步：登录钱包，复制账户右边的账户地址</P>
      <img src="../../assets/img/curose/curose_4.png">
      <p>第二步：返回绑定界面，选择“已有以太账户”，将复制的账户地址粘贴进去，点击“绑定钱包”即可。</p>
      <img src="../../assets/img/curose/curose_5.png">
    </contain>
    <foot></foot>
  </div>
</template>

<script>
  import Contain from "../../components/contain";
  import Foot from "../../components/footer";
  export default{
    components: {
      Foot,
      Contain},
    name: "Course",
    data(){
      return {}
    }
  }
</script>

<style scoped>
  .Course {
    margin: 0.5rem 0.5rem;
    background: #ffffff;


  }
  h1{
    text-align: center;
    font-size: 0.5625rem;
    margin-bottom: 0.7rem;
  }
  p{
    text-align: left;
    font-size: 0.4375rem;
    color: #666666;
    line-height: 0.6rem;
  }
  img{
    width: 100%;
    margin: 0.5rem 0;
  }
  .line{
    height: 0.03125rem;
    background: #D5D7DB;
    margin: 2.34375rem 0;
  }

</style>
