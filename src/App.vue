<template>
  <div id="app">
    <el-row>
      <el-col :span="5"><div class="header-content"></div></el-col>
      <el-col :span="14">
        <el-menu :default-active="activeIndex" mode="horizontal">
          <el-menu-item index="0" @click="$router.push('/')">Home</el-menu-item>
          <el-menu-item index="1" @click="$router.push('/post')">Article</el-menu-item>
        </el-menu></el-col
      >
      <el-col :span="5">
        <div
          class="header-content d-flex align-items-center flex-flow-row-reverse"
        >
          <el-button size="mini" class="mr-3" v-show="!isLogined"
            >Login</el-button
          >
          <el-dropdown class="mr-3" v-show="isLogined">
            <span class="el-dropdown-link">
              <el-avatar :src="avatar"></el-avatar>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="userInfo" @click.native="profile()"
                >Profile</el-dropdown-item
              >
              <el-dropdown-item command="logout" @click.native="logout()" ww
                >Logout</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
    <div>
      <el-row>
        <el-col :span="5">
          <img src="" alt="" />
        </el-col>
        <el-col :span="14">
          <router-view></router-view>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { removeStorage } from "@/util/token";
import { removeToken } from "@/util/token";
import { mapState } from "vuex";
export default {
  name: "App",
  data() {
    return {
      activeIndex: "1",
    };
  },
  computed: {
    ...mapState({
      isLogined: (state) => state.isLogined,
      avatar: (state) => state.avatar,
    }),
  },
  methods: {
    profile() {
      this.$router.push("/profile/chat");
    },
    logout() {
      removeToken("Access-Token");
      removeStorage("avatar");
      removeStorage("balance");
      this.$store.commit("setIsLogined", false);
      this.$store.commit("setAvatar", null);
      this.$store.commit("setBalance", 0);
      this.$router.push("/login");
      this.avatar = null;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.header-content {
  background-color: #ffffff;
  height: 61px;
  width: 100%;
  margin: 0 auto;
}
</style>
