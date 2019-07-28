<template>
    <div class="pages">
        <h1 class="new_title" id="title">{{title}}</h1>
        <div class="new_info">
            <p>
                发布时间：
                <span id="createTime">{{releaseTime}}</span>
            </p>
        </div>
        <div class="new_content">
            <p>{{text}}</p>
            <!-- <div class="right">
                <p>{{companyA}}铁塔分公司</p>
                <p>{{times}}</p>
            </div> -->
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            title:'',
            releaseTime:'',
            text:''
        };
    },
    components: {},
    created() {
        this.getInfo();
    },
    mounted() {

    },
    methods: {
        getInfo(){
            let vm = this;
            let info = {
                id:vm.$route.query.id
            }
            vm.Api.newsdetail(info).then((res) => {
                vm.title = res.result.title;
                vm.releaseTime = res.result.releaseTime;
                vm.text = res.result.text
            })

        }
    }
};
</script>

<style scoped lang='scss'>
.pages {
    width: 100%;
    background: #fff;
    padding-top: 35px;
    box-sizing: border-box;
}
.new_title {
    text-align: center;
    font-size: 20px;
    // margin-top: 35px;
    margin-bottom: 20px;
}
.new_content {
    margin-top: 36px;
    padding-bottom: 30px;
    padding-left: 60px;
    padding-right: 60px;
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
