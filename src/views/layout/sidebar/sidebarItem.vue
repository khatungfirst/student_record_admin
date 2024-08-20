<template>
  <el-menu
    :default-active="activeMenu"
    :unique-opened="true"
  >
    <!-- 对items进行遍历 -->
    <template v-for="item in menuList">
      <!-- 使用v-if判定是否具有第二级菜单 -->
      <template v-if="item.children && item.children.length > 0">
        <el-submenu :key="item.id">
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
              :index="subItem.path"
              :key="subItem.id"
            >
              <i :class="subItem.meta.icon"></i>
              <!-- 如果存在第三级菜单，渲染第二级菜单标题 -->
              <template slot="title">{{ subItem.meta.title }}</template>
              <!-- 遍历第三级菜单，并渲染第三级菜单标题 -->
              <el-menu-item
                v-for="(threeItem, i) in subItem.children"
                :key="i"
               @click="handleMenuSelect(threeItem.component)"
                >{{ threeItem.meta.title }}</el-menu-item
              >
            </el-submenu>

            <!-- 如果不存在第三级菜单，渲染第二级菜单标题 -->
            <el-menu-item :key="subItem.id" @click="handleMenuSelect(subItem.component)"  v-else>
              <i :class="subItem.meta.icon"></i
              >{{ subItem.meta.title }}</el-menu-item
            >
          </template>
        </el-submenu>
      </template>
      <!-- 如果不存在第二级菜单，渲染第一级菜单标题 -->
      <template v-else>
        <el-menu-item @click="handleMenuSelect(item.component)" :key="item.id">
          <i :class="item.meta.icon"></i>
          <span slot="title">{{ item.meta.title }}</span>
        </el-menu-item>
      </template>
    </template>
  </el-menu>
</template>

<script>
import router from "@/router";
export default {
  name: "SideMenu",
  props: {
    menuList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      activeMenu: "",
    };
  },
  computed: {
    onRoutes() {
      // console.log(this.$route.path,'path');
      //返回当前的路由
      return this.$route.path.replace("/", "");
    },
  },
  methods: {
    handleMenuSelect(val) {
      this.activeMenu = val;
      this.$router.push(`/layout/${val}`);
      console.log(this.activeMenu, "val");
      // this.push
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.nest-menu .el-submenu > .el-submenu__title,
.el-submenu .el-menu-item {
  min-width: 179px !important;
}
.el-menu--collapse .el-menu .el-submenu {
  min-width: 180px !important;
}
</style>
