<template>
  <div class="login-container">
    <el-form
      autoComplete="on"
      :model="loginForm"
      :rules="loginRules"
      ref="loginForm"
      label-position="left"
      label-width="0px"
      class="card-box login-form"
    >
      <div class="left">
        <p style="padding-left: 20px">
          <i class="iconfont">&#xe603;</i>
          <span style="font-weight: 800; font-family: '楷体'; font-size: 20px"
            >成长档案</span
          >
        </p>
        <div>
          <p class="text1">欢迎回来</p>
          <p class="text2">这里是一款管理大学学习生活记录的平台</p>
          <p class="text2">管理 从这里开始！</p>
        </div>
      </div>
      <div class="right">
        <h3 class="title">后台登录</h3>
        <el-form-item prop="username">
          <!-- autoComplete="on"告诉浏览器尝试根据用户之前输入的值自动填充该字段 -->
          <el-input
            name="username"
            type="text"
            v-model="loginForm.username"
            autoComplete="on"
            placeholder="username"
          >
            <template slot="prepend"
              ><i class="el-icon-user" style="font-size: 16px"></i
            ></template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            name="password"
            type="password"
            @keyup.enter.native="handleLogin"
            v-model="loginForm.password"
            autoComplete="on"
            placeholder="password"
          >
            <template slot="prepend"
              ><i class="el-icon-lock" style="font-size: 16px"></i
            ></template>
          </el-input>
        </el-form-item>
        <div class="verificationContainer">
          <div class="verificationLeft">
            <el-input
              name="Verification"
              type="text"
              v-model="loginForm.verify"
              autoComplete="on"
              placeholder="请输入验证码"
              id="verification"
            >
              <template slot="prepend"
                ><i class="iconfont">&#xe609;</i></template
              >
            </el-input>
          </div>
          <div class="verificationRight">
            <img src="" alt="" @click="getPicCodeFun"/>
          </div>
        </div>
        <el-form-item>
          <el-button
            type="primary"
            size="medium"
            :loading="loading"
            @click="handleLogin"
          >
            登录
          </el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
// import { isvalidUsername } from "@/utils/validate";
import { getPicCode } from "../../api/login";
import { login } from "../../api/login";
import { Message } from "element-ui";
export default {
  name: "login",
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
        verify: "", //图形验证码
        base_code: "", //base64码
        verify_id: "", //验证码的id
        right_verify: "", //正确的图形验证码
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur" }, //填写规则，必填+失去焦点时提交
        ],
        password: [{ required: true, trigger: "blur" }],
      },
      loading: false,
    };
  },
  methods: {
    //登录
    async handleLogin() {
      if (this.loginForm.verify === null) {
        Message("验证码不能为空！");
      }
      // console.log(this.loginForm.right_verify, "???");
      //判断验证码是否正确
      if (this.loginForm.verify === this.loginForm.right_verify) {
        console.log(this.loginForm.verify,'111111');
        const data = await login(
          this.loginForm.username,
          this.loginForm.password,
          this.loginForm.verify,
          this.loginForm.verify_id
        );
        console.log(data,'22222');
        const code = data.code;
        console.log(data.code,'code');
        if (code === 200) {
          console.log('000000');
          this.$store.dispatch("user/userInfo", data.data);
          this.$store.dispatch("user/tokenIn", data.data.token); //把token存到vuex中
          this.$router.push('/layout')  
        }
      } else {
        Message("验证码输入错误，请重新输入！");
      }
    },
    //获取图形验证码
    async getPicCodeFun() {
      try {
        const codeData = await getPicCode();
        console.log(codeData, "data"); // 检查后端响应

        if (codeData.code === 200) {
          this.loginForm.base_code = codeData.data.B64; // 获取 base64 编码
          this.loginForm.verify_id = codeData.data.Id; // 获取验证码的 ID
          this.loginForm.right_verify = codeData.data.Hcode; // 获取正确的验证码
          console.log(this.loginForm.right_verify, "verify");

          // 处理 Data URI
          const base64String = this.loginForm.base_code.split(",")[1];
          console.log(this.loginForm.base_code,'111');
          if (!base64String) {
            throw new Error("Invalid base64 string in Data URI");
          }

          const blob = this.convertBase64ToBlob(base64String);
          const imageUrl = URL.createObjectURL(blob);

          // 假设 img 元素已经在 HTML 中
          const img = document.querySelector("img");
          if (img) {
            img.src = imageUrl;
          } else {
            console.error("Image element not found");
          }
        } else {
          console.error("Failed to fetch picture code", codeData);
        }
      } catch (error) {
        console.error("Error in getPicCodeFun:", error);
      }
    },
    // 生成 blob 对象
    convertBase64ToBlob(base64) {
      const binary = atob(base64);
      const array = [];
      for (let i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }
      return new Blob([new Uint8Array(array)], { type: "image/jpeg" });
    },
  },
  async mounted() {
    try {
      await this.getPicCodeFun();
      console.log("Picture code fetched successfully");
    } catch (error) {
      console.error("Error in mounted hook:", error);
    }
  },
};
</script>

<style rel="stylesheet/scss" lang="scss">
* {
  box-sizing: border-box;
}
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;

  .el-form {
    display: flex;
  }
  .left {
    width: 37%;
    background-color: #b2c3b3; //#657459
    float: left;
    .text1 {
      text-align: center;
      margin-top: 80px;
      font-family: "楷体";
      font-size: 22px;
    }
    .text2 {
      text-align: center;
      font-size: 16px;
      padding: 0 40px;
      color: #fff;
      font-family: "楷体";
    }
    .text1 {
      text-align: center;
      margin-top: 80px;
      font-family: "楷体";
      font-size: 22px;
    }
    .text2 {
      text-align: center;
      font-size: 16px;
      padding: 0 40px;
      color: #fff;
      font-family: "楷体";
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: #889aa4;
    vertical-align: middle;
    width: 30px;
    display: inline-block;

    .svg-icon {
      width: 1em;
      height: 1em;
      vertical-align: -0.15em;
      fill: currentColor;
      overflow: hidden;
    }
  }
  .right {
    padding: 40px 45px 30px 45px;
    margin: 0 auto;
    text-align: center;

    img {
      width: 93%;
      height: 32px;
      background-color: #889aa4;
    }
    .title {
      font-size: 26px;
      font-weight: 400;
      color: #333;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    #ver {
      height: 32px;
    }

    .verificationContainer {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      // height: 100%;
    }

    .verificationLeft {
      flex: 5;
    }

    .verificationRight {
      flex: 2;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
    }

    .el-form-item {
      border-radius: 5px;
      color: #454545;
      margin: 30px 0px;
    }

    .el-form-item::before,
    .el-form-item::after {
      content: none;
    }
    .el-radio {
      margin-bottom: 15px;
    }
    .el-button {
      width: 100px;
      border-radius: 20px;
      background-color: #b2c3b3;
      border: none;
    }
  }
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 40%;
    margin: 120px auto;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
}
</style>
