<!-- 老师管理 -->
<template>
  <div class="wrap">
    <div class="top">
      <div class="second">
        <div class="middle">
          <!-- 搜索类型选择 -->
          <el-select v-model="search_select" placeholder="请选择" style="width: 20%; margin-right: 10px;">
            <el-option label="账号" value="username"></el-option>
            <el-option label="姓名" value="name"></el-option>
            <!-- 根据需要添加更多选项 -->
          </el-select>
          <!-- 搜索框 -->
          <el-input placeholder="请输入内容" v-model="search_message" clearable style="width: 65%;"
            @input="handleInputChange">
            <!-- 搜索按钮插槽 -->
            <el-button slot="append" icon="el-icon-search" type="primary" @click="handleSearch"></el-button>
          </el-input>

          <!-- 保留添加按钮 -->
          <el-button type="success" plain id="add" @click="addTeacher">添加老师</el-button>
        </div>
      </div>
      <div id="middle" :style="{ display: display }">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>添加老师</span>
            <!-- <div class="buttonBox">
            <el-button style="padding: 3px 0" type="text">确定</el-button>
            <el-button style="padding: 3px 0" type="text">取消</el-button>
          </div> -->
            <i class="el-icon-circle-close" @click="close"></i>
          </div>
          <div class="text item">
            <div class="text-left">
              <p>单个添加</p>
              <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="账号" prop="username" label-width="50px">
                  <el-input v-model="ruleForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password" label-width="50px">
                  <el-input v-model="ruleForm.password"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="name" label-width="50px">
                  <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
              </el-form>
              <div class="signal-button">
                <el-button style="padding: 3px 0" type="text" @click="addSingleTeacher">单个添加</el-button>
              </div>
            </div>
            <div class="text-right">
              <p>批量添加</p>
              <el-upload class="upload-demo" drag
                :accept="'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'"
                action="https://jsonplaceholder.typicode.com/posts/" multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">
                  将Excel表格文件拖到此处，或<em>点击上传</em>
                </div>
              </el-upload>
            </div>
          </div>
        </el-card>
      </div>
    </div>
    <div class="edit" :style="{ display: editDisplay }" ref="edit">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>信息更改</span>
          <el-button style="float: right; padding: 3px 0; margin-right: 20px" type="text"
            @click="makeSureEdit">确定</el-button>
          <el-button style="float: right; padding: 3px 0; margin-right: 20px" type="text"
            @click="cancelEdit">取消</el-button>
        </div>
        <el-form label-width="80px" :model="editInfo">
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
        <p>老师列表</p>
        <div class="top-right">
          <!-- 设为管理员按钮 -->
          <el-dropdown trigger="click" placement="top-start">
            <span class="el-dropdown-link"> 设为管理员 </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>大一管理员</el-dropdown-item>
              <el-dropdown-item>大二管理员</el-dropdown-item>
              <el-dropdown-item>大三管理员</el-dropdown-item>
              <el-dropdown-item>大四管理员</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <!-- 说明 -->
          <el-popover placement="top-start" title="注意：" width="200" trigger="hover" content="设置管理员时，先在表格中选择人员">
            <i class="el-icon-question" slot="reference"></i>
          </el-popover>
        </div>
      </div>
      <!-- 表格 -->
      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" header-align="center"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" align="center"> </el-table-column>
        <el-table-column prop="name" label="姓名" align="center">
        </el-table-column>
        <el-table-column prop="username" label="手机号" show-overflow-tooltip align="center">
        </el-table-column>
        <el-table-column prop="manager_type" label="管理员类型" show-overflow-tooltip align="center">
          <template slot-scope="scope">
            <!-- 根据 scope.row.manager_type 的值来显示文本 -->
            <!-- 使用 v-else-if 和 v-else 链式结构 -->
            <span v-if="scope.row.manager_type === '大一管理员'">大一管理员</span>
            <span v-else-if="scope.row.manager_type === '大二管理员'">大二管理员</span>
            <span v-else-if="scope.row.manager_type === '大三管理员'">大三管理员</span>
            <span v-else-if="scope.row.manager_type === '大四管理员'">大四管理员</span>
            <!-- 如果需要一个默认的显示，可以添加以下行 -->
            <span v-else>无</span>
          </template>
        </el-table-column>
        <el-table-column prop="ban" label="账户禁用" show-overflow-tooltip align="center">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.ban" active-color="#13ce66" inactive-color="#ff4949"
              @change="disableButton(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="function" label="操作" show-overflow-tooltip align="center" width="150px">
          <template slot-scope="scope">
            <a style="margin-right: 20px; color: #75d6a9" @click="editTeacher_info(scope.row)">编辑信息</a>
            <a style="margin-right: 20px; color: red" @click="deleteTeacher(scope.row)">删除</a>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="paginatio">
        <span>批量导出</span>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page.sync="currentPage" :page-size="10" layout="total, prev, pager, next" :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { getTeacherList, addSingleTeacher, addMultipleTeacher, deleteTeacher, deleteMultipleTeacher, banTeacher, editTeacher, setTeacherManager, outputMultipleTeacher } from '../../api/teacher';

