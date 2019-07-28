<template>
    <div class="update_time">
        <div class="nv_bai">
            位置：
            <el-breadcrumb>
                <el-breadcrumb-item
                    v-for="(item,index) in levelList"
                    :key="index"
                    :to="{ path: item.path == ''? '/':item.path  }"
                >{{item.name}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <p v-if="show"  style="margin-right: 7%;">
            数据更新于
            <span>{{time}}</span>
        </p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            levelList: []
        };
    },
    watch: {
        // $route() {
        //     this.getBreadcrumb();
        // }
    },
    props: {
        time: {
            type: String,
            required: false
        },
        show:{
            type:Boolean,
            required: false,
            default:true
        }
    },
    created() {
        this.getBreadcrumb(); //刷新的参数为true
    },
    mounted() {},
    methods: {
        getBreadcrumb(isreload) {
            let vm = this;

            vm.levelList = [];
            let data = vm.$route.matched;
            for (let i = 0; i < data.length; i++) {
                if (data[i].name) {
                    let one = {
                        name: data[i].name,
                        path: data[i].path
                    };
                    vm.levelList.push(one);
                }
            }
            // console.log(vm.$route.matched);
        }
    }
};
</script>

<style scoped lang='scss'>
.update_time {
    text-align: right;
    color: #acb7bf;
    overflow: hidden;
}
.nv_bai{
    float: left;
    margin-bottom: 10px;
    // line-height: 10px;
}
.el-breadcrumb{
    display: inline-block;
        line-height: 10px;
}
</style>
