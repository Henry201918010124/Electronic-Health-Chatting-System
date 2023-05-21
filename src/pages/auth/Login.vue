<template>
  <div class="text-center mt-5rem">
    <div class="card">
      <h1>Login</h1>
      <el-form
        :model="loginData"
        status-icon
        :rules="rules"
        ref="loginForm"
        label-width="100px"
      >
        <el-form-item label="Username" prop="username">
          <el-input v-model="loginData.username"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input
            type="password"
            v-model="loginData.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <div style="text-align: right">
            <el-button type="primary" @click="login">Login</el-button>
          </div>
        </el-form-item>
      </el-form>
      <div class="text-right ps-12 bold-font">
        <span>Don't have an account? </span>
        <a @click="gotoRegister()" class="text-primary hand">Register</a>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from "@/api/auth";
import { setToken } from "@/util/token";
import { showMessage } from "@/util/notice";
import { setStorage } from "@/util/token";

export default {
  name: "Login",
  data() {
    return {
      loginData: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "Username is required.", trigger: "blur" },
          {
            min: 3,
            max: 32,
            message: "Username's length must between 3 and 32.",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "Password is required.", trigger: "blur" },
          {
            min: 8,
            max: 20,
            message: "Password's length must between 8 and 20.",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    gotoRegister() {
      this.$router.push("/register");
    },
    login() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          login(this.loginData).then((res) => {
            if (res.code === 200) {
              setToken("Access-Token", "Bearer " + res.access_token);
              showMessage("Login successfully!", "success");
              setStorage('avatar', res.user.avatar)
              setStorage('balance', res.user.balance)
              setStorage('user', JSON.stringify(res.user))
              this.$store.commit('setAvatar', res.user.avatar)
              this.$store.commit("setIsLogined", true);
              this.$store.commit("setBalance", res.user.balance);
              this.$store.commit("setUser", res.user);
              this.$router.push("/");
            } else {
              showMessage("error", res.message);
            }
          });
        } else {
          return false;
        }
      });
    },
  },
};
</script>
