<template>
    <div id="app">
        <topbar/>
        <div :class="showFlooter?'page_wrap':'page_notext' ">
            <router-view></router-view>
        </div>
        <footerbar v-if="showFlooter"/>
    </div>
</template>

<script>
import topbar from "../components/top";
import footerbar from "../components/footer";

export default {
    name: "App",
    data() {
        return {
            showFlooter: true
        };
    },
    components: {
        topbar,
        footerbar
    },
    watch: {
        $route: "getPath"
    },
    created() {
        if (this.$route.path == "/resources/zydetails" ||this.$route.path ==  '/operating/shunt/fl_details') {
            this.showFlooter = false;
        }
    },
    mounted() {},
    methods: {
        getPath() {
            if (this.$route.path == "/resources/zydetails" ||this.$route.path ==  '/operating/shunt/fl_details' ) {
                this.showFlooter = false;
            }
        }
    }
};
</script>

<style scoped lang='scss'>
.page_wrap {
    // padding-top: 0.7%;
    // width: 1280px;
    min-height: calc(100% - 206px);
    width: 100%;
    // margin: 0 auto;
}
.page_notext {
    height: calc(100% - 64px);
}
</style>
<style scoped>
</style>
