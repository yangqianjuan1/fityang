<template>
    <div class="page">
        <div class="new_wrap flot bor4">
            <ul class="news-content">
                 <li v-for="(item,index) in list" :key="index" @click="goto(item.id)">
                    <p class="news-info">{{item.title}}</p>
                    <p class="news-date">{{item.releaseTime}}</p>
                </li> 
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            list:[],
        };
    },
    components: {},
    created() {
        this.getInfo();
    },
    mounted() {},
    methods: {
        getInfo(){
            let vm = this;
            let info = {
               "type":0,//文章类型  0：签约快讯
                "pageNum": 1,
                "pageSize": 20
            }
            vm.Api.newsList(info).then((res) => {
                vm.list = res.result.records;
            })

        },
        goto(id){
            console.log(window.parent.childfun(id))
            
        }
    }
};
</script>

<style scoped lang='scss'>
.page {
    margin: 0 auto;
    background: #fff;
    height: auto;
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
            margin-left: 1.8%;
            font-size: 0.9rem;
            color: #283945;
            line-height: 40px;
        }
        .news-date {
            float: right;
            cursor: pointer;
            margin-right: 8%;
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
