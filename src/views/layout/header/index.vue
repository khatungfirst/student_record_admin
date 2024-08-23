<template>
  <header class="app-header">
    <div class="collapse-btn" @click="collapseChange">
      <!-- 通过v-if和v-else来控制折叠按钮的状态 -->
      <i v-if="!collapse" class="el-icon-s-fold" style="font-size: 22px;margin-right: 10px;" ></i>
      <i v-else class="el-icon-s-unfold" style="font-size: 22px;margin-right: 10px;" ></i>
    </div>
    <i class="iconfont" style="font-size: 20px">&#xe603;</i>
    教育管理系统
    <div class="header-right">
      <el-avatar style="width: 30px;height:30px;" :src="avatar"></el-avatar>
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          管理员：<span></span> <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu class="user-dropdown" slot="dropdown">
          <router-link class="inlineBlock" to="/layout/desktop">
            <el-dropdown-item>返回首页</el-dropdown-item>
          </router-link>
        </el-dropdown-menu>
      </el-dropdown>|
      <span @click="logout">
        <i class="el-icon-switch-button" ></i>退出
      </span>
    </div>
  </header>
</template>

<script>
import bus from '@/utils/bus'
import {getDetailInfo} from '@/api/userInfo'
export default {
  name: "AppHeader",
  data() {
    return {
      //头像
      avatar:"",
      //折叠栏初始状态
      collapse: false,
    };
  },
  mounted(){
    this.init()
  },
  methods: {
    logout() {
      this.$store.dispatch("user/LogOut")
      this.$router.push('/login')
    },
    async init(){
      const data = await getDetailInfo()
      this.avatar = data.data.avatar
      this.$store.dispatch('user/permissionInto',data.data.perms)
    },
     //设置侧边栏折叠事件对应的方法
     collapseChange() {
      this.collapse = !this.collapse;
      //通过bus发送消息
      bus.$emit("collapse", this.collapse);
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
*{
  box-sizing: border-box;
}
.app-header {
  position: relative;
  height: 48px;
  line-height: 48px;
  background: #657459;
  width: 100%;
  padding-left: 20px;
  color: #fff;

  .collapse-btn {
    display: inline-block;
  }

  .header-logo {
    display: inline-block;
    width: 30px;
    height: 30px;
    vertical-align: middle;
    margin-right: 5px;
  }

  .header-right {
    position: absolute;
    height: 48px;
    line-height: 48px;
    display: block;
    right: 0px;
    top: 0;
    color: #fff;
    padding-right: 20px;

    .avatar-wrapper {
      cursor: pointer;
      position: relative;
      line-height: 38px;
      color: #fff;
      margin-right: 15px;
    }

    .el-avatar {
      position: relative;
      top: 10px;
      margin-right: 10px;
    }
    .el-icon-switch-button {
      margin: 0px 5px 0px 10px;
    }
    span:hover {
      cursor: pointer;
    }
  }
}
</style>
