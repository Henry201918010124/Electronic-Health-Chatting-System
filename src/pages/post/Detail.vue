<template>
  <div>
    <div style="background-color: white; padding: 20px; margin-top: 10px">
      <div class="d-flex align-items-center">
        <img
          class="img-50 rounded-circle mr-3"
          :src="post.user.avatar"
          alt="avatar"
        />
        <div>
          <p style="font-size: 24px; margin-bottom: 10px">
            {{ post.post.title }}
          </p>
          <p style="color: #8590a6" class="mt-5">
            {{ post.user.username }} post at: {{ post.post.ctime }}
          </p>
        </div>
      </div>
      <div v-html="post.post.content" style="margin-top: 30px"></div>
    </div>
  </div>
</template>
<script>
import { postDetail } from "@/api/infos";
export default {
  data() {
    return {
      post: {},
    };
  },
  mounted() {
    postDetail(this.$route.params.pid).then((res) => {
      this.post = res.data;
    });
  },
};
</script>