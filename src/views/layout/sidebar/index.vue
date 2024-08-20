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
      console.log(this.sidebarData, "sidebarData");
    },
  },
};
</script>