<template>
  <header class="app-header">
    <i class="iconfont" style="font-size: 20px">&#xe603;</i>
    教育管理系统
    <div class="header-right">
      <el-avatar style="width: 30px;height:30px;" :src="avatar"></el-avatar>
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          管理员：<span></span> <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu class="user-dropdown" slot="dropdown">
          <router-link class="inlineBlock" to="/">
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
import {getDetailInfo} from '@/api/userInfo'
export default {
  name: "AppHeader",
  data() {
    return {
      //头像
      avatar:""
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
    }
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
