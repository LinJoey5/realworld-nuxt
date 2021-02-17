<!--
 * @Author: your name
 * @Date: 2021-02-06 22:31:24
 * @LastEditTime: 2021-02-17 17:28:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \realworld-nuxtjs\pages\article\index.vue
-->
<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                  v-model="title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                  v-model="description"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                  v-model="body"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  v-model="tag"
                  @keydown.enter="addTag(tag)"
                />
                <div
                  class="tag-list"
                  v-for="(tag, index) in tagList"
                  :key="tag"
                >
                  <span class="tag-default tag-pill ng-binding ng-scope">
                    <i class="ion-close-round" @click="delTag(index)"></i>
                    {{ tag }}
                  </span>
                </div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
                @click="publishArticle"
              >
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createArticle, getArticle } from "@/api/article";
export default {
  // 在路由匹配组件渲染之前会先执行中间件处理
  middleware: "authenticated",
  name: "editor",
  data() {
    return {
      tag: "",
      tagList: [],
      title: "",
      description: "",
      body: "",
    };
  },
  // async asyncData({ params }) {
  //   const { data } = await getArticle(params.slug);
  //   const { article } = data;
  //   return {
  //     article,
  //   };
  // },
  async mounted() {
    const { data } = await getArticle(this.$route.params.slug);
    const { tagList, title, description, body } = data.article;
    this.tagList = tagList
    this.title = title
    this.description = description
    this.body = body
  },
  methods: {
    addTag(tag) {
      if (tag === "") return;
      this.tagList.push(tag);
      this.tag = "";
    },
    delTag(index) {
      // console.log(index)
      this.tagList.splice(index, 1);
    },
    async publishArticle() {
      const { data } = await createArticle({
        article: {
          title: this.title,
          description: this.description,
          body: this.body,
          tagList: this.tagList,
        },
      });
      this.$router.push(`/article/${data.article.slug}`);
    },
  },
};
</script>

<style>
</style>