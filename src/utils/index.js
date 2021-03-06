import { asyncRoutes, resetRouter } from '../router'

// 将菜单信息转成对应的路由信息 动态添加
export function menusToRoutes(data) {
    const result = []
    const children = []

    result.push({
        path: '/',
        component: () => import('../components/Index.vue'),
        children,
    })

    data.forEach(item => {
        generateRoutes(children, item)
    })

    children.push({
        path: 'error',
        name: 'error',
        component: () => import('../components/Error.vue')
    })

    // 最后添加404页面 否则会在登录成功后跳到404页面
    result.push(
        {path: '*', redirect: '/error'},
    )

    return result
}
var clone = function(obj){
    return JSON.parse(JSON.stringify(obj));
}

function generateRoutes(children, item) {
    if (item.name) {
        children.push(asyncRoutes[item.name])
    } else if (item.children) {
        item.children.forEach(e => {
            generateRoutes(children, e)
        })
    }
}

export function resetTokenAndClearUser() {
    // 退出登录 清除用户资料
    localStorage.setItem('userType', '')
    localStorage.setItem('token', '')
    localStorage.setItem('userImg', '')
    localStorage.setItem('userName', '')
    localStorage.setItem('userId', '')
}