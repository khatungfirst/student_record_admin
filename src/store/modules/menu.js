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


export default menuVuex