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
        v-permission
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
          ref="data"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="父级菜单" v-if="this.data.type !== 0">
            <el-cascader
              v-model="data.fatherMenu"
              :options="options"
              placeholder="请选择父级菜单"
              :show-all-levels="false"
              :props="{ checkStrictly: true }"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="菜单名称" prop="menuName">
            <el-input v-model="data.menuName"></el-input>
          </el-form-item>
          <el-form-item label="菜单类型" prop="type">
            <el-radio-group v-model="data.type" @input="changeType">
              <el-radio :label="0">目录</el-radio>
              <el-radio :label="1">菜单</el-radio>
              <el-radio :label="2">按钮</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="路由名称"
            prop="routeName"
            v-if="this.data.type === 1"
          >
            <el-input v-model="data.routeName"></el-input>
          </el-form-item>
          <el-form-item
            label="路由路径"
            prop="routePath"
            v-if="this.data.type !== 2"
          >
            <el-input v-model="data.routePath"></el-input>
          </el-form-item>
          <el-form-item
            label="组件路径"
            prop="componentPath"
            v-if="this.data.type === 1"
          >
            <el-input placeholder="请输入组件路径" v-model="data.componentPath">
              <template slot="prepend">src/views</template>
              <template slot="append">.vue</template>
            </el-input>
          </el-form-item>
          <el-form-item label="路由参数" v-if="this.data.type === 1">
            <el-button type="success" plain @click="addInputPair"
              ><i class="el-icon-edit"></i>添加路由参数</el-button
            >
            <div
              v-for="(pair, index) in inputPairs"
              :key="index"
              class="paramBox"
            >
              <input
                type="text"
                placeholder="参数名"
                v-model="pair.paramsKey"
              />-
              <input
                type="text"
                placeholder="参数值"
                v-model="pair.paramsValue"
              />
              <i @click="removeInputPair(index)" class="el-icon-delete"></i>
            </div>
          </el-form-item>
          <el-form-item label="icon" v-if="this.data.type !== 2">
            <el-input v-model="data.icon"></el-input>
          </el-form-item>
          <el-form-item
            label="显示状态"
            prop="isVisible"
            v-if="this.data.type !== 2"
          >
            <el-radio-group v-model="data.isVisible">
              <el-radio :label="1">显示</el-radio>
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
          <el-form-item label="跳转路由" v-if="this.data.type === 0">
            <el-input v-model="data.redirect"></el-input>
          </el-form-item>
          <el-form-item label="权限标识" v-if="this.data.type === 2">
            <el-input v-model="data.permissions"></el-input>
          </el-form-item>
          <el-form-item label="接口路径" v-if="this.data.type === 2">
            <el-input v-model="data.requestUrl"></el-input>
          </el-form-item>
          <el-form-item label="接口方法" v-if="this.data.type === 2">
            <el-input v-model="data.requestMethod"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="newlyBuilt">确定</el-button>
            <el-button @click="resetForm">取消</el-button>
          </el-form-item>
        </el-form>
      </el-drawer>
    </div>
    <div class="bottom">
      <el-table
        :data="tableData"
        style="width: 100%; margin-bottom: 20px"
        row-key="id"
        border
        default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column
          fixed
          label="菜单名称"
          show-overflow-tooltip
          prop="menuName"
        >
        </el-table-column>
        <el-table-column
          label="类型"
          show-overflow-tooltip
          prop="type"
          width="90"
        >
          <template slot-scope="scope">
            <el-tag type="success" effect="dark" v-if="scope.row.type === 0"
              >目录</el-tag
            >
            <el-tag type="danger" effect="dark" v-if="scope.row.type === 1"
              >菜单</el-tag
            >
            <el-tag type="warning" effect="dark" v-if="scope.row.type === 2"
              >按钮</el-tag
            >
          </template>
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
        >
        </el-table-column>
        <el-table-column
          prop="permissions"
          label="权限标识"
          show-overflow-tooltip
        >
        </el-table-column>
        <!-- <el-table-column
          prop="redirect"
          label="重定向路由"
          show-overflow-tooltip
        ></el-table-column> -->
        <el-table-column
          label="状态"
          show-overflow-tooltip
          width="90"
          :formatter="(row) => (row.isVisible === 0 ? '隐藏' : '显示')"
        >
          <template slot-scope="scope">
            <el-tag v-if="(scope.row.isVisible = 1)" type="warning"
              >显示</el-tag
            >
            <el-tag type="info" v-else>隐藏</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          sortable
          label="排序"
          show-overflow-tooltip
          prop="sort"
          width="50"
        >
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
import { fartherManuList } from "../../api/menuManage";
import { initSidebar } from "../../api/sidebar";
export default {
  name: "menu",
  data() {
    return {
      selectInput: "", //搜索框输入的内容
      drawer: false, //控制侧边栏的出现与否
      isAdd: false, //判断是新增还是编辑
      data: {}, //最终获取的数据
      // newData: {}, //新增菜单的表格中的数据
      midData: {}, //编辑的侧边栏表格中的数据
      inputPairs: [], //存放新增的参数
      options: [], //放父菜单的所有选项
      //存放要往表格中渲染数据
      tableData: [
        {
          fatherMenu: "",
          menuName: "1",
          type: 1,
          routeName: "3",
          routePath: "4",
          componentPath: "5",
          permissions: "6",
          isVisible: "显示",
          sort: "1",
          redirect: "1",
          requestUrl: "",
          requestMethod: "",
          params: [],
          icon: "",
        },
      ],
      // //用于接收新增菜单中的数据
      ruleForm: {
        fatherMenu: "",
        menuName: "",
        type: 1,
        routeName: "",
        routePath: "",
        params: [],
        componentPath: "",
        isVisible: 1,
        sort: 1,
        redirect: "",
        permissions: "",
        requestUrl: "",
        requestMethod: "",
      },
      //新增菜单表单中的规范
      rules: {
        menuName: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
        ],
        fatherName: [
          { required: true, message: "请选择父级菜单", trigger: "change" },
        ],
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
        isVisible: [{ required: true }],
      },
    };
  },
  async beforeCreate() {
    const { data } = await fartherManuList();
    this.options = data;
    console.log(this.options, "option");
  },
  async created() {
    this.init();
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
    resetForm() {
      this.$refs.data.resetFields();
      this.drawer = false;
    },

    //新增参数
    addInputPair() {
      this.inputPairs.push({ paramsKey: "", paramsValue: "" });
    },

    //删除参数
    removeInputPair(index) {
      this.inputPairs.splice(index, 1);
    },

    //搜索操作
    async select() {
      // debugger
      const data = await selectMenu(this.selectInput);
      console.log(11111111);

      this.tableData = data.data;
      console.log(this.tableData, "table");
    },
    //重置表格中的数据操作
    reset() {
      this.selectInput = "";
      this.init();
    },

    //点击新建菜单
    async addMenu() {
      this.inputPairs = [];
      this.data = this.ruleForm;
      this.isAdd = true;
      this.drawer = true;
    },

    //新建/编辑的确定操作
    async newlyBuilt() {
      console.log(this.inputPairs, "row");
      if (this.isAdd) {
        this.data.params = this.inputPairs;
        this.data.fatherMenu =
          this.data.fatherMenu[this.data.fatherMenu.length - 1];
        console.log(this.data, "111");
        await addMenu(this.data);
      } else {
        await editMenu(this.data);
      }
      this.init();
      this.drawer = false;
    },

    //删除操作
    async handleClick(row) {
      await deleteMenu(row.id);
      this.init();
    },

    //编辑操作
    edit(row) {
      this.drawer = true;
      // this.midData = row;
      this.data = row;
      console.log(row);
    },

    //切换类型单选框时触发的事件
    changeType(newValue) {
      console.log("change");
      for (let prop in this.ruleForm) {
        this.ruleForm[prop] = null;
      }
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

    .paramBox {
      margin-top: 10px;
      input {
        width: 120px;
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 6px 12px;
        font-size: 14px;
        outline: none;
        margin-right: 5px;
      }

      input:focus {
        border-color: #66afe9;
        box-shadow: none;
      }
    }
    .input-with-select .el-input-group__prepend {
      background-color: #fff;
    }
  }
}
</style>