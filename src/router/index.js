import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const commonRoutes = [
    { path: '/', redirect: '/index'},
    {
        name:'login',
        path: '/login',
        component: () => import('../components/Login.vue')
    },
    {
        path: '/ResetPassword',
        name: 'ResetPassword',
        component: () => import('../components/ResetPassword.vue')
    },
    {
        path: '/Register',
        name: 'Register',
        component: () => import('../components/Register.vue')
    },
    {
        path: '/index',
        component: () => import('../components/Index.vue'),
        children: [
            {
                path: 'GoodsManage',
                name: 'GoodsManage',
                component: () => import('../views/infos/GoodsManage.vue')
            },
            {
                path: 'GoodsUpload',
                name: 'GoodsUpload',
                component: () => import('../views/infos/GoodInfo.vue')
            },
            {
                path: 'ManageGoods',
                name: 'ManageGoods',
                component: () => import('../views/infos/ManageGoods.vue')
            },
            {
                path: 'GoodInfo',
                name: 'GoodInfo',
                component: () => import('../views/infos/GoodInfo.vue')
            },
            {
                path: 'ManagePeople',
                name: 'ManagePeople',
                component: () => import('../views/infos/ManagePeople.vue')
            },
            {
                path: 'Market',
                name: 'Market',
                component: () => import('../views/infos/Market.vue')
            },
            {
                path: 'ShoppingLIst',
                name: 'ShoppingLIst',
                component: () => import('../views/infos/ShoppingLIst.vue')
            },
            {
                path: 'AnalysisChart',
                name: 'AnalysisChart',
                component: () => import('../views/infos/AnalysisChart.vue')
            },
            {
                path: 'ShoppingCar',
                name: 'ShoppingCar',
                component: () => import('../views/infos/ShoppingCar.vue')
            },
            {

                path: 'Logmanager',
                name: 'Logmanager',
                component: () => import('../views/infos/Logmanager.vue')
            },

            {
                path: 'PersonInfo',
                name: 'PersonInfo',
                component: () => import('../views/infos/PersonInfo.vue')
            },
            {
                path: 'GoodDetail',
                name: 'GoodDetail',
                component: () => import('../views/infos/GoodDetail.vue')
            },
           ]
    }]


// ??????????????????????????????????????????
// export const asyncRoutes = {
//

//
// }

const createRouter = () => new Router({
    routes: commonRoutes
})

const router = createRouter()

export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher
}

export default router