export const menuOther = [
    {
        path: '/dictionary',
        component: () => import("../views/dictionary/index.vue"),
        name:'dictionary',
        meta:{
            title:'字典管理'
        }
    },
    {
        path: '/studentsmanage',
        component: () => import('../views/studentManage/index.vue'),
        meta:{
            title:'学生管理'
        }
    },
    {
        path: '/menu',
        component: () => import('../views/menuManage/index.vue'),
        meta:{
            title:'菜单管理'
        }
    },
    {
        path: '/star',
        component: () => import('../views/star/index.vue'),
        meta:{
            title:'成长之星'
        }
    },
    {
        path: '/articlemanagement',
        component: () => import('../views/articlemanagement/index.vue'),
        meta:{
            title:'帖子管理'
        }
    },
    {
        path: '/mailbox',
        component: () => import('../views/mailbox/index.vue'),
        meta:{
            title:'举报信箱'
        }
    },
    {
        path: '/systemsettings',
        component: () => import('../views/systemsettings/index.vue'),
        meta:{
            title:'系统设置'
        }
    },

]
