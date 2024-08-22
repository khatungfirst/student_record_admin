<template>
  <div class="container">
    <div class="app-container">
      <!-- 角色管理内容 -->
      <div class="role-operate">
        <el-button type="primary" size="mini" @click="showDialog = true">添加角色</el-button>
      </div>
      <!-- 表格组件 -->
      <el-table :data="list">
        <el-table-column label="角色名称" align="center" width="200" prop="role_name">
          <template v-slot="{ row }">
            <el-input v-if="row.isEdit" size="mini" v-model="row.editRow.role_name"></el-input>
            <span v-else>{{ row.role_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="角色编码" align="center" width="200" prop="role_Engname">
          <template v-slot="{ row }">
            <el-input v-if="row.isEdit" size="mini" v-model="row.editRow.role_Engname"></el-input>
            <span v-else> {{ row.role_Engname }} </span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="状态" align="center" width="200" prop="role_status"> -->
        <!-- 自定义列结构 -->
        <!-- <template v-slot="{ row }">
            <el-switch v-if="row.isEdit" v-model="row.editRow.role_status" :active-value="1"
              :inactive-value="0"></el-switch>
            <span v-else> {{ row.role_status === 1 ? "已启用" : row.role_status === 0 ? "未启用" : "无" }} </span>
          </template>
        </el-table-column> -->
        <el-table-column label="操作" align="center">
          <!-- 放置操作按钮 -->
          <template v-slot="{ row }">
            <template v-if="row.isEdit">
              <!-- 编辑状态 -->
              <el-button type="primary" size="mini" @click="btnEditOK(row)">确定</el-button>
              <el-button size="mini" @click="row.isEdit = false">取消</el-button>
            </template>
            <template v-else>
              <!-- 非编辑状态 -->
              <el-button size="mini" type="text" @click="btnPermission">分配权限</el-button>
              <el-button @click="btnEditRow(row)" size="mini" type="text">编辑</el-button>
              <el-popconfirm title="你确定要删除吗?" @confirm="confirmDel(row.role_id)">
                <el-button size="mini" type="text" slot="reference">删除</el-button>
              </el-popconfirm>
            </template>
          </template>
        </el-table-column>

      </el-table>
      <!-- 分页组件 -->
      <el-row type="flex" style="height: 60px;" align="middle" justify="start">
        <!-- 分页组件 -->
        <el-pagination @current-change="changePage" :page-size="pageParams.pageSize" :current-page="pageParams.page"
          :total="pageParams.total" layout="prev, pager, next">
        </el-pagination>
      </el-row>
    </div>
    <!-- 放置弹层 -->
    <!-- 添加.sync修饰符将showDialog设为false -->
    <el-dialog width="500px" title="新增角色" :visible.sync="showDialog">
      <!-- 表单内容 -->
      <el-form label-width="120px" :model="roleForm" :rules="rules" ref="roleFormRef">
        <el-form-item prop="role_name" label="角色名称">
          <el-input v-model="roleForm.role_name" style="width: 300px;" size="mini"></el-input>
        </el-form-item>
        <el-form-item prop="role_Engname" label="角色编码">
          <el-input v-model="roleForm.role_Engname" style="width: 300px;" size="mini"></el-input>
        </el-form-item>
        <!-- 如果不需要校验 就不需要写prop属性 -->
        <!-- 重置表单数据, 需要prop属性 -->
        <!-- <el-form-item label="启用" prop="role_status">
          <el-switch v-model="roleForm.role_status" :active-value="1" :inactive-value="0" size="mini"></el-switch>
        </el-form-item> -->
        <template>
          <el-form-item prop="selectedPermission" label="数据权限" class="data-permission-form-item">
            <el-input size="mini" :placeholder="`请选择数据权限`" v-model="selectedPermission" @focus="showOptions = true"
              @keyup.native.enter="handleSelect" ref="inputRef">
              <template #append>
                <el-icon :class="{ 'rotate': showOptions }" class="el-icon-arrow-down el-icon--right" />
              </template>
            </el-input>
            <el-select v-model="roleForm.selectedPermission" placeholder="请选择数据权限" style="width: 300px; display:none;"
              @change="handleSelect" @blur="hideOptions">
              <el-option label="全部数据" value="all"></el-option>
              <el-option label="大一用户数据" value="year1"></el-option>
              <el-option label="大二用户数据" value="year2"></el-option>
              <el-option label="大三用户数据" value="year3"></el-option>
              <el-option label="大四用户数据" value="year4"></el-option>
              <el-option label="本班用户数据" value="class"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" justify="end">
              <el-col span="12">
                <el-button @click="btnOK" type="primary" size="mini">确定</el-button>
                <el-button @click="btnCancel" size="mini">取消</el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </template>
      </el-form>
    </el-dialog>
    <!-- 放置权限弹层 -->
    <el-dialog :visible.sync="showPermissionDialog" title="分配权限">
      <!-- 放置权限数据 -->
      <el-tree></el-tree>
    </el-dialog>
  </div>
</template>

<script>
import { getRoleList, addRole, updateRole, delRole } from '../../api/role.js';

export default {
  name: 'rolemanagement',
  directives: {
    // 引入 v-click-outside 指令
    ClickOutside: {
      bind(el, binding, vnode) {
        // 点击外部关闭下拉菜单
        const callback = (event) => {
          if (!el.contains(event.target)) {
            vnode.context[binding.expression]();
          }
        };
        el.clickOutsideEvent = callback;
        document.addEventListener('click', callback);
      },
      unbind(el) {
        // 解绑指令时，移除事件监听器
        document.removeEventListener('click', el.clickOutsideEvent);
      }
    }
  },
  data() {
    return {
      list: [], // 角色列表数据
      showDialog: false, // 控制弹层显示隐藏
      // 将分页信息放置到一个对象中
      pageParams: {
        page: 1, // 当前页面
        pageSize: 6, //每页条数
        total: 50 // 总数
      },
      roleForm: {
        role_name: '',
        role_Engname: '',
        // role_status: 0,
        selectedPermission: ''
      },
      rules: {
        role_name:
          // required: true指定字段是否为必填项。如果设置为 true，那么在提交表单时，如果字段为空，将触发验证错误。
          // message: '角色名称不能为空'，当验证失败时，这个消息将被显示给用户。
          // trigger: 'blur'这个属性定义了何时触发验证。'blur' 表示当字段失去焦点时进行验证。其他可能的值包括 'change'（字段值变化时触发）或 'submit'（表单提交时触发）
          [{ required: true, message: '角色名称不能为空', trigger: 'blur' }],
        role_Engname:
          [{ required: true, message: '角色编码不能为空', trigger: 'blur' }],
        selectedPermission:
          [{ required: true, message: '权限分配不能为空', trigger: 'blur' }],
      },
      showPermissionDialog: false,
      // 新增
      selectedPermission: '', // 存储选中的数据权限

    }
  },
  created() {
    this.getRoleList();
  },
  methods: {
    async getRoleList() {
      try {
        // 使用 this.pageParams 作为参数调用 API 获取角色列表
        const response = await getRoleList(this.pageParams);
        console.log(response);

        // 检查响应的 code 是否为 200，并且 data 是否为数组
        if (response.code === 200 && Array.isArray(response.data)) {
          // 解构 data 属性，赋值给 this.list
          this.list = response.data;
          // 如果需要 total，并且响应中包含 total 数量信息，可以赋值给 this.pageParams.total
          // 如果 response 不包含 total，可以删除或注释掉下面这行代码
          // this.pageParams.total = response.data.total;

          // 为列表中的每个角色添加额外的属性
          this.list.forEach(item => {
            // 使用 this.$set 确保新属性是响应式的
            this.$set(item, 'isEdit', false);
            // 复制需要编辑的字段，确保可以追踪原始值
            this.$set(item, 'editRow', {
              role_name: item.role_name,
              role_Engname: item.role_Engname,
            });
          });
        } else {
          // 如果响应的 code 不是 200，或者 data 不是数组，抛出错误
          throw new Error('Invalid data format');
        }
      } catch (error) {
        // 打印错误堆栈到控制台
        console.error('Error fetching role list:', error);
        // 显示错误信息给用户
        this.$message.error('Failed to fetch role list');
      }
    },
    // 切换分页时请求新的数据
    changePage(newPage) {
      // 改变当前页码为新的页码
      this.pageParams.page = newPage;
      // 重新请求数据
      this.getRoleList();
    },
    focusInput() {
      this.showOptions = true;
    },
    blurInput() {
      this.showOptions = false;
    },
    handleSelect(value) {
      // 处理选中的数据权限
      this.selectedPermission = value;
      this.$message.success(`已选择数据权限: ${value}`);
      // 选中后隐藏下拉菜单
      this.showOptions = false;
    },
    hideOptions() {
      // 隐藏下拉菜单
      this.showOptions = false;
    },
    btnOK() {
      this.refs.roleForm.validate(async isOK => {
        if (isOK)
          await addRole(this.roleForm)
        this.$message.success('新增角色成功')
        this.getRoleList()
        this.btnCancel()
      })
    },
    btnCancel() {
      this.$refs.roleForm.resetFields() // 重置表单数据
      this.showDialog = false //关闭弹层
    },
    btnEditRow(row) {
      row.isEdit = true // 改变行的编辑状态 
      row.editRow.role_name = row.role_name
      row.editRow.role_Engname = row.role_Engname
      // // row.editRow.role_status = row.role_status
    },
    // 点击确定时触发
    async btnEditOK(row) {
      if (row.editRow.role_Engname && row.editRow.role_name) {
        // 下一步操作
        await updateRole({ ...row.editRow, id: row.role_id });
        // 更新成功
        this.$message.success('更新角色成功')
        // 更新页面回显数据, 退出编辑状态
        // Object.assign(target, source)
        Object.assign(row, {
          ...editRow,
          isEdit: false
        })
      } else {
        this.$message.warning('角色和编码不能为空')
      }
    },
    async confirmDel(role_id) {
      await delRole(role_id)
      this.$message.success('删除角色成功')
      // 删除的如果是最后一个
      if (this.list.length === 1) this.pageParams.page--
      // 重新加载数据
      this.getRoleList()
    },
    btnPermission() {
      this.showPermissionDialog = true
    }
  }
}
</script>

<style scoped>
.role-operate {
  padding: 10px;
}

/* 添加样式以默认隐藏下拉菜单，通过 showOptions 控制 */
.select-container {
  display: none;
}
</style>