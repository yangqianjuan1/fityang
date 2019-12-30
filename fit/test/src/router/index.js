import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/'
Vue.use(Router)
const logo = r => require.ensure([], () => r(require('../page/login/logo.vue')), 'logo'); //登陆页
const login = r => require.ensure([], () => r(require('../page/login/login.vue')), 'login'); //登陆
const autologin = r => require.ensure([], () => r(require('../page/login/autologin.vue')), 'autologin'); //渠道自动登陆
const register = r => require.ensure([], () => r(require('../page/login/register.vue')), 'register'); //绑定手机
const findSecret = r => require.ensure([], () => r(require('../page/login/findSecret.vue')), 'findSecret'); //找回密码
const index = r => require.ensure([], () => r(require('../page/index/index.vue')), 'index'); //主页
const exchange = r => require.ensure([], () => r(require('../page/transaction/exchange.vue')), 'exchange'); //交易所
const transaction = r => require.ensure([], () => r(require('../page/transaction/transaction.vue')), 'transaction'); //交易
const transactionRecord = r => require.ensure([], () => r(require('../page/transaction/transactionRecord.vue')), 'transactionRecord'); //交易
// const auction = r => require.ensure([], () => r(require('../page/transaction/auction.vue')), 'auction');//拍卖
// const toolAuction = r => require.ensure([], () => r(require('../page/transaction/toolAuction.vue')), 'toolAuction');//道具拍卖
const help = r => require.ensure([], () => r(require('../page/help/help.vue')), 'help'); //帮助
// const notice = r => require.ensure([], () => r(require('../page/Notice/Notice.vue')), 'notice');//公告
const buyDetail = r => require.ensure([], () => r(require('../page/tigerDetail/buyDetail.vue')), 'buyDetail'); //购买详情
const tigerDetail = r => require.ensure([], () => r(require('../page/tigerDetail/tigerDetail.vue')), 'tigerDetail'); //我的虎详情
const user = r => require.ensure([], () => r(require('../page/userInfo/user.vue')), 'user'); //我的账户
// const horseList = r => require.ensure([], () => r(require('../page/userInfo/tigerList.vue')), 'tigerList');//我的马list
// const recodeList = r => require.ensure([], () => r(require('../page/userInfo/recodeList.vue')), 'recodeList');//收支记录

const competition = r => require.ensure([], () => r(require('../page/Match/competition.vue')), 'competition'); //竞猜
const list = r => require.ensure([], () => r(require('../page/Match/list.vue')), 'list'); //竞猜列表
const record = r => require.ensure([], () => r(require('../page/Match/record.vue')), 'record'); //竞猜记录
const myCompetition = r => require.ensure([], () => r(require('../page/Match/mycompetition.vue')), 'mycompetition'); //开盘
const fuse = r => require.ensure([], () => r(require('../page/fuse/fuse.vue')), 'fuse'); //融合
const upgrade = r => require.ensure([], () => r(require('../page/fuse/upgrade.vue')), 'upgrade'); //升级
const tigers = r => require.ensure([], () => r(require('../page/tigers/tigers.vue')), 'tigers'); //捕虎

const activity = r => require.ensure([], () => r(require('../page/activity/activity.vue')), 'activity'); //活动
const sellTiger = r => require.ensure([], () => r(require('../page/activity/sellTiger.vue')), 'sellTiger'); //官方卖虎
// const wmbt = r => require.ensure([], () => r(require('../page/activity/wmbt.vue')), 'wmbt');//万马奔腾
// const hrlx = r => require.ensure([], () => r(require('../page/activity/hrlx.vue')), 'hrlx');//火热来袭
// const chest = r => require.ensure([], () => r(require('../page/activity/chest.vue')), 'chest');//开宝箱
// const worldCup = r => require.ensure([], () => r(require('../page/activity/worldCup.vue')), 'worldCup');//世界杯
// const worldCup_4 = r => require.ensure([], () => r(require('../page/activity/worldCup_4.vue')), 'worldCup_4');//世界杯四强
// const battle = r => require.ensure([], () => r(require('../page/activity/battle.vue')), 'battle');//性格
// const qixi = r => require.ensure([], () => r(require('../page/activity/qixi.vue')), 'qixi');//七夕
// const moc = r => require.ensure([], () => r(require('../page/activity/moc.vue')), 'moc');//moc
const Release = r => require.ensure([], () => r(require('../page/activity/Release/Release.vue')), 'Release'); //放生
const menHu = r => require.ensure([], () => r(require('../page/activity/Release/menHu.vue')), 'menHu'); //放生猛虎专区
const shenHu = r => require.ensure([], () => r(require('../page/activity/Release/shenHu.vue')), 'shenHu'); //放生神虎专区
// const shop = r => require.ensure([], () => r(require('../page/shop/shop.vue')), 'shop');//商店
// const pps = r => require.ensure([], () => r(require('../page/activity/pps.vue')), 'pps');//空投
const Ranking = r => require.ensure([], () => r(require('../page/Ranking/Ranking.vue')), 'Ranking'); //排行榜
const joinFamily = r => require.ensure([], () => r(require('../page/family/joinFamily.vue')), 'joinFamily'); //加入联盟

