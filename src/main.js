import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import iView from 'iview'
import axios from 'axios'
import 'iview/dist/styles/iview.css'
import './permission'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import echarts from 'echarts'
import {buildCartesianSingleLabelElOption} from "echarts/lib/component/axisPointer/viewHelper";
import {resetTokenAndClearUser} from "./utils";

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.use(iView)
// 全局使用echarts组件
Vue.prototype.$echarts = echarts


// 设置请求超时时间
axios.defaults.timeout = 5000
axios.defaults.withCredentials=true;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.timeout = 60000;
axios.defaults.baseURL = 'http://localhost:8080';

axios.interceptors.request.use(function (config) {

        //存在token
        if (window.localStorage.getItem('token')) {
            config.headers.token=window.localStorage.getItem('token')
            // config.params['token'] = window.localStorage.getItem('token')

        }
        // els
        return config;
    },
    function (error) {
        return Promise.reject(error)
    })

axios.interceptors.response.use(function (response) {
    if (response.data.errCode==101){
        console.log('i am here',response)
        alert(response.data.errMsg)
        router.replace('/login');
    }
        return response;
    }
)
const  vm = new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})

