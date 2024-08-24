<template>
  <el-menu
    :default-active="activeMenu"
    router
    :unique-opened="true"
    :collapse="collapse"
    style="position: absolute"
    active-text-color="#6da2bf"   
  >
    <!-- 对items进行遍历 -->
    <template v-for="item in sidebarData">
      <!-- 使用v-if判定是否具有第二级菜单 -->
      <template v-if="item.children && item.children.length > 0">
        <el-submenu :key="item.id" :index="item.path">
          <template slot="title">
            <i :class="item.meta.icon"></i>
            <!-- 如果存在第二级菜单，渲染第一级菜单标题 -->
            <span slot="title">{{ item.meta.title }}</span>
          </template>
          <!-- 遍历第二级菜单 -->
          <template v-for="subItem in item.children">
            <!-- 判定是否具有第三级菜单 -->
            <el-submenu
              v-if="subItem.children && subItem.children.length > 0"
              :key="subItem.id"
              :index="subItem.path"
            >
              <i :class="subItem.meta.icon"></i>
              <!-- 如果存在第三级菜单，渲染第二级菜单标题 -->
              <template slot="title">{{ subItem.meta.title }}</template>
              <!-- 遍历第三级菜单，并渲染第三级菜单标题 -->
              <el-menu-item
                v-for="(threeItem, i) in subItem.children"
                :key="i"
                :index="threeItem.path"
                >{{ threeItem.meta.title }}</el-menu-item
              >
            </el-submenu>

            <!-- 如果不存在第三级菜单，渲染第二级菜单标题 -->
            <el-menu-item :key="subItem.id" :index="subItem.path" v-else>
              <i :class="subItem.meta.icon"></i
              >{{ subItem.meta.title }}</el-menu-item
            >
          </template>
        </el-submenu>
      </template>
      <!-- 如果不存在第二级菜单，渲染第一级菜单标题 -->
      <template v-else>
        <el-menu-item :key="item.id" :index="item.path">
          <i :class="item.meta.icon"></i>
          <span slot="title">{{ item.meta.title }}</span>
        </el-menu-item>
      </template>
    </template>
  </el-menu>
</template>

<script>
// import SideMenu from "./sidebarItem.vue";
import { initSidebar } from "../../../api/sidebar";
import bus from "@/utils/bus";

export default {
  // components: {
  //   SideMenu,
  // },
  data() {
    return {
      sidebarData: [],
      activeMenu: "",
      collapse: false,
    };
  },
  created() {
    this.init();
    bus.$on("collapse", (msg) => {
      this.collapse = msg;
      bus.$emit("collapse-content", msg);
    });
  },
  methods: {
    async init() {
      const initData = await initSidebar();
      const data = initData.data;
      console.log(data, "&&&&");
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
      this.sidebarData = result;
      console.log(this.sidebarData, "sidebarData111");
    },
    // handleMenuSelect(val) {
    //   // debugger;
    //   this.$router.push(`/${val}`);
    //   console.log(val, "val");
    //   this.activeMenu = val;
    // },
  },
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.nest-menu .el-submenu > .el-submenu__title,
.el-submenu .el-menu-item {
  min-width: 180px !important;
}
.el-menu--collapse .el-menu .el-submenu {
  min-width: 180px !important;
}

.el-menu-item::-webkit-scrollbar {
  width: 0;
}
</style>