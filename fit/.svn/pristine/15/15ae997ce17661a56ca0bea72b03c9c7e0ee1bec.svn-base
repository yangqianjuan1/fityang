<template>
    <div class="module">
        <div class="wrap left">
            <div class="news-left-block"></div>
            <div class="news-title" style="border:none">
                <p>资讯中心</p>
                <div class="clearfix"></div>
            </div>

            <ul class="news-content">
                <li v-for="(item,index) in list" @click="gotoDetails(item.id)" :key="index">
                    <p class="news-info">{{item.title}}</p>
                    <p class="news-date">{{item.releaseTime}}</p>
                    <div class="clearfix"></div>
                </li>
            </ul>
        </div>
        <div class="wrap right">
            <div class="news-left-block"></div>
            <div class="news-title" style="border:none">
                <p>信息下载中心</p>
                <div class="clearfix"></div>
            </div>
            <ul class="news-content">
                <li v-for="(item,index) in nDownlist" :key="index">
                     <a
                        :href="item.address"
                        target="view_window1"
                    >
                        <p class="news-info">{{item.title}}</p>
                        <p class="news-date">{{item.time}}</p>
                    </a>
                </li>
                <!-- <li>
                    <a
                        href="http://www.baoxingtech.com:8989/file/af313561-e892-4fe0-aa02-8820f1032238.pdf
                        "
                        target="view_window1"
                    >
                        <p class="news-info">DTU功能说明</p>
                        <p class="news-date">2019-05-27 14:13</p>
                    </a>

                    <div class="clearfix"></div>
                </li>
                <li>
                    <a
                        href=" http://www.baoxingtech.com:8989/file/6503d082-9141-4b54-87b8-4f45bbb6c726.pdf"
                        target="view_window2"
                    >
                        <p class="news-info">普通型阀控式密封铅酸蓄电池质量检测标准</p>
                        <p class="news-date">2019-05-27 15:41</p>
                    </a>

                    <div class="clearfix"></div>
                </li>
                <li>
                    <a
                        href="http://www.baoxingtech.com:8989/file/95d436bb-4d75-483c-aa16-52393ae448dc.pdf"
                        target="view_window3"
                    >
                        <p class="news-info">梯次电池技术及服务规范</p>
                        <p class="news-date">2019-05-27 17:08</p>
                    </a>

                    <div class="clearfix"></div>
                </li> -->
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            list: [],
            nDownlist:[],
        };
    },
    components: {},
    created() {
        this.get();
        this.getwInformationDown();
    },
    mounted() {},
    methods: {
        get() {
            let vm = this;
            let info = {
                type: 1, // 0-签约快讯(带合同的) 1-新闻  2-公告 3-资讯 4签约快讯(不带合同的)
                pageNum: 1,
                pageSize: 3
            };
            vm.Api.newshomeListl(info).then(res => {
                vm.list = res.result.records;
            });
        },
        getwInformationDown() {
            let vm = this;
            let info = {
                pageNum: 1,
                pageSize: 3
            };
            vm.Api.wInformationDown(info).then(res => {
                vm.nDownlist = res.result.records;
            });
        },
        gotoDetails(id) {
            let vm = this;
            vm.$router.push({
                path: "details",
                query: {
                    id: id
                }
            });
        }
    }
};
</script>

<style scoped lang='scss'>
.module {
    margin-top: 1.5rem;
    height: 161px;
    .wrap {
        margin-right: 1%;
        height: 100%;
        background: #fff;
        float: left;
    }
    .left {
        width: 48%;
    }
    .right {
        width: 45.1%;
    }
}

.news-left-block {
    float: left;
    width: 0.4rem;
    height: 1.1rem;
    background: #0070c9;
    margin-left: 0.7%;
    margin-right: 0.7%;
    margin-top: 12px;
}
.news-content li > .news-info:hover {
    color: #0070c9;
}
.news-content {
    padding-top: 10px;
    padding-bottom: 10px;
    li {
        height: 40px;
    }
    p {
        cursor: default;
        float: left;
        font-size: 16px;
        color: #222637;
        margin-left: 5px;
    }
    .news-info {
        float: left;
        cursor: pointer;
        width: 50%;
        margin-left: 1.8%;
        font-size: 0.9rem;
        color: #283945;
        line-height: 40px;
    }
    .news-date {
        float: right;
        cursor: pointer;
        margin-right: 1.5%;
        font-size: 14px;
        color: #acb7bf;
        line-height: 40px;
    }
}
.news-title {
    float: left;
    width: calc(100% - 0.7% - 2% - 0.7% - 0.4rem);
    margin-left: 0.7%;
    margin-right: 0.7%;
    li {
        cursor: pointer;
    }
    p {
        cursor: default;
        float: left;
        font-size: 16px;
        color: #222637;
        margin-top: 10px;
        margin-left: 5px;
        margin-bottom: 10px;
    }
    .news-info {
        float: left;
        width: 50%;
        margin-left: 1.8%;
        font-size: 0.9rem;
        color: #283945;
        line-height: 40px;
    }
    .news-content .news-date {
        float: right;
        margin-right: 1.5%;
        font-size: 14px;
        color: #acb7bf;
        line-height: 40px;
    }
}
</style>

