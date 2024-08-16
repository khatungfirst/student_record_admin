<!-- 菜单管理页面 -->
<template>
  <div class="wrap">
    <div class="top">
      <el-input
        placeholder="请输入菜单名称进行搜索"
        v-model="selectInput"
        clearable
        class="selectInput"
      >
      </el-input>
      <el-button icon="el-icon-search" circle @click="select"></el-button>
      <el-button @click="reset"><i class="el-icon-refresh"></i>重置</el-button>
      <el-button
        style="background-color: #fc5430; color: aliceblue"
        @click="addMenu"
        type="primary"
        ><i class="el-icon-plus"></i>新建菜单</el-button
      >
      <el-drawer
        title="新建菜单"
        :visible.sync="drawer"
        :modal-append-to-body="false"
      >
        <el-form
          :rules="rules"
          :model="data"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="父级菜单">
            <el-select placeholder="请选择父级菜单"> </el-select>
          </el-form-item>
          <el-form-item label="菜单名称" prop="menuName">
            <el-input v-model="data.menuName"></el-input>
          </el-form-item>
          <el-form-item label="菜单类型" prop="type">
            <el-radio-group v-model="data.type">
              <el-radio :label="0">目录</el-radio>
              <el-radio :label="1">菜单</el-radio>
              <el-radio :label="2">按钮</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="路由名称"
            prop="routeName"
            v-if="this.data.type === '菜单'"
          >
            <el-input v-model="data.routeName"></el-input>
          </el-form-item>
          <el-form-item
            label="路由路径"
            prop="routePath"
            v-if="this.data.type !== '功能'"
          >
            <el-input v-model="data.routePath"></el-input>
          </el-form-item>
          <el-form-item
            label="组件路径"
            prop="componentPath"
            v-if="this.data.type === '菜单'"
          >
            <el-input placeholder="请输入组件路径" v-model="data.componentPath">
              <template slot="prepend">src/views</template>
              <template slot="append">.vue</template>
            </el-input>
          </el-form-item>
          <el-form-item label="路由参数" v-if="this.data.type === '菜单'">
            <el-button type="success" plain
              ><i class="el-icon-edit"></i>添加路由参数</el-button
            >
          </el-form-item>
          <el-form-item
            label="显示状态"
            prop="isVisiable"
            v-if="this.data.type !== '功能'"
          >
            <el-radio-group v-model="data.isVisiable">
              <el-radio :label="1" >显示</el-radio>
              <el-radio :label="0">隐藏</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="排序">
            <el-input-number
              v-model="data.sort"
              controls-position="right"
              :min="1"
              :max="10"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="跳转路由" v-if="this.data.type === '目录'">
            <el-input v-model="data.redirect"></el-input>
          </el-form-item>
          <el-form-item label="权限标识" v-if="this.data.type === '功能'">
            <el-input v-model="data.permissions"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="newlyBuilt">确定</el-button>
            <el-button @click="resetForm('ruleForm')">取消</el-button>
          </el-form-item>
        </el-form>
      </el-drawer>
    </div>
    <div class="bottom">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column
          fixed
          label="菜单名称"
          show-overflow-tooltip
          prop="menuName"
        >
        </el-table-column>
        <el-table-column label="类型" show-overflow-tooltip prop="type">
        </el-table-column>
        <el-table-column
          label="路由名称"
          show-overflow-tooltip
          prop="routeName"
        >
        </el-table-column>
        <el-table-column
          prop="routePath"
          label="路由路径"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="componentPath"
          label="组件路径"
          show-overflow-tooltip
          width="240px"
        >
        </el-table-column>
        <el-table-column
          prop="permissions"
          label="权限标识"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="redirect"
          label="跳转路由"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="状态" show-overflow-tooltip prop="isVisiable">
        </el-table-column>
        <el-table-column label="排序" show-overflow-tooltip prop="sort">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          show-overflow-tooltip
          align="center"
        >
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >删除</el-button
            >
            <el-button type="text" size="small" @click="edit(scope.row)"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { initMenu } from "../../api/menuManage";
import { selectMenu } from "../../api/menuManage";
import { addMenu } from "../../api/menuManage";
import { editMenu } from "../../api/menuManage";
import { deleteMenu } from "../../api/menuManage";
export default {
  data() {
    return {
      selectInput: "", //搜索框输入的内容
      drawer: false, //控制侧边栏的出现与否
      isAdd: false,  //判断是新增还是编辑
      data: {}, //最终获取的数据
      newData: {}, //新增菜单的表格中的数据
      midData: {}, //编辑的侧边栏表格中的数据
      //存放要往表格中渲染数据
      tableData: [
        {
          menuName: "1",
          type: 1,
          routeName: "3",
          routePath: "4",
          componentPath: "5",
          permissions: "6",
          isVisiable: "显示",
          sort: "1",
          redirect: "1",
        },
      ],
      //用于接收新增菜单中的数据
      ruleForm: {
        fatherMenu: "",
        menuName: "",
        type: "目录",
        routeName: "",
        routePath: "",
        route: [],
        componentPath: "",
        isVisiable: 0,
        sort: 1,
        redirect: "",
        permissions: "",
      },
      //新增菜单表单中的规范
      rules: {
        menuName: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
        ],
        // fatherName: [
        //   { required: true, message: "请选择父级菜单", trigger: "change" },
        // ],
        type: [{ required: true }],
        routeName: [
          { required: true, message: "请填写路由名称", trigger: "blur" },
        ],
        routePath: [
          { required: true, message: "请填写路由路径", trigger: "blur" },
        ],
        componentPath: [
          { required: true, message: "请填写组件路径", trigger: "blur" },
        ],
        isVisiable: [{ required: true }],
      },
    };
  },
  async mounted() {
    this.init()
  },
  methods: {
    //初始化数据
    async init() {
      const data = await initMenu();
      this.tableData = data.data;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    ///重置新建菜单的表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // // 关闭侧边栏操作
    // handleClose(done) {
    //   this.$confirm("确认关闭？")
    //     .then((_) => {
    //       done();
    //     })
    //     .catch((_) => {});
    // },

    //搜索操作
    async select() {
      const data = await selectMenu(this.selectInput);
      this.tableData = data.data;
    },
    //重置表格中的数据操作
    reset() {
      this.selectInput = "";
      this.init(                   )
    },

    //点击新建菜单
    addMenu() {
      this.data = this.newData;
      this.isAdd = true;
      this.drawer = true;
    },

    //新建/编辑的确定操作
    async newlyBuilt(row) {
      console.log(row, "row");

      if (this.isAdd) {
        console.log("111");
        await addMenu(this.ruleForm);
      } else {
        console.log(row, "222");
        await editMenu(this.ruleForm);
      }
      this.init();
    },

    //删除操作
    async handleClick(row) {
      const data = await deleteMenu(row.menuName);
      this.init();
    },

    //编辑操作
    edit(row) {
      this.drawer = true;
      this.midData = row;
      this.data = this.midData;
      console.log(this.data,'1111111111');
      console.log(row);
    },
  },
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
* {
  box-sizing: border-box;
}
.top {
  width: 60%;
  margin: 20px auto;
  .selectInput {
    width: 60%;
    display: inline-block;
  }

  .demo-ruleForm {
    .el-select .el-input {
      width: 130px;
    }
    .input-with-select .el-input-group__prepend {
      background-color: #fff;
    }
  }
}
</style>