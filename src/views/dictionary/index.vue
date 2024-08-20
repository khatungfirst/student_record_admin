<template>
  <div class="wrap">
    <div class="top"></div>
    <div class="bottom">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template>
            <el-table :data="dropData" stripe style="width: 100%">
              <el-table-column prop="key" label="字典项值" align="center">
              </el-table-column>
              <el-table-column prop="value" label="字典项键" align="center">
              </el-table-column>
              <el-table-column prop="id" label="id" align="center">
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column label="字典名称" prop="name"> </el-table-column>
        <el-table-column label="字典编码" prop="encode"> </el-table-column>
        <el-table-column label="状态" prop="status"> </el-table-column>
        <el-table-column label="操作" prop="operate">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="openBuild(scope.$index, tableData)"
              type="text"
              size="small"
            >
              新增
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="100"
        layout="total, prev, pager, next"
        :total="1000"
      >
      </el-pagination>

      <el-drawer
        title="新建字典项"
        :visible.sync="drawer"
        :direction="direction"
        :modal-append-to-body="false"
      >
        
      </el-drawer>
    </div>
  </div>
</template>
<script>
export default {
  name:'dictionary',
  data() {
    return {
      //存放表格中的数据
      tableData: [
        {
          name: "标签",
          encode: "tag",
          status: "启用",
        },
      ],
      //存放下拉框中的数据
      dropData: [],
      //当前页数
      currentPage: 1,
      //侧边抽屉的出现与否
      drawer: false,
      //控制侧边栏出现的方向
      direction: 'btt',
    };
  },
  methods: {
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },

    openBuild(){
        this.drawer = true
    },

  },
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.wrap {
  .top {
    height: 100px;
    background-color: #fff;
    margin-bottom: 20px;
  }

  .bottom {
    .el-pagination {
      margin-top: 10px;
      text-align: center;
    }
  }
}
</style>