<template>
    <div class="title">
        <div class="news-left-block"></div>
        <div class="news-title">
            <p>{{title}}</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    props: {
        title: {
            type: String,
            required: false
        }
    },
    components: {},
    created() {},
    mounted() {},
    methods: {}
};
</script>

<style scoped lang='scss'>
.title {
    height: 52px;
}
.news-left-block {
    float: left;
    width: 6px;
    height: 16px;
    background: #0070c9;
    margin-left: 16px;
    margin-top: 20px;
}

.news-title {
    float: left;
    width: calc(100% - 0.7% - 0.7% - 6px - 16px);
    margin-left: 0.7%;
    margin-right: 0.7%;
    border-bottom: 1px solid #e4ebf0;
}
.news-title > p {
    cursor: default;
    float: left;
    font-size: 16px;
    color: #222637;
    margin-top: 17px;
    margin-left: 8px;
    margin-bottom: 13px;
}
</style>
