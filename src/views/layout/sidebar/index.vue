<template>
  <side-menu
    :menu-list="sidebarData"
    @menu-select="handleMenuSelect"
  ></side-menu>
</template>

<script>
import SideMenu from "./sidebarItem.vue";
import { initSidebar } from "../../../api/sidebar";

export default {
  components: {
    SideMenu,
  },
  data() {
    return {
      sidebarData: [],
    };
  },
  created() {
    this.init();
  },
  methods: {
    handleMenuSelect(index) {
      console.log("Selected menu:", index);
    },
    async init() {
      this.sidebarData = this.$store.state.menu.dyMenuList
    },
  },
};
</script>