<template>
  <div>
    <div class="text-center">
      <img src="../assets/index-img.png" alt="" style="width: 20%" />
      <p class="mt-0 logo-font">Online-Hospital</p>
    </div>
    <el-input
      placeholder="Department/Doctor/Article"
      v-model="keyword"
      class="input-with-select"
    >
      <el-select v-model="searchType" slot="prepend" placeholder="请选择">
        <el-option label="Doctor" value="1"></el-option>
        <el-option label="Article" value="2"></el-option>
      </el-select>
      <el-button
        slot="append"
        icon="el-icon-search"
        @click="search"
      ></el-button>
    </el-input>
    <div class="card mt-5rem">
      <h3 class="mt-0">Departments</h3>
      <div class="d-flex flex-wrap justify-content-sb">
        <div
          v-for="(department, idx) in departments"
          :key="department.id"
          class="mr-3rem mt-5 tab"
          :class="{ 'tab-active': idx === currentTab }"
          @click="changeDepartment(idx, department.id)"
        >
          {{ department.name }}
        </div>
      </div>
      <button class="primary-btn cursor">Online Consultation</button>
      <div class="department-content" v-show="!loadding">
        <div class="department-description mt-5">
          <p>{{ description }}</p>
        </div>
        <p style="margin-top: 1rem; font-size: 20px; font-weight: bold">
          <span
            style="border-right: 5px solid #a6ffc4; margin-right: 3px"
          ></span
          >Doctors
        </p>
        <div class="department-doctors d-flex flex-wrap">
          <Card
            v-for="doctor in doctors"
            :key="doctor.id"
            :name="doctor.name"
            :avatar="doctor.avatar"
            :price="doctor.price"
            :description="doctor.description"
            :level="doctor.level"
            :hospital="doctor.hospital"
            :doctorId="doctor.id"
            @askDoctor="askDoctor"
          ></Card>
        </div>
      </div>
      <div class="text-center" v-show="loadding">
        <Loader></Loader>
      </div>
    </div>
    <el-dialog
      title="Ask Doctor"
      :visible.sync="showMessageBox"
      width="50%"
      :modal="false"
    >
      <div>
        <div class="d-flex" style="margin-bottom: 10px">
          <img :src="currentDoctor.avatar" class="img-50 rounded-circle" />
          <div>
            <p style="font-size: 18px">{{ currentDoctor.username }}</p>
            <p>{{ currentDoctor.hospital }}</p>
          </div>
        </div>
        <div
          ref="messageBox"
          style="
            background: #eee;
            padding: 10px;
            height: 300px;
            overflow-y: auto;
          "
        >
          <div
            class="d-flex"
            v-for="(msg, idx) of myMessages"
            :key="idx"
            style="margin-bottom: 10px"
            :class="msg.uid === $store.state.user.userid ? 'flex-reverse' : ''"
          >
            <img class="img-50 rounded-circle" :src="msg.avatar" />
            <div
              class="sanjiao-icon"
              v-if="msg.uid === $store.state.user.userid"
            ></div>
            <div
              class="sanjiao-icon-reverse"
              v-if="msg.uid !== $store.state.user.userid"
            ></div>
            <div
              :class="
                msg.uid === $store.state.user.userid ? 'my-msg' : 'other-msg'
              "
            >
              <div v-html="msg.content"></div>
            </div>
          </div>
        </div>
        <div>
          <textarea v-model="message" class="messageBox"></textarea>
        </div>
        <div class="text-right">
          <el-button type="primary" class="mt-4" @click="sendMessage"
            >Send</el-button
          >
        </div>
      </div>
    </el-dialog>
    <router-view></router-view>
  </div>
