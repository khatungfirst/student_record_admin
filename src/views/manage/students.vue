<!-- 学生管理 -->
<template>
  <div class="wrap">
    <div class="top">
      <div class="first">
        <div class="year">
          <span>入学年份：</span>
          <el-select v-model="initInfo.year" clearable placeholder="请选择" @change="selectUser">
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
          <el-select v-model="initInfo.classes" clearable placeholder="请选择" @change="selectUser">
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
          <el-select v-model="initInfo.gender" clearable placeholder="请选择" @change="selectUser">
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
            @change="selectUser"
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
            v-model="initInfo.typeValue"
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
            v-model="initInfo.input"
            clearable
            style="width: 65%"
          >
          </el-input>
          <el-button type="primary" id="select" @click="selectUser">搜索</el-button>
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
    <div id="middle" :style="{ display: display }">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>添加学生</span>
          <!-- <div class="buttonBox">
            <el-button style="padding: 3px 0" type="text">确定</el-button>
            <el-button style="padding: 3px 0" type="text">取消</el-button>
          </div> -->
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
              <el-form-item label="账号" prop="userId" label-width="50px">
                <el-input v-model="ruleForm.userId"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password" label-width="50px">
                <el-input v-model="ruleForm.password"></el-input>
              </el-form-item>
              <el-form-item label="姓名" prop="names" label-width="50px">
                <el-input v-model="ruleForm.names"></el-input>
              </el-form-item>
              <el-form-item label="班级" prop="classes" label-width="50px">
                <el-input v-model="ruleForm.classes"></el-input>
              </el-form-item>
            </el-form>
            <div class="signal-button">
              <el-button
                style="padding: 3px 0"
                type="text"
                @click="addSignalStudent"
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
              action="http://127.0.0.1:4523/m1/4869431-0-default/stuManage/addMultipleStudent"
              multiple
              :on-success="uploadSuccess"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                将Excel表格文件拖到此处，或<em>点击上传</em>
              </div>
              <div class="el-upload__tip" slot="tip">注：只能上传excel表格(其中包含个人的学号、密码、姓名、班级)</div>
            </el-upload>
          </div>
        </div>
      </el-card>
    </div>
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
          <el-form-item label="电话号">
            <el-input v-model="editInfo.phoneNumber"></el-input>
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
          <el-dropdown
            trigger="click"
            placement="top-start"
            @command="setAdmin"
            click="setAdmin"
          >
            <span class="el-dropdown-link"> 设为管理员 </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="class">班级管理员</el-dropdown-item>
              <el-dropdown-item command="grade">年级管理员</el-dropdown-item>
              <el-dropdown-item command="hospitalLevel"
                >院级管理员</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>

          <!-- 说明 -->
          <el-popover
            placement="top-start"
            title="注意："
            width="200"
            trigger="hover"
            content="设置管理员时，先在表格中选择人员"
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
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          prop="function"
          label="操作"
          show-overflow-tooltip
          align="center"
          width="150px"
        >
          <template slot-scope="scope">
            <a
              style="margin-right: 20px; color: #75d6a9"
              @click="editFun(scope.row)"
              >编辑信息</a
            >
            <a
              style="margin-right: 20px; color: red"
              @click="deleteStudent(scope.row)"
              >删除</a
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="paginatio">
        <span @click="exportInfo">批量导出</span>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
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
export default {
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
          value: "未禁用",
          label: "未禁用",
        },
        {
          value: "已禁用",
          label: "已禁用",
        },
      ],
      //存放搜索类别的数组
      typeOptions: [
        {
          value: "姓名",
          label: "姓名",
        },
        {
          value: "学号",
          label: "学号",
        },
        {
          value: "手机号",
          label: "手机号",
        },
      ],
      //修改信息的一组数据
      editInfo: {
        username: "",
        class: "",
        phoneNumber: "",
        password: "",
      },

      //存放多选中的用户信息
      multipleSelection: [],
      type: "", //用来存放设置的管理员的类型

      //用来存放用户搜索的各个值
      initInfo: {
        year: "",
        classes: "",
        gender: "",
        isDisable: "",
        input: "", //搜索框输入的内容
        typeValue: "", //选中的搜索类别
      },
      display: "none",
      editDisplay: "none", //控制修改学生信息的窗口的出现与否
      //表格里的数据
      tableData: [
        {
          name: "1",
          username: "1",
          password: "1",
          class: "1",
          year: "1",
          telephone: "1",
          gender: "1",
          ban: true, //禁用按钮是否开启
          isManager: true, //是否是管理员
        },
      ],
      currentNumber: [],
      total: 30, //所有用户的数量
      currentPage: 1, //当前页数
      //添加学生的数据
      ruleForm: {
        userId: "",
        password: "",
        names: "",
        classes: "",
      },
    };
  },
  async mounted() {
   this.studentInfo()
  },
  methods: {
    //用来手动控制表格中的选中状态
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    //将这个选中的行数据数组赋值给 multipleSelection 变量
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection, "!!!");
    },
    handleSizeChange(val) {
      this.pageSize = 10;
      this.currentPage = 1;
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },

    //获得页面中所需要的所有数据
    async studentInfo(){
      const data = await studentInfo(this.initInfo)
      this.init(data)
    },

    async selectUser(){
        this.studentInfo();
        console.log(this.initInfo);
    },

    //重置数据
    reloadStudents(){
      this.initInfo.year = '';
      this.initInfo.classes = '';
      this.initInfo.gender = '';
      this.initInfo.isDisable = '';
      this.initInfo.input = '';
      this.initInfo.typeValue = '';
      this.studentInfo();
    },
    //封禁学生/解除封禁
    async disableButton(row) {
      console.log(row.ban, "value");
      this.tableData.value = !this.tableData.value;
      const data = await MakeDisable(row.username);
      this.init(data);
    },

    //出现添加学生弹窗的方法
    addStudents() {
      document.body.style = "pointer-events: none;";
      document.getElementById("middle").style = "pointer-events: auto;";
      this.display = "block";
    },

    //初始化
    init(data) {
      this.tableData = data.data.stuInfo;
      this.yearOptions = data.data.year;
      this.classOptions = data.data.class;
      this.total = data.data.allStudentCount;
    },

    //单个添加学生的方法
    async addSignalStudent() {
      this.close();
      const data = await singleAdd(this.ruleForm);
      this.init(data);
    },

    //批量上传学生信息的相关方法
    uploadSuccess(){
      Message({
        icon:'el-icon-check',
        message:"上传成功",
        duration: 1000,
      })
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
      this.editInfo.username = row.name;
      this.editInfo.class = row.class;
      this.editInfo.phoneNumber = row.telephone;
      this.editInfo.password = row.password;
    },

    //确定修改学生信息
    async makeSure() {
      const data = await editStudentInfo(this.editInfo);
      this.init(data);
      this.cancel();
    },

    //取消修改学生信息
    cancel() {
      this.editDisplay = "none";
      document.body.style = "pointer-events: auto;";
    },

    //设为管理员
    async setAdmin(command) {
      console.log(this.multipleSelection, command);
      if (this.multipleSelection.length === 0) {
        Message({
          message: "请选择你要设为管理员的人员",
          type: "warning",
        });
      } else {
        const data = await makeAdmin(this.multipleSelection, command);
        this.init(data);
      }
    },

    //删除学生
    async deleteStudent(row) {
      console.log(row);
      const data = await deleteUser(row.number);
      this.init(data);
    },

    //批量导出用户信息
    async exportInfo() {
      if (this.multipleSelection.length === 0) {
        Message({
          message: "请选择你要批量导出的人员",
          type: "warning",
        });
      } else {
        await exportData(this.multipleSelection);
      }
    },
    //将后端传来的是否是管理员的true和false转换为‘是’和‘否’
    isManagerFormatter(row, column) {
      // 在 formatter 中对 name 字段进行转换
      if (row.isManager == true) {
        return "是"; // 将 name 为 1 的数据转换为 2
      } else {
        return "否"; // 其他情况保持不变
      }
    },
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

  .top {
    margin: 2vh 0px;
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

           .el-upload {
            width: 80%;
            padding: 1px;
          }

          .el-upload__tip {
            width: 80%;
            margin:20px auto           
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

        .el-dropdown {
          width: 120px;
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