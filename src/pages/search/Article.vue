<template>
  <div>
    <h3>Article Search Result</h3>
    <h4>Keyword: {{ keyword }}</h4>
    <div style="background-color: white; padding: 10px; margin-top: 10px">
      <div
        v-for="(post, idx) of posts"
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
import { searchArticle } from "../../api/infos";

export default {
  name: "ArticleSearch",
  data() {
    return {
      keyword: this.$route.query.keyword,
      posts: [],
    };
  },
  mounted() {
    searchArticle({ keyword: this.keyword }).then((res) => {
      console.log(res);
      this.posts = res.data;
    });
  },
};
</script>
