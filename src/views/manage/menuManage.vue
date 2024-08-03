<!-- 菜单管理页面 -->
<template>
  <div class="wrap">
    <div class="top">
      <el-input
        placeholder="请输入菜单名称进行搜索"
        v-model="selectInput"
        clearable
      >
      </el-input>
      <el-button icon="el-icon-search" circle></el-button>
      <el-button><i class="el-icon-refresh"></i>重置</el-button>
    </div>
    <div class="bottom">
      <el-table :data="tableData" border style="width: 100%" d>
        <el-table-column fixed prop="date" label="菜单名称"  show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="name" label="类型" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="province" label="路由名称" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="city" label="路由路径" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="address" label="组件路径" show-overflow-tooltip width="240px">
        </el-table-column>
        <el-table-column prop="zip" label="权限标识" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="zip" label="状态" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="zip" label="排序" show-overflow-tooltip> </el-table-column>
        <el-table-column fixed="right" label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >删除</el-button
            >
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="side"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectInput: "", //搜索框输入的内容
      tableData:[],      //存放要往表格中渲染数据
    };
  },
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
*{
    box-sizing: border-box;
}
.top {
  width: 50%;
  margin: 0 auto;
  .el-input {
    width: 80%;
    display: inline-block;
  }
}
</style>