export const menuOther = [
         {
           path: "dictionary",
           component: () => import("../views/dictionary/index.vue"),
           name: "dictionary",
           meta: {
             title: "字典管理"
           }
         },
         {
           path: "studentmanage",
           component: () => import("../views/studentManage/index.vue"),
           meta: {
             title: "学生管理"
           }
         },
         {
           path: "teacherManagement",
           component: () => import("../views/teacherManage/index.vue"),
           meta: {
             title: "老师管理"
           }
         },
         {
           path: "menu",
           component: () => import("../views/menuManage/index.vue"),
           meta: {
             title: "菜单管理"
           }
         },
         {
           path: "star",
           component: () => import("../views/star/index.vue"),
           meta: {
             title: "成长之星"
           }
         },
         {
           path: "articlemanagement",
           component: () =>
             import("../views/articlemanagement/index.vue"),
           meta: {
             title: "帖子管理"
           }
         },
         {
           path: "rolemanagement",
           component: () => import("../views/rolemanagement/index.vue"),
           meta: {
             title: "角色管理"
           }
         },
         {
           path: "mailbox",
           component: () => import("../views/mailbox/index.vue"),
           meta: {
             title: "举报信箱"
           }
         },
         {
           path: "systemsettings",
           component: () => import("../views/systemsettings/index.vue"),
           meta: {
             title: "系统设置"
           }
         }
       ];
