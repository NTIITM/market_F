// import router from './router'
// import store from './store'
// import { menusToRoutes, resetTokenAndClearUser } from './utils'
// import { LoadingBar } from 'iview'
// import axios from 'axios'
//
// // // 初始加载时是否有菜单数据
// // let hasMenus = false
// router.beforeEach(async (to, from, next) => {
//     if (localStorage.getItem('token')) {
//         next()
//     } else {
//         if (to.path === '/login' ||to.path === '/ResetPassword'||to.path === '/Register') {
//             next()
//         } else {
//             next(`/login?redirect=${to.path}`)
//         }
//     }
// })
// //
