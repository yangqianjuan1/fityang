import Vue from 'vue'
import Router from 'vue-router'



Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            component: () =>
                import ("../page/index.vue"),
            children: [{
                    path: '/',
                    name: '首页',
                    component: () =>
                        import ("../page/index/index.vue"),
                    children: [{
                            path: '/',
                            component: () =>
                                import ("../page/index/homepage.vue"),
                        },
                        {
                            path: 'details',
                            name: '资讯详情',
                            component: () =>
                                import ("../page/index/new_detail.vue")
                        },
                        {
                            path: 'all_details',
                            name: '全部资讯',
                            component: () =>
                                import ("../page/index/all_detail.vue")
                        },
                    ]
                },
                {
                    path: '/',
                    component: () =>
                        import ("../page/operating/shunt/shunt.vue")
                },
                {
                    path: '/monitoring',
                    component: () =>
                        import ("../page/monitoring/index.vue"),
                    children: [{
                            path: '/',
                            name: '监控中心 - 能源生产保障',
                            component: () =>
                                import ("../page/monitoring/homePage.vue")
                        },
                        {
                            path: 'electricity',
                            name: '能源备电监控',
                            component: () =>
                                import ("../page/monitoring/electricity.vue")
                        },
                        {
                            path: 'powerGeneration',
                            name: '能源发电监控',
                            component: () =>
                                import ("../page/monitoring/powerGeneration.vue")
                        },
                    ]
                },
                {
                    path: '/business',
                    component: () =>
                        import ("../page/business/index.vue"),
                    children: [{
                            path: '/',
                            name: '业务中心 - 能源生产保障',
                            component: () =>
                                import ("../page/business/homePage.vue")
                        },
                        {
                            path: 'powerGeneration',
                            name: '能源发电业务',
                            component: () =>
                                import ("../page/business/powerGeneration.vue")
                        },
                        {
                            path: 'electricity',
                            name: '能源备电业务',
                            component: () =>
                                import ("../page/business/electricity.vue")
                        },
                    ]
                },
                {
                    path: '/resources',
                    name: '资源中心',
                    component: () =>
                        import ("../page/resources/index.vue"),
                    children: [{
                            path: '/',
                            component: () =>
                                import ("../page/resources/homePage.vue")
                        },
                        {
                            path: 'zydetails',
                            name: '资源详情',
                            component: () =>
                                import ("../page/resources/zy_details.vue")
                        },
                    ]
                },
                {
                    path: '/operating',
                    name: '运营中心',
                    component: () =>
                        import ("../page/operating/index.vue"),
                    children: [{
                            path: '/',
                            component: () =>
                                import ("../page/operating/homePage.vue")
                        },
                        {
                            path: 'shunt',
                            name: '分路计量',
                            component: () =>
                                import ("../page/operating/shunt/index.vue"),
                            children: [{
                                    path: '/',
                                    component: () =>
                                        import ("../page/operating/shunt/shunt.vue")
                                },
                                {
                                    path: 'fl_details',
                                    name: '分路计量详情',
                                    component: () =>
                                        import ("../page/operating/shunt/fl_details.vue")
                                },
                                {
                                    path: 'chart_details',
                                    name: '图表详情',
                                    component: () =>
                                        import ("../page/operating/shunt/details.vue")
                                },
                            ]
                        },

                        {
                            path: 'situation',
                            name: '运营情况',
                            component: () =>
                                import ("../page/operating/situation.vue")
                        },
                    ]
                },
                {
                    path: '/customer',
                    component: () =>
                        import ("../page/customer/index.vue"),
                    children: [{
                            path: '/',
                            name: '客户中心 - 客户维护',
                            component: () =>
                                import ("../page/customer/homepage/index.vue"),
                            children: [{
                                    path: '/',
                                    // name: '客户中心 - 客户维护',
                                    component: () =>
                                        import ("../page/customer/homepage/maintenance.vue"),
                                },
                                {
                                    path: 'add',
                                    name: '新建客户',
                                    component: () =>
                                        import ("../page/customer/homepage/add.vue"),
                                }
                            ]
                        },
                        {
                            path: 'statistical',
                            name: '客户中心 - 客户统计',
                            component: () =>
                                import ("../page/customer/statistical.vue")
                        },
                        {
                            path: 'compact',
                            name: '客户中心 - 合同管理',
                            component: () =>
                                import ("../page/customer/compact.vue")
                        },
                        {
                            path: 'management',
                            name: '客户中心 - 客户管理',
                            component: () =>
                                import ("../page/customer/management.vue")
                        },
                        {
                            path: 'personal',
                            name: '个人中心',
                            component: () =>
                                import ("../page/customer/personal.vue")
                        },
                        {
                            path: 'modify',
                            name: '修改密码',
                            component: () =>
                                import ("../page/customer/modify.vue")
                        },
                    ]
                },
            ]
        },
        {
            path: '/topology',
            name: '拓扑图',
            component: () =>
                import ("../page/tput/index_chart.vue")
        },
        {
            path: '/login',
            name: '登录',
            component: () =>
                import ("../page/login/index.vue")
        },
        {
            path: '/chartDetails',
            name: '数据详情',
            component: () =>
                import ("../page/chartDetails/beidian.vue")
        },
        // {
        //   path: '/new_detail',
        //   name: '签约快讯',
        //   component: () => import("../page/new_detail/new_detail.vue")
        // },
        // {
        //   path: '/allnew',
        //   name: '全部快讯',
        //   component: () => import("../page/new_detail/allnew.vue")
        // },

    ]
})