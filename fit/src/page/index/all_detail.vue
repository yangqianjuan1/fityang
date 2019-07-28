<template>
    <div class="page">
        <times :show="false"/>
        <div class="area">
            <div class="new_wrap  bor4">
                <ul class="news-content">
                    <li v-for="(item,index) in list" :key="index" @click="goto(item.id)">
                        <p class="news-info">{{item.title}}</p>
                        <p class="news-date">{{item.releaseTime}}</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import times from "../../components/tableTime";
export default {
    data() {
        return {
            list: []
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
        getInfo() {
            let vm = this;
            let info = {
                type: 0, //文章类型  0：签约快讯
                pageNum: 1,
                pageSize: 20
            };
            vm.Api.newsList(info).then(res => {
                vm.list = res.result.records;
            });
        },
        goto(id) {
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
.page {
    padding-top: 0.7%;
    width: 1280px;
    margin: 0 auto;
    margin-bottom: 20px;
}
.area{
    padding-top: 20px;
    background: #fff;
      min-height: 700px;
}
.new_wrap {
    background: #fff;
    height: 100%;
}
.news-content {
    padding-top: 10px;
    padding-bottom: 10px;
    li {
        height: 40px;
        width: 49%;
        display: inline-block;
        cursor: pointer;
        .news-info {
            float: left;
            width: 50%;
            margin-left: 3%;
            font-size: 14px;
            color: #283945;
            line-height: 40px;
        }
        .news-date {
            float: right;
            cursor: pointer;
            margin-right: 4%;
            font-size: 14px;
            color: #acb7bf;
            line-height: 40px;
        }
        .placed {
            background: #008eff;
            height: 18px;
            line-height: 18px;
            position: relative;
            padding: 0 6px;
            font-size: 12px;
            text-align: center;
            color: #fff;
            border-radius: 2px;
        }
    }
}
.news-content li > .news-info:hover {
    color: #0070c9;
}
</style>
