<template>
  <div class="card mt-5rem">
    <h1>Register</h1>
    <el-form
      :model="registerData"
      :rules="rules"
      ref="registerForm"
      label-width="100px"
    >
      <el-form-item label="Username" prop="username">
        <el-input
          v-model="registerData.username"
          placeholder="Enter your username"
        ></el-input>
      </el-form-item>
      <el-form-item label="Email" prop="email">
        <el-input
          v-model="registerData.email"
          placeholder="Enter your email"
        ></el-input>
      </el-form-item>
      <el-form-item label="Phone" prop="phone">
        <el-input
          v-model="registerData.phone"
          placeholder="Enter your phone"
        ></el-input>
      </el-form-item>
      <el-form-item label="Gender" prop="gender">
        <el-select v-model="registerData.gender" placeholder="Select your gender">
          <el-option label="Male" value="male"></el-option>
          <el-option label="Female" value="female"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Age">
        <el-input
          v-model="registerData.age"
          placeholder="Enter your age"
        ></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input
          v-model="registerData.password"
          placeholder="Enter your password"
        ></el-input>
      </el-form-item>
      <el-form-item label="Confirm" prop="checkPassword">
        <el-input
          v-model="registerData.checkPassword"
          placeholder="Confirm your password"
        ></el-input>
      </el-form-item>
      <el-form-item label="Role" prop="role">
        <el-select v-model="registerData.role" placeholder="Select your role">
          <el-option
            v-for="role in roles"
            :key="role.id"
            :label="role.name"
            :value="role.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Section" v-show="isDoctor" prop="section">
        <el-select
          v-model="registerData.section"
          placeholder="Select your section"
        >
          <el-option
            v-for="section in sections"
            :key="section.id"
            :label="section.name"
            :value="section.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <div style="text-align: right">
          <el-button type="primary" @click="register">Register</el-button>
        </div>
      </el-form-item>
    </el-form>
    <div class="text-right ps-12 bold-font">
      <span>Have an account? </span>
      <a class="text-primary hand" @click="gotoLogin()">Login</a>
    </div>
  </div>
</template>
<script>
import { getRoles, getSections } from "@/api/infos";
import { register } from "@/api/auth";
import { showNotice } from "@/util/notice";


export default {
  name: "Register",
  data() {
    return {
      registerData: {
        username: "",
        email: "",
        phone: "",
        password: "",
        checkPassword: "",
        role: "",
        section: "",
        gender: "",
        age: "",
      },
      isDoctor: false,
      roles: [],
      sections: [],
      rules: {
        gender:[
          {required: true, message: 'Gender is required.', trigger: 'blur'}
        ],
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
        checkPassword: [
          {
            required: true,
            message: "Confirm password is required.",
            trigger: "blur",
          },
          {
            min: 8,
            max: 20,
            message: "Confirm's length must between 8 and 20.",
            trigger: "blur",
          },
        ],
        phone: [
          { required: true, message: "Phone is required.", trigger: "blur" },
          {
            min: 11,
            max: 11,
            message: "Phone's length must be 11.",
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "Email is required.", trigger: "blur" },
          {
            min: 5,
            max: 32,
            message: "Email's length must between 5 and 32.",
            trigger: "blur",
          },
        ],
        role: [
          { required: true, message: "Role is required.", trigger: "blur" },
        ],
        section: [],
      },
    };
  },
  watch: {
    "registerData.role": {
      handler(val) {
        if (val == "doctor") {
          this.isDoctor = true;
          this.rules.section = [
            {
              required: true,
              message: "Section is required.",
              trigger: "blur",
            },
          ];
        } else {
          this.isDoctor = false;
          this.rules.section = [];
          this.section = "";
        }
      },
    },
  },
  methods: {
    gotoLogin() {
      this.$router.push("/login");
    },
    register() {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          register(this.registerData).then(res=>{
            if(res.code === 200){
              showNotice("Register successfully!", "Notice", "success");
              this.$router.push('/login')
            }
          })
        }
      });
    },
  },
  mounted() {
    getRoles().then((res) => {
      this.roles = res.role;
    });
    getSections().then((res) => {
      this.sections = res.section;
    });
  },
};
</script>

<style scoped>
.el-select {
  width: 100%;
}
</style>