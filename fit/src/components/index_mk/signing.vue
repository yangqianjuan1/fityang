<template>
    <div class="module">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="金融机构" name="1">
                <div class="img_wrap">
                    <div class="pic" v-for="(item,index) in list" :key="index">
                        <div v-if="item.type == 1">
                            <div>
                                <img :src="item.icon" alt />
                            </div>
                            <div>{{item.name}}</div>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="医疗卫生" name="2">
                <div class="img_wrap">
                    <div class="pic" v-for="(item,index) in list" :key="index">
                        <div v-if="item.type == 2">
                            <div>
                                <img :src="item.icon" alt />
                            </div>
                            <div>{{item.name}}</div>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="公安交警" name="3">
                <div class="img_wrap">
                    <div class="pic" v-for="(item,index) in list" :key="index">
                        <div v-if="item.type == 3">
                            <div>
                                <img :src="item.icon" alt />
                            </div>
                            <div>{{item.name}}</div>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="学校教育" name="4">
                <div class="img_wrap">
                    <div class="pic" v-for="(item,index) in list" :key="index">
                        <div v-if="item.type == 4">
                            <div>
                                <img :src="item.icon" alt />
                            </div>
                            <div>{{item.name}}</div>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="单位机房" name="5">
                <div class="img_wrap">
                    <div class="pic" v-for="(item,index) in list" :key="index">
                        <div v-if="item.type == 5">
                            <div>
                                <img :src="item.icon" alt />
                            </div>
                            <div>{{item.name}}</div>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="数据中心" name="6">
                <div class="img_wrap">
                    <div class="pic" v-for="(item,index) in list" :key="index">
                        <div v-if="item.type == 6">
                            <div>
                                <img :src="item.icon" alt />
                            </div>
                            <div>{{item.name}}</div>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="物业管理" name="7">
                <div class="img_wrap">
                    <div class="pic" v-for="(item,index) in list" :key="index">
                        <div v-if="item.type == 7">
                            <div>
                                <img :src="item.icon" alt />
                            </div>
                            <div>{{item.name}}</div>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeName: "1",
            list: []
        };
    },
    components: {},
    created() {
        this.get();
    },
    mounted() {},
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        },
        get() {
            let vm = this;
            let info = {
                pageNum: 1,
                pageSize: 1000
            };
            vm.Api.saveOrUpdate(info).then(res => {
                console.log(res);
                vm.list = res.result.records;
            });
        }
    }
};
</script>

<style scoped lang='scss'>
.img_wrap {
    margin-top: 20px;
    margin-bottom: 20px;
    padding-bottom: 6rem;
    padding-left: 10.9rem;
    padding-right: 6.9rem;
    .pic {
        margin-left: 1.8rem;
        float: left;
        text-align: center;
        margin-right: 1.8rem;
    }
    img {
        max-height: 3rem;
        margin-bottom: 10px;
    }
}
.module {
    width: 94%;
    margin-bottom: 6rem;
    height: 280px;
    background: #fff;
}
</style>
<style scoped>
.module >>> .el-tabs__nav {
    margin-left: 210px;
    margin-top: 20px;
}
.module >>> .el-tabs__item {
    font-size: 16px;
    color: #222637;
    font-weight: 600;
    cursor: pointer;
}
</style>
