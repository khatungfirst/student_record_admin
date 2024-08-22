<template>
  <div class="app-wrapper">
    <app-header></app-header>
    <div class="app-body">
     <div class="side">
      <sidebar class="sidebar-container"></sidebar>
     </div>
      <div class="main-container" :class="{ 'content-collapse': collapse }">
        <el-menu class="main-navbar" mode="horizontal" default-active="1">
          <breadcrumb></breadcrumb>
        </el-menu>
        <app-main></app-main>
      </div>
    </div>
</div>
</template>

<script>
import appHeader from "./header/index.vue";
import Sidebar from "./sidebar/index.vue";
import AppMain from "./main/index.vue";
import Breadcrumb from "@/components/breadCrumb/index.vue";
import bus from '@/utils/bus'

  export default {
  name: "layout",
    data() {
      return {
      collapse: false,
    };
  },
  created() {
    bus.$on("collapse-content", (msg) => {
      console.log(msg,'msg');
      
      this.collapse = msg;
    });
    },
    components: {
      appHeader,
      Breadcrumb,
      Sidebar,
    AppMain,
    },
    methods: {
      logout() {
      this.$store.dispatch("LogOut").then(() => {
        location.reload();
      });
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
* {
  box-sizing: border-box;
}
  .app-body {
    position: absolute;
    top: 48px;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: auto;
    backface-visibility: hidden;
    transform: translate3d(0, 0, 0);
    transform-style: preserve-3d;
    visibility: visible;
  display: flex;
  }

  // 主体区域
  .main-container {
    position: relative;
  width: 100%;
    min-height: 100%;
  transition: margin-left 0.5s;
  // margin-left: 180px;

    .main-navbar {
      height: 50px;
      line-height: 50px;
      border-radius: 0px !important;
    }
  }


  // 侧边栏
  .sidebar-container {
  // position: fixed;
  // top: 0;
  // bottom: 0;
  // left: 0;
  // width: 180px;
    height: 100%;
    transition: width 0.28s;
  // z-index: 1001;
  }
</style>