const inviteFamily = r => require.ensure([], () => r(require('../page/invite/invite-family.vue')), 'invite-family'); //联盟邀请


const disposition = r => require.ensure([], () => r(require('../page/disposition/disposition.vue')), 'disposition'); //pk
const hunting = r => require.ensure([], () => r(require('../page/hunting/hunting.vue')), 'hunting'); //逐鹿
const huntingList = r => require.ensure([], () => r(require('../page/hunting/huntingList.vue')), 'huntingList'); //逐鹿参加
const huntingRecord = r => require.ensure([], () => r(require('../page/hunting/huntingRecord.vue')), 'huntingRecord'); //逐鹿记录
const huntingCompetition = r => require.ensure([], () => r(require('../page/hunting/huntingCompetition.vue')), 'huntingCompetition'); //逐鹿记录
const competitionRecord = r => require.ensure([], () => r(require('../page/hunting/competitionRecord.vue')), 'competitionRecord'); //逐鹿记录

const zhulu = r => require.ensure([], () => r(require('../page/zhulu/zhulu.vue')), 'zhulu'); //逐鹿场地

const dispositionList = r => require.ensure([], () => r(require('../page/disposition/dispositionList.vue')), 'dispositionList'); //pk参赛列表
const dispositionRecord = r => require.ensure([], () => r(require('../page/disposition/dispositionRecord.vue')), 'dispositionRecord'); //pk参赛记录


const fomo3d = r => require.ensure([], () => r(require('../page/fomo3d/fomo3d.vue')), 'fomo3d'); //fomo3d
const fomo3dList = r => require.ensure([], () => r(require('../page/fomo3d/fomo3dList.vue')), 'fomo3dList'); //fomo3d参赛
const fomo3dRecord = r => require.ensure([], () => r(require('../page/fomo3d/fomo3dRecord.vue')), 'fomo3dRecord'); //fomo3d参赛记录
const fomo3dHistory = r => require.ensure([], () => r(require('../page/fomo3d/fomo3dHistory.vue')), 'fomo3dHistory'); //fomo3d开奖记录

