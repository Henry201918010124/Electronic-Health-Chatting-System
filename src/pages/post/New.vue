<template>
  <div>
    <h2>New Article</h2>
    <el-form>
      <el-form-item label="Title">
        <el-input v-model="title"></el-input>
      </el-form-item>
      <el-form-item label="Department">
        <el-select
          v-model="currentDept"
          placeholder="Please Select Department Department"
        >
          <el-option
            :label="dept.name"
            :value="dept.id"
            v-for="(dept, idx) of department"
            :key="idx"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Content">
        <el-input type="textarea" rows="20" v-model="content"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">Submit</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getAllDepartment, newPost } from "@/api/infos";
export default {
  name: "New",
  data() {
    return {
      title: "",
      content: "",
      currentDept: "",
      department: [],
    };
  },
  mounted() {
    getAllDepartment().then((res) => {
      this.department = res.departments;
    });
  },
  methods: {
    submit() {
      newPost({
        title: this.title,
        content: this.content,
        did: this.currentDept,
      }).then((res) => {
        if (res.code === 200) {
          this.$message.success("New Post Success");
          this.$router.push("/post");
        }
      });
    },
  },
};
</script>