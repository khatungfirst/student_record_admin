<template>
  <div class="wrapper">
    <el-form
      autoComplete="on"
      :model="loginForm"
      :rules="loginRules"
      ref="loginForm"
      label-position="left"
      label-width="0px"
      class="card-box login-form"
    >
      <h1>Login</h1>
      <div class="input-box">
        <i class="el-icon-message"></i>
        <input
          id="usernameInput"
          type="username"
          required
          v-model="loginForm.username"
         
        />
        <!-- <input id="usernameInput"type="username" required /> -->
        <label ref="usernameLabel" :class="{ labels: label }">账号</label>
      </div>
      <div class="input-box">
        <i class="el-icon-lock"></i>
        <input
          id="passwordInput"
          type="password"
          required
          v-model="loginForm.password"
         
        />
        <label ref="passwordLabel">密码</label>
      </div>
      <div class="input-box">
        <img src="" alt="" @click="getPicCodeFun" />
        <input
          id="verifyInput"
          required
          v-model="loginForm.verify"
        />
        <label>验证码</label>
      </div>

      <el-form-item>
        <el-button
          type="primary"
          size="medium"
          :loading="loading"
          @click="handleLogin"
          class="btn"
        >
          Login
        </el-button>
      </el-form-item>
      <!-- <button  onclick="handleLogin()" class="btn">Login</button> -->
    </el-form>
  </div>
</template>

<script>
// import { isvalidUsername } from "@/utils/validate";11
import { getPicCode } from "../../api/login";
import { login } from "../../api/login";
import { Message } from "element-ui";
import { EventBus } from "../../main";
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
          {
            required: true,
            trigger: "blur",
            min: 11,
            max: 11,
            message: "账号（学号或者手机号）必须是11位",
          }, //填写规则，必填+失去焦点时提交
        ],
        password: [
          {
            required: true,
            trigger: "blur",
            min: 5,
            message: "密码必须在5位以上",
          },
        ],
      },
      loading: false,
      //控制字体是否向上移动
      label: false,
    };
  },
  // mounted() {
  //   console.log('--------');

  //   console.log(this.loginForm.username,'username');

  //   if(this.loginForm.username === ''){
  //     console.log('-------------');

  //     this.label = true
  //   }
  // },
  methods: {
    //登录
    async handleLogin() {
      if (this.loginForm.verify === null) {
        Message("验证码不能为空！");
      }
      // console.log(this.loginForm.right_verify, "???");
      //判断验证码是否正确
      if (this.loginForm.verify === this.loginForm.right_verify) {
        console.log(this.loginForm.verify, "111111");
        const data = await login(
          this.loginForm.username,
          this.loginForm.password,
          this.loginForm.verify,
          this.loginForm.verify_id
        );
        const code = data.code;
        if (code === 200) {
          this.$store.dispatch("user/userInfo", data.data);
          this.$store.dispatch("user/tokenIn", data.data.token); //把token存到vuex中
          this.$router.push("/layout");
        }
      } else {
        Message("验证码输入错误，请重新输入！");
      }
    },
    //获取图形验证码
    async getPicCodeFun() {
      try {
        const codeData = await getPicCode();
        if (codeData.code === 200) {
          this.loginForm.base_code = codeData.data.B64; // 获取 base64 编码
          this.loginForm.verify_id = codeData.data.Id; // 获取验证码的 ID
          this.loginForm.right_verify = codeData.data.Hcode; // 获取正确的验证码
          console.log(this.loginForm.right_verify, "verify");

          // 处理 Data URI
          const base64String = this.loginForm.base_code.split(",")[1];
          console.log(this.loginForm.base_code, "111");
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
  font-family: "Poppins", sans-serif;
  box-sizing: border-box;
}
body {
  min-height: 100vh;
  background: url(../../../static/img/bgc.jpg);
  background-size: cover;
  background-position: center;
}

.labels {
  position: absolute;
  top: -5px;
}

.wrapper {
  position: relative;
  width: 400px;
  height: 450px;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(15px);
  margin: auto;
}

.wrapper:hover {
  box-shadow: 0 0 40px rgba(255, 255, 255, 0.5);
  // background: #46474e;
}

.wrapper h1 {
  font-size: 2em;
  color: #fff;
  text-align: center;
}

.wrapper .input-box {
  position: relative;
  width: 310px;
  margin: 30px 0;
  border-bottom: 2px solid #fff;
}

.wrapper .input-box input {
  width: 100%;
  height: 50px;
  background: transparent;
  outline: none;
  border: none;
  font-size: 1em;
  color: #fff;
  padding: 0 40px 0 5px;
  //去除自动填充的白色背景
  &:-webkit-autofill,
  textarea:-webkit-autofill,
  select:-webkit-autofill {
    -webkit-text-fill-color: #fff !important;
    -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
    background-color: transparent;
    background-image: none;
    transition: background-color 50000s ease-in-out 0s; //背景色透明  生效时长  过渡效果  启用时延迟的时间
  }
}

.wrapper .input-box label {
  position: absolute;
  top: 50%;
  left: 5px;
  transform: translateY(-50%);
  font-size: 1em;
  color: #fff;
  pointer-events: none;
  transition: 0.5s;
}

.wrapper .input-box input:focus ~ label,
.wrapper .input-box input:valid ~ label {
  top: -5px;
}

.wrapper .input-box i {
  position: absolute;
  right: 8px;
  color: #fff;
  font-size: 1.2em;
  line-height: 57px;
}
.wrapper .input-box img {
  position: absolute;
  right: 8px;
}

.wrapper .row {
  margin: -15px 0 15px;
  font-size: 0.9em;
  color: #fff;
  display: flex;
  justify-content: space-between;
}

.wrapper .row label {
  display: flex;
  align-items: center;
  gap: 5px;
}

.wrapper .row a {
  color: #fff;
  text-decoration: none;
}

.wrapper .options a:hover {
  text-decoration: underline;
}

.wrapper .btn {
  width: 100%;
  height: 40px;
  background: #fff;
  outline: none;
  border: none;
  border-radius: 40px;
  cursor: pointer;
  font-size: 1em;
  font-weight: 500;
  color: #000;
  margin-top: 10px;
}

.btn:hover {
  background: #ffffea;
}

.wrapper .signup-link {
  font-size: 0.9em;
  color: #fff;
  text-align: center;
  margin: 25px 0 10px;
}

.wrapper .signup-link a {
  color: #fff;
  text-decoration: none;
  font-weight: 600;
}

.wrapper .signup-link a:hover {
  text-decoration: underline;
}

@media (max-width: 360px) {
  .wrapper {
    width: 100%;
    height: 100vh;
    border: none;
    border-radius: 0px;
  }

  .wrapper .input-box {
    width: 290px;
  }
  #img {
    z-index: -90;
  }
}
</style>
