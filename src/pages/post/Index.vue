<template>
  <div>
    <h2>Articles</h2>
    <el-button type="primary" @click="$router.push('new-post')"
      >New Article</el-button
    >
    <div style="background-color: white; padding: 10px; margin-top: 10px">
      <div
        v-for="(post, idx) of postList"
        :key="idx"
        class="d-flex align-items-center"
        style="
          border-bottom: 1px solid #ccc;
          padding-bottom: 10px;
          padding-top: 10px;
        "
      >
        <img
          class="img-50 rounded-circle mr-3"
          :src="post.avatar"
          alt="avatar"
        />
        <div>
          <p
            style="font-size: 24px; margin-bottom: 10px; cursor: pointer"
            @click="$router.push('/post/detail/' + post.id)"
          >
            {{ post.title }}
          </p>
          <p v-html="$options.filters.ellipsis(post.content)"></p>
          <p style="color: #8590a6" class="mt-5">
            {{ post.username }} post at: {{ post.ctime }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { postList } from "@/api/infos";
export default {
  filters: {
    ellipsis(value) {
      value = value.replace(/<.*?>/gi, "");
      if (value.length > 200) {
        return value.slice(0, 200) + "...";
      } else {
        return value;
      }
    },
  },
  data() {
    return {
      postList: [],
    };
  },
  mounted() {
    postList().then((res) => {
      this.postList = res.data;
    });
  },
};
</script>