</template>
<script>
import { showMessage, showNotice } from "@/util/notice";
import { getAllDepartment, getDepartmentDetail, userInfo } from "@/api/infos";
import Loader from "@/components/Loader";
import Card from "@/components/Card";
import { newContact, newMessage, messageList } from "../api/messages";
export default {
  components: {
    Loader,
    Card,
  },
  data() {
    return {
      message: "",
      currentDoctor: {},
      showMessageBox: false,
      loadding: true,
      keyword: "",
      searchType: "1",
      currentTab: 0,
      departments: [],
      currentDepartment: 0,
      description: "",
      doctors: [],
      myMessages: [],
    };
  },
  mounted() {
    this.getDepartments();
    if (this.$route.query.doctorId) {
      this.askDoctor(this.$route.query.doctorId, this.$route.query.price);
      // 去除路由参数
      const currentRoute = this.$route;
      const path = currentRoute.path;
      const params = { ...currentRoute.params };
      this.$router.replace({ path, params });
    }
  },
  methods: {
    sendMessage() {
      if (this.message === "") {
        this.$message.error("Please input message");
        return false;
      }
      newMessage({ content: this.message, to: this.currentDoctor.id }).then(
        (res) => {
          if (res.code === 200) {
            this.myMessages.push({
              content: this.message,
              avatar: this.$store.state.avatar,
              uid: this.$store.state.user.userid,
            });
            this.scrollToBottom();
          }
          this.message = "";
        }
      );
    },
    getDepartmentDetail() {
      this.loadding = true;
      getDepartmentDetail({ did: this.currentDepartment }).then((res) => {
        this.description = res.description;
        this.doctors = res.doctors;
        this.loadding = false;
      });
    },
    changeDepartment(idx, id) {
      this.currentTab = idx;
      this.currentDepartment = id;
      this.getDepartmentDetail();
    },
    getDepartments() {
      getAllDepartment().then((res) => {
        this.departments = res.departments;
        this.currentDepartment = this.departments[0].id;
        this.getDepartmentDetail();
      });
    },
    search() {
      if (!this.keyword) {
        showMessage("Please input keyword", "error");
        return false;
      }
      if (this.searchType === "1") {
        this.$router.push({
          path: "/search/doctor",
          query: {
            keyword: this.keyword,
          },
        });
      } else {
        this.$router.push({
          path: "/search/article",
          query: {
            keyword: this.keyword,
          },
        });
      }
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.messageBox;
        container.scrollTop = container.scrollHeight;
      });
    },
    askDoctor(did, price) {
      this.$confirm(`This operate will cost ￥${price}, continue?`, "Notify", {
        confirmButtonText: "OK",
        cancelButtonText: "NO",
        type: "warning",
      }).then(() => {
        this.myMessages = [];
        userInfo(did).then((res) => {
          this.currentDoctor = res.data;
          newContact({ to: did }).then((res) => {
            if (res.code !== 403) {
              this.showMessageBox = true;
            }
            if (res.code === 200) {
              showNotice(res.msg, "Notification", "success");
              messageList({ did: this.currentDoctor.id }).then((res) => {
                for (let i = 0; i < res.data.length; i++) {
                  res.data[i].avatar = this.currentDoctor.avatar;
                  if (res.data[i].type === "image") {
                    res.data[
                      i
                    ].content = `<img src="${res.data[i].content}" style="max-width:300px"/>`;
                  }
                }
                this.myMessages = this.myMessages.concat(res.data);
                this.scrollToBottom();
              });
            }
          });
        });
      });
    },
  },
};
</script>
<style>
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.messageBox {
  border: 1px solid #ccc;
  resize: none;
  height: 100px;
  width: 903px;
  display: block;
  padding: 10px 0px 10px 10px;
}
.messageBox:focus {
  outline: none;
}
.my-msg {
  background-color: rgb(149, 235, 108);
  border-radius: 5px;
  max-width: 350px;
  padding: 5px 10px 5px 10px;
  color: black;
  align-self: auto;
}

.other-msg {
  background-color: white;
  border-radius: 5px;
  max-width: 350px;
  padding: 5px 10px 5px 10px;
  color: black;
  align-self: auto;
}

.sanjiao-icon {
  height: 0px;
  width: 0px;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-left: 5px solid rgb(149, 235, 108);
  transform: translateY(10px);
}

.sanjiao-icon-reverse {
  height: 0px;
  width: 0px;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-right: 5px solid white;
  transform: translateY(10px);
}

.flex-reverse {
  flex-direction: row-reverse;
}
</style>