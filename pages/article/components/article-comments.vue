<!--
 * @Author: your name
 * @Date: 2021-02-14 20:15:58
 * @LastEditTime: 2021-02-17 15:13:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \realworld-nuxtjs\pages\article\components\article-comment.vue
-->
<template>
  <div>
    <form class="card comment-form">
      <div class="card-block">
        <textarea
          class="form-control"
          placeholder="Write a comment..."
          rows="3"
          v-model="commentText"
        ></textarea>
      </div>
      <div class="card-footer">
        <img src="https://avatars.githubusercontent.com/u/18069061?s=400&u=c2a8dc6153f709a2b1ad2a5669410d4b066a8596&v=4" class="comment-author-img" />
        <button class="btn btn-sm btn-primary" @click="submit">Post Comment</button>
      </div>
    </form>

    <div class="card" v-for="comment in comments" :key="comment.id">
      <div class="card-block">
        <p class="card-text">
          {{ comment.body }}
        </p>
      </div>
      <div class="card-footer">
        <nuxt-link
          :to="{
            name: 'profile',
            params: {
              username: comment.author.usernmae,
            },
          }"
          class="comment-author"
        >
          <img :src="comment.author.image" class="comment-author-img" />
        </nuxt-link>
        &nbsp;
        <nuxt-link
          :to="{
            name: 'profile',
            params: {
              username: comment.author.usernmae,
            },
          }"
          class="comment-author"
          >{{ comment.author.usernmae }}</nuxt-link
        >
        <span class="date-posted">{{
          comment.createdAt | date("MMM DD, YYYY")
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getComments, postComments } from "@/api/article";
import { mapState } from "vuex";
export default {
  name: "articleComments",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      comments: [],
      commentText: ''
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  // 不需要SEO 直接走客户端渲染
  async mounted() {
    const { data } = await getComments(this.article.slug);
    this.comments = data.comments;
  },
  methods: {
    async submit() {
      const params= {
        body: this.commentText
      }
      const { data } = await postComments(this.article.slug,params)
      debugger
      console.log(data)
    }
  }
};
</script>

<style>
</style>