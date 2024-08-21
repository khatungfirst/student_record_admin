import { initSidebar } from '../../api/sidebar'
import { baseRoutes } from '@/router'
import { ruleMenu } from '../../utils/common'
import { menuOther } from '../../router/menuList'
import layout from '@/views/layout/index.vue'; // 确保 Layout 组件的导入路径正确
import request from '../../utils/request'
import { cloneDeep } from 'lodash';

const menuVuex = {
    namespaced: true,

    state: {
        //存储动态导航
        dyMenuList: []
    },

    mutations: {
        //设置菜单导航
        setMenu(state, payload) {
            state.dyMenuList = payload
        },
        removeMenu(state) {
            state.dyMenuList = []
        },
    },
    actions: {
        //定义请求动态路由信息的接口方法
        async getMenuList(state) {
            let res = await initSidebar()
            console.log(res.data,'res');
            
            const data = res.data
            const result = [];
            const map = new Map();
            for (const item of data) {
                map.set(item.id, { ...item, children: [] });
            }

            for (const item of data) {
                if (item.parentId !== null && map.has(item.parentId)) {
                    map.get(item.parentId).children.push(map.get(item.id));
                } else {
                    result.push(map.get(item.id));
                }
            }
            let myMenu = ruleMenu(menuOther, res.data)
            state.commit('setMenu', myMenu)
            let mybaseRoutes = cloneDeep(baseRoutes)
            mybaseRoutes[0].children.push(...myMenu)

            return mybaseRoutes

        }
    }


}

// 转换component的形式
// function changeComponent(routes) {
//     const asyncRoutes = [];

//     routes.forEach(route => {
//         const tmpRoute = { ...route }; // 浅拷贝路由对象
//         // console.log(tmpRoute, 'tm');


//         // 顶级目录，替换为 Layout 组件
//         if (tmpRoute.component === 'Layout') {
//             // 假设Layout已经在其他地方import并准备好了
//             tmpRoute.component = layout; // 确保Layout是可访问的
//         } else {
//             // console.log(tmpRoute.component,'122324345');
//             // 其他菜单，使用import()动态加载组件
//             let mid = `@/views/${tmpRoute.component}/index.vue`;
//             console.log(mid,2403904);
//             tmpRoute.component = () => import(mid) // 捕获错误并回退到 404 页面 ;
//             console.log(tmpRoute.component(), '122324345');
//             // 注意：这里使用了`@`别名，它通常在webpack配置中指向`src`目录
//             // 如果你的项目没有配置`@`别名，你需要替换为相对路径或绝对路径

//             // 可选：如果组件不存在，重定向到404页面（Vue 2中通常通过路由守卫处理）
//             // 这里不直接处理，因为Vue 2路由配置不直接支持“如果组件不存在则...”的逻辑
//             // 你可以在路由守卫中检查组件加载失败的情况，并做相应处理
//         }

//         if (tmpRoute.children) {
//             tmpRoute.children = changeComponent(tmpRoute.children);
//         }

//         asyncRoutes.push(tmpRoute);
//     });
//     console.log(asyncRoutes, 'async');
//     return asyncRoutes;

// }

export default menuVuex