import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import clone from "clone";
import router from "../router";
import QS from "qs";
import md5 from 'js-md5';
Vue.prototype.$md5 = md5;

Vue.use(Vuex)
//尝试使用vuex进行表单数据管理

const  PersonInteractModule = {
    namespaced: true,
    state: {
        // 左侧菜单栏数据
        menuItems: [
            {
                name: 'GoodsManage', // 要跳转的路由名称 不是路径
                size: 18, // icon大小
                type: 'md-home', // icon类型
                text: '个人商品管理', // 文本内容
            },
            {
                text: '商城',
                type: 'ios-paper',
                name:'Market',
            },
            {
                text: '商品管理',
                type: 'ios-paper',
                name: 'ManageGoods'
            },
            {
                text: '商品上传',
                type: 'ios-paper',
                name: 'GoodsUpload'
            },
            {
                text: '商品详情',
                type: 'ios-paper',
                name: 'GoodInfo'
            },
            {
                text: '用户管理',
                type: 'ios-paper',
                name: 'ManagePeople'
            },
            {
                text: '历史购买',
                type: 'ios-paper',
                name: 'ShoppingLIst'
            },
            {
                text: '购买分析',
                type: 'ios-paper',
                name: 'AnalysisChart'
            },
            {
                text: '购物车',
                type: 'ios-paper',
                name: 'ShoppingCar'
            },


        ],
    },
    mutations: {
        setMenus(state, items) {
            state.menuItems = [...items]
        },
    }
}
const store = new Vuex.Store(
    {

    modules:{
        PersonInteractModule:PersonInteractModule,
    }
})

export default store