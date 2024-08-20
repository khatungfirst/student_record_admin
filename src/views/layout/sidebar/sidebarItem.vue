<template>
  <el-menu
    :default-active="activeMenu"
    @select="handleMenuSelect"
    :unique-opened="true"
    :router="true"
  >
    <!-- <div v-for="item in menuList" :key="item.id">
      <el-submenu
        v-if="item.children && item.children.length > 0"
        :index="item.path"
      >
        <template slot="title">
          <i :class="item.meta.icon"></i>
          <span>{{ item.meta.name }}</span>
        </template>
        <side-menu :menu-list="item.children"></side-menu>
      </el-submenu>
      <el-menu-item v-else :index="item.routePath" :to="item.routePath">
        <i :class="item.meta.icon"></i>
        <span slot="title">{{ item.meta.name }}</span>
      </el-menu-item>
    </div> -->

    <!-- 对items进行遍历 -->
    <template v-for="item in menuList">
        <!-- 使用v-if判定是否具有第二级菜单 -->
        <template v-if="item.children">
          <el-submenu :index="item.path" :key="item.path" >
            <template slot="title">
              <i :class="item.icon"></i>
              <!-- 如果存在第二级菜单，渲染第一级菜单标题 -->
              <span slot="title">{{ item.title }}</span>
            </template>
            <!-- 遍历第二级菜单 -->
            <template v-for="subItem in item.children">
              <!-- 判定是否具有第三级菜单 -->
              <el-submenu
                v-if="subItem.children"
                :index="subItem.path"
                :key="subItem.path"
              >
                <!-- 如果存在第三级菜单，渲染第二级菜单标题 -->
                <template slot="title">{{ subItem.title }}</template>
                <!-- 遍历第三级菜单，并渲染第三级菜单标题 -->
                <el-menu-item
                  v-for="(threeItem, i) in subItem.children"
                  :key="i"
                  :index="threeItem.path"
                  >{{ threeItem.title }}</el-menu-item
                >
              </el-submenu>

              <!-- 如果不存在第三级菜单，渲染第二级菜单标题 -->
              <el-menu-item
                v-else
                :index="subItem.path"
                :key="subItem.path"
                >{{ subItem.title }}</el-menu-item
              >
            </template>
          </el-submenu>
        </template>
        <!-- 如果不存在第二级菜单，渲染第一级菜单标题 -->
        <template v-else>
          <el-menu-item :index="item.path" :key="item.path">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
  </el-menu>

  
</template>

<script>
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
  methods: {
    handleMenuSelect(val) {
      this.activeMenu = val;
      console.log(val, "val");

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