export default {
  name: "teacherManagement",
  data() {
    return {

      // 用于自动完成的建议列表，可以基于实际数据动态生成
      //   suggestions: [
      //     // 假设的一些建议数据
      //     { title: '账号1', value: '账号1' },
      //     { title: '账号2', value: '账号2' }
      // ],
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
          value: "手机号",
          label: "手机号",
        },
      ],
      //修改信息的一组数据
      editInfo: {
        phoneNumber: "",
        password: "",
      },
      //用来存放用户选择下拉框中的值
      user_gender: "",
      search_message: "", //搜索框输入的内容
      display: "none",
      // 搜索类型，如账号或姓名
      search_select: '',
      editDisplay: "none", //控制修改信息的窗口的出现与否
      //原始表格里的数据
      tableData: [
        {
          name: '',
          username: '',
          number: '',
          password: '',
          user_gender: '',
          value: false, //禁用按钮是否开启
          // 管理员类型
        },
      ],
      currentNumber: [],
      total: 30, //所有用户的数量
      currentPage: 1, //当前页数
      //添加老师的数据
      ruleForm: {
        username: "",
        password: "",
        name: "",
      },
      searchParams: {
        user_gender: "",
        search_select: "",
        search_message: "",
        page: 1,
        limit: 10,
      },
    };
  },
  created() {
    this.getTeacherList(this.searchParams);
  },
  mounted() { },
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
    // 仅更新输入框内容，不触发搜索
    handleInputChange(event) {
      this.search_message = event;
    },
    // 组件中的 getTeacherList 方法
    async getTeacherList(searchParams) {
      try {
        const response = await getTeacherList(searchParams);
        if (response && response.code === 200 && response.data) {
          this.tableData = response.data.teacher_info;
          this.total = response.data.allTeacherCount;
        } else {
          console.log("没有获取到数据或数据格式不正确");
          this.$message.error("没有获取到数据或数据格式不正确");
        }
      } catch (error) {
        console.error('获取老师列表失败:', error);
        this.$message.error('获取老师列表失败，请稍后重试');
      }
    },
    // 执行搜索的方法，点击搜索按钮时调用
    async handleSearch() {
      if (!this.search_message) {
        this.$message.warning('请输入搜索内容');
        return;
      }

      // 准备搜索参数
      const params = {
        [this.search_select]: this.search_message
      };

      try {
        // await 获取响应数据
        const response = await getTeacherList(params);
        console.log(response, 'ress');

        if (response && response.code === 200 && response.data) {
          this.tableData = response.data.teacher_info;
          this.total = response.data.allTeacherCount;
        } else {
          this.$message.error('搜索失败，没有获取到有效数据');
        }
      } catch (error) {
        // 正确处理错误
        console.error('搜索失败:', error);
        this.$message.error('搜索失败，请稍后重试');
      }
    },
    //禁用按钮的点击事件
    disableButton() {
      console.log(this.tableData.value, "value");
      this.tableData.value = !this.tableData.value;
      console.log(11);

    },

    //添加老师的方法
    addTeacher() {
      document.body.style = "pointer-events: none;";
      document.getElementById("middle").style = "pointer-events: auto;";
      this.display = "block";
    },

    //关闭添加老师的窗口
    close() {
      this.display = "none";
      document.body.style = "pointer-events: auto;";
    },
    addSingleTeacher() {
      if (!this.ruleForm.username || !this.ruleForm.password || !this.ruleForm.name) {
        this.$message.warning('请填写完整信息');
        return;
      }
      this.addSingleTeacherFun();
    },
    addSingleTeacherFun() {
      addSingleTeacher(this.ruleForm).then(response => {
        if (response.code === 200) {
          this.$message.success('添加老师成功');
          this.ruleForm = { username: '', password: '', name: '' }; // 重置表单
          this.display = 'none'; // 关闭表单
          this.getTeacherList(); // 重新获取老师列表
        } else {
          this.$message.error(response.msg);
        }
      }).catch(error => {
        console.error('添加老师失败:', error);
        this.$message.error('添加老师失败');
      });
    },
    // 编辑老师信息
    editTeacher_info(scope) {
      this.editInfo = { ...scope.row };
      this.editDisplay = 'block';
    },
    // 确定编辑老师信息
    makeSureEdit() {
      editTeacher(this.editInfo).then(response => {
        if (response.code === 200) {
          this.$message.success('编辑老师信息成功');
          this.editDisplay = 'none'; // 关闭编辑框
          this.getTeacherList(); // 重新获取老师列表
        } else {
          this.$message.error(response.msg);
        }
      }).catch(error => {
        console.error('编辑老师信息失败:', error);
        this.$message.error('编辑老师信息失败');
      });
    },
    // 取消编辑老师信息
    cancelEdit() {
      this.editDisplay = 'none';
    },

    //设为管理员
    setTeacherManagerFun(row) {
      setTeacherManager({ username: row.username }).then(response => {
        if (response.code === 0) {
          this.$message.success('设为管理员成功');
          this.getTeacherListData(); // 重新获取老师列表
        } else {
          this.$message.error(response.msg);
        }
      }).catch(error => {
        console.error('设为管理员失败:', error);
        this.$message.error('设为管理员失败');
      });
    },
    // 删除老师
    deleteTeacher(row) {
      if (!row || !row.username) {
        this.$message.warning('未找到老师信息');
        return;
      }

      // 假设 deleteTeacher API 需要老师的 username
      deleteTeacher(row.username).then(response => {
        if (response.code === 200) {
          this.$message.success('删除老师成功');
          this.getTeacherList(); // 重新获取老师列表
        } else {
          this.$message.error(response.msg);
        }
      }).catch(error => {
        console.error('删除老师失败:', error);
        this.$message.error('删除老师失败');
      });
    },
    // 封禁或解封老师账户
    toggleBanStatus(scope) {
      const action = scope.row.isBanned ? '解封' : '封禁';
      banTeacher({ username: scope.row.username, banStatus: !scope.row.isBanned }).then(response => {
        if (response.code === 200) {
          this.$message.success(`${action}老师账户成功`);
          scope.row.isBanned = !scope.row.isBanned; // 更新表格数据状态
        } else {
          this.$message.error(`${action}老师账户失败`);
        }
      }).catch(error => {
        console.error(`${action}老师账户失败:`, error);
        this.$message.error(`${action}老师账户失败`);
      });
    },
  },
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
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
    height: 40vh;
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
        height: 50vh;
        display: flex;
        justify-content: space-around;

        .text-left {
          width: 50%;
          height: 60%;
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