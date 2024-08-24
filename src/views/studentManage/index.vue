<!-- 学生管理 -->
<template>
  <div class="wrap">
    <div class="top">
      <div class="first">
        <div class="year">
          <span>入学年份：</span>
          <el-select
            v-model="initInfo.year"
            clearable
            placeholder="请选择"
            @change="init"
          >
            <el-option
              v-for="item in yearOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="class">
          <span>班级：</span>
          <el-select
            v-model="initInfo.class"
            clearable
            placeholder="请选择"
            @change="init"
          >
            <el-option
              v-for="item in classOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="gnder">
          <span>性别：</span>
          <el-select
            v-model="initInfo.gender"
            clearable
            placeholder="请选择"
            @change="init"
          >
            <el-option
              v-for="item in genderOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="isDisable">
          <span>是否禁用：</span>
          <el-select
            v-model="initInfo.isDisable"
            clearable
            placeholder="请选择"
            @change="init"
          >
            <el-option
              v-for="item in isDisableOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="second">
        <div class="middle">
          <el-select
            v-model="initInfo.searchSelect"
            clearable
            placeholder="请选择搜索类别"
          >
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-input
            placeholder="请输入内容"
            v-model="initInfo.searchMessage"
            clearable
            style="width: 65%"
          >
          </el-input>
          <el-button
            type="primary"
            id="select"
            @click="init"
            v-permission="'user:student:query'"
            >搜索</el-button
          >
          <el-button type="success" plain id="add" @click="reloadStudents"
            >重置</el-button
          >
        </div>
        <div class="right">
          <el-button type="success" plain id="add" @click="addStudents"
            >添加学生</el-button
          >
        </div>
      </div>
    </div>
    <div id="middle" :style="{ display: display }" >
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>添加学生</span>
          <i class="el-icon-circle-close" @click="close"></i>
        </div>
        <div class="text item">
          <div class="text-left">
            <p>单个添加</p>
            <el-form
              :model="ruleForm"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="账号" prop="username" label-width="50px">
                <el-input v-model="ruleForm.username"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password" label-width="50px">
                <el-input v-model="ruleForm.password"></el-input>
              </el-form-item>
              <el-form-item label="姓名" prop="name" label-width="50px">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item label="班级" prop="class" label-width="50px">
                <el-input v-model="ruleForm.class"></el-input>
              </el-form-item>
              <el-form-item label="性别" prop="gender" label-width="50px">
                <el-input v-model="ruleForm.gender"></el-input>
              </el-form-item>
            </el-form>
            <div class="signal-button">
              <el-button
                style="padding: 3px 0"
                type="text"
                @click="addSignalStudent"
                v-permission="'user:student:addsinglestudent'"
                >单个添加</el-button
              >
            </div>
          </div>
          <div class="text-right">
            <p>批量添加</p>
            <el-upload
              class="upload-demo"
              drag
              :accept="'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'"
              action="/api/stuManage/addMultipleStudent"
              multiple
              :on-success="uploadSuccess"
              v-permission="'user:student:addMultiplestudent'"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                <em>点击上传</em>
              </div>
              <div class="el-upload__tip" slot="tip">
                注：只能上传excel表格(其中包含个人的班级、姓名、学号、密码)
                <p>
                  示例
                  <a
                    style="text-decoration: underline; color: #409eff"
                    @click="exampleOpen"
                    >请看这里</a
                  >
                </p>
              </div>
            </el-upload>
          </div>
        </div>
      </el-card>
    </div>
    <el-dialog
      title="按照下面的格式进行上传文件："
      :visible.sync="cardDisplay"
      width="30%"
      :modal-append-to-body="false"
      :append-to-body="true"
      :show-close="false"
      id="exampleId"
    >
      <img
        src="../../../static/img/example.png"
        style="width: 400px; height: 400px"
      />
      <!-- <span slot="footer" class="dialog-footer"> -->
      <el-button @click="exampleClose">我知道了</el-button>
    </el-dialog>
    <div class="edit" :style="{ display: editDisplay }" ref="edit">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>信息更改</span>
          <el-button
            style="float: right; padding: 3px 0; margin-right: 20px"
            type="text"
            @click="makeSure"
            >确定</el-button
          >
          <el-button
            style="float: right; padding: 3px 0; margin-right: 20px"
            type="text"
            @click="cancel"
            >取消</el-button
          >
        </div>
        <el-form label-width="80px" :model="editInfo">
          <el-form-item label="学号">
            <el-input v-model="editInfo.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="班级">
            <el-input v-model="editInfo.class"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="editInfo.telephone"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="editInfo.password"></el-input>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
    <div class="bottom">
      <div class="table-top">
        <p>学员列表</p>
        <div class="top-right">
          <!-- 设为管理员按钮 -->
          <span
            class="el-dropdown-link"
            @click="deleteStudent"
            v-permission="'user:student:delete'"
          >
            批量删除
          </span>

          <!-- 说明 -->
          <el-popover
            placement="top-start"
            title="注意："
            width="200"
            trigger="hover"
            content="批量删除时，先在表格中选择人员"
          >
            <i class="el-icon-question" slot="reference"></i>
          </el-popover>
        </div>
      </div>
      <!-- 表格 -->
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        header-align="center"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" align="center"> </el-table-column>
        <el-table-column prop="name" label="姓名" align="center">
        </el-table-column>
        <el-table-column
          prop="username"
          label="学号"
          show-overflow-tooltip
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="password"
          label="密码"
          show-overflow-tooltip
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="gender"
          label="性别"
          show-overflow-tooltip
          align="center"
          width="50"
        >
        </el-table-column>
        <el-table-column
          prop="class"
          label="班级"
          show-overflow-tooltip
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="telephone"
          label="手机号"
          show-overflow-tooltip
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="year"
          label="入学年份"
          show-overflow-tooltip
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="isAdmin"
          label="是否是管理员"
          show-overflow-tooltip
          align="center"
          :formatter="isManagerFormatter"
        >
          <template slot-scope="scope">
            <el-tag type="danger" v-if="scope.row.manager_type === '无'"
              >否</el-tag
            >
            <el-tag type="success" v-else>{{ scope.row.manager_type }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="ban"
          label="账户禁用"
          show-overflow-tooltip
          align="center"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.ban"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="disableButton(scope.row)"
              v-permission="'user:student:ban'"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          prop="function"
          label="操作"
          show-overflow-tooltip
          align="center"
          width="250px"
        >
          <template slot-scope="scope">
            <a
              style="margin-right: 20px; color: #75d6a9"
              @click="editFun(scope.row)"
              v-permission="'user:student:edit'"
              >编辑信息</a
            >
            <!-- <a
              style="margin-right: 20px; color: red"
              @click="setAdmin(scope.row)"
              >设为管理员</a
            > -->
            <el-dropdown
              trigger="click"
              placement="top-start"
              @command="setAdmin($event, scope.row)"
              v-permission="'user:student:setManager'"
            >
              <span class="el-dropdown-link" style="cursor: pointer">
                设为管理员
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="班级管理员"
                  >班级管理员</el-dropdown-item
                >
                <el-dropdown-item command="年级管理员"
                  >年级管理员</el-dropdown-item
                >
                <el-dropdown-item command="取消管理员"
                  >取消管理员</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="paginatio">
        <span @click="exportInfo" v-permission="'user:student:edit'"
          >批量导出</span
        >
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="initInfo.page"
          :page-size="10"
          layout="total, prev, pager, next"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { singleAdd } from "../../api/manageStudents";
import { deleteUser } from "../../api/manageStudents";
import { editStudentInfo } from "../../api/manageStudents";
import { MakeDisable } from "../../api/manageStudents";
import { makeAdmin } from "../../api/manageStudents";
import { Message } from "element-ui"; // MessageBox
import { exportData } from "../../api/manageStudents";
import { studentInfo } from "../../api/manageStudents";
import { pageData } from "../../api/manageStudents";
export default {
  name: "studentmanage",
  data() {
    return {
      //用于接收后端传来的下拉框中的选项
      yearOptions: [],
      classOptions: [],
      genderOptions: [
        {
          value: "男",
          label: "男",
        },
        {
          value: "女",
          label: "女",
        },
      ],
      isDisableOptions: [
        {
          value: false,
          label: "未禁用",
        },
        {
          value: true,
          label: "已禁用",
        },
      ],
      //存放搜索类别的数组
      typeOptions: [
        {
          value: "name",
          label: "姓名",
        },
        {
          value: "username",
          label: "学号",
        },
        {
          value: "phone_number",
          label: "手机号",
        },
      ],
      //修改信息的一组数据
      editInfo: {
        username: "",
        class: "",
        telephone: "",
        password: "",
      },
      //存放多选中的用户信息
      multipleSelection: {},
      //表格里的数据
      tableData: [],
      //存放多选选中数据的数组
      selectedArr: [],
      //用来存放用户搜索的各个值
      initInfo: {
        year: null,
        class: "",
        gender: "",
        isDisable: null,
        searchMessage: "", //搜索框输入的内容
        searchSelect: "", //选中的搜索类别
        page: 1, //当前页数
        limit: 10, //规定每页有多少条数据
      },
      //添加学生的数据
      ruleForm: {
        username: "",
        password: "",
        name: "",
        class: "",
        gender: "",
      },
      display: "none",
      //控制修改学生信息的窗口的出现与否
      editDisplay: "none",
      //所有用户的数量
      total: 30,
      //用户的角色
      role: "",
      //当前页的数据长度
      pageLength: 0,
      //控制批量添加示例卡片的展示与否
      cardDisplay: false,
    };
  },
  async mounted() {
    localStorage.setItem("page", this.initInfo.page);
    this.init();
  },
  methods: {
    //初始化
    async init() {
      this.role = JSON.parse(localStorage.getItem("userInfo")).role;
      this.initInfo.page = JSON.parse(localStorage.getItem("page"));
      console.log(this.initInfo, "page");
      const data = await studentInfo(this.initInfo, this.role);
      console.log(data, "请求");
      if (data.data !== null) {
        this.tableData = data.data.stuInfo;
        this.yearOptions = data.data.year;
        this.classOptions = data.data.class;
        this.total = data.data.allStudentCount;
        this.pageLength = this.tableData.length;
      } else {
        this.tableData = [];
      }
    },

    //将这个选中的行数据数组赋值给 multipleSelection 变量
    handleSelectionChange(val) {
      this.selectedArr = val
      // const existingItem = this.selectedArr.find(
      //   (item) => item.username === val[val.length-1].username
      // );
      // if (!existingItem) {
      //   this.multipleSelection = val[val.length-1];
      //   this.selectedArr.push(this.multipleSelection); //返回的是数组长度！！影响原数组
      // } else {
      //   console.log("去掉");
      //   this.selectedArr = this.selectedArr.filter(
      //     (item) => item.username !== val[val.length-1].username
      //   ); //不会改变原数组！！
      // }
      console.log(this.selectedArr, "arr");
    },

    //切换表格的页数
    async handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.initInfo.page = val;
      localStorage.setItem("page", this.initInfo.page);
      // const data = await pageData(this.initInfo.page, this.limit);
      this.init();
    },

    //重置数据
    reloadStudents() {
      this.searchSelect = [];
      this.initInfo.year = null;
      this.initInfo.class = "";
      this.initInfo.gender = "";
      this.initInfo.isDisable = null;
      this.initInfo.searchMessage = "";
      this.initInfo.searchSelect = "";
      this.init();
    },

    //封禁学生/解除封禁
    async disableButton(row) {
      console.log(row.ban, "value");
      const { code } = await MakeDisable(row.username);
      if (code === 200) {
        this.tableData.value = !this.tableData.value;
      }
      console.log(this.tableData.value);
    },

    //出现添加学生弹窗的方法
    addStudents() {
      document.body.style = "pointer-events: none;";
      document.getElementById("middle").style = "pointer-events: auto;";
      this.display = "block";
    },

    //单个添加学生的方法
    async addSignalStudent() {
      this.close();
      await singleAdd(this.ruleForm);
      this.init();
      for (let key in this.ruleForm) {
        if (this.ruleForm.hasOwnProperty(key)) {
          this.ruleForm[key] = ""; // 或者使用 '' 或 []
        }
      }
    },

    //批量上传学生信息的相关方法
    uploadSuccess() {
      Message({
        icon: "el-icon-check",
        message: "上传成功",
        duration: 1000,
      });
      this.init();
    },

    //关闭添加学生的窗口
    close() {
      this.display = "none";
      document.body.style = "pointer-events: auto;";
    },

    //点击编辑学生信息
    editFun(row) {
      console.log(row);
      this.editDisplay = "block";
      document.body.style = "pointer-events: none;";
      this.$refs.style = "pointer-events: auto;";
      this.editInfo.username = row.username;
      this.editInfo.class = row.class;
      this.editInfo.telephone = row.telephone;
      this.editInfo.password = row.password;
    },

    //确定修改学生信息
    async makeSure() {
      await editStudentInfo(this.editInfo);
      this.init();
      this.cancel();
    },

    //取消修改学生信息
    cancel() {
      this.editDisplay = "none";
      document.body.style = "pointer-events: auto;";
    },

    //批量删除学生
    async deleteStudent() {
      if (this.selectedArr.length === 0) {
        Message({
          message: "请选择你要删除的人员",
          type: "warning",
        });
      } else {
        await deleteUser(this.selectedArr);
        if (this.selectedArr.length === this.pageLength) {
          localStorage.setItem("page", this.initInfo.page - 1);
        }
        this.init();
      }
      this.selectedArr = [];
    },

    //设为管理员
    async setAdmin(command, row) {
      console.log(row, "command");
      // let managerType = "";
      // if (command === "class") {
      //   managerType = "班级管理员";
      // } else {
      //   managerType = "年级管理员";
      // }
      await makeAdmin(row, command);
      this.init();
    },

    //批量导出用户信息
    exportInfo() {
      if (this.selectedArr.length === 0) {
        Message({
          message: "请选择你要批量导出的人员",
          type: "warning",
        });
      } else {
        exportData(this.selectedArr);
        this.init();
      }
    },

    //将后端传来的是否是管理员的true和false转换为‘是’和‘否’
    isManagerFormatter(row, column) {
      // 在 formatter 中对 name 字段进行转换
      if (row.isManager == "") {
        return "否";
      }
    },

    //示例窗口的出现
    exampleOpen(){
      this.cardDisplay = true
      document.getElementById('exampleId').style = "pointer-events: auto;"
    },

    //示例窗口的消失
    exampleClose(){
      this.cardDisplay = false
    }
  },
};
</script>
<style  rel="stylesheet/scss" lang="scss" scoped>
* {
  box-sizing: border-box;
}
.wrap {
  width: 100%;
  height: 95%;
  position: relative;

  .el-dialog {
    z-index: 9999;
    pointer-events: auto;
  }

  .top {
    margin: 2vh 0px;

    .el-select {
      height: 32px;
    }
    .first {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      margin-bottom: 20px;

      div {
        display: flex;
        flex: 1 0 200px;

        span {
          padding-top: 5px;
        }
      }
    }

    .second {
      display: grid;
      grid-template-columns: 6fr 2fr;
    }
    .middle {
      display: flex;
      flex-wrap: nowrap;
      align-items: center;

      #select {
        background-color: #67c23a;
        margin-left: 20px;
        // width: 30%;
      }

      .el-select {
        background-color: #aef18d;
        margin-right: 20px;
      }
    }

    .right {
      padding-right: 25%;
      text-align: center;
    }
  }

  /* 根据屏幕宽度调整列数 */
  @media (max-width: 1200px) {
    .top {
      grid-template-columns: repeat(2, 1fr);
      /* 两列布局 */
    }
  }

  /* 根据屏幕宽度调整列数 */
  @media (max-width: 930px) {
    .top {
      grid-template-columns: repeat(1, 1fr);
      /* 两列布局 */
    }
  }

  #middle,
  .edit {
    width: 50%;
    // height: 50vh;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    pointer-events: none;
    .el-card {
      height: 100%;
      pointer-events: auto;

      .el-icon-circle-close {
        float: right;
        font-size: 19px;
      }

      .el-icon-circle-close:hover {
        cursor: pointer;
      }

      span {
        font-weight: 800;
      }

      .buttonBox {
        display: inline-block;
        float: right;

        .el-button {
          margin-left: 20px;
        }
      }

      .item {
        // height: 50vh;
        display: flex;
        justify-content: space-around;

        .text-left {
          width: 50%;
          height: 80%;
          border-right: 1px solid rgb(130, 127, 127);
          padding-right: 5%;

          .el-form {
            margin: 30px 0px;
            height: 50%;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;

            .el-form-item {
              text-align: center;
            }
          }

          .signal-button {
            text-align: center;

            .el-button {
              width: 30%;
              height: 3vh;
              border-radius: 20px;
              border: 1px solid rgb(194, 221, 163);
              color: #67c23a;
            }
          }
        }

        .text-right {
          width: 50%;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          padding-left: 20px;
          overflow: hidden;

          .el-upload {
            width: 80%;
            padding: 1px;
            position: absolute;
          }

          .el-upload__tip {
            width: 80%;
            margin: 20px auto;
          }
        }

        p {
          text-align: center;
        }
      }
    }
  }

  .edit {
    .el-form {
      width: 70%;
      margin: 0 auto;
      padding-top: 20px;
    }
  }
  .bottom {
    width: 100%;
    height: 90%;
    background-color: #ffffff;
    padding-top: 2vh;
    padding-left: 3%;

    .table-top {
      p {
        display: inline-block;
      }

      .top-right {
        display: inline-block;
        float: right;
        margin-right: 30px;
        padding-top: 6px;

        .el-dropdown-link {
          display: inline-block;
          width: 100px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          margin-right: 20px;
          border: 1px solid rgb(196, 190, 190);
          color: rgb(138, 132, 132);
          border-radius: 20px;
          cursor: pointer;
        }
      }
    }

    .el-table {
      border: 1px solid rgb(222, 222, 222);
      margin-bottom: 20px;
      // text-align: center;
      .el-table-column {
        text-align: center;

        span {
          margin-right: 20px;
        }
      }
    }

    .paginatio {
      width: 100%;
      height: 7vh;
      display: flex;
      align-items: center;

      .el-pagination {
        position: absolute;
        right: 20px;
      }

      span {
        color: #67c23a;
      }
      span:hover {
        cursor: pointer;
      }
    }
  }
}
</style>