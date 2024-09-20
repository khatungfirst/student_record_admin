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
          <el-input placeholder="请输入内容" v-model="search_message" clearable @input="handleInputChange">
            <!-- 搜索按钮 -->
            <el-button slot="append" icon="el-icon-search" type="primary" size="mini"
              @click="handleSearch">搜索</el-button>
          </el-input>
          <!-- 重置按钮 -->
          <el-button icon="el-icon-refresh" type="warning" size="mini" @click="resetSearch">重置</el-button>

          <!-- 保留添加按钮 -->
          <el-button type="success" plain id="add" @click="addTeacher" size="mini">添加老师</el-button>
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
                <el-form-item label="姓名" prop="name" label-width="50px">
                  <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <!-- <el-form-item label="性别" prop="user_gender" label-width="50px">
                  <el-input v-model="ruleForm.user_gender"></el-input>
                </el-form-item> -->
                <el-form-item label="性别" prop="user_gender" label-width="50px">
                  <el-select v-model="ruleForm.user_gender" placeholder="请选择性别" @change="handleGenderChange">
                    <el-option label="男" value="男"></el-option>
                    <el-option label="女" value="女"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="账号" prop="username" label-width="50px">
                  <el-input v-model="ruleForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password" label-width="50px">
                  <el-input v-model="ruleForm.password"></el-input>
                </el-form-item>
              </el-form>
              <div class="signal-button">
                <el-button style="padding: 3px 0" type="text" @click="addSingleTeacher">单个添加</el-button>
              </div>
            </div>
            <div class="text-right">
              <p>批量导入</p>
              <el-upload class="upload-demo" drag
                :accept="'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'"
                action="/api/teacher/addMultipleTeacher" multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">
                  将Excel表格文件拖到此处，或<em>点击上传</em>
                </div>
                <div class="el-upload__tip" slot="tip">
                  注：只能上传excel表格(其中包含个人的班级、姓名、学号、密码)
                  <p>
                    示例
                    <a style="text-decoration: underline; color: #409eff" @click="exampleOpen">请看这里</a>
                  </p>
                </div>
              </el-upload>
            </div>

            <el-dialog title="按照下面的格式进行上传文件：" :visible.sync="cardDisplay" width="30%" :modal-append-to-body="false"
              :append-to-body="true" :show-close="false" id="exampleId">
              <img src="../../../static/img/example.png" style="width: 400px; height: 400px" />
              <!-- <span slot="footer" class="dialog-footer"> -->
              <el-button @click="exampleClose">我知道了</el-button>
            </el-dialog>

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
          <el-form-item label="姓名">
            <el-input v-model="editInfo.name"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="editInfo.user_gender" placeholder="请选择性别">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="电话号">
            <el-input v-model="editInfo.old_username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="editInfo.password" type="password"></el-input>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
    <div class="bottom">
      <div class="table-top">
        <p>老师列表</p>
        <div class="top-right">
          <!-- 设为管理员按钮 -->
          <el-dropdown trigger="click" @command="handleSetManager">
            <span class="el-dropdown-link"> 设为管理员 </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="大一管理员">大一管理员</el-dropdown-item>
              <el-dropdown-item command="大二管理员">大二管理员</el-dropdown-item>
              <el-dropdown-item command="大三管理员">大三管理员</el-dropdown-item>
              <el-dropdown-item command="大四管理员">大四管理员</el-dropdown-item>
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
        @selection-change="handleSelectionChange" @row-click="handleRowClick">
        <el-table-column type="selection" align="center"> </el-table-column>
        <el-table-column prop="name" label="姓名" align="center">
        </el-table-column>
        <el-table-column prop="username" label="手机号" show-overflow-tooltip align="center">
        </el-table-column>
        <el-table-column prop="password" label="密码" show-overflow-tooltip align="center">
        </el-table-column>
        <el-table-column prop="user_gender" label="性别" align="center"></el-table-column>
        <el-table-column prop="manager_type" label="管理员类型" show-overflow-tooltip align="center">
          <template slot-scope="scope">
            <!-- 根据 scope.row.manager_type 的值来显示文本 -->
            <!-- 使用 v-else-if 和 v-else 链式结构 -->
            <span v-if="scope.row.manager_type === '年级管理员'">大一管理员</span>
            <span v-else-if="scope.row.manager_type === '大二管理员'">大二管理员</span>
            <span v-else-if="scope.row.manager_type === '大三管理员'">大三管理员</span>
            <span v-else-if="scope.row.manager_type === '大四管理员'">大四管理员</span>
            <span v-else-if="scope.row.manager_type === '院级管理员'">院级管理员</span>
            <!-- 如果需要一个默认的显示，可以添加以下行 -->
            <span v-else>无</span>
          </template>
        </el-table-column>
        <el-table-column prop="user_ban" label="账户禁用" show-overflow-tooltip align="center">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.user_ban" active-color="#13ce66" inactive-color="#ff4949"
              @change="disableButton(scope)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="function" label="操作" show-overflow-tooltip align="center" width="150px">
          <template slot-scope="scope">
            <a style="margin-right: 20px; color: #75d6a9" @click="editteacherInfo(scope)">编辑信息</a>
            <a style="margin-right: 20px; color: red" @click="deleteTeacher(scope.row)">删除</a>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="paginatio">
        <span @click="exportTeachers">批量导出</span>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page.sync="currentPage" :page-size="10" layout="total, prev, pager, next" :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { getTeacherList, addSingleTeacher, addMultipleTeacher, deleteTeacher, deleteMultipleTeacher, banTeacher, editTeacher, setTeacherManager, outputMultipleTeacher,  } from '../../api/teacher';

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
        old_username: "",
        password: "",
        user_gender:'',
        name:''
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
        // {
        //   name: '',
        //   username: '',
        //   number: '',
        //   password: '',
        //   user_gender: '',
        //   value: false, //禁用按钮是否开启
        //   // 管理员类型
        // },
      ],
      currentNumber: [],
      total: 30, //所有用户的数量
      currentPage: 1, //当前页数
      //添加老师的数据
      ruleForm: {
        username: "",
        password: "",
        name: "",
        user_gender:''
      },
      searchParams: {
        search_select: "",
        search_message: "",
        page: 1,
        limit: 10,
      },
      clickedRow: null, // 保存点击的行数据
      //存放多选中的用户信息
      multipleSelection: {},
      //存放多选选中数据的数组
      selectedArr: [],
      //控制批量添加示例卡片的展示与否
      cardDisplay: false,
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
      if (!val || val.length === 0) {
        // 没有选中的行，可能是 val 为 undefined 或者空数组
        this.$message.info('没有选中的行');
        return;
      }
      // val 是当前选中的行的数组
      this.multipleSelection = val; // 更新 multipleSelection 为当前选中的行
      console.log("mul,", this.multipleSelection);
      // 复制选中的行数据到 selectedArr，同时重命名 manager_type 为 user_manager_type
      this.selectedArr = val.map(item => ({
        ...item,
        user_manager_type: item.manager_type, // 重命名键名
        manager_type: undefined, // 可选，如果不需要原键名
      }));

      // 打印当前 selectedArr 的状态
      console.log(this.selectedArr, "selectedArr");
    },

    handleSizeChange(val) {
      this.pageSize = 10;
      this.currentPage = 1;
      console.log(`每页 ${val} 条`);
    },

    //切换表格的页数
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      // 重新获取当前页的数据
      this.getTeacherList(this.searchParams);
    },

    // 仅更新输入框内容，不触发搜索
    handleInputChange(event) {
      this.search_message = event;
    },

    // 组件中的 getTeacherList 方法
    async getTeacherList(searchParams) {
      try {
        // 更新请求参数中的当前页码
        searchParams.page = this.currentPage;
        // 打印请求参数
        console.log('Requesting teachers with:', this.searchParams);
        const response = await getTeacherList(searchParams);
        
        if (response && response.code === 200 && response.data) {
          this.tableData = response.data.teacherInfo;
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

      // 更新 this.searchParams 对象
      this.searchParams.search_select = this.search_select; // 使用 v-model 绑定的搜索类型
      this.searchParams.search_message = this.search_message; // 使用输入框的值
      this.searchParams.page = 1; // 搜索时通常需要重置为第一页
      console.log("searchParams:",this.searchParams);
      try {
        // 使用更新后的 this.searchParams 调用 getTeacherList 方法
        await this.getTeacherList(this.searchParams);
        // 注意：这里不需要在这里打印 response 或再次检查 response，因为在 getTeacherList 方法中已经处理
      } catch (error) {
        // 正确处理错误
        console.error('搜索失败:', error);
        this.$message.error('搜索失败，请稍后重试');
      }
    },

    // 重置搜索框并重新获取老师列表的方法
    resetSearch() {
      this.search_message = ''; // 重置搜索框内容
      this.search_select = ''; // 重置搜索类型选择（如果需要）
      // 重置其他搜索条件（如果需要）

      // 重新获取老师列表
      this.getTeacherList({
        page: 1, // 通常需要重置为第一页
        limit: 10, // 每页条数，根据实际情况设置
        // 其他需要重置的参数
      });
    },

    //禁用按钮的点击事件
    // 封禁或解封老师账户
    disableButton(scope) {
      console.log("scope:", scope);
      if (!scope || !scope.row) {
        console.error('Scope or scope.row is undefined', scope);
        this.$message.error('尝试操作一个不存在的用户');
        return;
      }

      const action = scope.row.user_ban ? '封禁' : '解封';
      banTeacher(scope.row.username)
        .then(response => {
          if (response.code === 200) {
            this.$message.success(`${action}老师账户成功`);
            // 确保前端显示与后端状态同步
            scope.row.user_ban = !scope.row.user_ban;
            this.getTeacherList(this.searchParams); // 刷新老师列表以更新状态
          } else {
            this.$message.error(`${action}老师账户失败`);
          }
        })
        .catch(error => {
          console.error(`${action}老师账户失败:`, error);
          this.$message.error(`${action}老师账户失败`);
        });
    },

    //添加老师的方法
    addTeacher() {
      document.body.style = "pointer-events: none;";
      document.getElementById("middle").style = "pointer-events: auto;";
      this.display = "block";
    },

    //关闭添加老师的窗口
    close() {
      console.log('关闭');
      
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
          this.getTeacherList(this.searchParams); // 重新获取老师列表
        } else {
          this.$message.error(response.msg);
        }
      }).catch(error => {
        console.error('添加老师失败:', error);
        this.$message.error('添加老师失败');
      });
    },

    handleRowClick(row) {
      // 保存点击的行数据
      this.clickedRow = row;
      // 调用 getUsername 方法，传递 row 中的 username
      // this.getTeacherIdByUsername(row.username);
    },

    // 根据老师的用户名获取原始 ID 的方法
    // getTeacherIdByUsername(username) {
    //   // 使用 this.clickedRow 来访问点击行的数据
    //   if (!this.clickedRow) {
    //     this.$message.error('未找到老师信息');
    //     return;
    //   }

    //   // 构造请求参数对象
    //   const params = {
    //     username: username
    //   };

    //   // 发送请求并获取老师的原始 ID
    //   getUsername(params).then(response => {
    //     if (response.code === 200) {
    //       const teacherId = response.data.id;
    //       // 将获取到的原始 ID 赋值给 this.editInfo 的 id 属性
    //       this.editInfo.id = teacherId;
    //     } else {
    //       this.$message.error('获取老师原始 ID 失败');
    //     }
    //   }).catch(error => {
    //     console.error('获取老师原始 ID 失败:', error);
    //     this.$message.error('获取老师原始 ID 失败');
    //   });
    // },
    
    // 编辑老师信息
    editteacherInfo(scope) {
      if (!scope || !scope.row) {
        console.error('Scope or scope.row is undefined', scope);
        this.$message.error('未找到老师信息');
        return;
      }

      // 暂存原始的用户名
      const oldUsername = scope.row.username;

      // 使用 scope.row 来获取当前行的数据
      this.editInfo = {
        name: scope.row.name,       // 姓名
        user_gender: scope.row.user_gender,   // 性别
        username: oldUsername, // 原始手机号
        old_username: oldUsername, // 更新后的手机号
        password: scope.row.password // 密码
      };
      this.editDisplay = 'block'; // 显示编辑信息的窗口
      // 调用接口获取原始id
      this.getTeacherIdByUsername(oldUsername);
    },
    
    // 确定编辑老师信息
    makeSureEdit() {
      // 准备要发送到后端的数据，包含新的信息和原始的 old_username
      const updatedInfo = {
        ...this.editInfo,
        old_username: this.editInfo.username, // 新的用户名
        username: this.editInfo.old_username, // 原始的用户名
      };

      editTeacher(updatedInfo).then(response => {
        if (response.code === 200) {
          this.$message.success('编辑老师信息成功');
          this.editDisplay = 'none'; // 关闭编辑框
          this.getTeacherList(this.searchParams); // 重新获取老师列表
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

    // 设为管理员
    setTeacherManagerFun(row, managerType) {
      const data = {
        username: row.username, // 用户账号
        manager_type: managerType, // 管理员类型
      };
      console.log("data:", data);
      setTeacherManager(data).then(response => {
        if (response.code === 200) {
          // 使用 this.$set 确保响应性更新
          this.$set(row, 'manager_type', managerType);
          this.$message.success('设为管理员成功');
          this.getTeacherList(this.searchParams); // 重新获取老师列表
          console.log("guanliyuan:",this.tableData);
        } else {
          this.$message.error(response.msg);
        }
      }).catch(error => {
        console.error('设为管理员失败:', error);
        this.$message.error('设为管理员失败');
      });
    },

    // 处理设为管理员的下拉菜单命令
    handleSetManager(command) {
      if (!this.multipleSelection.length) {
        this.$message.warning('请选择至少一个老师');
        return;
      }
      // 现在 command 包含了点击的管理员类型，比如 "grade1"
      const managerType = command; // 根据实际需求可能需要转换或处理这个值
      // 遍历所有选中的行，并执行设置管理员操作
      console.log(managerType, "managertype");
      this.multipleSelection.forEach(row => {
        this.setTeacherManagerFun(row, managerType); // 需要传递 managerType
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
          this.getTeacherList(this.searchParams); // 重新获取老师列表
        } else {
          this.$message.error(response.msg);
        }
      }).catch(error => {
        console.error('删除老师失败:', error);
        this.$message.error('删除老师失败');
      });
    },
    //批量导出用户信息
    // exportInfo() {
    //   if (this.selectedArr.length === 0) {
    //     Message({
    //       message: "请选择你要批量导出的人员",
    //       type: "warning",
    //     });
    //   } else {
    //     exportData(this.selectedArr);
    //     this.init();
    //   }
    // },
    // 批量导出
    // 批量导出
    async exportTeachers() {
      if (this.selectedArr.length === 0) {
        this.$message.warning('请选择您要导出的老师');
        return;
      }

      try {
        // 显示导出加载提示
        this.$message.info('正在导出...');

        // 调用 API 进行导出操作
        const response = await outputMultipleTeacher({
          selected_teachers: this.selectedArr,
        });

        // 检查响应状态
        if (response && response.code === 200) {
          // 假设服务器返回的是一个 Blob，并且设置了正确的 Content-Disposition 头
          const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/vnd.ms-excel' }));
          const link = document.createElement('a');
          link.href = url;
          link.download = 'teachers-exported-data.xlsx'; // 设置下载文件名
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url); // 清理
          this.$message.success('批量导出成功');
        } else {
          this.$message.error('批量导出失败');
        }
      } catch (error) {
        console.error('批量导出失败:', error);
        this.$message.error('批量导出失败');
      }

      // 可选：重新获取老师列表，更新页面显示
      // this.getTeacherList(this.searchParams);
    },
    //示例窗口的出现
    exampleOpen() {
      this.cardDisplay = true
      document.getElementById('exampleId').style = "pointer-events: auto;"
    },

    //示例窗口的消失
    exampleClose() {
      this.cardDisplay = false
    },
    // 示例窗口的出现
    exampleOpen() {
      this.cardDisplay = true;
      document.getElementById('exampleId').style.pointerEvents = 'auto';
    },

    // 示例窗口的消失
    exampleClose() {
      this.cardDisplay = false;
    },
    handleGenderChange(value) {
      console.log('Selected gender:', value);
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
          height: 70%;
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
            .el-form-item[prop="user_gender"] .el-select {
            width: 100%; /* 为特定表单项设置宽度 */
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
          height: 60%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          // padding-left: 20px;
          overflow: hidden;

          .el-upload {
            width: 80%;
            padding: 1px;
            position: absolute;
          }

          .el-upload__tip {
            width: 80%;
            margin: 10px auto;
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