const router = new Router({
    routes: [{
            path: '/logo',
            name: 'logo',
            component: logo,
            meta: { noFoot: true, free: true, back: true },
            redirect: {
                name: 'register'
            },
            children: [{
                    path: '/login',
                    name: 'login',
                    component: login,
                    meta: { noFoot: true, free: true, back: true },
                },
                {
                    path: '/logo/register',
                    name: 'register',
                    component: register,
                    meta: { noFoot: true, free: true, back: true },
                },
                {
                    path: '/logo/findSecret',
                    name: 'findSecret',
                    component: findSecret,
                    meta: { noFoot: true, free: true, back: true },
                },
                {
                    path: '/autologin',
                    name: 'autologin',
                    component: autologin,
                    meta: { noFoot: true, free: true, back: true },
                },
            ]
        },
        {
            path: '/exchange',
            name: 'exchange',
            component: exchange,
            redirect: { name: 'transaction' },
            meta: { index: 0, FootBall: true },
            children: [{
                    path: '/transaction',
                    name: 'transaction',
                    component: transaction,
                    meta: { index: 1, isTransition: true, FootBall: true, keepAlive: false }
                },
                {
                    path: '/transactionRecord',
                    name: 'transactionRecord',
                    component: transactionRecord,
                    meta: { index: 1, isTransition: true, FootBall: true }
                },
            ],
        },
        {
            path: '/help',
            name: 'help',
            component: help,
            meta: { free: true }
        },
        {
            path: '/buyDetail',
            name: 'buyDetail',
            component: buyDetail,
        },
        {
            path: '/tigerDetail',
            name: 'tigerDetail',
            component: tigerDetail,
        },
        {
            path: '/user',
            name: 'user',
            component: user,
            meta: { index: 5, title: true, keepAlive: false }
        },
        {
            path: '/competition',
            name: 'competition',
            component: competition,
            meta: { index: 4, FootBall: true, isCompetition: true },
            redirect: { name: 'list' },
            children: [{
                    path: '/competition/list',
                    name: 'list',
                    component: list,
                    meta: { index: 4, competitionIndex: 0, FootBall: true, isCompetition: true }
                },
                {
                    path: '/competition/record',
                    name: 'record',
                    component: record,
                    meta: { index: 4, competitionIndex: 1, FootBall: true, isCompetition: true }
                },
                {
                    path: '/competition/myCompetition',
                    name: 'myCompetition',
                    component: myCompetition,
                    meta: { index: 4, competitionIndex: 2, FootBall: true, isCompetition: true }
                },
            ]
        },

        {
            path: '/tigers',
            name: 'tigers',
            component: tigers,
            meta: { index: 3, FootBall: true }
        },
        {
            path: '/fuse',
            name: 'fuse',
            component: fuse,
            meta: { index: 0 }
        },
        {
            path: '/upgrade',
            name: 'upgrade',
            component: upgrade,
            meta: { index: 0 }
        },
        {
            path: '/activity',
            name: 'activity',
            component: activity,
            meta: { free: true, index: 6 },
        },
        {
            path: '/activity/sellTiger',
            name: 'sellTiger',
            component: sellTiger,
            meta: { index: 6 },
        },
        {
            path: '/hunting',
            name: 'hunting',
            component: hunting,
            redirect: { name: 'huntingList' },
            children: [{
                    path: '/hunting/list',
                    name: 'huntingList',
                    component: huntingList,
                    meta: { index: 7 },
                },
                {
                    path: '/hunting/record',
                    name: 'huntingRecord',
                    component: huntingRecord,
                    meta: { index: 7 },
                },
                {
                    path: '/hunting/competition',
                    name: 'huntingCompetition',
                    component: huntingCompetition,
                    meta: { index: 7 },
                },
                {
                    path: '/hunting/competitionRecord',
                    name: 'competitionRecord',
                    component: competitionRecord,
                    meta: { index: 7 },
                },
            ]
        },
        {
            path: '/',
            component: activity,
            name: 'activity',
            component: activity,
            redirect: { name: 'activity' },
        },
        {
            path: '/fomo3d',
            name: 'fomo3d',
            component: fomo3d,
            redirect: { name: 'fomo3dList' },
            children: [{
                    path: '/fomo3d/fomo3dList',
                    name: 'fomo3dList',
                    component: fomo3dList,
                    meta: { index: 8, Fomo3D: true },
                },
                {
                    path: '/fomo3d/fomo3dRecord',
                    name: 'fomo3dRecord',
                    component: fomo3dRecord,
                    meta: { index: 8, Fomo3D: true },
                },
                {
                    path: '/fomo3d/fomo3dHistory',
                    name: 'fomo3dHistory',
                    component: fomo3dHistory,
                    meta: { index: 8, Fomo3D: true },
                },
            ]
        },
        {
            path: '/disposition',
            name: 'disposition',
            component: disposition,
            meta: { index: 7, isDisposition: true },
            redirect: { name: 'dispositionList' },
            children: [{
                    path: '/disposition/list',
                    name: 'dispositionList',
                    component: dispositionList,
                    meta: { index: 7 },
                },
                {
                    path: '/disposition/record',
                    name: 'dispositionRecord',
                    component: dispositionRecord,
                    meta: { index: 7 },
                },
            ]
        },
        {
            path: '/activity/Release',
            name: 'Release',
            component: Release,
            meta: { index: 6, Release: true },
            redirect: { name: 'menHu' },
            children: [{
                    path: '/activity/Release/menHu',
                    name: 'menHu',
                    component: menHu,
                    meta: { index: 6, Release: true },
                },
                {
                    path: '/activity/Release/shenHu',
                    name: 'shenHu',
                    component: shenHu,
                    meta: { index: 6, Release: true },
                },
            ]
        },
        {
            path: '/ranking',
            name: 'ranking',
            component: Ranking,
        },
        {
            path: '/joinFamily',
            name: 'joinFamily',
            component: joinFamily,
        },
        {
            path: '/inviteFamily',
            name: 'inviteFamily',
            component: inviteFamily,
        },
        {
            path: "/zhulu",
            name: 'zhulu',
            component: zhulu,
            meta: { notice: false }
        }
    ]
});
export default router