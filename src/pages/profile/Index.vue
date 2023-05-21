<template>
  <div class="mt-5rem">
    <el-descriptions class="margin-top" :column="3" border>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          Username
        </template>
        {{ $store.state.user.username }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-mobile-phone"></i>
          Phone
        </template>
        {{ $store.state.user.phone || "No phone" }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-location-outline"></i>
          Age
        </template>
        {{ $store.state.user.age || "No age" }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          Email
        </template>
        {{ $store.state.user.email || "No email" }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building"></i>
          Address
        </template>
        {{ $store.state.user.address || "No address" }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building"></i>
          Join
        </template>
        {{ $store.state.user.timestamp || "No join" }}
      </el-descriptions-item>
    </el-descriptions>
    <el-row class="mt-5">
      <el-col :span="24">
        <el-tabs type="border-card" @tab-click="changePage">
          <el-tab-pane label="Chat" @tab-click="$router.push('/profile/chat')"
            ><router-view></router-view
          ></el-tab-pane>
          <el-tab-pane
            label="Pay Record"
            @tab-click="$router.push('/profile/pay')"
            ><router-view></router-view
          ></el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: { id: 1, displayName: "June", avatar: "" },
    };
  },
  mounted() {},
  methods: {
    changePage(el) {
      console.log(el);
      console.log(el.name);
      switch (el.index) {
        case "0":
          this.$router.push("/profile/chat");
          break;
        case "1":
          this.$router.push("/profile/pay");
          break;
        default:
          break;
      }
    },
  },
};
</script>