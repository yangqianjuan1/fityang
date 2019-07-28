<template>
    <div class="page">
             <times  :show="false"/>
        <div class="area">
            <h1 class="new_title" id="title">{{textInfo.title}}</h1>
            <div class="new_info">
                <p>
                    发布时间：
                    <span id="createTime">{{textInfo.releaseTime}}</span>
                </p>
            </div>
            <div class="new_content   ">
                <p class="ql-editor" v-html="textInfo.text"></p>
            </div>
        </div>
    </div>
</template>

<script>
import times from "../../components/tableTime";
export default {
    data() {
        return {
            textInfo:{}
        };
    },
    components: {
        times
    },
    created() {
        this.getInfo();
    },
    mounted() {},
    methods: {
        getInfo(){
            let vm = this;
            vm.loadingOpen();
            let info = {
                id:vm.$route.query.id
            }
            vm.Api.newsdetail(info).then((res) => {
                vm.loadingClose();
                vm.textInfo = res.result;
            })

        }
    }
};
</script>

<style scoped lang='scss'>
.page {
    padding-top: 0.7%;
    width: 1280px;
    margin: 0 auto;
    margin-bottom: 20px;
}
.area{
    padding-top: 35px;
    background: #fff;
      min-height: 700px;
}
.new_title {
    text-align: center;
    font-size: 20px;
    margin-bottom: 20px;
}
.new_content {
    margin-top: 36px;
    padding-bottom: 30px;
    padding-left: 60px;
    padding-right: 60px;
    overflow-x: hidden;
    p {
        color: #283945;
        line-height: 28px;
        margin-bottom: 10px;
        font-size: 16px;
        text-indent: 25px;
        text-indent: 35px;
        font-weight: 500;
    }
}
.new_info {
    text-align: center;
    color: #657580;
    font-size: 14px;
}
.right {
    float: right;
    margin-top: 40px;
}
</style>
