<!-- 首页四个统计模块的组件 -->
<template>
  <div class="grid-content bg-purple">
    <div class="left">
      <slot name="icon"></slot>
    </div>
    <div class="right">
      <slot name="text1" ></slot>
      <slot name="total" ></slot>
      <slot name="proportion"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "category",
};
</script>
<style rel="stylesheet/scss" lang="scss"  scoped>
* {
  box-sizing: border-box;
}
i {
  width: 100%;
  display: inline-block;
  font-size: 5vw;
  padding: 20px;
  color: rgba(245, 245, 245, 0.4);
}
.el-col {
  border-radius: 4px;
  margin-right: 10px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 50px;
  display: flex;
  justify-content: space-between;
  padding-right: 20px;
  padding-bottom: 20px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.right {
    padding-top: 20px;
    color: #f9fafc;
    font-size: 16px;
}
</style>